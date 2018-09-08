let slideBefore = document.querySelector(".cat-slider__slide--before");
let slideAfter = document.querySelector(".cat-slider__slide--after");
let sliderControl = document.querySelector(".cat-slider__control");

function moveSlider () {
    var slideAfterWidth = slideAfter.offsetWidth;
    var slideBeforeWidth = slideBefore.offsetWidth;
    var value = sliderControl.value;
    var sliderAfterValue = (value / 100) * slideAfterWidth;
    var sliderBeforeValue = (value / 100) * slideBeforeWidth;
    var slideAfterClip = 'rect(0,' + sliderAfterValue + 'px,auto,auto)';
    var slideBeforeClip = 'rect(0,auto,auto,' + sliderBeforeValue + 'px)';
    console.log(slideBeforeClip);
    slideAfter.style.clip = slideAfterClip;
    slideBefore.style.clip = slideBeforeClip;
}

sliderControl.addEventListener('input', function () {
    moveSlider();
});

