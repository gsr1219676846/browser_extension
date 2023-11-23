/* 
getFiles.js
- Handles the retrieval and display of user-specific files within the extension.
- Key functionalities include:
  1. On document load, it fetches the current user's username from chrome.storage.
  2. Makes an AJAX POST request to 'getFiles.php' with the username to retrieve an array of files associated with the user.
  3. Processes the received file list and dynamically generates visual elements for each file. This includes creating icons, labels, and delete buttons for each file.
  4. Each file icon is interactive, opening a popup with the file's content upon clicking.
  5. Implements a delete functionality for each file, allowing users to remove files directly from the interface.
- The script enhances user interaction by providing a clear and functional interface for managing and accessing files, including options for viewing and deleting files.
*/



document.addEventListener('DOMContentLoaded', function() {
    // Get the username from chrome.storage
    chrome.storage.local.get(['username'], function(result) {
        var username = result.username;
        if (username) {
            // Make an AJAX request to getFiles.php
            fetch('http://localhost:8080/loginsystem/getFiles.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'username=' + encodeURIComponent(username)
            })
                .then(response => response.json())
                .then(files => {
                    console.log("Received data from getFiles.php:", files);

                    if (!Array.isArray(files)) {
                        console.error("Expected an array of files but received:", files);
                        return;
                    }

                    // Generate icons for each file
                    var container = document.querySelector('#preview-frame');
                    files.forEach(file => {

                        var icon = document.createElement('img');
                        icon.src = 'img/bookicon.jpg';
                        icon.width = 50;
                        icon.height = 50;
                        icon.title = file;

                        icon.addEventListener('click', function() {
                            // Pass username and filename
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

                        //Create delete button
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
                            var content = label; //Modify this to target a specific element if needed

                        });
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
});
