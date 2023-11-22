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
