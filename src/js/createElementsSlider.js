import { technologyStack } from "../utils/core/configTechnologyStack"
import { createElement } from "../utils/createElement"
import { addStyleColorTextShadow } from "../utils/addStyleColorTextShadow"

// Start Page
export function createElementsSlider() {
	const slider = document.querySelector(".slider")

	technologyStack.forEach((item, index) => {
		const slide = createElement("section", "slider__slide slide")
		const slideContainer = createElement("div", "slide__container _container")
		const slideColumn1 = createElement("div", "slide__column")
		const slideColumn2 = createElement("div", "slide__column slide__column_right")
		const slideTitle = createElement("h2", "slide__title", item.name)
		addStyleColorTextShadow(slideTitle, item.color, `0px 0px 10px ${item.shadow}`)
		const flagTitle = createElement("span", "slide__title-flag")
		flagTitle.style.background = item.color
		const slideList = createElement("ul", "slide__list list-slide")

		item.listMessage.forEach(message => {
			const li = createElement("li", "list-slide__el", message)
			slideList.append(li)
		})
		
		slideColumn1.append(slideTitle, flagTitle, slideList)
		const planet = createElement("div", "slide__planet planet-slide")
		planet.style.border = `4px solid ${item.color}`
		planet.style.boxShadow = `0px 0px 70px 20px ${item.shadow}, 0px 0px 45px 30px ${item.messageColor}, inset 0px 0px 10px ${item.shadow}`
		const messagePlanet = createElement("h2", "planet-slide__message", item.planet)
		addStyleColorTextShadow(messagePlanet, item.messageColor, `0px 0px 6px ${item.shadow}`)
		const numberBlock = createElement("div", "planet-slide__number", `0${index + 1}`)
		planet.append(messagePlanet)
		slideColumn2.append(planet, numberBlock)
		slideContainer.append(slideColumn1, slideColumn2)
		slide.append(slideContainer)
		slider.append(slide)
	})
}

createElementsSlider()
