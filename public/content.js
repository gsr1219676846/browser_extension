console.log("content.js is loaded and running");

document.addEventListener('userLoggedIn', function() {
    console.log("userLoggedIn event detected");

    // Get user data from the DOM
    const username = document.querySelector("h2").textContent.replace("Welcome ", "").trim();
    const email = document.querySelectorAll("div.regisFrm p")[1].textContent.replace("Email: ", "").trim();
    const phone = document.querySelectorAll("div.regisFrm p")[2].textContent.replace("Phone: ", "").trim();


    // Store the user data in chrome.storage
    chrome.storage.local.set({
        username: username,
        email: email,
        phone: phone
    }, function() {
        console.log("User data saved in chrome.storage");
    });

    chrome.runtime.sendMessage({ action: "open_index" });
    console.log("Message sent to background script");
});


//Responsible for updating the page theme based on the theme settings in storage
chrome.storage.local.get(['darkMode'], function(result) {
    updateTheme(result.darkMode);
});

// Listen for messages from other components, such as background or popup
chrome.runtime.onMessage.addListener(function(message) {
    if (message.themeChanged) {
        updateTheme(message.darkMode);
    }
});

// Function to update page theme
function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark'); // Set properties to use CSS variables
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.removeAttribute('data-theme'); // CSS variable that removes properties to restore light mode
    }
}


