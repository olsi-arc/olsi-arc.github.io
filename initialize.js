document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabs
  var tabs = document.querySelector('.tabs');
  M.Tabs.init(tabs);
  document.getElementById('home-tab').style['display'] = 'block'

  var slides = document.querySelectorAll('.mySlides');

  // Image Slideshow
  var slideIndex = 0;
  var intervalId;

  function showSlides() {
      var slidesWrapper = document.querySelector('.slides-wrapper');
      var progressBar = document.querySelector('.progress-bar');

      slidesWrapper.style.transform = 'translateX(' + -100 * slideIndex + '%)';
      progressBar.style.width = (100 / slides.length) * (slideIndex + 1) + '%';
  }

  // Set initial progress bar width
  var progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = (100 / document.querySelectorAll('.mySlides').length) + '%';

  function startInterval() {
      intervalId = setInterval(() => {
          slideIndex = (slideIndex + 1) % slides.length;
          showSlides();
      }, 5000); // Change slide every 5 seconds
  }

  startInterval();

  window.plusSlides = function(n) {
      clearInterval(intervalId); // Clear interval before changing slide
      slideIndex = (slideIndex + n) % slides.length;
      showSlides();
      startInterval(); // Restart interval after changing slide
  };


  /* Functions related to sliding */
  function isPastCenter(element) {
    const rect = element.getBoundingClientRect();
    const centerY = window.innerHeight * 2 / 3;
    console.log(rect.top, centerY)
    // return rect.top < centerY
    return rect.top < centerY
  }

  function handleScroll(elementId) {
    const elem = document.getElementById(elementId);
    console.log(isPastCenter(elem))
    if (isPastCenter(elem)) {
      elem.classList.add('active');
      window.removeEventListener('scroll', handleScroll); // Remove the event listener once animation is triggered
    }
  }

  const hardwoodBackground = 'working-with-us'

  window.addEventListener('scroll', () => handleScroll(hardwoodBackground));

  // Trigger the initial check in case the element is already in the center on page load
  // handleScroll(hardwoodBackground);

});