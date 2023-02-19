"use strict";
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
//const downloads = document.querySelector(".downloads");
//const read = document.querySelector(".read");
//const download = document.querySelector(".download");
var downloadButtons = document.querySelectorAll(".download");
var readButtons = document.querySelectorAll(".read");
var downloadsList = document.querySelector(".downloads");

downloadButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var bookTitle = this.parentNode.parentNode.querySelector("h2").textContent;
    var downloadLink = document.createElement("a");
    downloadLink.textContent = bookTitle;
    downloadLink.href = "#";
    downloadLink.addEventListener("click", function () {
      alert("Book downloaded");
    });
    var listItem = document.createElement("li");
    listItem.appendChild(downloadLink);
    downloadsList.appendChild(listItem);
  });
});

readButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var bookTitle = this.parentNode.parentNode.querySelector("h2").textContent;
    alert("Reading " + bookTitle);
  });
});
