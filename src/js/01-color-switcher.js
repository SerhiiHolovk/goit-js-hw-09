const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
let timer = 0;

start.addEventListener('mousedown', e => {
    start.disabled = true;
    stop.disabled = false;
    timer = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    },1000);    
});
 
stop.addEventListener('click', e => {
    clearInterval(timer);
    start.disabled = false;
    stop.disabled = true;
});
