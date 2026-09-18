const slides=[...document.querySelectorAll(".slide")];
const previousButton=document.querySelector(".prev-btn");
const nextButton=document.querySelector(".next-btn");
const thumbnailContainer=document.querySelector(".thumbnail-container");
const indicators=document.querySelector(".slide-indicators");
const filterButtons=document.querySelectorAll(".filter");
const currentCount=document.querySelector("#current-count");
const totalCount=document.querySelector("#total-count");
let visibleSlides=[...slides];
let currentSlide=0;
let timer;

function pad(value){return String(value).padStart(2,"0")}

function buildControls(){
  slides.forEach((slide,index)=>{
    const indicator=document.createElement("button");
    indicator.type="button";
    indicator.className="slide-indicator";
    indicator.setAttribute("aria-label",`Show image ${index+1}`);
    indicator.addEventListener("click",()=>{showSlide(visibleSlides.indexOf(slide));restart()});
    indicators.appendChild(indicator);

    const thumbnail=document.createElement("button");
    thumbnail.type="button";
    thumbnail.className="thumbnail";
    thumbnail.setAttribute("aria-label",`Show image ${index+1}`);
    thumbnail.innerHTML=`<img src="${slide.getAttribute("src")}" alt="${slide.alt}">`;
    thumbnail.addEventListener("click",()=>{showSlide(visibleSlides.indexOf(slide));restart()});
    thumbnailContainer.appendChild(thumbnail);
  });
}

function showSlide(index){
  if(!visibleSlides.length)return;
  currentSlide=(index+visibleSlides.length)%visibleSlides.length;
  const active=visibleSlides[currentSlide];
  slides.forEach(slide=>slide.classList.toggle("active",slide===active));

  document.querySelectorAll(".thumbnail").forEach((item,index)=>{
    const slide=slides[index];
    item.style.display=visibleSlides.includes(slide)?"block":"none";
    item.classList.toggle("active",slide===active);
    item.setAttribute("aria-current",slide===active?"true":"false");
  });

  document.querySelectorAll(".slide-indicator").forEach((item,index)=>{
    const slide=slides[index];
    item.style.display=visibleSlides.includes(slide)?"block":"none";
    item.classList.toggle("active",slide===active);
  });

  currentCount.textContent=pad(currentSlide+1);
  totalCount.textContent=pad(visibleSlides.length);
}

function restart(){
  clearInterval(timer);
  timer=setInterval(()=>showSlide(currentSlide+1),5000);
}

previousButton.addEventListener("click",()=>{showSlide(currentSlide-1);restart()});
nextButton.addEventListener("click",()=>{showSlide(currentSlide+1);restart()});

filterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    const filter=button.dataset.filter;
    visibleSlides=filter==="all"?[...slides]:slides.filter(slide=>slide.dataset.category===filter);
    currentSlide=0;
    filterButtons.forEach(item=>item.classList.toggle("active-filter",item===button));
    showSlide(0);
    restart();
  });
});

buildControls();
showSlide(0);
restart();