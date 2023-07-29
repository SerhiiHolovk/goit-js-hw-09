import Notiflix, { Notify } from "notiflix";

const form = document.getElementsByClassName('form')[0];
const btnPromisesCreate = document.querySelector('button');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) 
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
     else
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
});

btnPromisesCreate.addEventListener('click', () => {
  let delay = Number(document.getElementsByName('delay')[0].value);
  const step = Number(document.getElementsByName('step')[0].value);
  const amount = Number(document.getElementsByName('amount')[0].value);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay)
      .then(resolve => {
        Notiflix.Notify.success(resolve);
      })
      .catch(reject => {
        Notiflix.Notify.failure(reject);
      });
    delay += step;
  }
});