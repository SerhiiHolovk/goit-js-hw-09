import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes= document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;

let necessaryDate = 0;

flatpickr(inputDate, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            btnStart.disabled = true;
            Notify.failure('Виберіть дату до якої бажаєте виконати відлік');
        } else {
            Notify.success('Клікніть на кнопку "Start"');
            btnStart.disabled = false;
            necessaryDate = selectedDates[0];
        }
    },
});

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
let timerId = 0;

const startTimer = () => {
    const value = convertMs(necessaryDate - new Date());
    days.textContent = addLeadingZero(value.days);
    hours.textContent = addLeadingZero(value.hours);
    minutes.textContent = addLeadingZero(value.minutes);
    seconds.textContent = addLeadingZero(value.seconds);

    if ((days.textContent == '00') && (hours.textContent == '00') && (minutes.textContent == '00') && (seconds.textContent == '00')) {
        clearInterval(timerId);
        Notify.success("Івент розпочато");
        btnStart.disabled = true;
    }
};

btnStart.addEventListener('click', () => {
    timerId = setInterval(startTimer, 1000);
    inputDate.disabled = true;
    btnStart.disabled = true;
})


