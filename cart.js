// --- CART LOGIC ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartLink = document.getElementById("cartLink");
const cartDropdown = document.getElementById("cartDropdown");


// ================= UPDATE UI =================
function updateCartUI() {

    // Update cart count safely
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }

    // Render cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="40">
            <div>
                <p><strong>${item.name}</strong></p>
                <p>Size: ${item.size}</p>
                <p>₱${item.price} x ${item.qty}</p>
            </div>
            <button class="remove-btn" data-index="${index}">✕</button>
        </div>
    `;
});

    cartItems.innerHTML += `
        <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
`;

        if (cartTotal) {
            cartTotal.textContent = `Total: ₱${total}`;
        }

        attachRemoveEvents(); // attach delete buttons
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}


// ================= REMOVE ITEM =================
function attachRemoveEvents() {
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            cart.splice(index, 1); // remove item
            updateCartUI();
        });
    });
}


// ================= TOGGLE CART =================
if (cartLink && cartDropdown) {
    cartLink.addEventListener("click", (e) => {
        e.preventDefault();
        cartDropdown.classList.toggle("active");
    });
}


// ================= ADD TO CART =================
const addCartBtn = document.querySelector(".add-cart");

if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {

        const name = document.querySelector(".product-title").textContent;
        const price = parseInt(
            document.querySelector(".price").textContent.replace("₱", "")
        );
        const image = document.querySelector(".product-image img").src;
        const qty = parseInt(document.getElementById("qty").value);

        const activeSizeBtn = document.querySelector(".size-btn.active");

        if (!activeSizeBtn) {
            alert("Please select a size first.");
            return;
        }

        const size = activeSizeBtn.textContent;

        const existing = cart.find(item => 
            item.name === name && item.size === size
        );

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name, price, image, qty, size });
        }

        updateCartUI();
        alert(`${name} (${size}) added to cart!`);
    });
}

// ================= INITIAL LOAD =================
updateCartUI();