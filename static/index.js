function submitForm(event) {
    event.preventDefault(); //prevent page reload
    const chatBox = document.querySelector("#chatBox");
    const userInput = document.querySelector("#user_message");
    const userMessage = userInput.value;

    // Remove focus from user input
    if (userInput) {
        userInput.blur();
    }

    // Show chatBox after submit
    if (chatBox) {
        chatBox.style.display = 'block';
    }

    // Send data to the server
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body: `user_message=${encodeURIComponent(userMessage)}`,
    })
    .then(response => response.text())
    .then(data => {
        // Replace the content with new response
        const perser = new DOMParser();
        const doc = perser.parseFromString(data, 'text/html');
        const newChatBox = doc.querySelector("#chatBox").innerHTML;
        chatBox.innerHTML = newChatBox;
        // Hide the button and reset form layout after submit
        const submitBtn = document.getElementById('submitBtn');
        const userInputForm = document.getElementById('userInput');
        if (submitBtn) {
            submitBtn.classList.remove('visible');
        }
        if (userInputForm) {
            userInputForm.classList.remove('input-active');
        }
        document.body.classList.remove('blur-bg');
    })
    .catch(error => {
        console.log("Error: ", error);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.querySelector("#user_message");
    const submitBtn = document.getElementById('submitBtn');
    const userInputForm = document.getElementById('userInput');

    if (userInput && submitBtn && userInputForm) {
        userInput.addEventListener('focus', () => {
            submitBtn.classList.add('visible');
            userInputForm.classList.add('input-active');
            document.body.classList.add('blur-bg');
        });
        // Hide button and reset form when clicking anywhere outside the input or button
        document.addEventListener('mousedown', (e) => {
            if (!userInput.contains(e.target) && !submitBtn.contains(e.target)) {
                submitBtn.classList.remove('visible');
                userInputForm.classList.remove('input-active');
                document.body.classList.remove('blur-bg');
            }
        });
    }
});