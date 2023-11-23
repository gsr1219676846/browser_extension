/*
upload.js
- Handles file upload functionality for the extension.
- Key operations include:
  1. Adding an event listener to the 'upload-button' that triggers when clicked.
  2. Retrieving the current user's username from chrome.storage to associate with the file upload.
  3. Accessing the selected file from the file input field ('file-input').
  4. Creating a FormData object and appending the file and username to it.
  5. Making a POST request to 'upload.php' on the server with the FormData, which contains the file to be uploaded.
  6. Displaying alerts to inform the user about the success or failure of the upload process.
- This script is crucial for enabling users to upload files to their account. It ensures that the file is associated with the correct user and handles the entire upload process, providing feedback to the user throughout.
*/




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
