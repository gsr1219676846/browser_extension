// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message in background script");

    if (request.action === "open_index") {
        // Change the popup to index.html
        chrome.action.setPopup({popup: "index.html"});

        // Get the user data from chrome.storage
        chrome.storage.local.get(["username", "email", "phone"], function(data) {
            const username = data.username;
            const email = data.email;
            const phone = data.phone;

            //use the user data
            console.log(`User info - Name: ${username}, Email: ${email}, Phone: ${phone}`);
        });
    } else if (request.themeChanged) {
        // Notify all tabs to update the theme
        var newTheme = request.darkMode ? 'dark' : 'light';
        chrome.tabs.query({}, function(tabs) {
            for (let tab of tabs) {
                if (tab.url && tab.url.startsWith('http')) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: updateTabTheme,
                        args: [newTheme]
                    });
                }
            }
        });
    }
});


function updateTabTheme(theme) {
    // Update the tab's theme based on the value of theme ('dark' or 'light')
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        //Other code that changes dark mode
    } else {
        document.body.classList.remove('dark-mode');
        //Other code that changes the light mode
    }
}
