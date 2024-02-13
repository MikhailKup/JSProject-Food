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
export default tabs;