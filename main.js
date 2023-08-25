import { actualSlide, nextSlide, previousSlide } from "./modules/panel.js";
import { validate } from "./modules/validation.js";
import { getResult } from "./modules/services.js";

const steps = document.querySelectorAll(".panel-content .slide");
const result = document.querySelector("#result-table");

const nextStep = document.querySelector("#next-step");
const goBack = document.querySelector("#go-back");

function updateSlides() {
	switch (actualSlide) {
		case 4:
			nextStep.style.display = "none";
		case 0:
			goBack.style.display = "none";
			break;
		case 3:
			result.innerHTML = "";
			result.appendChild(getResult());

			nextStep.innerHTML = "Confirm";
			break;
		default:
			goBack.style.display = "flex";
			nextStep.innerHTML = "Next Step";
	}
}

nextStep.addEventListener("click", () => {
	const inputs = steps[actualSlide].querySelectorAll("form input");
	if (validate(inputs, actualSlide)) {
		nextSlide();
		updateSlides();
	}
});

goBack.addEventListener("click", () => {
	previousSlide();
	updateSlides();
});

document.querySelectorAll(".input-field").forEach((inputField) => {
	inputField.querySelectorAll("input").forEach((input) => {
		const func = () => {
			inputField.removeAttribute("invalid");
		};
		input.addEventListener("click", func);
		input.addEventListener("input", func);
	});
});

updateSlides();
