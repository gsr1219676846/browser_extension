
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message in background script");

    if(request.action == "open_index") {
        // Change the popup to index.html
        chrome.action.setPopup({popup: "index.html"});
    }
});
