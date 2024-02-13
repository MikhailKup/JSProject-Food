function calc() {
	//* Calculator

	const result = document.querySelector('.calculating__result span');
	let sex;
	let height;
	let weight;
	let age;
	let ratio = 1.375;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')) {
		sex = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	// Функция инициализации настроек хранилища
	const initLocalSettings = (selector, active) => {
		const elements = document.querySelectorAll(selector);
		elements.forEach((elem) => {
			elem.classList.remove(active);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(active);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(active);
			}
		});
	};
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	// Функция подсчета каллорий
	const calcTotal = () => {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '_____';
			return;
		}
		if (sex === 'female') {
			result.textContent = Math.round((665.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)) * ratio);
		} else {
			result.textContent = Math.round((66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age)) * ratio);
		}
	};
	calcTotal();

	// Функция подсчета статических данных в div
	const getStaticInformation = (parent, active) => {
		const elements = document.querySelectorAll(`${parent} div`);
		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
				elements.forEach(elem => {
					elem.classList.remove(active);
				});
				e.target.classList.add(active);
				calcTotal();
			});
	  });
	};
	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

	// Функция подсчета вбиваемых данных в input
	const getInputInformation = (selector) => {
		const input = document.querySelector(selector);
		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
			switch(input.getAttribute('id')) {
				case "height":
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	};
	getInputInformation('#height');
	getInputInformation('#weight');
	getInputInformation('#age');

};
export default calc;