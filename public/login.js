/* 
login.js
- Dedicated to managing the theme settings for the login page of the extension.
- Key functionalities:
  1. Checks the user's theme preference stored in chrome.storage when the document content is loaded.
  2. Implements the updateTheme function to switch between dark and light modes based on the user's preference. 
     - In dark mode, it adds the 'dark-mode' class to the body, changes the background color to a darker shade, and adjusts the text color for better visibility.
     - In light mode, it removes the 'dark-mode' class, resets the background to a lighter color, and adjusts the text color accordingly.
- This script ensures that the login page aligns with the overall theme of the extension, providing a consistent visual experience across different components.
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
        //Reset background and text colors
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        // Make corresponding style adjustments to other elements

    }
}
