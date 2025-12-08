function validateYouTube() {
  // 1. Get all the elements we need to talk to youtube
  var url = document.getElementById("youtube-input").value;
  var btn = document.getElementById("submit-btn");
  var error = document.getElementById("error-msg");
  var preview = document.getElementById("video-preview");
  var thumbnail = document.getElementById("thumbnail-img");

  // 2. The "Regular Expression" math to find the Video ID
  // It looks for youtube.com, youtu.be, or embed links
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  // 3. Check if we found a valid ID (11 characters long)
  if (match && match[2].length == 11) {
    // --- VALID LINK FOUND ---
    var videoId = match[2];
    
    // Hide error, enable button
    error.style.display = "none";
    btn.disabled = false;
    btn.className = "submit-active"; // Turns Green
    
    // Show the Thumbnail Preview from YouTube's server
    thumbnail.src = "https://img.youtube.com/vi/" + videoId + "/0.jpg";
    preview.style.display = "block";

  } else {
    // --- INVALID LINK ---
    // Only show error if they have typed more than 5 characters
    if (url.length > 5) {
      error.style.display = "block";
    }
    // Hide preview, disable button
    preview.style.display = "none";
    btn.disabled = true;
    btn.className = "submit-disabled"; // Stays Grey
  }
}

// ... your existing validateYouTube function is here ...

// NEW: Handle the Form Submission to Google
document.getElementById("swing-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Stop the page from reloading
  
  var form = e.target;
  var btn = document.getElementById("submit-btn");
  var originalText = btn.innerText;

  // 1. Change button text to show it's working
  btn.innerText = "Sending...";
  btn.disabled = true;

  // 2. Gather the data
  var data = new FormData(form);

  // 3. Send to Google Script
  fetch("https://script.google.com/macros/s/AKfycbxakl9gvGJPn0KnpTRYFDl9dzj8d6EZJRaC5A7UfdWqJrDWjOiCn24KyGTDvhQF1WLGEg/exec", {
    method: "POST",
    body: data
  })
  .then(response => response.json())
  .then(result => {
    if(result.result === "success") {
      // Success! Show a message or clear the form
      document.getElementById('success-modal').style.display = 'flex';
      form.reset();
      document.getElementById("video-preview").style.display = "none";
      btn.innerText = originalText;
    } else {
      alert("Error sending message. Please try again.");
      btn.innerText = originalText;
      btn.disabled = false;
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert("Error! check console.");
  });
});

function closeModal() {
  document.getElementById('success-modal').style.display = 'none';
}