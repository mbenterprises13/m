function toggleNav() {
    var navLinks = document.querySelectorAll(".nav-links");
    navLinks.forEach(function(link) {
        link.classList.toggle("show");
    });
    var navMenu = document.querySelector(".nav-menu");
    navMenu.style.display = "none";
}