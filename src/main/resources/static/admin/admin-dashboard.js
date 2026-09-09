// ================= BOOKINGS =================

async function loadBookings() {

    const table =
        document.getElementById("bookingTable");

    try {

        const response =
            await fetch("/api/bookings");

        if (!response.ok) {
            throw new Error("Failed to load bookings");
        }

        const bookings =
            await response.json();


        document.getElementById("bookingCount")
            .textContent = bookings.length;


        if (bookings.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="8" class="empty-message">
                        No bookings yet.
                    </td>
                </tr>
            `;

            return;
        }


        table.innerHTML = "";


        bookings.forEach(booking => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${booking.id}</td>

                <td>${booking.name}</td>

                <td>${booking.phone}</td>

                <td>${booking.email}</td>

                <td>${booking.eventType}</td>

                <td>${booking.eventDate}</td>

                <td>${booking.location}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteBooking(${booking.id})">

                        Delete

                    </button>

                </td>
            `;

            table.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="8" class="empty-message">
                    Unable to load bookings.
                </td>
            </tr>
        `;
    }
}


// ================= DELETE BOOKING =================

async function deleteBooking(id) {

    if (!confirm("Delete this booking?")) {
        return;
    }

    try {

        const response =
            await fetch(`/api/bookings/${id}`, {
                method: "DELETE"
            });


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        await loadBookings();

    } catch (error) {

        console.error(error);

        alert("Unable to delete booking.");
    }
}


// ================= CONTACTS =================

async function loadContacts() {

    const table =
        document.getElementById("contactTable");

    try {

        const response =
            await fetch("/api/contacts");

        if (!response.ok) {
            throw new Error("Failed to load contacts");
        }

        const contacts =
            await response.json();


        document.getElementById("contactCount")
            .textContent = contacts.length;


        if (contacts.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-message">
                        No messages yet.
                    </td>
                </tr>
            `;

            return;
        }


        table.innerHTML = "";


        contacts.forEach(contact => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${contact.id}</td>

                <td>${contact.name}</td>

                <td>${contact.email}</td>

                <td>${contact.phone || "-"}</td>

                <td>${contact.subject}</td>

                <td>${contact.message}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteContact(${contact.id})">

                        Delete

                    </button>

                </td>
            `;

            table.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty-message">
                    Unable to load messages.
                </td>
            </tr>
        `;
    }
}


// ================= DELETE CONTACT =================

async function deleteContact(id) {

    if (!confirm("Delete this message?")) {
        return;
    }

    try {

        const response =
            await fetch(`/api/contacts/${id}`, {
                method: "DELETE"
            });


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        await loadContacts();

    } catch (error) {

        console.error(error);

        alert("Unable to delete message.");
    }
}


// ================= LOAD GALLERY =================

async function loadGallery() {

    const container =
        document.getElementById("galleryAdmin");

    try {

        const response =
            await fetch("/api/gallery");

        if (!response.ok) {
            throw new Error("Failed to load gallery");
        }

        const gallery =
            await response.json();


        document.getElementById("galleryCount")
            .textContent = gallery.length;


        if (gallery.length === 0) {

            container.innerHTML = `
                <p class="empty-message">
                    No gallery photos yet.
                </p>
            `;

            return;
        }


        container.innerHTML = "";


        gallery.forEach(item => {

            const card =
                document.createElement("div");

            card.className =
                "gallery-admin-card";


            card.innerHTML = `

                <img
                    src="${item.imageUrl}"
                    alt="${item.title}"
                >

                <div class="gallery-info">

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.category}
                    </p>

                    <button
                        class="edit-btn"
                        onclick="editGallery(
                            ${item.id},
                            '${escapeValue(item.title)}',
                            '${escapeValue(item.category)}',
                            '${escapeValue(item.imageUrl)}'
                        )">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteGallery(${item.id})">

                        Delete

                    </button>

                </div>
            `;


            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="empty-message">
                Unable to load gallery.
            </p>
        `;
    }
}


// ================= ESCAPE VALUE =================

function escapeValue(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


// ================= GALLERY MODAL =================

let editingGalleryId = null;


function openGalleryModal() {

    editingGalleryId = null;


    document.getElementById("modalTitle")
        .textContent = "Add Gallery Photo";


    document.getElementById("galleryForm")
        .reset();


    document.getElementById("galleryFormResult")
        .textContent = "";


    document
        .getElementById("galleryModal")
        .classList.add("active");
}


function closeGalleryModal() {

    document
        .getElementById("galleryModal")
        .classList.remove("active");

}


// ================= EDIT GALLERY =================

function editGallery(
    id,
    title,
    category,
    imageUrl
) {

    editingGalleryId = id;


    document.getElementById("modalTitle")
        .textContent = "Edit Gallery Photo";


    document.getElementById("galleryTitle")
        .value = title;


    document.getElementById("galleryCategory")
        .value = category;


    document.getElementById("galleryImageUrl")
        .value = imageUrl;


    document.getElementById("galleryFormResult")
        .textContent = "";


    document
        .getElementById("galleryModal")
        .classList.add("active");
}


// ================= SAVE GALLERY =================

document
    .getElementById("galleryForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();


        const result =
            document.getElementById("galleryFormResult");


        const galleryData = {

            title:
                document
                    .getElementById("galleryTitle")
                    .value
                    .trim(),

            category:
                document
                    .getElementById("galleryCategory")
                    .value,

            imageUrl:
                document
                    .getElementById("galleryImageUrl")
                    .value
                    .trim()
        };


        result.textContent =
            "Saving...";


        try {

            let response;


            // EDIT
            if (editingGalleryId !== null) {

                response = await fetch(
                    `/api/gallery/${editingGalleryId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(galleryData)
                    }
                );

            }

            // ADD
            else {

                response = await fetch(
                    "/api/gallery",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(galleryData)
                    }
                );

            }


            if (!response.ok) {

                throw new Error(
                    "Gallery save failed"
                );

            }


            result.textContent =
                "Saved successfully!";


            setTimeout(() => {

                closeGalleryModal();

                loadGallery();

            }, 500);


        } catch (error) {

            console.error(error);

            result.textContent =
                "Unable to save photo.";
        }

    });


// ================= DELETE GALLERY =================

async function deleteGallery(id) {

    if (!confirm("Delete this gallery photo?")) {
        return;
    }


    try {

        const response =
            await fetch(`/api/gallery/${id}`, {
                method: "DELETE"
            });


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        await loadGallery();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete gallery photo."
        );
    }
}


// ================= CLOSE MODAL ON OUTSIDE CLICK =================

document
    .getElementById("galleryModal")
    .addEventListener("click", (event) => {

        if (
            event.target.id === "galleryModal"
        ) {

            closeGalleryModal();

        }

    });


// ================= LOGOUT =================

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        window.location.href =
            "/admin/index.html";

    });


// ================= START =================

loadBookings();

loadContacts();

loadGallery();