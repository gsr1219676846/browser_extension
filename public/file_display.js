document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');
    const username = urlParams.get('username');

    if (fileName && username) {
        // Create a URL pointing to getFile.php, passing the username and filename as parameters
        const fileUrl = 'http://localhost:8080/loginsystem/getFile.php?username=' + encodeURIComponent(username) + '&file=' + encodeURIComponent(fileName);

        //Create an iframe to display PDF
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '600px'; // or any size
        iframe.src = fileUrl;

        //Add iframe to the page
        const contentContainer = document.getElementById('file-content');
        contentContainer.appendChild(iframe);
    } else {
        alert('Username or file parameter is missing in the URL.');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['darkMode'], function(result) {
        var isDarkMode = result.darkMode || false;
        updateTheme(isDarkMode);
    });
});

function updateTheme(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        //Other code that changes dark mode
        document.body.classList.add('dark-mode');
        //Modify background color and text color
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        //adjust styles for other elements

    } else {
        document.body.classList.remove('dark-mode');
        //Other code that changes the light mode
        document.body.classList.remove('dark-mode');
        //Reset background and text colors
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        // Make corresponding style adjustments to other elements

    }
}
