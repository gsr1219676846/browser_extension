/* 
setting.js
- Manages the theme settings for the extension, particularly the toggle functionality.
- Key features include:
  1. Ensuring the DOM is fully loaded before interacting with page elements, specifically the theme toggle button.
  2. Retrieving the current theme setting (dark or light mode) from chrome.storage and applying it to the page when loaded.
  3. Adding an event listener to the toggle button. When clicked, it switches the theme between dark and light mode.
  4. Saving the new theme preference to chrome.storage and updating the current page's theme accordingly.
  5. Broadcasting the theme change to other parts of the extension using chrome.runtime.sendMessage, ensuring consistent theme application across all extension components.
- This script plays a vital role in providing a user-friendly interface for customizing the visual experience of the extension.
*/



document.addEventListener('DOMContentLoaded', function() {
    // Make sure the DOM is fully loaded before retrieving elements
    var toggleButton = document.getElementById('button'); //ID here matches the button ID in the HTML

    if (toggleButton) { // Check if toggleButton exists
        //Initialize button state
        chrome.storage.local.get(['darkMode'], function(result) {
            var isDarkMode = result.darkMode || false;
            updateTheme(isDarkMode);
        });

        //Listen to button click events
        toggleButton.addEventListener('click', function() {
            // Get the current theme mode and switch it
            chrome.storage.local.get(['darkMode'], function(result) {
                var darkMode = !result.darkMode;
                // Save new theme preferences to storage
                chrome.storage.local.set({darkMode: darkMode}, function() {
                    updateTheme(darkMode);
                    // Send messages to other extensions
                    chrome.runtime.sendMessage({themeChanged: true, darkMode: darkMode});
                });
            });
        });
    } else {
        console.error('The button with ID "button" was not found.');
    }
});

// Function to update the theme of the current page
function updateTheme(darkMode) {
    document.body.classList.toggle('dark-mode', darkMode);
}
