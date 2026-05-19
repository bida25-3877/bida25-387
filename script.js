const form = document.getElementById("bookingForm");
const message = document.getElementById("formMessage");
const totalDisplay = document.getElementById("totalDisplay");

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

function calculateTotal() {
    if (!form) return 0;
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

    if (totalDisplay) {
        totalDisplay.textContent = `Total: P${total}`;
    }

    return total;
}

if (form) {
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
        message.style.color = "black";
        message.textContent = `Booking submitted successfully! Total: P${total} 💅`;

    });
}