/* =========================================================
   THE SPICE HOUSE — RESTAURANT SETTINGS
========================================================= */

const RESTAURANT = {
    name: "THE SPICE HOUSE",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    address: "123 Food Street, Your City, India"
};


document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            navbar.classList.toggle("menu-open");
        });
    }


    /* =========================
       CLOSE MOBILE MENU
    ========================= */

    const navLinks =
        document.querySelectorAll(".navbar nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navbar) {
                navbar.classList.remove("menu-open");
            }

        });

    });


    /* =========================
       CATEGORY FILTER
    ========================= */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const foodCards =
        document.querySelectorAll(".food-card");


    function showCategory(category) {

        foodCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";
                card.style.opacity = "1";

            } else {

                card.style.display = "none";

            }

        });

    }


    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();


            const selectedCategory =
                button.getAttribute("data-category");


            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            showCategory(selectedCategory);

        });

    });


    showCategory("all");


    /* =========================
       IMAGE FALLBACK
    ========================= */

    const foodImages =
        document.querySelectorAll(".food-card img");


    foodImages.forEach(function (image) {

        image.addEventListener("error", function () {
            image.style.display = "none";
        });

    });


    /* =========================
       SHOPPING CART
    ========================= */

    let cart = [];


    /* =========================
       ADD TO CART BUTTONS
    ========================= */

    foodCards.forEach(function (card) {

        const foodInfo =
            card.querySelector(".food-info");


        const titleElement =
            card.querySelector(".food-title h3");


        const priceElement =
            card.querySelector(".food-title span");


        if (
            !foodInfo ||
            !titleElement ||
            !priceElement
        ) {
            return;
        }


        if (
            foodInfo.querySelector(".add-cart-btn")
        ) {
            return;
        }


        const addButton =
            document.createElement("button");


        addButton.type = "button";

        addButton.className =
            "add-cart-btn";

        addButton.textContent =
            "ADD TO CART";


        foodInfo.appendChild(addButton);


        addButton.addEventListener(
            "click",
            function () {

                const itemName =
                    titleElement.textContent.trim();


                const priceText =
                    priceElement.textContent.trim();


                const itemPrice =
                    parseInt(
                        priceText.replace(/[^\d]/g, ""),
                        10
                    );


                if (
                    !itemName ||
                    isNaN(itemPrice)
                ) {
                    return;
                }


                addToCart(
                    itemName,
                    itemPrice
                );


                addButton.textContent =
                    "ADDED ✓";


                setTimeout(function () {

                    addButton.textContent =
                        "ADD TO CART";

                }, 800);

            }
        );

    });


    /* =========================
       ADD ITEM TO CART
    ========================= */

    function addToCart(name, price) {

        const existingItem =
            cart.find(function (item) {
                return item.name === name;
            });


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

    }


    /* =========================
       FLOATING CART BUTTON
    ========================= */

    const cartButton =
        document.createElement("button");


    cartButton.type = "button";

    cartButton.className =
        "cart-floating-btn";


    cartButton.innerHTML = `
        🛒
        <span class="cart-count">0</span>
    `;


    document.body.appendChild(cartButton);


    /* =========================
       CART OVERLAY
    ========================= */

    const cartOverlay =
        document.createElement("div");


    cartOverlay.className =
        "cart-overlay";


    document.body.appendChild(cartOverlay);


    /* =========================
       CART PANEL
    ========================= */

    const cartPanel =
        document.createElement("div");


    cartPanel.className =
        "cart-panel";


    cartPanel.innerHTML = `

        <div class="cart-header">

            <h2>YOUR CART</h2>

            <button
                type="button"
                class="cart-close"
            >
                ×
            </button>

        </div>


        <div class="cart-items"></div>


        <div class="cart-bottom">

            <div class="cart-total">

                <span>TOTAL</span>

                <strong>₹0</strong>

            </div>


            <button
                type="button"
                class="checkout-btn"
            >
                CHECKOUT
            </button>

        </div>

    `;


    document.body.appendChild(cartPanel);


    /* =========================
       OPEN CART
    ========================= */

    cartButton.addEventListener(
        "click",
        function () {

            cartPanel.classList.add(
                "cart-open"
            );


            cartOverlay.classList.add(
                "overlay-open"
            );

        }
    );


    /* =========================
       CLOSE CART
    ========================= */

    function closeCart() {

        cartPanel.classList.remove(
            "cart-open"
        );


        cartOverlay.classList.remove(
            "overlay-open"
        );

    }


    cartOverlay.addEventListener(
        "click",
        closeCart
    );


    cartPanel
        .querySelector(".cart-close")
        .addEventListener(
            "click",
            closeCart
        );


    /* =========================
       UPDATE CART
    ========================= */

    function updateCart() {

        const cartItems =
            cartPanel.querySelector(
                ".cart-items"
            );


        const totalElement =
            cartPanel.querySelector(
                ".cart-total strong"
            );


        const countElement =
            cartButton.querySelector(
                ".cart-count"
            );


        cartItems.innerHTML = "";


        let total = 0;

        let totalQuantity = 0;


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <p>Your cart is empty.</p>

                    <span>
                        Add something delicious!
                    </span>

                </div>

            `;

        }


        cart.forEach(function (item, index) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;

            totalQuantity += item.quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

                </div>


                <div class="cart-item-controls">

                    <button
                        type="button"
                        class="quantity-btn"
                        data-index="${index}"
                        data-action="minus"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-btn"
                        data-index="${index}"
                        data-action="plus"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-item"
                        data-index="${index}"
                    >
                        ×
                    </button>

                </div>

            `;


            cartItems.appendChild(
                itemElement
            );

        });


        totalElement.textContent =
            "₹" + total;


        countElement.textContent =
            totalQuantity;


        /* PLUS / MINUS */

        cartItems
            .querySelectorAll(".quantity-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (
                            button.dataset.action ===
                            "plus"
                        ) {

                            cart[index].quantity++;

                        }


                        if (
                            button.dataset.action ===
                            "minus"
                        ) {

                            cart[index].quantity--;


                            if (
                                cart[index].quantity <= 0
                            ) {

                                cart.splice(index, 1);

                            }

                        }


                        updateCart();

                    }
                );

            });


        /* REMOVE */

        cartItems
            .querySelectorAll(".remove-item")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart.splice(index, 1);


                        updateCart();

                    }
                );

            });

    }


    /* =========================
       CHECKOUT MODAL
    ========================= */

    const checkoutModal =
        document.createElement("div");


    checkoutModal.className =
        "checkout-modal";


    checkoutModal.innerHTML = `

        <div class="checkout-box">

            <div class="checkout-header">

                <h2>
                    COMPLETE YOUR ORDER
                </h2>

                <button
                    type="button"
                    class="checkout-close"
                >
                    ×
                </button>

            </div>


            <form class="checkout-form">

                <label>
                    Your Name
                </label>

                <input
                    type="text"
                    id="customerName"
                    placeholder="Enter your name"
                    required
                >


                <label>
                    Phone Number
                </label>

                <input
                    type="tel"
                    id="customerPhone"
                    placeholder="10-digit mobile number"
                    maxlength="10"
                    required
                >


                <label>
                    Order Type
                </label>

                <select
                    id="orderType"
                    required
                >

                    <option value="Delivery">
                        Delivery
                    </option>

                    <option value="Pickup">
                        Pickup
                    </option>

                </select>


                <label id="addressLabel">
                    Delivery Address
                </label>

                <textarea
                    id="customerAddress"
                    placeholder="Enter your delivery address"
                    rows="3"
                    required
                ></textarea>


                <!-- =========================
                     PAYMENT METHOD
                ========================= -->

                <label>
                    Payment Method
                </label>

                <div class="payment-options">

                    <label class="payment-option">

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="UPI"
                            checked
                        >

                        <span class="payment-icon">
                            📱
                        </span>

                        <span class="payment-text">
                            <strong>UPI</strong>
                            <small>Pay using UPI</small>
                        </span>

                    </label>


                    <label class="payment-option">

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Credit / Debit Card"
                        >

                        <span class="payment-icon">
                            💳
                        </span>

                        <span class="payment-text">
                            <strong>Credit / Debit Card</strong>
                            <small>Secure card payment</small>
                        </span>

                    </label>


                    <label class="payment-option">

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on Delivery"
                        >

                        <span class="payment-icon">
                            💵
                        </span>

                        <span class="payment-text">
                            <strong>Cash on Delivery</strong>
                            <small>Pay when your order arrives</small>
                        </span>

                    </label>

                </div>


                <!-- PAYMENT INFORMATION -->

                <div
                    class="payment-info"
                    id="paymentInfo"
                >
                    Select your preferred payment method.
                </div>


                <label>
                    Special Instructions
                </label>

                <textarea
                    id="orderNotes"
                    placeholder="Any special instructions? (Optional)"
                    rows="2"
                ></textarea>


                <div class="checkout-summary">

                    <h3>
                        ORDER SUMMARY
                    </h3>

                    <div
                        id="checkoutSummaryItems"
                    ></div>


                    <div class="checkout-final-total">

                        <span>
                            TOTAL
                        </span>

                        <strong
                            id="checkoutTotal"
                        >
                            ₹0
                        </strong>

                    </div>

                </div>


                <button
                    type="submit"
                    class="place-order-btn"
                >
                    PLACE ORDER ON WHATSAPP
                </button>

            </form>

        </div>

    `;


    document.body.appendChild(
        checkoutModal
    );


    /* =========================
       CHECKOUT STYLES
    ========================= */

    const checkoutStyles =
        document.createElement("style");


    checkoutStyles.textContent = `

        .checkout-modal {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.78);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
            overflow-y: auto;
        }

        .checkout-modal.checkout-visible {
            opacity: 1;
            visibility: visible;
        }

        .checkout-box {
            width: 100%;
            max-width: 520px;
            max-height: 92vh;
            overflow-y: auto;
            background: #100b08;
            color: #ffffff;
            border: 1px solid rgba(216,164,93,0.35);
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }

        .checkout-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22px;
        }

        .checkout-header h2 {
            margin: 0;
            color: #d8a45d;
            font-size: 21px;
        }

        .checkout-close {
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 50%;
            background: rgba(255,255,255,0.08);
            color: #ffffff;
            font-size: 24px;
            cursor: pointer;
        }

        .checkout-form {
            display: flex;
            flex-direction: column;
            gap: 9px;
        }

        .checkout-form label {
            font-size: 13px;
            font-weight: 700;
            margin-top: 7px;
        }

        .checkout-form input,
        .checkout-form select,
        .checkout-form textarea {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            border: 1px solid rgba(216,164,93,0.35);
            border-radius: 5px;
            background: #18100c;
            color: #ffffff;
            outline: none;
            font-family: inherit;
        }

        .checkout-form input:focus,
        .checkout-form select:focus,
        .checkout-form textarea:focus {
            border-color: #d8a45d;
        }

        .checkout-form textarea {
            resize: vertical;
        }


        /* =========================
           PAYMENT OPTIONS
        ========================= */

        .payment-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 3px;
        }

        .payment-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 13px;
            border: 1px solid rgba(216,164,93,0.25);
            border-radius: 7px;
            background: rgba(255,255,255,0.03);
            cursor: pointer;
            transition: 0.2s;
            margin: 0 !important;
        }

        .payment-option:hover {
            border-color: #d8a45d;
            background: rgba(216,164,93,0.07);
        }

        .payment-option input {
            width: 17px !important;
            height: 17px;
            margin: 0;
            accent-color: #d8a45d;
            flex-shrink: 0;
        }

        .payment-icon {
            font-size: 22px;
            width: 30px;
            text-align: center;
        }

        .payment-text {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .payment-text strong {
            font-size: 14px;
        }

        .payment-text small {
            font-size: 11px;
            color: rgba(255,255,255,0.55);
            font-weight: 400;
        }

        .payment-info {
            padding: 11px 13px;
            margin-top: 2px;
            border-radius: 6px;
            background: rgba(216,164,93,0.07);
            border: 1px solid rgba(216,164,93,0.18);
            color: rgba(255,255,255,0.72);
            font-size: 12px;
            line-height: 1.5;
        }


        /* =========================
           CHECKOUT SUMMARY
        ========================= */

        .checkout-summary {
            margin-top: 18px;
            padding: 17px;
            border-radius: 7px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(216,164,93,0.2);
        }

        .checkout-summary h3 {
            margin: 0 0 13px;
            color: #d8a45d;
            font-size: 15px;
        }

        .summary-line {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            padding: 7px 0;
            font-size: 14px;
        }

        .checkout-final-total {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid rgba(255,255,255,0.12);
            margin-top: 10px;
            padding-top: 13px;
            font-size: 18px;
        }

        .checkout-final-total strong {
            color: #d8a45d;
        }

        .place-order-btn {
            margin-top: 15px;
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 6px;
            background: #d8a45d;
            color: #100b08;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
        }

        .place-order-btn:hover {
            transform: translateY(-1px);
        }


        /* =========================
           ORDER CONFIRMATION
        ========================= */

        .order-confirmation {
            position: fixed;
            inset: 0;
            z-index: 11000;
            background: #100b08;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
        }

        .order-confirmation.show {
            opacity: 1;
            visibility: visible;
        }

        .confirmation-box {
            width: 100%;
            max-width: 480px;
            text-align: center;
            padding: 40px 25px;
            border: 1px solid rgba(216,164,93,0.3);
            border-radius: 12px;
            background: #18100c;
        }

        .confirmation-icon {
            width: 70px;
            height: 70px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: #d8a45d;
            color: #100b08;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 35px;
            font-weight: 900;
        }

        .confirmation-box h2 {
            color: #d8a45d;
            margin-bottom: 12px;
        }

        .confirmation-box p {
            color: rgba(255,255,255,0.75);
            line-height: 1.6;
        }

        .order-number {
            margin: 20px 0;
            padding: 15px;
            border-radius: 7px;
            background: rgba(216,164,93,0.08);
        }

        .order-number span {
            display: block;
            font-size: 12px;
            margin-bottom: 5px;
            color: rgba(255,255,255,0.6);
        }

        .order-number strong {
            color: #d8a45d;
            font-size: 22px;
            letter-spacing: 1px;
        }

        .back-menu-btn {
            width: 100%;
            padding: 14px;
            margin-top: 10px;
            border: none;
            border-radius: 6px;
            background: #d8a45d;
            color: #100b08;
            font-weight: 800;
            cursor: pointer;
        }


        @media (max-width: 500px) {

            .checkout-modal {
                padding: 10px;
            }

            .checkout-box {
                padding: 20px;
                max-height: 95vh;
            }

            .checkout-header h2 {
                font-size: 18px;
            }

            .payment-option {
                padding: 11px;
            }

        }

    `;


    document.head.appendChild(
        checkoutStyles
    );


    /* =========================
       PAYMENT METHOD LOGIC
    ========================= */

    const paymentMethods =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );


    const paymentInfo =
        document.getElementById(
            "paymentInfo"
        );


    function updatePaymentInfo() {

        const selected =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (!selected) {
            return;
        }


        if (selected.value === "UPI") {

            paymentInfo.innerHTML = `
                <strong>UPI selected</strong><br>
                You will be able to pay using UPI.
                Actual payment processing will be connected later.
            `;

        }


        if (
            selected.value ===
            "Credit / Debit Card"
        ) {

            paymentInfo.innerHTML = `
                <strong>Card payment selected</strong><br>
                Secure card payment will be connected
                through a payment gateway.
            `;

        }


        if (
            selected.value ===
            "Cash on Delivery"
        ) {

            paymentInfo.innerHTML = `
                <strong>Cash on Delivery selected</strong><br>
                Pay in cash when your order is delivered.
            `;

        }

    }


    paymentMethods.forEach(function (method) {

        method.addEventListener(
            "change",
            updatePaymentInfo
        );

    });


    updatePaymentInfo();


    /* =========================
       CHECKOUT SUMMARY
    ========================= */

    function updateCheckoutSummary() {

        const summary =
            document.getElementById(
                "checkoutSummaryItems"
            );


        const totalElement =
            document.getElementById(
                "checkoutTotal"
            );


        summary.innerHTML = "";


        let total = 0;


        cart.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            const line =
                document.createElement("div");


            line.className =
                "summary-line";


            line.innerHTML = `

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ₹${itemTotal}
                </strong>

            `;


            summary.appendChild(line);

        });


        totalElement.textContent =
            "₹" + total;

    }


    /* =========================
       OPEN CHECKOUT
    ========================= */

    const checkoutButton =
        cartPanel.querySelector(
            ".checkout-btn"
        );


    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            updateCheckoutSummary();


            checkoutModal.classList.add(
                "checkout-visible"
            );

        }
    );


    /* =========================
       CLOSE CHECKOUT
    ========================= */

    checkoutModal
        .querySelector(".checkout-close")
        .addEventListener(
            "click",
            function () {

                checkoutModal.classList.remove(
                    "checkout-visible"
                );

            }
        );


    /* =========================
       ORDER TYPE
    ========================= */

    const orderType =
        document.getElementById(
            "orderType"
        );


    const addressField =
        document.getElementById(
            "customerAddress"
        );


    const addressLabel =
        document.getElementById(
            "addressLabel"
        );


    orderType.addEventListener(
        "change",
        function () {

            if (
                orderType.value === "Pickup"
            ) {

                addressField.required = false;

                addressField.placeholder =
                    "Address not required for pickup";

                addressLabel.textContent =
                    "Address (Optional)";

            } else {

                addressField.required = true;

                addressField.placeholder =
                    "Enter your delivery address";

                addressLabel.textContent =
                    "Delivery Address";

            }

        }
    );


    /* =========================
       CREATE ORDER NUMBER
    ========================= */

    function generateOrderNumber() {

        const randomNumber =
            Math.floor(
                1000 + Math.random() * 9000
            );


        return "SPH-" + randomNumber;

    }


    /* =========================
       CREATE CONFIRMATION SCREEN
    ========================= */

    const confirmation =
        document.createElement("div");


    confirmation.className =
        "order-confirmation";


    confirmation.innerHTML = `

        <div class="confirmation-box">

            <div class="confirmation-icon">
                ✓
            </div>

            <h2>
                ORDER READY!
            </h2>

            <p>
                Your order has been prepared
                and WhatsApp has been opened.
            </p>

            <div class="order-number">

                <span>
                    YOUR ORDER NUMBER
                </span>

                <strong
                    id="confirmationOrderNumber"
                >
                    SPH-0000
                </strong>

            </div>

            <p>
                Please send the prepared
                WhatsApp message to the
                restaurant to complete your order.
            </p>

            <button
                type="button"
                class="back-menu-btn"
            >
                BACK TO MENU
            </button>

        </div>

    `;


    document.body.appendChild(
        confirmation
    );


    /* =========================
       PLACE ORDER
    ========================= */

    const checkoutForm =
        checkoutModal.querySelector(
            ".checkout-form"
        );


    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            const customerName =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const customerPhone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const selectedOrderType =
                document.getElementById(
                    "orderType"
                ).value;


            const customerAddress =
                document.getElementById(
                    "customerAddress"
                ).value.trim();


            const orderNotes =
                document.getElementById(
                    "orderNotes"
                ).value.trim();


            const selectedPayment =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            const paymentMethod =
                selectedPayment
                    ? selectedPayment.value
                    : "Not selected";


            /* PHONE VALIDATION */

            if (
                !/^[6-9]\d{9}$/.test(
                    customerPhone
                )
            ) {

                alert(
                    "Please enter a valid 10-digit Indian mobile number."
                );

                return;

            }


            /* DELIVERY ADDRESS */

            if (
                selectedOrderType ===
                "Delivery" &&
                !customerAddress
            ) {

                alert(
                    "Please enter your delivery address."
                );

                return;

            }


            const orderNumber =
                generateOrderNumber();


            let total = 0;


            let orderMessage =
                "🍽️ *NEW ORDER - " +
                encodeURIComponent(
                    RESTAURANT.name
                ) +
                "*%0A%0A";


            orderMessage +=
                "*Order No:* " +
                orderNumber +
                "%0A";


            orderMessage +=
                "*Customer:* " +
                encodeURIComponent(
                    customerName
                ) +
                "%0A";


            orderMessage +=
                "*Phone:* " +
                encodeURIComponent(
                    customerPhone
                ) +
                "%0A";


            orderMessage +=
                "*Order Type:* " +
                encodeURIComponent(
                    selectedOrderType
                ) +
                "%0A";


            orderMessage +=
                "*Payment:* " +
                encodeURIComponent(
                    paymentMethod
                ) +
                "%0A";


            if (customerAddress) {

                orderMessage +=
                    "*Address:* " +
                    encodeURIComponent(
                        customerAddress
                    ) +
                    "%0A";

            }


            orderMessage +=
                "%0A*ORDER DETAILS*%0A";


            cart.forEach(function (item) {

                const itemTotal =
                    item.price *
                    item.quantity;


                total += itemTotal;


                orderMessage +=
                    encodeURIComponent(
                        item.name
                    ) +
                    " × " +
                    item.quantity +
                    " = ₹" +
                    itemTotal +
                    "%0A";

            });


            orderMessage +=
                "%0A*TOTAL: ₹" +
                total +
                "*%0A";


            if (orderNotes) {

                orderMessage +=
                    "%0A*Notes:* " +
                    encodeURIComponent(
                        orderNotes
                    );

            }


            /* =========================
               RESTAURANT WHATSAPP
            ========================= */

            const restaurantWhatsApp =
                RESTAURANT.whatsapp;


            const whatsappURL =
                "https://wa.me/" +
                restaurantWhatsApp +
                "?text=" +
                orderMessage;


            /* =========================
               OPEN WHATSAPP
            ========================= */

            window.open(
                whatsappURL,
                "_blank"
            );


            /* =========================
               CLEAR CART
            ========================= */

            cart = [];

            updateCart();


            /* =========================
               RESET FORM
            ========================= */

            checkoutForm.reset();


            /* =========================
               CLOSE CHECKOUT
            ========================= */

            checkoutModal.classList.remove(
                "checkout-visible"
            );


            closeCart();


            /* =========================
               SHOW CONFIRMATION
            ========================= */

            document.getElementById(
                "confirmationOrderNumber"
            ).textContent =
                orderNumber;


            confirmation.classList.add(
                "show"
            );

        }
    );


    /* =========================
       BACK TO MENU
    ========================= */

    confirmation
        .querySelector(".back-menu-btn")
        .addEventListener(
            "click",
            function () {

                confirmation.classList.remove(
                    "show"
                );


                const menuSection =
                    document.getElementById(
                        "menu"
                    );


                if (menuSection) {

                    menuSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );


    /* =========================
       START CART
    ========================= */

    updateCart();

});