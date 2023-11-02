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
                            // Use chrome.windows.create() to open a new popup with the file content
                            chrome.windows.create({
                                url: 'file_display_page.html?file=' + encodeURIComponent(file),
                                type: 'popup',
                                width: 400,  // Set your preferred width
                                height: 600  // Set your preferred height
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

                        // Add the fileContainer to the main container
                        container.appendChild(fileContainer);

                        // Add click event listener for the fileContainer
                        fileContainer.addEventListener('click', function() {
                            var content = label; // You can modify this to target a specific element if needed
                            if (content.style.display === "none") {
                                content.style.display = "block";
                            } else {
                                content.style.display = "none";
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
});
