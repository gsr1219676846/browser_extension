document.addEventListener('DOMContentLoaded', function() {
    // 确保在 DOM 完全加载后再获取元素
    var toggleButton = document.getElementById('button'); // 确保这里的 ID 与 HTML 中的按钮 ID 匹配

    if (toggleButton) { // 检查 toggleButton 是否存在
        // 初始化按钮状态
        chrome.storage.local.get(['darkMode'], function(result) {
            var isDarkMode = result.darkMode || false;
            updateTheme(isDarkMode);
        });

        // 监听按钮点击事件
        toggleButton.addEventListener('click', function() {
            // 获取当前主题模式并切换它
            chrome.storage.local.get(['darkMode'], function(result) {
                var darkMode = !result.darkMode;
                // 保存新的主题偏好设置到存储
                chrome.storage.local.set({darkMode: darkMode}, function() {
                    updateTheme(darkMode);
                    // 发送消息到其他部分的扩展
                    chrome.runtime.sendMessage({themeChanged: true, darkMode: darkMode});
                });
            });
        });
    } else {
        console.error('The button with ID "button" was not found.');
    }
});

// 更新当前页面主题的函数
function updateTheme(darkMode) {
    document.body.classList.toggle('dark-mode', darkMode);
}
