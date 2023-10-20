let products = [];
let soldProducts = [];

function renderProducts(productsArray) {
  if (!productsArray) {
    productsArray = products;
  }

  let tableBody = document.querySelector("#productTable tbody");
  tableBody.innerHTML = "";

  for (let i = 0; i < productsArray.length; i++) {
    let product = productsArray[i];

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.quantity}</td>
      <td>${product.costPrice.toFixed(2)}</td>
      <td>${product.salePrice.toFixed(2)}</td>
      <td><img src="${product.image}" alt="${product.name}" width="50"></td>
    `;

    let actions = document.createElement("td");
    actions.innerHTML = `
      <button class="btnSale" onclick="showSaleModal(${i})">Venda</button>
      <button class="btnEdit" onclick="editProduct(${i})">Editar</button>
      <button class="btnDelete" onclick="deleteProduct(${i})">Excluir</button>
    `;

    row.appendChild(actions);
    tableBody.appendChild(row);
  }
}

function addProduct() {
  let productName = document.querySelector("#productName").value;
  let productDescription = document.querySelector("#productDescription").value;
  let productQuantity = parseInt(document.querySelector("#productQuantity").value);
  let productCostPrice = parseFloat(document.querySelector("#productCostPrice").value);
  let productSalePrice = parseFloat(document.querySelector("#productSalePrice").value);
  let productImage = document.querySelector("#productImage").value;

  let newProduct = {
    name: productName,
    description: productDescription,
    quantity: productQuantity,
    costPrice: productCostPrice,
    salePrice: productSalePrice,
    image: productImage
  };

  products.push(newProduct);
  renderProducts();
  closeModal();
}

function editProduct(index) {
  let product = products[index];

  document.querySelector("#modalTitle").textContent = "Editar Produto";
  document.querySelector("#productName").value = product.name;
  document.querySelector("#productDescription").value = product.description;
  document.querySelector("#productQuantity").value = product.quantity;
  document.querySelector("#productCostPrice").value = product.costPrice.toFixed(2);
  document.querySelector("#productSalePrice").value = product.salePrice.toFixed(2);
  document.querySelector("#productImage").value = product.image;

  document.querySelector("#productForm").onsubmit = function(e) {
    e.preventDefault();
    updateProduct(index);
  };

  document.querySelector("#productModal").style.display = "block";
}

function updateProduct(index) {
  let product = products[index];

  product.name = document.querySelector("#productName").value;
  product.description = document.querySelector("#productDescription").value;
  product.quantity = parseInt(document.querySelector("#productQuantity").value);
  product.costPrice = parseFloat(document.querySelector("#productCostPrice").value);
  product.salePrice = parseFloat(document.querySelector("#productSalePrice").value);
  product.image = document.querySelector("#productImage").value;

  renderProducts();
  closeModal();
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
}

function showSaleModal(index) {
  let product = products[index];

  document.querySelector("#saleModal").style.display = "block";

  document.querySelector("#saleBtn").onclick = function() {
    let saleQuantity = parseInt(document.querySelector("#saleQuantity").value);

    if (saleQuantity <= product.quantity) {
      product.quantity -= saleQuantity;
      renderProducts();
      closeSaleModal();

       // Adicionar o produto vendido à lista de produtos vendidos
       let soldProduct = {
        name: product.name,
        quantity: saleQuantity
      };
      soldProducts.push(soldProduct);

      // Exibir a lista de produtos vendidos
      renderSoldProducts();
    } else {
      alert("Quantidade insuficiente em estoque.");
    }
  };
}

// Função para renderizar a lista de produtos vendidos
function renderSoldProducts() {
  let soldProductsList = document.querySelector("#soldProductsList");
  soldProductsList.innerHTML = "";

  for (let i = 0; i < soldProducts.length; i++) {
    let soldProduct = soldProducts[i];

    let listItem = document.createElement("li");
    listItem.textContent = `Produto: ${soldProduct.name}, Quantidade: ${soldProduct.quantity}`;

    soldProductsList.appendChild(listItem);
  }
}

function closeModal() {
  document.querySelector("#modalTitle").textContent = "";
  document.querySelector("#productName").value = "";
  document.querySelector("#productDescription").value = "";
  document.querySelector("#productQuantity").value = "";
  document.querySelector("#productCostPrice").value = "";
  document.querySelector("#productSalePrice").value = "";
  document.querySelector("#productImage").value = "";

  document.querySelector("#productModal").style.display = "none";
}

function closeSaleModal() {
  document.querySelector("#saleModal").style.display = "none";
}

function filterProducts() {
  let filterValue = document.querySelector("#filterInput").value.toLowerCase();

  let filteredProducts = products.filter(function(product) {
    return product.name.toLowerCase().indexOf(filterValue) > -1;
  });

  renderProducts(filteredProducts);
}

document.querySelector("#addProductBtn").onclick = function() {
  document.querySelector("#modalTitle").textContent = "Adicionar Produto";
  document.querySelector("#productForm").onsubmit = function(e) {
    e.preventDefault();
    addProduct();
  };

  document.querySelector("#productModal").style.display = "block";
};

let closeButtons = document.querySelectorAll(".close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function() {
    closeModal();
    closeSaleModal();
  };
}

document.querySelector("#filterInput").onkeyup = function() {
  filterProducts();
};

renderProducts(products);
