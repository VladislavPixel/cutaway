import { socialNetworksConfig } from "../utils/core/configSocialNetworks"
import { createElement } from "../utils/createElement"

export function addSocialNetworksBlock() {
	const columnMenuHeaderFour = document.querySelector(".menu-header__column_four")

	const socialNetworksBlock = createElement("div", "menu-header__social-networks-block")
	socialNetworksConfig.forEach(item => {
		const linkIcon = createElement("a", "menu-header__link-icon")
		linkIcon.setAttribute("target", "_blank")
		linkIcon.setAttribute("title", item.title)
		linkIcon.href = item.path
		const imageIcon = createElement("img", "menu-header__image-icon")
		imageIcon.src = item.iconPath
		imageIcon.alt = item.altIcon
		linkIcon.append(imageIcon)
		socialNetworksBlock.append(linkIcon)
	})
	const followMe = createElement("div", "menu-header__follow", "Follow Me")
	columnMenuHeaderFour.append(socialNetworksBlock, followMe)
}

addSocialNetworksBlock()
