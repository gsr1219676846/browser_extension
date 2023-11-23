/* 
index.js
- Central script for the extension's main interface.
- Responsibilities include:
  1. Applying the user's theme preference (dark or light mode) stored in chrome.storage to the extension's main page.
  2. Adding functionality to the 'refresh-button' to reload the file list, enhancing user interaction by allowing real-time update of the displayed files.
  3. Defining and executing the loadFiles function, which fetches and displays the current user's files from 'getFiles.php'.
  4. Implementing the updateFileDisplay function, which dynamically updates the page to show the current set of user files. This includes creating icons, labels, and delete buttons for each file, and setting up event listeners for viewing and deleting files.
  5. Handling the theme switching by toggling the 'dark-mode' class on the body and adjusting corresponding CSS properties to change the page's appearance.
  6. Incorporating a deleteFile function to allow users to remove files directly from the interface, sending requests to 'deleteFile.php' and updating the display upon successful deletion.
- This script plays a crucial role in the user interface, providing functionalities for file management and visual customization.
*/



document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['darkMode'], function(result) {
        var isDarkMode = result.darkMode || false;
        updateTheme(isDarkMode);
    });
    document.getElementById('refresh-button').addEventListener('click', function() {
        loadFiles(); // Call a function to reload the file list
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
    container.innerHTML = ''; //Clear the current file display

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
            var content = label; // Modify this to target a specific element if needed

        });
    });
}




function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        //Other code that changes dark mode
        document.body.classList.add('dark-mode');
        //Modify background color and text color
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        var grayAreas = document.querySelectorAll('.gray-area');
        grayAreas.forEach(function(area) {
            area.style.backgroundColor = '#333';
        });
        //Adjust styles for other elements

    } else {
        document.body.classList.remove('dark-mode');
        //Other code that changes the light mode
        document.body.classList.remove('dark-mode');
        //Reset background and text colors
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        var grayAreas = document.querySelectorAll('.gray-area');
        grayAreas.forEach(function(area) {
            area.style.backgroundColor = '';
            // Remove inline styles to restore original CSS definitions
        });
// Make corresponding style adjustments to other elements

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
                // After successful deletion, reload the file list
                loadFiles();
            } else {
                console.error('Failed to delete file:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
