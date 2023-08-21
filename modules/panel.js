import {} from "./containers.js";

export { actualSlide, focusSlide, nextSlide, previousSlide };

const panelContent = document.querySelector(".panel-content");
const slides = document.querySelectorAll(".slide");
let actualSlide = 0;

function unfocusableInput(parent, value) {
	parent.querySelectorAll("input").forEach((input) => {
		if (value === false) {
			input.removeAttribute("disabled");
		} else {
			input.setAttribute("disabled", "true");
		}
	});
}

function panelMoveTo(index) {
	const left =
		slides[index].getBoundingClientRect().left -
		panelContent.getBoundingClientRect().left;

	panelContent.style.transform = `translateX(-${left}px)`;
}

function enableTabIndex(index, value) {
	const inputContainers = slides[index].querySelectorAll(".input-container");

	inputContainers.forEach((container) => {
		let input = container.querySelector("input");
		if (value) {
			container.tabIndex = input.tabIndex;
			input.tabIndex = -1;
		} else {
			input.tabIndex = container.tabIndex;
			container.tabIndex = -1;
		}
	});
}

function focusSlide(index) {
	unfocusableInput(slides[actualSlide], true);
	unfocusableInput(slides[index], false);
	panelMoveTo(index);
	enableTabIndex(index, true);
	enableTabIndex(actualSlide, false);
	actualSlide = index;
}

function nextSlide() {
	if (actualSlide < slides.length - 1) {
		focusSlide(actualSlide + 1);
	}
}

function previousSlide() {
	if (actualSlide > 0) {
		focusSlide(actualSlide - 1);
	}
}

slides.forEach((slide) => {
	unfocusableInput(slide, true);
});

focusSlide(0);
