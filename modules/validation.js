export { validate };

function radiobuttonsValidation(radios) {
	let res = false;
	for (let radio of radios) {
		res |= radio.checked;
	}
	if (res == false) {
		radios[0].parentNode.parentNode.setAttribute("invalid", "no-selection");
	} else {
		radios[0].parentNode.parentNode.removeAttribute("invalid");
	}
	return res;
}

function updateInputAttributes(input, valid) {
	const parent = input.parentNode;
	if (input.value.length === 0) {
		parent.setAttribute("invalid", "empty");
	} else if (!valid) {
		parent.setAttribute("invalid", "invalid");
	} else {
		parent.removeAttribute("invalid");
	}
}

function textFieldsValidation(inputs) {
	let res = true;
	const validateFunctions = {
		text: (text) => {
			return text.value.length > 0;
		},
		email: (email) => {
			return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
				email.value
			);
		},
		tel: (tel) => {
			return /^\+\d{10,}$/.test(tel.value);
		},
	};
	let aux;

	for (const input of inputs) {
		aux = validateFunctions[input.type](input);
		updateInputAttributes(input, aux);
		res &= aux;
	}
	return res;
}

const validateFunctions = [textFieldsValidation, radiobuttonsValidation];

function validate(inputs, index) {
	if (index < 0 || index >= validateFunctions.length) return true;
	return validateFunctions[index](inputs);
}
