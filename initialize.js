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
    const newElement = document.getElementsByClassName('tab-content active')[0]
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
      const activeElement = document.getElementsByClassName('tab-content active')[0]
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

  //cookie code:
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const rejectCookiesBtn = document.getElementById("rejectCookies");

  const acceptedCookies = localStorage.getItem("acceptedCookies");

  if (acceptedCookies === 'true') {
    loadGoogleAnalytics()
  }

  window.addEventListener("scroll", function () {
    const acceptedCookies = localStorage.getItem("acceptedCookies");

    if (acceptedCookies === null) {
      if (window.scrollY > 100) {
        cookieConsent.classList.add("show");
        cookieConsent.style.display = "flex";
      } else {
        cookieConsent.classList.remove("show");
        cookieConsent.style.display = "none";
      }
    }
  });

  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("acceptedCookies", "true");
    cookieConsent.style.display = "none";
    loadGoogleAnalytics();
  });
  rejectCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("acceptedCookies", "false");
    cookieConsent.style.display = "none";
  });

});

function loadGoogleAnalytics() {
  const head = document.getElementsByTagName('head')[0]

  const script1 = document.createElement('script')
  script1.setAttribute('async', '')
  script1.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-JQ0E23XRRE')

  const script2 = document.createElement('script')
  
  script2.innerText = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-JQ0E23XRRE');
  `

  head.appendChild(script1)
  head.appendChild(script2)

}
