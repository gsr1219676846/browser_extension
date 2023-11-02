document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('upload-button').addEventListener('click', function() {
        // Get username from chrome.storage
        chrome.storage.local.get(['username'], function(result) {
            var username = result.username;
            if (username) {
                var fileInput = document.getElementById('file-input');
                var file = fileInput.files[0];
                if (file) {
                    var formData = new FormData();
                    formData.append("file", file);
                    formData.append("username", username);

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
