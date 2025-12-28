document.addEventListener("DOMContentLoaded", function () {
    const platformSelect = document.getElementById("platform");
    const serviceSelect = document.getElementById("service");
    const quantityInput = document.getElementById("quantity");
    const totalPrice = document.getElementById("total-price");
    const servicesContainer = document.getElementById("services-container");
    const quantityContainer = document.getElementById("quantity-container");
    const proceedPaymentBtn = document.getElementById("proceed-payment");
    const paymentSection = document.getElementById("payment-section");
    const transactionIdInput = document.getElementById("transaction-id");
    const confirmPaymentBtn = document.getElementById("confirm-payment");
    const countdownTimer = document.getElementById("countdown");
    const paymentStatus = document.getElementById("payment-status");

    const prices = {
        "followers": 130,
        "likes": 20,
        "comments": 149,
        "views": 3,
        "story_views": 2
    };

    platformSelect.addEventListener("change", function () {
        const platform = platformSelect.value;
        serviceSelect.innerHTML = '<option value="">-- Select --</option>';

        if (platform) {
            servicesContainer.style.display = "block";
            quantityContainer.style.display = "none";
            proceedPaymentBtn.style.display = "none";

            serviceSelect.innerHTML += `
                <option value="followers">Followers</option>
                <option value="likes">Likes</option>
                <option value="comments">Comments</option>
                <option value="views">Views</option>
                <option value="story_views">Story Views</option>
            `;
        } else {
            servicesContainer.style.display = "none";
            quantityContainer.style.display = "none";
            proceedPaymentBtn.style.display = "none";
        }
    });

    serviceSelect.addEventListener("change", function () {
        if (serviceSelect.value) {
            quantityContainer.style.display = "block";
        } else {
            quantityContainer.style.display = "none";
            proceedPaymentBtn.style.display = "none";
        }
    });

    quantityInput.addEventListener("input", function () {
        const service = serviceSelect.value;
        const quantity = parseInt(quantityInput.value);
        if (service && quantity >= 1) {
            totalPrice.innerText = (prices[service] / 1000) * quantity;
            proceedPaymentBtn.style.display = "block";
        } else {
            totalPrice.innerText = "0";
            proceedPaymentBtn.style.display = "none";
        }
    });

    proceedPaymentBtn.addEventListener("click", function () {
        document.getElementById("service-selection").style.display = "none";
        paymentSection.style.display = "block";

        let timeLeft = 120;
        countdownTimer.innerText = timeLeft;
        paymentStatus.innerText = "";

        const countdown = setInterval(() => {
            timeLeft--;
            countdownTimer.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                paymentStatus.innerHTML = "❌ Payment Cancelled";
                confirmPaymentBtn.disabled = true;
            }
        }, 1000);
    });

    confirmPaymentBtn.addEventListener("click", function () {
        const transactionId = transactionIdInput.value.trim();
        if (transactionId) {
            alert("Payment confirmed! Redirecting...");
            window.location.href = "https://www.instagram.com/tmo_kashmir";
        } else {
            alert("Please enter a valid transaction ID!");
        }
    });
});
