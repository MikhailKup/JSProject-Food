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
export default slider;