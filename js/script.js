import tabs from './modules/tabs';
import modal from './modules/modal';
import form from './modules/form';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	// Функция открытия окна после промежутка времени
	const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 600000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimer);
	form('form', modalTimer);
	timer('.timer', '2024-02-29');
	cards();
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		inner: '.offer__slider-inner'
	});
	calc();
//? ---------------------------------------------------
});