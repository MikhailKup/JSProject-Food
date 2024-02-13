import {getData} from '../services/services';

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

	getData('http://localhost:3000/menu')
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => {
			new menuCard(img, altimg, title, descr, price, '.menu .container').render();
		})
	});
};
export default cards;