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


// 这段代码应该保持不变，它负责根据存储中的主题设置更新页面主题
chrome.storage.local.get(['darkMode'], function(result) {
    updateTheme(result.darkMode);
});

// 监听来自其他组件的消息，如 background 或 popup
chrome.runtime.onMessage.addListener(function(message) {
    if (message.themeChanged) {
        updateTheme(message.darkMode);
    }
});

// 更新页面主题的函数
function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark'); // 设置属性以使用 CSS 变量
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.removeAttribute('data-theme'); // 移除属性以恢复亮模式的 CSS 变量
    }
}


