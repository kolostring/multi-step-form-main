export { getResult, getPrice, changePrices };

function Service(container, price) {
	return {
		container: container,
		price: price,
	};
}

const plans = [
	Service(document.querySelector("#step-2 #plan-arcade"), 9),
	Service(document.querySelector("#step-2 #plan-advanced"), 12),
	Service(document.querySelector("#step-2 #plan-pro"), 15),
];

const addons = [
	Service(document.querySelector("#step-3 #online-service"), 1),
	Service(document.querySelector("#step-3 #larger-storage"), 2),
	Service(document.querySelector("#step-3 #custom-profile"), 2),
];

const multiplier = [1, 10];
const units = ["/mo", "/yr"];
const yearly = document.querySelector("#step-2 #plan-yearly input");

function getPrice(servicePrice) {
	const isYearly = yearly.checked;

	return `$${servicePrice * multiplier[Number(isYearly)]}${
		units[Number(isYearly)]
	}`;
}

function changePrices() {
	const str = ["", "2 months free"];

	for (const plan of plans) {
		plan.container.querySelector(".price").innerHTML = getPrice(plan.price);
		plan.container.querySelector(".offer").innerHTML =
			str[Number(yearly.checked)];
	}

	for (const addon of addons) {
		addon.container.querySelector(".price").innerHTML =
			"+" + getPrice(addon.price);
	}
}

function getResult() {
	const result = document.createElement("div");
	const table = document.createElement("div");
	const splan = document.createElement("div");
	const saddons = document.createElement("div");

	result.className = "result";
	table.className = "services-table";
	splan.className = "plan";
	saddons.className = "addons";

	result.appendChild(table);
	table.appendChild(splan);
	table.appendChild(saddons);

	const str = ["(Monthly)", "(Yearly)"];
	let total = 0;

	let aux;

	for (const plan of plans) {
		if (plan.container.querySelector("input").checked) {
			aux = document.createElement("div");

			aux.innerHTML = `
            <h1>${plan.container.querySelector("h1").innerHTML} ${
				str[Number(yearly.checked)]
			}<a href="#"><br/>Change</a></h1>
            
            <h1 class="price">${getPrice(plan.price)}</h1>`;
			splan.appendChild(aux);

			total += plan.price;
			break;
		}
	}

	for (const addon of addons) {
		if (addon.container.querySelector("input").checked) {
			aux = document.createElement("div");
			aux.innerHTML = `
            <p>${addon.container.querySelector("h1").innerHTML}</p>
            <p class="price">+${getPrice(addon.price)}</p>
            `;
			saddons.appendChild(aux);

			total += addon.price;
		}
	}

	{
		const perstr = ["(per month)", "(per year)"];
		aux = document.createElement("div");
		aux.className = "total";
		aux.innerHTML = `
        <p>Total ${perstr[Number(yearly.checked)]}</p>
        <p class="price">+${getPrice(total)}</p>`;

		result.appendChild(aux);
	}

	return result;
}

yearly.addEventListener("click", () => {
	changePrices();
});

changePrices();
