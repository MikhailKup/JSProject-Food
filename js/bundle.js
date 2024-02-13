/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	//* Creating menu-cards with classes
	class menuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
		  this.src = src;
		  this.alt = alt;
		  this.title = title;
		  this.descr = descr;
		  this.price = price;
		  this.classes = classes;
		  this.parent = document.querySelector(parentSelector);
		  this.transfer = 90;
		  this.changeToRub();
		}
		changeToRub() {
			this.price = this.price * this.transfer;
		}
		render() {
			const newItem = document.createElement('div');
			if (this.classes.length === 0) {
				newItem.classList.add('menu__item');
			} else {
				this.classes.forEach(className => newItem.classList.add(className));
			}
			newItem.innerHTML = `
			<img src=${this.src} alt=${this.alt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
			</div>
			`;
			this.parent.append(newItem);
		}
	};

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new menuCard(img, altimg, title, descr, price, '.menu .container').render();
		})
	});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimer) {
	//* Sending a request from a form
	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: 'icons/spinner.svg',
		success: 'Спасибо! Скоро с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};


	// Функция постинга данных
	const bindPostData = (form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});
		 });
	};
	
	forms.forEach((form) => {
		bindPostData(form);
	});

	// Оповещение Пользователя
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimer);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		</div>
		`;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000);
	};
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	if (modalTimer) {
		 clearInterval(modalTimer);
	}
}
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {
	//* Modal window
	const modalBtns = document.querySelectorAll(triggerSelector);
	const modal = document.querySelector(modalSelector);

	modalBtns.forEach((btn) => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
	});

  // Функция закрытия при клике на свободную область
  modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
  });

 	// Функция закрытия при клике на Esc
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

  // Функция открытия окна после прокрутки в конец страницы
	const showModalByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimer);
			window.removeEventListener('scroll', showModalByScroll);
	  	}
	};

  	window.addEventListener('scroll', showModalByScroll);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {
	//* Creating a slider "Carousel"

	const sliderWrapper = document.querySelector(wrapper);
	const sliderInner = document.querySelector(inner);
	const slider = document.querySelector(container);
	const width = window.getComputedStyle(sliderWrapper).width;
	const slides = document.querySelectorAll(slide);
	const nextSlideBtn = document.querySelector(nextArrow);
	const prevSlideBtn = document.querySelector(prevArrow);
	const currentSlide = document.querySelector(currentCounter);
	const totalSlides = document.querySelector(totalCounter);
	const dots = [];
	const indicators = document.createElement('ol');
	let slideIndex = 1;
	let offset = 0;

	// Функция создания точек для слайдера
	const createSliderDots = () => {
		for (let i = 0; i < slides.length; i++){
			const dot = document.createElement('li');
			dot.setAttribute('data-slide-to', i + 1);
			dot.classList.add('dot');
			if (i == 0) {
				dot.style.opacity = '1';
			}
			indicators.append(dot);
			dots.push(dot);
		}
	};

	// Функция создания слайдера
	const createSlider = () => {
		sliderInner.style.width = 100 * slides.length + '%';
		sliderInner.style.display = 'flex';
		sliderInner.style.transition = '0.5s all';
		sliderWrapper.style.overflow = 'hidden';
		slides.forEach((item) => {
			item.style.width = width;
		});
		slider.style.position = 'relative';
		indicators.classList.add('carousel-indicators');
		slider.append(indicators);

		createSliderDots();
	};
	createSlider();

	// Функция добавления нулей к номеру слайда
	const AddZeroForCount = (items) => {
		if (items.length < 10) {
			totalSlides.textContent = `0${items.length}`;
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			totalSlides.textContent = items.length;
			currentSlide.textContent = slideIndex;
		}
	};
	AddZeroForCount(slides);

	// Функция удаления букв из величин
	const removeWords = (str) => {
		return +str.replace(/\D/g, '');
	};

	// Функция установления прозрачности точек
	const changeDotsOpacity = () => {
		dots.forEach((dot) => {
			dot.style.opacity = '.5';
		});
		dots[slideIndex - 1].style.opacity = '1';
	};

	// Функция установления смещения
	const changeOffset = (direction) => {
		if (direction === -1) {
			if (offset == 0) {
				offset = removeWords(width) * (slides.length - 1);
			} else {
				offset -= removeWords(width);
			}
		} else if (direction === 1) {
			if (offset == removeWords(width) * (slides.length - 1)) {
				offset = 0; 
			} else {
				offset += removeWords(width);
			}
		}
		sliderInner.style.transform = `translateX(-${offset}px)`;
	};

	// Функция установления индекса слайда
	const changeSlideIndex = (direction) => {
		if (direction === -1) {
			if (slideIndex == 1) {
				slideIndex = slides.length;
			} else {
				slideIndex--;
			}
		} else if (direction === 1) {
			if (slideIndex == slides.length) {
				slideIndex = 1;
			} else {
				slideIndex++;
			}
		}
	 };

	// Механизм перемещения слайдов
	nextSlideBtn.addEventListener('click', () => {
		changeOffset(1);
		changeSlideIndex(1);
		AddZeroForCount(slides);
		changeDotsOpacity();
	});
	prevSlideBtn.addEventListener('click', () => {
		changeOffset(-1);
		changeSlideIndex(-1);
		AddZeroForCount(slides);
		changeDotsOpacity();
	});

	// Механизм перемещения слайдов через точки(dots)
	dots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			offset = removeWords(width) * (slideTo - 1);
			sliderInner.style.transform = `translateX(-${offset}px)`;
			changeDotsOpacity();
			AddZeroForCount(slides);
		});
	});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//* Tabs
	const tabs = document.querySelectorAll(tabsSelector);
	const tabsContent = document.querySelectorAll(tabsContentSelector);
	const tabsParent = document.querySelector(tabsParentSelector);
	
	// Скрытие табов
	const hideTagContent = () => {
		tabsContent.forEach((item) => {
			 item.classList.add('hide');
			 item.classList.remove('show', 'fade');
		});
		tabs.forEach((item) => {
			item.classList.remove(activeClass);
		});
	};

	// Показ табов
	const showTabContent = (i = 0) => {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	};

	hideTagContent();
	showTabContent();

	// Показ нужного таба при клике
	tabsParent.addEventListener('click', (e) => {
		const target = e.target;
		 if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTagContent();
					showTabContent(i);
				}
			});
		 }
	});
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
	//* Timer

	// Функция получения остатков времени до deadline
	const getTimeRemaining = (endtime) => {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		// Если дата прошла, то показываем только нули
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((t / (1000 * 60)) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}
		return {t, days, hours, minutes, seconds};
	};

	// Функция добавления нулей
	const getZero = (num) => {
		return (num >= 0 && num < 10) ? `0${num}` : num;
	};

	// Функция установки таймера
	const setClock = (selector, endtime) => {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		// Инициируем функцию для нужного остатка сразу
		updateClock();

		// Функция обновления часов
		function updateClock () {
			const t = getTimeRemaining(endtime);
			days.textContent = getZero(t.days);
			hours.textContent = getZero(t.hours);
			minutes.textContent = getZero(t.minutes);
			seconds.textContent = getZero(t.seconds);
			if (t.t <= 0) {
				clearInterval(timeInterval);
			}
		};
	};
	setClock(timerSelector, deadline);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
// Функция получения данных с сервера
const postData = async (url, data) => {
	const result = await fetch(url, {
		method: 'POST',
		headers: {
		'Content-type': 'application/json'
		},
		body: data
	});
	
	return await result.json();
};

// Функция запроса данных карточек с сервера
const getData = async (url) => {
	const result = await fetch(url);
	if (!result.ok) {
		throw new Error(`Could not fetch ${url}, status: ${result.status}`);
	}
	return await result.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {
	// Функция открытия окна после промежутка времени
	const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimer), 600000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimer);
	(0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimer);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2024-02-29');
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		inner: '.offer__slider-inner'
	});
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
//? ---------------------------------------------------
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map