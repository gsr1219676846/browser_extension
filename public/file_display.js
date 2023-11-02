document.addEventListener('DOMContentLoaded', function() {
    // 解析URL参数以获取文件名
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');

    if (fileName) {
        // 从后端获取文件内容
        // 这里假设您有一个API端点（例如 `getFile.php`），它接受文件名作为参数，并返回文件内容。
        fetch('http://localhost:8080/loginsystem/getFile.php?file=' + encodeURIComponent(fileName))
            .then(response => response.text()) // or response.json() if the content is in JSON format
            .then(content => {
                // Display the file content
                const contentContainer = document.getElementById('file-content');
                contentContainer.textContent = content;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        // Handle the case where the file parameter is missing
        alert('File parameter is missing in the URL.');
    }
});
