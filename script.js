document.addEventListener("DOMContentLoaded", () => {
  let allProducts = []; // Store all fetched products

  // Fetch products from the API
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      allProducts = products; // Store the fetched products
      displayProducts(allProducts); // Display all products initially
    })
    .catch((error) => console.error("Error fetching products:", error));

  // Function to display products
  const displayProducts = (products) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing products

    if (products.length === 0) {
      productList.innerHTML = `<div class="col-12"><p class="text-center">No products found.</p></div>`;
      return;
    }

    products.forEach((product) => {
      const productCard = `
        <div class="col-3 mb-4">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.title}" />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">$${product.price}</p>
              <p class="card-text">${product.description}</p>
            </div>
          </div>
        </div>`;
      productList.innerHTML += productCard;
    });
  };

  // Search button event listener
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase(); // Get search input value
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );
    displayProducts(filteredProducts); // Display filtered products
  });
});
