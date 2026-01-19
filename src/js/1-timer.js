import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputData = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

button.disabled = true;
let selectedData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      button.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }
    button.disabled = false;
    selectedData = selectedDates[0];
  },
};

flatpickr(inputData, options);

button.addEventListener('click', runTimer);

function runTimer() {
  button.disabled = true;
  inputData.disabled = true;
  const reverseTimerId = setInterval(() => {
    const ms = selectedData.getTime() - Date.now();
    if (ms <= 0) {
      clearInterval(reverseTimerId);
      updateTimer(0);
      button.disabled = false;
      inputData.disabled = false;
      selectedData = null;
      return;
    }
    updateTimer(ms);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}