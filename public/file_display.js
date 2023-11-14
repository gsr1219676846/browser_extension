document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');
    const username = urlParams.get('username');

    if (fileName && username) {
        // 創建一個指向 getFile.php 的 URL，傳遞用戶名和文件名作為參數
        const fileUrl = 'http://localhost:8080/loginsystem/getFile.php?username=' + encodeURIComponent(username) + '&file=' + encodeURIComponent(fileName);

        // 創建一個 iframe 用於顯示 PDF
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '600px'; // 或您希望的任何大小
        iframe.src = fileUrl;

        // 將 iframe 添加到頁面上
        const contentContainer = document.getElementById('file-content');
        contentContainer.appendChild(iframe);
    } else {
        alert('Username or file parameter is missing in the URL.');
    }
});

// 在其他標籤頁的JavaScript文件中
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['darkMode'], function(result) {
        var isDarkMode = result.darkMode || false;
        updateTheme(isDarkMode);
    });
});

function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        // 其他改變dark模式的代碼
        document.body.classList.add('dark-mode');
// 修改背景顏色和文字顏色
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
// 也可以針對其他元素進行樣式調整

    } else {
        document.body.classList.remove('dark-mode');
        // 其他改變light模式的代碼
        document.body.classList.remove('dark-mode');
// 重置背景和文字顏色
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
// 對其他元素進行相應的樣式調整

    }
}
