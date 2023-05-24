
const hamburger = document.getElementById('menu');
const menu = document.getElementById('container-navigation')

const toggleMenu = () => {
    menu.classList.toggle('active-menu');
    hamburger.classList.toggle('active-humb')
}
  
hamburger.addEventListener('click', e => {
    e.stopPropagation();
  
    toggleMenu();
});
  
document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('active-menu');
    
    if (!its_menu && !its_hamburger && menu_is_active) {
      toggleMenu();
    }
})


// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });



// const accordionTitles = document.querySelectorAll(".accordionTitle");

// accordionTitles.forEach((accordionTitle) => {
//   accordionTitle.addEventListener("click", () => {
//     if (accordionTitle.classList.contains("is-open")) {
//       accordionTitle.classList.remove("is-open");
//     } else {
//       const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
//       accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
//         accordionTitleWithIsOpen.classList.remove("is-open");
//       });
//       accordionTitle.classList.add("is-open");
//     }
//   });
// });

// const swiper = new Swiper(".mySwiper", {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });



// Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


// const tabs = document.querySelector(".wrapper");
// const tabButton = document.querySelectorAll(".tab-button");
// const contents = document.querySelectorAll(".content");

// tabs.onclick = e => {
//   const id = e.target.dataset.id;
//   if (id) {
//     tabButton.forEach(btn => {
//       btn.classList.remove("active");
//     });
//     e.target.classList.add("active");

//     contents.forEach(content => {
//       content.classList.remove("active");
//     });
//     const element = document.getElementById(id);
//     element.classList.add("active");
//   }
// }



const element = document.getElementById('selector');
const maskOptions = {
  mask: '+{380}(00)000-00-00'
};
const imask = IMask(element, maskOptions)

