document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('upload-button').addEventListener('click', function() {
        chrome.storage.local.get('username', function(data) {
            var userInfo = localStorage.getItem('username');
            if (userInfo && userInfo.first_name) {
                var fileInput = document.getElementById('file-input');
                var file = fileInput.files[0];
                if (file) {
                    var formData = new FormData();
                    formData.append("file", file);
                    formData.append("username", userInfo.first_name);

                    fetch('http://localhost:8080/loginsystem/upload.php', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.text())
                        .then(data => {
                            alert(data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('An error occurred while uploading the file.');
                        });
                } else {
                    alert('Please select a file to upload.');
                }
            } else {
                alert('User information is missing.');
            }
        });
    });
});
