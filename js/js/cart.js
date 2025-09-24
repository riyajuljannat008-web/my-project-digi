let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  cart.push({name, price, image});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  window.location.href = "cart.html";
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function renderCart() {
  let container = document.getElementById("cart-items");
  let totalBox = document.getElementById("total");
  let orderDetails = document.getElementById("orderDetails");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <div class="cart-row">
        <img src="${item.image}" width="50"> 
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>`;
  });

  if (totalBox) totalBox.innerText = "Total: $" + total;

  if (orderDetails) {
    orderDetails.value = cart.map(p => `${p.name} - $${p.price}`).join("\n") + `\nTotal: $${total}`;
  }
}

function updateCartCount() {
  let count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

window.onload = function() {
  renderCart();
  updateCartCount();
};

function startPayment() {
  alert("Redirecting to Payment Gateway (Demo Mode)...");

  // SSLCommerz demo redirect (open in new tab or same tab)
  window.location.href = "https://sandbox.sslcommerz.com/EasyCheckOut/testcde123";

  // Simulate payment success after 5 sec
  setTimeout(() => {
    alert("✅ Payment Successful! Confirming your order...");
    document.getElementById("finalSubmit").click();
  }, 5000);
}



// sarch

// Demo data
const categories = [
  { name: "AC Repair", link: "ac-repair.html" },
  { name: "Beauty & Wellness", link: "beauty-wellness.html" },
  { name: "Electronics", link: "electronics.html" },
  { name: "Cleaning Solution", link: "cleaning-solution.html" },
  { name: "Men's Care", link: "mens-care.html" }
];

const products = [
  { name: "Samsung AC", link: "fashion.html" },
  { name: "LG Washing Machine", link: "product-lg-wash.html" },
  { name: "Sony Headphones", link: "gift.html" },
  { name: "Laptop Repair Service", link: "product-laptop-repair.html" },
  { name: "Mobile Screen Guard", link: "product-screen-guard.html" }
];

// Live search
function liveSearch(event) {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const categoryFilter = document.getElementById("searchCategory").value;
  const resultsDiv = document.getElementById("searchResults");

  resultsDiv.innerHTML = "";

  if (query === "") {
    resultsDiv.style.display = "none";
    return;
  }

  resultsDiv.style.display = "block";
  let results = [];

  if (categoryFilter === "all" || categoryFilter === "categories") {
    results = results.concat(categories.filter(c => c.name.toLowerCase().includes(query)));
  }

  if (categoryFilter === "all" || categoryFilter === "products") {
    results = results.concat(products.filter(p => p.name.toLowerCase().includes(query)));
  }

  if (results.length > 0) {
    results.forEach((r, idx) => {
      const link = document.createElement("a");
      link.href = r.link;
      link.textContent = r.name;
      link.classList.add("search-item");
      if (idx === 0) link.classList.add("first-result"); // প্রথমটা মার্ক করলাম
      resultsDiv.appendChild(link);
    });

    // Enter চাপলে প্রথম suggestion এ যাবে
    if (event.key === "Enter") {
      const first = document.querySelector(".first-result");
      if (first) window.location.href = first.href;
    }

  } else {
    resultsDiv.innerHTML = "<p class='no-result'>No results found!</p>";
  }
}

// Search button দিয়ে কাজ করানো
function performSearch() {
  const query = document.getElementById("searchInput").value;
  if (query.trim() === "") return;
  alert("Searching for: " + query);
}
