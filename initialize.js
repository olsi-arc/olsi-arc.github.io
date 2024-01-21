document.addEventListener('DOMContentLoaded', function () {
  // Initialize tabs

  const tabs = M.Tabs.init(document.querySelector('.tabs'));

  function getTabFromHash() {
    let tabId = window.location.hash;
    if (tabId.startsWith('#') && tabId.endsWith('-tab')) {
      return tabId.slice(1)
    } else {
      return null
    }
  }
  window.setTab = tabId => {
    tabs.select(tabId)
  }

  let tabId = getTabFromHash()
  if (tabId) {
    tabs.select(tabId)
  } else {
    // if no tab selected, make sure the home tab is visible (without actually scrolling to it)
    document.getElementById('home-tab').style['display'] = 'block'
  }

  // initialize selects
  let selectObject = M.FormSelect.init(document.querySelectorAll('select'));
  window.jumpToContactAnchor = function () {
    const targetElement = document.getElementById('contact-section');
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  window.setContactType = type => {
    setTab('contact-tab')
    const selectElement = document.getElementById('contact-select')
    const optionIndex = Array.from(selectElement.options).findIndex(option => option.value === type);
    const options = selectElement.querySelectorAll('option')
    options.forEach(option => { option.selected = false })
    options[optionIndex].selected = true
    selectObject = M.FormSelect.init(selectElement)
  }

  // Image Slideshow
  var slides = document.querySelectorAll('.mySlides');
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

  window.plusSlides = function (n) {
    clearInterval(intervalId); // Clear interval before changing slide
    slideIndex = (slideIndex + n) % slides.length;
    if (slideIndex < 0) {
      slideIndex = slides.length - 1
    }
    showSlides();
    startInterval(); // Restart interval after changing slide
  };


  /* Functions related to sliding */
  function isPastCenter(element) {
    const rect = element.getBoundingClientRect();
    const centerY = window.innerHeight * 2 / 3;
    // return rect.top < centerY
    return rect.top < centerY
  }

  function handleScroll(elementId) {
    const elem = document.getElementById(elementId);
    if (isPastCenter(elem)) {
      elem.classList.add('active');
      window.removeEventListener('scroll', handleScroll); // Remove the event listener once animation is triggered
    }
  }

  const hardwoodBackground = 'working-with-us'

  window.addEventListener('scroll', () => handleScroll(hardwoodBackground));

});