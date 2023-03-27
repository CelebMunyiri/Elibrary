"use strict";
const read = document.querySelectorAll(".read");
const book = document.querySelectorAll(".bookss");
const embed = document.querySelectorAll(".embed");
const magazine = document.querySelectorAll(".magazine");
const maga = document.querySelectorAll(".maga");

//embed.src = `books/Book-${i}.pdf`;

//for (let i = 0; i <= embed.length; i++) embed[i].src = `/books/Book-${i}.pdf`;

for (let i = 0; i <= read.length; i++)
  read[i].addEventListener("click", function () {
    window.open(`/books/Book-${i}.pdf`, `_blank`);
  });

// IMPLEMENTATION OF LIGHT MODE AND DARK MODE BUTTON IS DONE HERE
const body = document.querySelector("#body"); //get the body element
const buttonColor = document.querySelector(".color"); //get the button for switching background color element
//set initial theme according to local storage or default
let currentTheme = localStorage.getItem("theme") || "light";

//set body class to current theme
body.style.backgroundColor = currentTheme === "light" ? "white" : "black";

//update button text based on the current theme
buttonColor.innerHTML = currentTheme === "light" ? "Dark Mode" : "Light Mode";

//add an event listener to the button to toggle the color theme
buttonColor.addEventListener("click", () => {
  //update body background color to oppositr theme
  body.style.backgroundColor = currentTheme === "light" ? "black" : "white";

  //update current theme to opposite theme
  currentTheme = currentTheme === "light" ? "dark" : "light";

  //Update the button text
  buttonColor.innerHTML = currentTheme === "light" ? "Dark Mode" : "Light Mode";

  localStorage.setItem("theme", currentTheme);
});

//DENY SCREEN CAPTURE
document.addEventListener("keyup", (e) => {
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("");
    alert("Screenshot denied");
  }
});

