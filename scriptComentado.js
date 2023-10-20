// Array de produtos
let products = [];

// Função para renderizar a tabela de produtos
function renderProducts(productsArray) {
  // Se nenhum array de produtos for fornecido, usar o array completo de produtos
  if (!productsArray) {
    productsArray = products;
  }
  
  let tableBody = document.querySelector("#productTable tbody");
  tableBody.innerHTML = "";

  for (let i = 0; i < productsArray.length; i++) {
    let product = productsArray[i];

    // Criar uma nova linha na tabela com os dados do produto
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.quantity}</td>
      <td>${product.costPrice.toFixed(2)}</td>
      <td>${product.salePrice.toFixed(2)}</td>
      <td><img src="${product.image}" alt="${product.name}" width="50"></td>
    `;

    // Criar as ações (botões) para cada produto
    let actions = document.createElement("td");
    actions.innerHTML = `
      <button class="btnSale" onclick="showSaleModal(${i})">Venda</button>
      <button class="btnEdit" onclick="editProduct(${i})">Editar</button>
      <button class="btnDelete" onclick="deleteProduct(${i})">Excluir</button>
    `;

    // Adicionar as ações à linha da tabela
    row.appendChild(actions);
    tableBody.appendChild(row);
  }
}

// Função para adicionar um novo produto
function addProduct() {
  // Obter os valores dos campos do formulário
  let productName = document.querySelector("#productName").value;
  let productDescription = document.querySelector("#productDescription").value;
  let productQuantity = parseInt(document.querySelector("#productQuantity").value);
  let productCostPrice = parseFloat(document.querySelector("#productCostPrice").value);
  let productSalePrice = parseFloat(document.querySelector("#productSalePrice").value);
  let productImage = document.querySelector("#productImage").value;

  // Criar um novo objeto de produto
  let newProduct = {
    name: productName,
    description: productDescription,
    quantity: productQuantity,
    costPrice: productCostPrice,
    salePrice: productSalePrice,
    image: productImage
  };

  // Adicionar o novo produto ao array de produtos
  products.push(newProduct);

  // Renderizar a tabela de produtos novamente para exibir o novo produto
  renderProducts();

  // Fechar o modal
  closeModal();
}

// Função para editar um produto existente
function editProduct(index) {
  // Obter o produto com base no índice fornecido
  let product = products[index];

  // Preencher os campos do formulário com os valores do produto
  document.querySelector("#modalTitle").textContent = "Editar Produto";
  document.querySelector("#productName").value = product.name;
  document.querySelector("#productDescription").value = product.description;
  document.querySelector("#productQuantity").value = product.quantity;
  document.querySelector("#productCostPrice").value = product.costPrice.toFixed(2);
  document.querySelector("#productSalePrice").value = product.salePrice.toFixed(2);
  document.querySelector("#productImage").value = product.image;

  // Definir o evento de envio do formulário para chamar a função updateProduct
  document.querySelector("#productForm").onsubmit = function(e) {
    e.preventDefault();
    updateProduct(index);
  };

  // Exibir o modal de edição do produto
  document.querySelector("#productModal").style.display = "block";
}

// Função para atualizar um produto existente
function updateProduct(index) {
  // Obter o produto com base no índice fornecido
  let product = products[index];

  // Atualizar os valores do produto com base nos campos do formulário
  product.name = document.querySelector("#productName").value;
  product.description = document.querySelector("#productDescription").value;
  product.quantity = parseInt(document.querySelector("#productQuantity").value);
  product.costPrice = parseFloat(document.querySelector("#productCostPrice").value);
  product.salePrice = parseFloat(document.querySelector("#productSalePrice").value);
  product.image = document.querySelector("#productImage").value;

  // Renderizar a tabela de produtos novamente para exibir as alterações
  renderProducts();

  // Fechar o modal
  closeModal();
}

// Função para excluir um produto existente
function deleteProduct(index) {
  // Remover o produto do array de produtos com base no índice fornecido
  products.splice(index, 1);

  // Renderizar a tabela de produtos novamente para refletir a exclusão
  renderProducts();
}

// Função para exibir o modal de venda de produto
function showSaleModal(index) {
  // Obter o produto com base no índice fornecido
  let product = products[index];

  // Exibir o modal de venda de produto
  document.querySelector("#saleModal").style.display = "block";

  // Definir o evento de clique do botão de venda
  document.querySelector("#saleBtn").onclick = function() {
    // Obter a quantidade de venda do campo de entrada
    let saleQuantity = parseInt(document.querySelector("#saleQuantity").value);

    // Verificar se a quantidade de venda é menor ou igual à quantidade em estoque do produto
    if (saleQuantity <= product.quantity) {
      // Atualizar a quantidade do produto após a venda
      product.quantity -= saleQuantity;

      // Renderizar a tabela de produtos novamente para refletir a venda
      renderProducts();

      // Fechar o modal de venda
      closeSaleModal();
    } else {
      alert("Quantidade insuficiente em estoque.");
    }
  };
}

// Função para fechar o modal
function closeModal() {
  // Limpar os campos do formulário
  document.querySelector("#modalTitle").textContent = "";
  document.querySelector("#productName").value = "";
  document.querySelector("#productDescription").value = "";
  document.querySelector("#productQuantity").value = "";
  document.querySelector("#productCostPrice").value = "";
  document.querySelector("#productSalePrice").value = "";
  document.querySelector("#productImage").value = "";

  // Ocultar o modal
  document.querySelector("#productModal").style.display = "none";
}

// Função para fechar o modal de venda
function closeSaleModal() {
  // Ocultar o modal de venda
  document.querySelector("#saleModal").style.display = "none";
}

// Função para filtrar os produtos pelo nome
function filterProducts() {
  // Obter o valor do campo de filtragem e converter para minúsculas
  let filterValue = document.querySelector("#filterInput").value.toLowerCase();

  // Filtrar os produtos com base no nome
  let filteredProducts = products.filter(function(product) {
    return product.name.toLowerCase().indexOf(filterValue) > -1;
  });

  // Renderizar a tabela de produtos com os produtos filtrados
  renderProducts(filteredProducts);
}

// Evento de clique no botão "Adicionar Produto"
document.querySelector("ProductBtn").onclick = function() {
  // Definir o título do modal como "Adicionar Produto"
  document.querySelector("#modalTitle").textContent = "Adicionar Produto";
  
  // Definir o evento de envio do formulário para chamar a função addProduct
  document.querySelector("#productForm").onsubmit = function(e) {
    e.preventDefault();
    addProduct();
  };

  // Exibir o modal de adição de produto
  document.querySelector("#productModal").style.display = "block";
};

// Evento de clique nos botões de fechar do modal
let closeButtons = document.querySelectorAll(".close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function() {
    // Fechar o modal de adição/edição de produto
    closeModal();
    // Fechar o modal de venda de produto
    closeSaleModal();
  };
}

// Evento de digitação no campo de filtragem
document.querySelector("#filterInput").onkeyup = function() {
  // Filtrar os produtos com base no valor do campo de filtragem
  filterProducts();
};

// Inicializar a tabela de produtos
renderProducts(products);
