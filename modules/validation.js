export { validate };

function validateEmail(email) {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
}
function validateTelephone(telephone) {
	return /^\+\d{10,}$/.test(telephone.value);
}

function validate(args) {
	if (args[0].type === "radio") {
		let res = false;
		for (let radio of args) {
			res |= radio.checked;
		}
		return res;
	} else {
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
}
