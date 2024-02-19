$(document).ready(function () {

  var tabs = M.Tabs.init(document.querySelector('.tabs'));

  // Initialize tabs

  $('.tabs').tabs();

  window.setTab = (tabId, addActiveTabToHistory = false) => {
    //add active tab to history
    const activeElement = document.getElementsByClassName('tab-content active')[0]
    const state = { tabName: activeElement.id }
    window.history.pushState(state, null, `#${activeElement.id}`)
    tabs.select(tabId)
  }

  // initialize selects
  let selectObject = M.FormSelect.init(document.querySelectorAll('select'));
  window.jumpToContent = function () {
    const targetElement = document.getElementsByClassName('tab-content active')[0];
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  window.setContactType = type => {
    setTab('contact-tab', true)
    const selectElement = document.getElementById('contact-select')
    const optionIndex = Array.from(selectElement.options).findIndex(option => option.value === type);
    const options = selectElement.querySelectorAll('option')
    options.forEach(option => { option.selected = false })
    options[optionIndex].selected = true
    selectObject = M.FormSelect.init(selectElement)
  }

  window.addEventListener('popstate', function (event) {
    var poppedState = event.state;
    if (poppedState !== null) {
      tabs.select(poppedState.tabName)
    }
  });

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
    return rect.top < centerY
  }

  function handleScrollDescription(elementId) {
    const elem = document.getElementById(elementId);
    if (isPastCenter(elem)) {
      elem.classList.add('active');
      window.removeEventListener('scroll', handleScrollDescription); // Remove the event listener once animation is triggered
    }
  }

  const hardwoodBackground = 'working-with-us'

  window.addEventListener('scroll', () => handleScrollDescription(hardwoodBackground));


  function highlightWorkType() {
    // decide which element contains the trigger point

    // algo: look at all elements that are above trigger, and select the last one. remove all actives, then set the selected one to active

    // recall: 0 is the top of the window

    // NOTE: the active tag only has style defined for mobile devices, so this code is ignored for non-mobile

    const elements = document.querySelectorAll('.work-type-container > .tile > .box')

    const triggerY = 0 + window.innerHeight * 1 / 2;

    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i]
      const rect = elem.getBoundingClientRect()
      // there is only one box for which the following is true:
      if (rect.top < triggerY && triggerY < rect.bottom) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
    }

  }

  window.addEventListener('scroll', highlightWorkType);

});