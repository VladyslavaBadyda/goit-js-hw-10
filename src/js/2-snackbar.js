'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const userForm = document.querySelector('.form');
const inputMs = document.querySelector('[name="delay"]');
const inputRadio = document.querySelectorAll('[name="state"]');

const btn = document.querySelector('button');

userForm.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.elements.delay.value.trim());
  const selected = form.elements['state'].value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selected === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(result =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(error =>
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
}