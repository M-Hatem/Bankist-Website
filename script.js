'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// To make smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab--container');
const operationContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const btn = e.target.closest('.operations__tab');
  if (!btn) return;

  // To change btns
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  btn.classList.add('operations__tab--active');

  // To change content
  operationContent.forEach(c =>
    c.classList.remove('operations__content--active')
  );
  const index = btn.dataset.tab;
  const activeContent = document.querySelector(
    `.operations__content--${index}`
  );
  activeContent.classList.add('operations__content--active');
});

// To style the navbar dynamically
const nav = document.querySelector('nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const links = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    links.forEach(link => {
      if (link !== e.target) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// To make the sticky nave
// The old way with scroll event which is bad for performance
// const section1Properties = section1.getBoundingClientRect();
// window.addEventListener('scroll', e => {
//   if (window.scrollY > section1Properties.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// The new way with intersection observer API
const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;

const navObserve = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observer = new IntersectionObserver(navObserve, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);
