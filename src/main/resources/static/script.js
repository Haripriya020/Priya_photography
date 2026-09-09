// ================= NAVBAR =================

const navbar = document.getElementById("navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("mobile-open");
    });
}

document.querySelectorAll(".navbar nav a").forEach(link => {
    link.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("mobile-open");
        }
    });
});


// ================= SCROLL ANIMATION =================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    observer.observe(element);
});


// ================= LOAD GALLERY =================

async function loadGallery() {

    const galleryContainer =
        document.getElementById("galleryContainer");

    if (!galleryContainer) {
        return;
    }

    try {

        const response = await fetch("/api/gallery");

        if (!response.ok) {
            throw new Error("Gallery loading failed");
        }

        const gallery = await response.json();

        if (gallery.length === 0) {

            galleryContainer.innerHTML = `
                <p class="empty-gallery">
                    No gallery photos available.
                </p>
            `;

            return;
        }

        galleryContainer.innerHTML = "";

        gallery.forEach(item => {

            const galleryItem =
                document.createElement("div");

            galleryItem.className =
                "gallery-item reveal";

            galleryItem.innerHTML = `
                <img 
                    src="${item.imageUrl}" 
                    alt="${item.title}"
                    loading="lazy"
                >

                <div class="gallery-overlay">

                    <span>${item.category}</span>

                    <h3>${item.title}</h3>

                </div>
            `;

            galleryContainer.appendChild(galleryItem);
        });

        // Apply reveal animation to newly created gallery items
        galleryContainer
            .querySelectorAll(".reveal")
            .forEach(element => {
                observer.observe(element);
            });

    } catch (error) {

        console.error("Gallery Error:", error);

        galleryContainer.innerHTML = `
            <p class="empty-gallery">
                Unable to load gallery.
            </p>
        `;
    }
}


// ================= BOOKING =================

const bookingForm =
    document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const result =
            document.getElementById("bookingResult");


        const bookingData = {

            name:
                document.getElementById("bookingName").value.trim(),

            phone:
                document.getElementById("bookingPhone").value.trim(),

            email:
                document.getElementById("bookingEmail").value.trim(),

            eventType:
                document.getElementById("eventType").value,

            eventDate:
                document.getElementById("eventDate").value,

            location:
                document.getElementById("bookingLocation").value.trim(),

            message:
                document.getElementById("bookingMessage").value.trim()
        };


        if (result) {
            result.textContent =
                "Sending booking request...";
        }


        try {

            const response = await fetch(
                "/api/bookings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(bookingData)
                }
            );


            if (!response.ok) {
                throw new Error("Booking failed");
            }


            const data = await response.json();


            if (result) {
                result.textContent =
    "Thank you! Your booking request has been submitted successfully. We will contact you soon.";
            }


            bookingForm.reset();


        } catch (error) {

            console.error("Booking Error:", error);

            if (result) {
                result.textContent =
                    "Unable to submit booking. Please try again.";
            }
        }

    });
}


// ================= CONTACT =================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const result =
            document.getElementById("contactResult");


        const contactData = {

            name:
                document.getElementById("contactName").value.trim(),

            email:
                document.getElementById("contactEmail").value.trim(),

            phone:
                document.getElementById("contactPhone").value.trim(),

            subject:
                document.getElementById("contactSubject").value.trim(),

            message:
                document.getElementById("contactMessage").value.trim()
        };


        if (result) {
            result.textContent =
                "Sending message...";
        }


        try {

            const response = await fetch(
                "/api/contacts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(contactData)
                }
            );


            if (!response.ok) {
                throw new Error("Contact submission failed");
            }


            await response.json();


            if (result) {
                result.textContent =
                    "Message sent successfully!";
            }


            contactForm.reset();


        } catch (error) {

            console.error("Contact Error:", error);

            if (result) {
                result.textContent =
                    "Unable to send message. Please try again.";
            }
        }

    });
}


// ================= START APPLICATION =================

loadGallery();