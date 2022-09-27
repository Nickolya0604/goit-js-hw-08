import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextAreaInput, 500));

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateForm();

function onTextAreaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (localStorage.getItem(STORAGE_KEY)) {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// function populateForm() {
//   if (localStorage.getItem(STORAGE_KEY)) {
//     formEl.email.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;
//     formEl.message.value = JSON.parse(
//       localStorage.getItem(STORAGE_KEY)
//     ).message;
//   }
// }

function populateForm() {
  const preForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (preForm) {
    const inputNames = Object.keys(preForm);
    inputNames.forEach(inputName => {
      const input = formEl.elements[inputName];
      input.value = preForm[inputName];
    });
  }
}
