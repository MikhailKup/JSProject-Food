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
export default timer;