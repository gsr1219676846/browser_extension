// content.js

console.log("content.js is loaded and running");



document.addEventListener('userLoggedIn', function() {
    console.log("userLoggedIn event detected");
    chrome.runtime.sendMessage({ action: "open_index" });
    console.log("Message sent to background script");
});
