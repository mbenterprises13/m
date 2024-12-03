document.addEventListener('DOMContentLoaded', function() {
    const serviceTitles = document.querySelectorAll('.service-title');

    serviceTitles.forEach(title => {
        title.addEventListener('click', () => {
            const serviceDescription = title.nextElementSibling;
            serviceDescription.classList.toggle('show');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                const sectionId = href.substring(1); 
                const section = document.getElementById(sectionId);

                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
