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
    console.log('w')
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('active-menu');
    
    if (!its_menu && !its_hamburger && menu_is_active) {
      toggleMenu();
    }
})

// menu.addEventListener('click', openMenu)


// function openMenu(e){
//     e.preventDefault()
//     navCont.classList.toggle('active-menu');
//     menu.classList.toggle('active-humb');
//     if(e.target)
    
// }