let slideIndex = 1;
let slideTimer; // Controls the auto-play timer

// Start the slideshow immediately
showSlides(slideIndex);

// 1. Manual Click Function (Triggered by the dots)
function currentSlide(n) {
  clearTimeout(slideTimer); // Stop the timer so it doesn't jump twice
  showSlides(slideIndex = n);
}

// 2. Main Logic
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // If n is undefined, it means the timer triggered this function automatically
  if (n === undefined) { 
    slideIndex++; 
  } else {
    slideIndex = n; // Otherwise, set it to the dot the user clicked
  }

  // Reset to 1 if we go past the end
  if (slideIndex > slides.length) {slideIndex = 1}
  if (slideIndex < 1) {slideIndex = slides.length}

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Remove "active" color from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Show the current slide and highlight the dot
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";

  // Set the timer for the next loop (ms)
  slideTimer = setTimeout(function() { showSlides(); }, 12000);
}