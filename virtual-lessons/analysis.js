// ==========================================
// 1. CONFIGURATION
// ==========================================

const scriptURL = 'https://script.google.com/macros/s/AKfycby4SVWj8UY2sPRLpgbb4GogBQ7EoSSLKUupTNW5qmAviOFzuKswx6qlbV3oClbRu-yMYQ/exec';

// Global variables for Math Challenge
let correctAnswer = 0;

// ==========================================
// 2. SETUP ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // A. Generate Math Challenge Numbers
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    
    // Update the HTML to show these numbers
    const num1Span = document.getElementById("num1");
    const num2Span = document.getElementById("num2");
    
    // Check if elements exist (to prevent errors on other pages)
    if (num1Span && num2Span) {
        num1Span.innerHTML = num1;
        num2Span.innerHTML = num2;
        correctAnswer = num1 + num2;
    }

    // B. Attach Event Listeners
    const form = document.forms['submit-to-google-sheet'];
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    const youtubeInput = document.getElementById('youtube-input');
    if (youtubeInput) {
        youtubeInput.addEventListener('input', validateYouTube);
    }
});

// ==========================================
// 3. YOUTUBE VALIDATION LOGIC
// ==========================================

function validateYouTube() {
    const youtubeInput = document.getElementById('youtube-input');
    const errorMsg = document.getElementById('error-msg');
    const previewDiv = document.getElementById('video-preview');
    const thumbnailImg = document.getElementById('thumbnail-img');
    const submitButton = document.getElementById('submit-btn');

    const url = youtubeInput.value;
    // Regex to detect valid YouTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
        // VALID LINK
        errorMsg.style.display = 'none';
        previewDiv.style.display = 'block';
        thumbnailImg.src = 'https://img.youtube.com/vi/' + match[2] + '/0.jpg';
        
        // Enable Button
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#39FF14';
        submitButton.style.color = 'black';
        submitButton.style.cursor = 'pointer';
        submitButton.style.opacity = '1';
        submitButton.classList.remove('submit-disabled');
    } else {
        // INVALID LINK
        errorMsg.style.display = 'block';
        previewDiv.style.display = 'none';
        
        // Disable Button
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#555';
        submitButton.style.cursor = 'not-allowed';
        submitButton.style.opacity = '0.6';
        submitButton.classList.add('submit-disabled');
    }
}

// ==========================================
// 4. FORM SUBMISSION LOGIC
// ==========================================

function handleFormSubmit(e) {
    e.preventDefault(); // Stop page reload

    const form = document.forms['submit-to-google-sheet'];
    const submitButton = document.getElementById('submit-btn');
    const mathError = document.getElementById('math-error');
    const successModal = document.getElementById('success-modal');
    
    // A. CHECK MATH ANSWER
    const userAnswer = document.getElementById('mathAnswer').value;
    if (parseInt(userAnswer) !== correctAnswer) {
        mathError.style.display = "inline";
        mathError.innerHTML = "Incorrect Math Answer!";
        return; // Stop here
    } else {
        mathError.style.display = "none";
    }

    // B. SEND TO GOOGLE
    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";
    submitButton.style.backgroundColor = "#555";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // Success! Show Modal
            successModal.style.display = 'flex';
            submitButton.style.display = 'none'; // Hide button to prevent double send
            form.reset(); // Clear form
        })
        .catch(error => {
            console.error('Error!', error.message);
            submitButton.disabled = false;
            submitButton.innerHTML = "Error! Try Again.";
            submitButton.style.backgroundColor = "red";
        });
}

// ==========================================
// 5. MODAL LOGIC (Pop-up Box)
// ==========================================

function closeModal() {
    const successModal = document.getElementById('success-modal');
    successModal.style.display = 'none';
    location.reload(); // Refresh page to get new math numbers
}