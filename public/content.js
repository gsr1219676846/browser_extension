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


