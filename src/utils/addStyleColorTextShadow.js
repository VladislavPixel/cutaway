export function addStyleColorTextShadow (element, color = null, textShadow = null) {
	if (color) element.style.color = color
	if (textShadow) element.style.textShadow = textShadow
}
