export function createElement(type, classes = null, text = null, attributeName = null, attributeValue = null) {
	const el = document.createElement(type)
	if (classes) el.className = classes
	if (text) el.textContent = text
	if (attributeName) el.setAttribute(attributeName, attributeValue)
	return el
}
