const prevBtn = document.querySelector(".left-btn");
const nextBtn = document.querySelector(".right-btn");
const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".caraousel-ul");
const nav = document.querySelector(".nav-buttons");
const navBtn = document.querySelectorAll(".nav");

//laying out all the slides
const width = slides[0].getBoundingClientRect().width;
slides.forEach((slide, index) => {
  slide.style.left = index * width + "px";
});
//function for moving slides=========================
const moveSlide = (track, targetSlide, activeSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  activeSlide.classList.remove("active-slide");
  targetSlide.classList.add("active-slide");
};
//function for limiting the slides
const limit = (nextSlide) => {
  const indexOfSlide = Array.from(slides).findIndex(
    (slide) => slide === nextSlide
  );
  if (indexOfSlide === 0) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else if (indexOfSlide === slides.length - 1) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }
  console.log(indexOfSlide);
};
//clicking right btn==========================
nextBtn.addEventListener("click", () => {
  const activeSlide = track.querySelector(".active-slide");
  const nextSlide = activeSlide.nextElementSibling;
  moveSlide(track, nextSlide, activeSlide);
  //moving dots when button pressed
  const activeBtn = nav.querySelector(".active-slide-btn");
  const targetBtn = activeBtn.nextElementSibling;
  activeBtn.classList.remove("active-slide-btn");
  targetBtn.classList.add("active-slide-btn");
  //limit
  limit(nextSlide);
});
//clicking left btn====================================
prevBtn.addEventListener("click", () => {
  const activeSlide = track.querySelector(".active-slide");
  const prevSlide = activeSlide.previousElementSibling;
  moveSlide(track, prevSlide, activeSlide);
  //moving dots when button pressed
  const activeBtn = nav.querySelector(".active-slide-btn");
  const targetBtn = activeBtn.previousElementSibling;
  activeBtn.classList.remove("active-slide-btn");
  targetBtn.classList.add("active-slide-btn");
  //limit
  limit(prevSlide);
});
//nav buttons==================================
navBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const activeSlide = track.querySelector(".active-slide");
    const activeBtn = nav.querySelector(".active-slide-btn");
    const targetBtn = e.target;
    //finding index of the dot clicked
    const indexOfTargetBtn = Array.from(navBtn).findIndex(
      (btn) => btn === targetBtn
    );
    const nextSlide = slides[indexOfTargetBtn];
    moveSlide(track, nextSlide, activeSlide);
    activeBtn.classList.remove("active-slide-btn");
    targetBtn.classList.add("active-slide-btn");
    //limit
    limit(nextSlide);
  });
});
