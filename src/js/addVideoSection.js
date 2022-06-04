import { createElement } from "../utils/createElement"

export function addVideoSection(currentNumber, poster = null, posterAlt = null, videoPath = null) {
	const contentWrapper = document.querySelector(".content-wrapper")
	const videoContainerBlock = document.querySelector(".content-wrapper__video")
	if (videoContainerBlock) videoContainerBlock.remove()
	if (currentNumber !== 0 && currentNumber !== 4 && currentNumber !== 5 && currentNumber !== 6) { // Все остальные страницы получают видео-презентацию
		const videoWrap = createElement("div", "content-wrapper__video-wrap")
		const videoTitle = createElement("div", "content-wrapper__title-video", "Презентация проекта")
		const videoBlockWrapper = createElement("div", "content-wrapper__video-block-wrapper")
		const videoBlock = createElement("video", "content-wrapper__video")
		const imgPoster = createElement("img", "content-wrapper__poster-video")
		const controlVideo = createElement("div", "content-wrapper__control-video")
		const sourceFirst = createElement("source")
		sourceFirst.setAttribute("type", "video/mp4")
		videoBlock.setAttribute("controls", "controls")
		videoBlock.setAttribute("preload", "metadata")
		sourceFirst.setAttribute("src", videoPath)
		imgPoster.src = poster
		imgPoster.alt = posterAlt
		videoBlock.append(sourceFirst)
		videoBlockWrapper.append(videoBlock, imgPoster, controlVideo)
		videoWrap.append(videoTitle, videoBlockWrapper)
		// Управляющий элемент на запуск видео
		controlVideo.addEventListener("click", (event) => {
			imgPoster.remove()
			controlVideo.remove()
			videoBlock.play()
			contentWrapper.classList.add("no-before")
		})
		return videoWrap
	}
	return ""
}
