document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabs
  var tabs = document.querySelector('.tabs');
  M.Tabs.init(tabs);
  document.getElementById('home-tab').style['display'] = 'block'

  // Image Slideshow
  var slideIndex = 1;
  var intervalId;

  function showSlides() {
      var slides = document.querySelectorAll('.mySlides');
      var slidesWrapper = document.querySelector('.slides-wrapper');
      var progressBar = document.querySelector('.progress-bar');

      if (slideIndex > slides.length) {
          slideIndex = 1;
      }

      slidesWrapper.style.transform = 'translateX(' + -100 * (slideIndex - 1) + '%)';
      progressBar.style.width = (100 / slides.length) * slideIndex + '%';
  }

  // Set initial progress bar width
  var progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = (100 / document.querySelectorAll('.mySlides').length) + '%';

  function startInterval() {
      intervalId = setInterval(() => {
          slideIndex += 1;
          showSlides();
      }, 5000); // Change slide every 5 seconds
  }

  startInterval();

  window.plusSlides = function(n) {
      clearInterval(intervalId); // Clear interval before changing slide
      slideIndex += n;
      showSlides();
      startInterval(); // Restart interval after changing slide
  };
});