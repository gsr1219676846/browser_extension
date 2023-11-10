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
