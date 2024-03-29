document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const navbarLinks = document.querySelectorAll(".nav a");

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            console.log("Mobile")
            return (
                rect.bottom >= 0 &&
                rect.top + 1450<= windowHeight
            );
        } else {
            if (window.innerWidth < 1290) {
                console.log("Desktop < 1290px")
                return (
                    rect.bottom >= 0 &&
                    rect.top + 450 <= windowHeight
                );
            } else {
                console.log("Desktop >= 1290px")
                return (
                    rect.bottom >= 0 &&
                    rect.top + 600 <= windowHeight
                );
            }
        }
    }

    function updateNavbar() {
        sections.forEach((section, index) => {
            if (isElementInViewport(section)) {
                navbarLinks.forEach(link => link.classList.remove("active"));
                navbarLinks[index].classList.add("active");
            }
        });
    }
    updateNavbar();
    document.addEventListener("scroll", updateNavbar);
    
    
    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            navbarLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
            
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                console.log("Scrolling to:", targetId, "OffsetTop:", targetElement.offsetTop);

                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.nav').offsetHeight + 60,
                    behavior: "smooth"
                });
            } else {
                console.error("Target element not found:", targetId);
            }
        });
    });
});



let lenis;
if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}
$("[data-lenis-start]").on("click", function () {
    lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
    lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
    } else {
        lenis.start();
    }
});