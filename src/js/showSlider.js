export function showSlider() {
	const slider = document.querySelector(".slider")
	const slideList = [...document.querySelectorAll(".slide")]
	const heightOneSlide = slideList[0].clientHeight
	let stepDifference = 0
	let currentSlide = 0

	function makeShift() {
		if (stepDifference <= ((slideList.length - 1) * heightOneSlide)) {
			slider.style.transform = `translate(0px, -${stepDifference}px)`
			currentSlide++
		} else {
			stepDifference = 0
			slider.style.transform = `translate(0px, ${stepDifference}px)`
			currentSlide = 0
			slideList.forEach((item, index, arr) => {
				if (index === arr.length - 1) {
					setTimeout(() => {
						item.style.transform = "scale(1)"
					}, 300)
				} else {
					item.style.transform = "scale(1)"
				}
			})
		}
	}
	function goUp() {
		stepDifference -= heightOneSlide
		slider.style.transform = `translate(0px, -${stepDifference}px)`
		currentSlide--
	}
	function sliderKeyDownShow(event) {
		if (window.screen.availWidth <= 992 || window.screen.availHeight <= 610) {
			slider.removeEventListener("keydown", sliderKeyDownShow)
			return
		}
		if (event.keyCode === 40) {
			stepDifference += heightOneSlide
			makeShift()
		}
		if (event.keyCode === 38) {
			if (stepDifference !== 0) goUp()
			slideList[currentSlide].style.transform = "scale(1)"
		}
	}
	document.body.addEventListener("keydown", sliderKeyDownShow)

	let stage = 1
	function sliderWheelShow(event) {
		if (window.screen.availWidth <= 992 || window.screen.availHeight <= 610) {
			slider.removeEventListener("wheel", sliderWheelShow)
			return
		}
		if (event.deltaY > 0) {
			if (stage === 1) {
				slideList[currentSlide].style.transform = "scale(0.6)"
				stage = 2
			} else {
				slideList[currentSlide].style.transform = "scale(0)"
				stage = 1
				stepDifference += heightOneSlide
				makeShift()
			}
		}
		if (event.deltaY < 0) {
			if (stage === 1 && stepDifference !== 0) goUp()
			if (stage === 2) stage = 1
			slideList[currentSlide].style.transform = "scale(1)"
		}
	}
	slider.addEventListener("wheel", sliderWheelShow)
}

showSlider()
