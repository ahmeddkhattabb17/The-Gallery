const slides = [...document.querySelectorAll(".slide")];
const previousButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const thumbnailContainer = document.querySelector(".thumbnail-container");
const indicators = document.querySelector(".slide-indicators");
const filterButtons = document.querySelectorAll("[data-filter]");
let visibleSlides = slides;
let currentSlide = 0;
let slideshowTimer;

function showSlide(index) {
  if (!visibleSlides.length) return;
  currentSlide = (index + visibleSlides.length) % visibleSlides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slide === visibleSlides[currentSlide]);
    slide.style.display =
      slide === visibleSlides[currentSlide] ? "block" : "none";
  });

  document
    .querySelectorAll(".thumbnail")
    .forEach((thumbnail, thumbnailIndex) => {
      const isVisible = visibleSlides.includes(slides[thumbnailIndex]);
      const isActive = slides[thumbnailIndex] === visibleSlides[currentSlide];
      thumbnail.style.display = isVisible ? "block" : "none";
      thumbnail.classList.toggle("active", isActive);
      thumbnail.setAttribute("aria-current", isActive ? "true" : "false");
    });

  document
    .querySelectorAll(".slide-indicator")
    .forEach((indicator, indicatorIndex) => {
      const isVisible = visibleSlides.includes(slides[indicatorIndex]);
      const isActive = slides[indicatorIndex] === visibleSlides[currentSlide];
      indicator.style.display = isVisible ? "block" : "none";
      indicator.classList.toggle("active", isActive);
      indicator.setAttribute("aria-current", isActive ? "true" : "false");
    });
}

function resetSlideshowTimer() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

slides.forEach((slide, slideIndex) => {
  const indicator = document.createElement("button");
  indicator.type = "button";
  indicator.className = "slide-indicator";
  indicator.setAttribute("aria-label", `Show image ${slideIndex + 1}`);
  indicator.addEventListener("click", () => {
    showSlide(visibleSlides.indexOf(slide));
    resetSlideshowTimer();
  });
  indicators.appendChild(indicator);

  const thumbnail = document.createElement("button");
  thumbnail.type = "button";
  thumbnail.className = "thumbnail";
  thumbnail.setAttribute("aria-label", `Show thumbnail ${slideIndex + 1}`);
  thumbnail.innerHTML = `<img src="${slide.src}" alt="${slide.alt}">`;
  thumbnail.addEventListener("click", () => {
    showSlide(visibleSlides.indexOf(slide));
    resetSlideshowTimer();
  });
  thumbnailContainer.appendChild(thumbnail);
});

previousButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  resetSlideshowTimer();
});

nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  resetSlideshowTimer();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    visibleSlides =
      filter === "all"
        ? slides
        : slides.filter((slide) => slide.dataset.category === filter);
    currentSlide = 0;
    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("active-filter", filterButton === button);
    });
    showSlide(0);
    resetSlideshowTimer();
  });
});

showSlide(0);
resetSlideshowTimer();
