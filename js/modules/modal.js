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
export default modal;
export {closeModal};
export {openModal};