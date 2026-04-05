const navBurger = document.getElementById('navBurger');
const navMobileMenu = document.getElementById('navMobileMenu');
 
if (navBurger && navMobileMenu) {
  navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navMobileMenu.classList.toggle('open');
  });
}