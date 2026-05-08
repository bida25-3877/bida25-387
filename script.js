const form = document.getElementById("bookingForm");
const message = document.getElementById("formMessage");
const totalDisplay = document.getElementById("totalDisplay");

const reviewPopup = document.getElementById("reviewPopup");
const popupForm = document.getElementById("popupReviewForm");

const container = document.getElementById("reviewsContainer");

const addonPrices = {
    "French Tip": 10,
    "Ombre": 20,
    "Charms": 2,
    "Cat Eye": 30,
    "Blooming Gel": 10,
    "Flower Design": 5,
    "Air Brush": 5,
    "Nail Art": 2
};

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function calculateTotal() {

    const serviceValue = form.querySelector("[name='service']").value;
    const addons = [];

    document.querySelectorAll("input[name='addons']:checked").forEach(el => {
        addons.push(el.value);
    });

    let total = 0;

    if (serviceValue) {
        const parts = serviceValue.split("|");
        total += Number(parts[1]);
    }

    addons.forEach(addon => {
        total += addonPrices[addon] || 0;
    });

    totalDisplay.textContent = `Total: P${total}`;

    return total;
}

form.querySelector("[name='service']").addEventListener("change", calculateTotal);

document.querySelectorAll("input[name='addons']").forEach(el => {
    el.addEventListener("change", calculateTotal);
});

form.addEventListener("submit", function (e) {

    const name = form.querySelector("[name='name']").value;
    const email = form.querySelector("[name='email']").value;
    const phone = form.querySelector("[name='phone']").value;
    const serviceValue = form.querySelector("[name='service']").value;
    const date = form.querySelector("[name='date']").value;
    const time = form.querySelector("[name='time']").value;

    if (!name || !email || !phone || !serviceValue || !date || !time) {
        e.preventDefault();
        message.style.display = "block";
        message.style.color = "red";
        message.textContent = "Please fill in all required fields ❗";
        return;
    }

    const total = calculateTotal();

    message.style.display = "block";
    message.style.color = "green";
    message.textContent = `Booking submitted 💅 Total: P${total}`;

    setTimeout(() => {
        reviewPopup.classList.add("active");
    }, 600);
});


popupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const rating = popupForm.rating.value;
    const comment = popupForm.comment.value;

    if (!rating || !comment) {
        alert("Please give a rating and comment 💅");
        return;
    }

    reviews.push({
        name: "Customer",
        rating,
        comment
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    popupForm.reset();

    reviewPopup.classList.remove("active");

    setTimeout(() => {
        alert("Thanks for your review 💅");
    }, 200);
	function displayReviews() {
    container.innerHTML = "";

    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet.</p>";
        return;
    }

    reviews.forEach(r => {
        container.innerHTML += `
            <div class="review-card">
                <h4>${r.name}</h4>
                <p>${"⭐".repeat(r.rating)}</p>
                <p>${r.comment}</p>
                <hr>
            </div>
        `;
    });
}

});