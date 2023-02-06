"use strict";

const buttonBackgroundColor = document.querySelector(".color");
const body = document.querySelector(".body");
buttonBackgroundColor.addEventListener("click", function () {
  body.style.backGroundColor = "blue";
});
