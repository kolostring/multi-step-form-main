export {};

document.querySelectorAll(".input-container").forEach((inputParent) => {
	inputParent.addEventListener("click", () => {
		inputParent.querySelector("input").checked ^= 1;
		dataCheckInputContainer(inputParent);
	});
	inputParent.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			inputParent.querySelector("input").checked ^= 1;
			dataCheckInputContainer(inputParent);
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
