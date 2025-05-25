let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    highlightActiveLinkOnScroll();
};

function highlightActiveLinkOnScroll() {
    let sections = document.querySelectorAll('section');
    let scrollY = window.pageYOffset;
    let headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 70; // Default header height

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - headerHeight - 60; 
        let sectionId = current.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.navbar a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
    if (sections.length > 0 && scrollY < sections[0].offsetTop - headerHeight - 60) {
        document.querySelectorAll('.navbar a').forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.navbar a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}


document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
        document.querySelectorAll('header nav a').forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');

       
    });
});

const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                   
                    const delay = entry.target.dataset.animationDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 }); 

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }
});