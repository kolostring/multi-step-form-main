export {};

document.querySelectorAll(".input-container").forEach((inputParent) => {
	const input = inputParent.querySelector("input");
	const clickInput = () => {
		input.checked ^= 1;
		input.dispatchEvent(new Event("click"));
		dataCheckInputContainer(inputParent);
	};
	inputParent.addEventListener("click", () => {
		clickInput();
	});
	inputParent.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			clickInput();
		}
	});
	dataCheckInputContainer(inputParent);
});

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
