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
