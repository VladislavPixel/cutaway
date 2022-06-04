import "./scss/app.scss"
import { configSlice } from "./utils/core/configSlice"
import chevron from "./images/icons/chevron-up.svg"
import { createElement } from "./utils/createElement"
import { createElementsSlider } from "./js/createElementsSlider"
import { showSlider } from "./js/showSlider"
import createContentBlock from "./js/createContentBlock"
import { addSocialNetworksBlock } from "./js/addSocialNetworksBlock"

const header = document.querySelector(".header")
const contentWrapper = document.querySelector(".content-wrapper")
const columnMenuHeaderFirst = document.querySelector(".menu-header__column_first")
const columnMenuHeaderSecond = document.querySelector(".menu-header__column_second")
// Стрелки контроллеры для Slice
const controlBlock = createElement("div", "menu-header__control control-menu")
const arrowContainerUp = createElement("div", "control-menu__arrow-container")
const arrowContainerDown = createElement("div", "control-menu__arrow-container")
const arrowImgUp = createElement("img", "control-menu__arrow-up")
arrowImgUp.src = chevron
arrowImgUp.alt = "Стрелка вверх"
const arrowImgDown = createElement("img", "control-menu__arrow-down")
arrowImgDown.src = chevron
arrowImgUp.alt = "Стрелка вниз"
const controlMessage = createElement("div", "control-menu__text", "NEXT")
arrowContainerUp.append(arrowImgUp)
arrowContainerDown.append(arrowImgDown)
controlBlock.append(arrowContainerUp, controlMessage, arrowContainerDown)
columnMenuHeaderFirst.append(controlBlock) // Добавление в колонку

// Slice
const menuHeaderSlider = createElement("div", "menu-header__slider slider-menu")
configSlice.forEach((item, index) => {
	const slideTitleContainer = createElement("div", "slider-menu__text-container")
	const slideTitle = createElement("div", "slider-menu__title-slide", item.title)
	if (item.subTitle) {
		const slideSubTitle = createElement("div", "slider-menu__sub-title", item.subTitle)
		slideTitleContainer.append(slideTitle, slideSubTitle)
	} else {
		slideTitleContainer.append(slideTitle)
	}
	const menuSlide = createElement("div", "slider-menu__slide")
	const imagesSlide = createElement("img", "slider-menu__images")
	if (index !== 0) menuSlide.classList.add("no-active")
	imagesSlide.src = item.path
	imagesSlide.alt = item.imageAlt
	menuSlide.append(imagesSlide, slideTitleContainer)
	menuHeaderSlider.append(menuSlide)
})
columnMenuHeaderSecond.append(menuHeaderSlider) // Добавление в колонку

const burgerHeader = document.querySelector(".header__burger")
const menuHeader = document.querySelector(".menu-header")
const headerTitle = document.querySelector(".header__title")
// LOGIK HEADER MENU
let steps = 1
let heightColumnSecond
let heightOneSLide
const menuHeaderColumn = [...document.querySelectorAll(".menu-header__column")]
burgerHeader.addEventListener("click", ({ target }) => {
	if (target === burgerHeader || target.parentElement === burgerHeader) {
		burgerHeader.classList.toggle("active")
		menuHeader.classList.toggle("active")
		menuHeaderColumn.forEach((column) => {
			column.classList.toggle("active")
		})
		if (!menuHeader.classList.contains("active")) menuHeader.style.borderRadius = "0px 0px 0px 100%"
		headerTitle.classList.toggle("showColor")
		setTimeout(() => {
			heightOneSLide = getHeightOneSlide()
			heightColumnSecond = columnMenuHeaderSecond.clientHeight
		}, 550)
		setTimeout(() => {
			const windowInnerWidth = document.documentElement.clientWidth
			const windowInnerHeight = document.documentElement.clientHeight
			if (steps === 1) {
				menuHeader.style.borderRadius = `0px 0px 0px 0px`
				if (windowInnerWidth < 1220 || windowInnerHeight < 930) {
					header.style.background = "black"
					menuHeader.classList.add("margin")
				}
				steps = 2
			} else {
				menuHeader.style.borderRadius = `0px 0px 0px 100%`
				if (windowInnerWidth < 1220 || windowInnerHeight < 930) menuHeader.classList.remove("margin")
				steps = 1
			}
		}, 300)
	}
})

// Логика по клику на стрелки
const arraySlide = [...document.querySelectorAll(".slider-menu__slide")]
let valueSLider = 0
let currentSlideMenu = 0
arraySlide[currentSlideMenu].classList.add("active")
arrowContainerUp.classList.add("blocked")
createContentBlock(currentSlideMenu)

function getHeightOneSlide() {
	return arraySlide[0].clientHeight
}

function defineClasses(text) {
	arraySlide[currentSlideMenu].classList.add("no-active")
	arraySlide[currentSlideMenu].classList.remove("active")
	if (text === "plus") {
		currentSlideMenu++
		arraySlide[currentSlideMenu].classList.add("active")
		arraySlide[currentSlideMenu].classList.remove("no-active")
		if (currentSlideMenu === (arraySlide.length - 1)) arrowContainerDown.classList.add("blocked")
	}
	if (text === "minus") {
		currentSlideMenu--
		arraySlide[currentSlideMenu].classList.add("active")
		arraySlide[currentSlideMenu].classList.remove("no-active")
		if (currentSlideMenu === 0) arrowContainerUp.classList.add("blocked")
	}
	createContentBlock(currentSlideMenu)
}

function checkAndRemoveCLass() {
	if (contentWrapper.classList.contains("no-before")) contentWrapper.classList.remove("no-before")
}

arrowContainerUp.addEventListener("click", (event) => {
	if (currentSlideMenu !== 0) {
		checkAndRemoveCLass()
		arrowContainerDown.classList.remove("blocked")
		defineClasses("minus")
		valueSLider -= heightOneSLide
		if (currentSlideMenu === 0) valueSLider = 0
		menuHeaderSlider.style.transform = `translate(0px, -${valueSLider}px)`
	}
})

arrowContainerDown.addEventListener("click", (event) => {
	if (currentSlideMenu !== (arraySlide.length - 1)) {
		checkAndRemoveCLass()
		arrowContainerUp.classList.remove("blocked")
		defineClasses("plus")
		valueSLider += heightOneSLide
		let different = (arraySlide.length * heightOneSLide) - valueSLider
		if (heightColumnSecond > different) valueSLider = arraySlide.length * heightOneSLide - heightColumnSecond
		menuHeaderSlider.style.transform = `translate(0px, -${valueSLider}px)`
	}
})