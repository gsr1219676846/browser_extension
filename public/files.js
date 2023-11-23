/* 
files.js
- Primarily responsible for theme management in the extension's context.
- Main features include:
  1. Upon loading, it checks the user's theme preference stored in chrome.storage and applies the corresponding theme to the page.
  2. Contains the updateTheme function, which is responsible for switching between dark mode and light mode. It adds or 
  removes the 'dark-mode' class to/from the document body and adjusts CSS properties such as background color and text color to reflect the chosen theme.
- This script ensures a consistent visual experience across the extension by dynamically adapting the page's appearance based on the user's theme settings.
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
        //Adjust styles for other elements

    } else {
        document.body.classList.remove('dark-mode');
        //Other code that changes the light mode
        document.body.classList.remove('dark-mode');
        //Reset background and text colors
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        // Make corresponding style adjustments to other elements

    }
}
