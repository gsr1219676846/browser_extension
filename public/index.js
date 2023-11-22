// 在其他標籤頁的JavaScript文件中
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['darkMode'], function(result) {
        var isDarkMode = result.darkMode || false;
        updateTheme(isDarkMode);
    });
    document.getElementById('refresh-button').addEventListener('click', function() {
        loadFiles(); // 调用一个函数来重新加载文件列表
    });
});

function loadFiles() {
    chrome.storage.local.get(['username'], function(result) {
        var username = result.username;
        if (username) {
            fetch('http://localhost:8080/loginsystem/getFiles.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'username=' + encodeURIComponent(username)
            })
                .then(response => response.json())
                .then(files => {
                    updateFileDisplay(files, username);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
}

function updateFileDisplay(files, username) {
    var container = document.querySelector('#preview-frame');
    container.innerHTML = ''; // 清空当前的文件显示

    files.forEach(file => {

        var icon = document.createElement('img');
        icon.src = 'img/bookicon.jpg';
        icon.width = 50;
        icon.height = 50;
        icon.title = file;

        icon.addEventListener('click', function() {
            // 传递用户名和文件名
            chrome.windows.create({
                url: 'file_display_page.html?username=' + encodeURIComponent(username) + '&file=' + encodeURIComponent(file),
                type: 'popup',
                width: 400,
                height: 600
            });
        });



        // Create a wrapper for the file icon and label
        let fileContainer = document.createElement('div');
        fileContainer.className = 'file-container';


        // Create a label for the file name
        let label = document.createElement('div');
        label.textContent = file;

        // Add the icon and label to the fileContainer
        fileContainer.appendChild(icon);
        fileContainer.appendChild(label);

        // 创建删除按钮
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            deleteFile(file, username);
        };

        fileContainer.appendChild(deleteButton);
        container.appendChild(fileContainer);

        // Add the fileContainer to the main container
        container.appendChild(fileContainer);

        // Add click event listener for the fileContainer
        fileContainer.addEventListener('click', function() {
            var content = label; // You can modify this to target a specific element if needed
            // if (content.style.display === "none") {
            //     content.style.display = "block";
            // } else {
            //     content.style.display = "none";
            // }
        });
    });
}




function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        // 其他改變dark模式的代碼
        document.body.classList.add('dark-mode');
// 修改背景顏色和文字顏色
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        var grayAreas = document.querySelectorAll('.gray-area');
        grayAreas.forEach(function(area) {
            area.style.backgroundColor = '#333'; // 例如: '#555'
        });
// 也可以針對其他元素進行樣式調整

    } else {
        document.body.classList.remove('dark-mode');
        // 其他改變light模式的代碼
        document.body.classList.remove('dark-mode');
// 重置背景和文字顏色
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        var grayAreas = document.querySelectorAll('.gray-area');
        grayAreas.forEach(function(area) {
            area.style.backgroundColor = ''; // 移除inline樣式以恢復原始CSS定義
        });
// 對其他元素進行相應的樣式調整

    }
}

//delete files
function deleteFile(fileName, username) {
    fetch('http://localhost:8080/loginsystem/deleteFile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=' + encodeURIComponent(username) + '&file=' + encodeURIComponent(fileName),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 成功删除后，重新加载文件列表
                loadFiles();
            } else {
                console.error('Failed to delete file:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
