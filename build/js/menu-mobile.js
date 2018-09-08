let menuButtonClose = document.querySelector('.mobile-menu-button--close');
let mobileButtonOpen = document.querySelector('.mobile-menu-button--open');
let pageNavList = document.querySelector('.page-nav__list');

menuButtonClose.classList.add('mobile-menu-button--hidden');
mobileButtonOpen.classList.remove('mobile-menu-button--hidden');
pageNavList.classList.add('page-nav__list--closed');

menuButtonClose.addEventListener('click',function () {
    menuButtonClose.classList.add('mobile-menu-button--hidden');
    mobileButtonOpen.classList.remove('mobile-menu-button--hidden');
    pageNavList.classList.add('page-nav__list--closed');
});

mobileButtonOpen.addEventListener('click',function () {
    menuButtonClose.classList.remove('mobile-menu-button--hidden');
    mobileButtonOpen.classList.add('mobile-menu-button--hidden');
    pageNavList.classList.remove('page-nav__list--closed');
});