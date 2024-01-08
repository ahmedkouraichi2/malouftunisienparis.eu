(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);



// let's select all required tags or elements
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');


const ulTag = document.querySelector("ul");
AllLessons.innerHTML = `${allVideos.length} Lessons`


let musicIndex = 1;
window.addEventListener('load',()=>{
   loadMusic(musicIndex);
   playingNow();
})
function playMusic(){
   mainVideo.play();
   playlist.classList.add('active')
}
function loadMusic(indexNumb){
   mainVideo.src = `${allVideos[indexNumb - 1].src}.mp4`;
   videoTitle.innerHTML = `${indexNumb}. ${allVideos[indexNumb - 1].name}`
   
}

for(let i = 0; i < allVideos.length; i++){
   let liTag = `<li li-index="${i + 1}">
      <div class="row">
         <span>${i + 1}. ${allVideos[i].name}</span>
      </div>
      <video class="${allVideos[i].id}" src="${allVideos[i].src}.mp4" style="display: none;" title="${allVideos[i].name}"></video>
      <span id="${allVideos[i].id}" class="duration"></span>
   </li>`;
   playlist.insertAdjacentHTML('beforeend',liTag); 

   let liVideoDuration = ulTag.querySelector(`#${allVideos[i].id}`)
   let liVideoTag = ulTag.querySelector(`.${allVideos[i].id}`);
   

   liVideoTag.addEventListener("loadeddata", ()=>{
      let videoDuration = liVideoTag.duration;
      let totalMin = Math.floor(videoDuration / 60);
      let totalSec = Math.floor(videoDuration % 60);
      // if totalSec is less then 10 then add 0 at the beginging
      totalSec < 10 ? totalSec = "0"+ totalSec : totalSec
      liVideoDuration.innerText = `${totalMin}:${totalSec}`;
      // adding t duration attribe which we'll use below
      liVideoDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
   })  
}
// let's work on play particular song on click
const allLiTags = playlist.querySelectorAll('li');
function playingNow(){
   for(let j = 0; j<allVideos.length; j++){
      if(allLiTags[j].classList.contains('playing')){
         allLiTags[j].classList.remove("playing")
      }
      if(allLiTags[j].getAttribute('li-index')==musicIndex){
         allLiTags[j].classList.add('playing')
      }
      // adding onclick attribute in all li tags
      allLiTags[j].setAttribute("onclick", "clicked(this)")
   }
}

function clicked(element){
   // getting li index of particular clicked li tag
   let getIndex = element.getAttribute("li-index");
   musicIndex = getIndex;
   loadMusic(musicIndex);
   playMusic();
   playingNow();
}

