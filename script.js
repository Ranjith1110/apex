// Counter Animation
const counters = document.querySelectorAll(".stat-value");
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace(/\D/g, "");
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment + (counter.innerText.includes("%") ? "%" : "+");
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes("%") ? "%" : "+");
            }
        };
        updateCount();
    });
};


// Image viewer
const galleryGroups = document.querySelectorAll(".impact-gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector("#lightbox .close");
const prevBtn = document.querySelector("#lightbox .prev");
const nextBtn = document.querySelector("#lightbox .next");

let currentGroup = [];
let currentIndex = 0;

// Open lightbox with images from one card
galleryGroups.forEach(gallery => {
    const imgs = gallery.querySelectorAll("img");
    imgs.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentGroup = Array.from(imgs).map(i => i.src);
            currentIndex = index;
            showImage();
            lightbox.style.display = "flex";
        });
    });
});

function showImage() {
    lightboxImg.src = currentGroup[currentIndex];
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    showImage();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    showImage();
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Close when clicking outside image
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Keyboard navigation
document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeBtn.click();
    }
});

// Counter Animation for Impact Section
const impactCounters = document.querySelectorAll(".impact-metrics .stat-value");

const animateImpactCounters = () => {
    impactCounters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace(/\D/g, "");
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment + (counter.innerText.includes("%") ? "%" : counter.innerText.includes("X") ? "X" : "");
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes("%") ? "%" : counter.innerText.includes("X") ? "X" : "");
            }
        };
        updateCount();
    });
};

const impactObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateImpactCounters();
            impactObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

impactObserver.observe(document.querySelector(".impact-metrics"));

// Universal Counter Animation
const initCounters = (selector) => {
    const counters = document.querySelectorAll(`${selector} .stat-value`);
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText.replace(/\D/g, "");
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    // Preserve suffixes like %, +, X
                    let suffix = "";
                    if (counter.innerText.includes("%")) suffix = "%";
                    else if (counter.innerText.includes("+")) suffix = "+";
                    else if (counter.innerText.includes("X")) suffix = "X";

                    counter.innerText = count + increment + suffix;
                    setTimeout(updateCount, 20);
                } else {
                    let suffix = "";
                    if (counter.innerText.includes("%")) suffix = "%";
                    else if (counter.innerText.includes("+")) suffix = "+";
                    else if (counter.innerText.includes("X")) suffix = "X";

                    counter.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Observe section visibility
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // run only once per section
            }
        });
    }, { threshold: 0.5 });

    const section = document.querySelector(selector);
    if (section) observer.observe(section);
};

// Init counters for different sections
initCounters(".stats");
initCounters(".impact-metrics");
initCounters(".metrics-row");