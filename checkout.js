let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shippingFee");
const totalEl = document.getElementById("checkoutTotal");
const deliverySelect = document.getElementById("delivery");
const placeOrderBtn = document.getElementById("placeOrder");

function renderCheckout(){

    let subtotal = 0;
    checkoutItems.innerHTML = '';

    cart.forEach((item,index)=>{
        subtotal += item.price * item.qty;

        checkoutItems.innerHTML += `
            <div class="order-item">
                <img src="${item.image}">
                <div>
                    <strong>${item.name}</strong><br>
                    Size: ${item.size}<br>
                    ₱${item.price}
                    <div class="qty-controls">
                        <button onclick="changeQty(${index}, -1)">−</button>
                        ${item.qty}
                        <button onclick="changeQty(${index}, 1)">+</button>
                        <button onclick="removeItem(${index})">✕</button>
                    </div>
                </div>
            </div>
        `;
    });

    let shipping = deliverySelect.value === "express" ? 200 : 100;
    let total = subtotal + shipping;

    subtotalEl.textContent = `₱${subtotal}`;
    shippingEl.textContent = `₱${shipping}`;
    totalEl.textContent = `₱${total}`;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(index, change){
    cart[index].qty += change;
    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }
    renderCheckout();
}

const paymentSelect = document.getElementById("payment");
const paymentDetails = document.getElementById("paymentDetails");

paymentSelect.addEventListener("change", handlePaymentChange);

function handlePaymentChange(){

    const selected = paymentSelect.value;

    if(selected === "gcash"){
        paymentDetails.innerHTML = `
            <input type="text" placeholder="GCash Number">
            <input type="text" placeholder="Reference Number">
        `;
    }

    else if(selected === "card"){
        paymentDetails.innerHTML = `
            <input type="text" placeholder="Card Number">
            <input type="text" placeholder="Card Holder Name">
            <input type="text" placeholder="Expiry Date (MM/YY)">
            <input type="text" placeholder="CVV">
        `;
    }

    else if(selected === "paypal"){
        paymentDetails.innerHTML = `
            <input type="email" placeholder="PayPal Email">
        `;
    }

    else if(selected === "bank"){
        paymentDetails.innerHTML = `
            <input type="text" placeholder="Bank Name">
            <input type="text" placeholder="Account Name">
            <input type="text" placeholder="Reference Number">
        `;
    }

    else {
        paymentDetails.innerHTML = "";
    }
}

function removeItem(index){
    cart.splice(index,1);
    renderCheckout();
}

deliverySelect.addEventListener("change", renderCheckout);

placeOrderBtn.addEventListener("click", ()=>{
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    const orderID = "QLX-" + Math.floor(Math.random()*1000000);

    document.getElementById("orderID").textContent =
        "Order ID: " + orderID;

    document.getElementById("successModal").style.display = "flex";

    localStorage.removeItem("cart");
    cart = [];
});

function closeModal(){
    document.getElementById("successModal").style.display = "none";
    location.reload();
}

renderCheckout();