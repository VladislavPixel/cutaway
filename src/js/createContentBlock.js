import vladislav from "../images/headerMenuSlider/vladislav.jpg"
import { mainContent } from "../utils/core/configData"
import { createElement } from "../utils/createElement"
import { addVideoSection } from "./addVideoSection"
import { addMiniImage } from "./addMiniImage"

function createContentBlock(currentNumber) {
	const columnMenuHeaderThird = document.querySelector(".menu-header__column_third")
	addMiniImage(currentNumber)
	// Полностью все удаляем из контейнера при каждой смене слайда
	const contentWrapper = document.querySelector(".content-wrapper")
	contentWrapper.innerHTML = ""

	const data = mainContent.find((item, index) => index === currentNumber)

	let icon = createElement("img", "content-wrapper__icon")
	icon.src = data.icon
	icon.alt = data.iconAlt
	// Имитация текстом фоновая
	const textFlagContainer = createElement("div", "menu-header__container-text-flag")
	const flagTextPhone = createElement("div", "menu-header__text-flag", data.keyWordTitle)
	textFlagContainer.append(flagTextPhone)
	const containerFlagText = document.querySelector(".menu-header__container-text-flag")
	if (containerFlagText) containerFlagText.remove()
	columnMenuHeaderThird.append(textFlagContainer)
	// Заголовок
	const blockTitle = createElement("div", "content-wrapper__title-block")
	const keyWordTitle = createElement("span", "content-wrapper__key-word-title", data.keyWordTitle)
	const title = createElement("span", "content-wrapper__title", data.title)
	blockTitle.append(keyWordTitle, title)
	// Подзаголовок
	const subTitle = createElement("div", "content-wrapper__sub-title", data.subTitle)
	// Изображение фотографии разработчика на маленьких устройствах
	const isDeveloper = document.querySelector(".content-wrapper__img-developer-container")
	if (isDeveloper) isDeveloper.remove()
	let imageDeveloperContainer
	if (currentNumber === 0) {
		imageDeveloperContainer = createElement("div", "content-wrapper__img-developer-container")
		const imageDeveloperBlock = createElement("div", "content-wrapper__block-developer-img")
		const imgDeveloper = createElement("img", "content-wrapper__developer-img")
		imgDeveloper.src = vladislav
		imgDeveloper.alt = "Фотография разработчика Штукарева В.С."
		imageDeveloperBlock.append(imgDeveloper)
		imageDeveloperContainer.append(imageDeveloperBlock)
	}
	// Параграфы
	const paragraphContainer = createElement("div", "content-wrapper__container-paragrahp paragrahp-container")
	data.paragraphs.forEach(paragraph => {
		const paragraphBlock = createElement("div", "paragrahp-container__block-parag")
		const keyWordParagraph = createElement("span", "paragrahp-container__key-word-parag", paragraph.keyWordParagraph)
		const textParagraph = createElement("p", "paragrahp-container__parag-text", paragraph.textParagraph)
		paragraphBlock.append(keyWordParagraph, textParagraph)
		paragraphContainer.append(paragraphBlock)
	})
	const windowInnerWidth = document.documentElement.clientWidth
	const windowInnerHeight = document.documentElement.clientHeight
	if (currentNumber === 0 && (windowInnerWidth > 1220 && windowInnerHeight > 930)) {
		paragraphContainer.style.maxWidth = "550px"
	} else {
		paragraphContainer.style.maxWidth = "100%"
	}
	// Секция с дополнительной информацией
	const smallTitle = createElement("div", "content-wrapper__small-title", data.smallTitle)
	const additionallyList = createElement("div", "content-wrapper__list list-content")
	const listColumnFirst = createElement("div", "list-content__column")
	const listColumnSecond = createElement("div", "list-content__column")
	// Блок с дополнительной информацией по проекту
	additionallyList.append(listColumnFirst, listColumnSecond)

	data.additionallyArray.forEach((item, index) => {
		const line = createElement("div", "list-content__line")
		const marker = createElement("span", "list-content__marker", item.marker)
		let text
		if (item.type === "link") {
			text = createElement("a", "list-content__text-link", item.text)
			text.href = item.path
			text.setAttribute("target", "blank_")
		} else {
			text = createElement("span", "list-content__text", item.text)
		}
		line.append(marker, text)
		if (index === 0 || (index % 2 === 0)) {
			listColumnFirst.append(line)
		} else {
			listColumnSecond.append(line)
		}
	})
	contentWrapper.append(
		icon,
		blockTitle,
		subTitle,
		(currentNumber === 0 ? imageDeveloperContainer : ""),
		paragraphContainer,
		smallTitle,
		additionallyList,
		addVideoSection(currentNumber, data.posterVideo, data.posterVideoAlt, data.videoPath)
	)
}

export default createContentBlock
