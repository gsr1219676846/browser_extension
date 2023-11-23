/*
user.js
- Primarily focused on managing the theme (dark or light mode) for the user interface of the extension.
- Functions include:
  1. Checking the user's preferred theme setting stored in chrome.storage upon content load.
  2. Implementing the updateTheme function, which applies the user's chosen theme to the page.
     - In dark mode, it adds the 'dark-mode' class to the body, changes the background to a darker color, and adjusts the text color for better visibility.
     - In light mode, it removes the 'dark-mode' class, sets the background to a lighter color, and changes the text color for optimal readability.
- This script ensures a consistent and customizable visual experience for the user, aligning the appearance of the extension's interface with the user's theme preferences.
*/



document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['darkMode'], function(result) {
        var isDarkMode = result.darkMode || false;
        updateTheme(isDarkMode);
    });
});

function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        //Other code that changes dark mode
        document.body.classList.add('dark-mode');
        //Modify background color and text color
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';


    } else {
        document.body.classList.remove('dark-mode');
        //Other code that changes the light mode
        document.body.classList.remove('dark-mode');
        //Other code that changes the light mode
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';


    }
}
