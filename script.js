let hourTextEl = document.querySelectorAll("textArea");
let schedulEl = document.querySelector("body");
let currentDayEl = document.querySelector("#currentDay");
let currentTime = dayjs().hour();

$(function () {

  //displays curent date in header
  currentDayEl.textContent = dayjs().format("dddd, MMMM D, YYYY");

  //adds event listener, saving textarea content to local storage
  schedulEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
      localStorage.setItem(event.target.dataset.time, JSON.stringify(event.target.previousElementSibling.value));
    } else if (event.target.matches("i")) {
      localStorage.setItem(event.target.dataset.time, JSON.stringify(event.target.parentElement.previousElementSibling.value));
    }
  })

  //sets text context to previously stored items, adds and removes classes based on the hour
  for (let text of hourTextEl) {
    text.value = JSON.parse(localStorage.getItem(text.dataset.time));

    if (text.dataset.time < currentTime) {
      text.parentElement.classList.remove("present", "future");
      text.parentElement.classList.add("past");
    } else if (text.dataset.time > currentTime) {
      text.parentElement.classList.remove("past", "present");
      text.parentElement.classList.add("future")
    } else {
      text.parentElement.classList.remove("past", "future");
      text.parentElement.classList.add("present");
    }
  }
});
