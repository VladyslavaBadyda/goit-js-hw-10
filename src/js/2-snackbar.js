'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(delayFromPromise => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayFromPromise}ms`,
        position: 'topRight',
      });
    })
    .catch(delayFromPromise => {
      iziToast.error({
        message: `❌ Rejected promise in ${delayFromPromise}ms`,
        position: 'topRight',
      });
    });

  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);          
      } else {
        reject(delay);           
      }
    }, delay);
  });
}