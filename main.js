import { actualSlide, nextSlide, previousSlide } from "./modules/panel.js";
import { validate } from "./modules/validation.js";

const steps = document.querySelectorAll(".panel-content .slide");

document.querySelector("#next-step").addEventListener("click", () => {
	if (validate(steps[actualSlide].querySelectorAll(".input-field input"))) {
		nextSlide();
	} else {
		alert("CAMPOS INVALIDOS");
	}
});

document.querySelector("#go-back").addEventListener("click", () => {
	previousSlide();
});
