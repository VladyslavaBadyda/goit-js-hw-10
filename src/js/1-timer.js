'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btn.disabled = true;
let userSelection = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      userSelection = null;
      btn.disabled = true;

      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelection = selectedDates[0];
      btn.disabled = false;
    }
  },
};
flatpickr(input, options);

btn.addEventListener('click', startCounter);

function startCounter(event) {
  if (!userSelection) return;
  btn.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date();
    const different = userSelection - now;
    if (different < 0) {
      clearInterval(intervalId);
      addLeadingZero(0, 0, 0, 0);
      btn.disabled = true;
      input.disabled = false;
      userSelection = null;

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(different);
    addLeadingZero(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(days, hours, minutes, seconds) {
  daysEl.textContent = String(days).padStart('2', 0);
  hoursEl.textContent = String(hours).padStart('2', 0);
  minutesEl.textContent = String(minutes).padStart('2', 0);
  secondsEl.textContent = String(seconds).padStart('2', 0);
}