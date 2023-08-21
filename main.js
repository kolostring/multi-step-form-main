const panelContent = document.querySelector(".panel-content");
const slides = document.querySelectorAll(".slide");
const inputContainers = document.querySelectorAll(".input-container");
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

function focusSlide(index) {
	unfocusableInput(slides[actualSlide], true);
	unfocusableInput(slides[index], false);
	panelMoveTo(index);
	actualSlide = index;
}

function dataCheckInputContainer(inputContainer) {
	let input = inputContainer.querySelector("input");
	if (input.type === "radio") {
		document.getElementsByName(input.name).forEach((radio) => {
			radio.parentNode.setAttribute("data-checked", radio.checked);
		});
	} else {
		inputContainer.setAttribute("data-checked", input.checked);
	}
}

//**EVENTS */
document.querySelector("#next-step").addEventListener("click", () => {
	focusSlide(actualSlide + 1);
});

document.querySelector("#go-back").addEventListener("click", () => {
	focusSlide(actualSlide - 1);
});

inputContainers.forEach((inputParent) => {
	inputParent.addEventListener("click", () => {
		inputParent.querySelector("input").checked ^= 1;
		dataCheckInputContainer(inputParent);
	});
});

//* ON DOCUMENT LOAD */
slides.forEach((slide) => {
	unfocusableInput(slide, true);
});

focusSlide(0);
