import { createElement } from "../utils/createElement"
import vladislavMini from "../images/contentBlock/vladislav-mini.png"

export function addMiniImage(currentNumber) {
	const columnMenuHeaderThird = document.querySelector(".menu-header__column_third")
	const myImage = document.querySelector(".menu-header__mini-image")
	if (myImage) myImage.remove()
	if (currentNumber === 0) { // Добавление фигурки разработчика
		let miniImage = createElement("img", "menu-header__mini-image")
		miniImage.src = vladislavMini
		miniImage.alt = "Ростовая картинки разработчика Штукарева В.С."
		columnMenuHeaderThird.append(miniImage)
	}
}