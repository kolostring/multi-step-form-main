export { validate };

function validateEmail(email) {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
}
function validateTelephone(telephone) {
	return /^\+\d{10,}$/.test(telephone.value);
}
function validateRadios(radios) {
	let res = false;
	for (let radio of radios) {
		res |= radio.checked;
	}
	return res;
}
function generalValidation(args) {
	let res = true;

	for (const container of args) {
		switch (container.type) {
			case "email":
				res &= validateEmail(container);
				break;
			case "tel":
				res &= validateTelephone(container);
				break;
		}
	}
	return res;
}

function validate(args) {
	if (args.length === 0) return true;
	if (args[0].type === "radio") {
		return validateRadios(args);
	} else {
		return generalValidation(args);
	}
}
