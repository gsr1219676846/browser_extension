chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message in background script");

    if(request.action == "open_index") {
        // Change the popup to index.html
        chrome.action.setPopup({popup: "index.html"});

        // Get the user data from chrome.storage
        chrome.storage.local.get(["username", "email", "phone"], function(data) {
            const username = data.username;
            const email = data.email;
            const phone = data.phone;

            // Now you can use the user data as needed
            console.log(`User info - Name: ${username}, Email: ${email}, Phone: ${phone}`);
        });
    }
});
