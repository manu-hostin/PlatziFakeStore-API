const cards = document.getElementById("featured-list");
const container = document.getElementById("product-detail");

async function buscarProdutos () {
    try {
        const resposta = await fetch("https://api.escuelajs.co/api/v1/products");
        const dados = await resposta.json()
        console.log(dados)

        const primeirosProdutos = dados.slice(0, 3);
        cards.innerHTML = "";

        primeirosProdutos.forEach(elemento => {
            cards.innerHTML += `
            <article class="card">

                <div class="card-img-wrapper">
                    <img src= "${elemento.images[0]}" class ="card-img" onerror="this.src='https://placehold.co/600x400'">
                </div>

                <div class="card-content">
                    <span class="card-category">${elemento.category.name}</span>

                    <h3 class="card-title">${elemento.title}</h3>

                    <div class="card-footer">
                    <span class="card-price">R$ ${elemento.price}</span>
                    <a href="detail.html?id=${elemento.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
            `
        });
    
    } catch (erro) {
        console.log(erro);
    }
}
buscarProdutos();

async function buscarProdutoUnico() {
    try {
        const id = new URLSearchParams(window.location.search).get("id");

        const resposta = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const produto = await resposta.json();

        console.log(produto);

        const container = document.getElementById("product-detail");
    

        container.innerHTML = `
            <img src="${produto.images[0]}" alt="Loading" class="detail-img">
            
            <div class="detail-info">
                <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">${produto.category.name}</span>
                <h1>${produto.title}</h1>
                <div class="detail-price">R$ ${produto.price}</div>
                <p class="detail-description">${produto.description}</p>
                <button class="btn-primary">Adicionar ao Carrinho</button>
            </div>
      `

    } catch (erro) {
        console.log(erro);
    }
}
buscarProdutoUnico()

async function carregarProdutos() {
    try {
        const resposta = await fetch("https://api.escuelajs.co/api/v1/products")
        const dados = await resposta.json()

        const listaProdutos = document.getElementById("products-list")
        listaProdutos.innerHTML = ""

        dados.forEach(elemento => {
            listaProdutos.innerHTML += `
            <article class="card placeholder-card">

                <div class="card-img-wrapper">
                <img src="${elemento.images[0]}" alt="${elemento.title}" class="card-img" onerror="this.src='https://placehold.co/600x400'">
                </div>

                <div class="card-content">
                <span class="card-category">${elemento.category.name}</span>
                <h3 class="card-title">${elemento.title}</h3>
                <div class="card-footer">
                    <span class="card-price">R$ ${elemento.price}</span>
                    <a href="#" class="btn-primary btn-small">Ver Detalhes</a>
                </div>
                </div>

            </article>
            `
        });


    } catch (erro) {
        console.log(erro)
    }
}

carregarProdutos();

async function criarFiltro () {
    try {
        const resposta = await fetch ("https://api.escuelajs.co/api/v1/products")
        const dados = await resposta.json()

        const categoriaHTML = document.getElementById("category-filter")

        categoriaHTML.innerHTML = `<option value="">Todas as Categorias</option>`; // opção padrão

        const categorias = [];

        dados.forEach(elemento => {

            const categoriasUnicas = elemento.category.name;

            if (!categorias.includes(categoriasUnicas)){
                categorias.push(categoriasUnicas)

                categoriaHTML.innerHTML += `
                <option value="">${elemento.category.name}</option>
                `
            }
        });    


    } catch (error) {
        console.log(error)
    }
}

criarFiltro()

async function aplicarFiltroSimples() {
    const resposta = await fetch("https://api.escuelajs.co/api/v1/products");
    const dados = await resposta.json();

    const selectCategoria = document.getElementById("category-filter");
    const listaProdutos = document.getElementById("products-list");

    // Mostra produtos
    function mostrar(produtos) {
        listaProdutos.innerHTML = "";
        produtos.forEach(p => {
            listaProdutos.innerHTML += `
                <article class="card">
                    <div class="card-img-wrapper">
                        <img src="${p.images[0]}" alt="${p.title}" class="card-img" onerror="this.src='https://placehold.co/600x400'">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${p.category.name}</span>
                        <h3 class="card-title">${p.title}</h3>
                        <div class="card-footer">
                            <span class="card-price">R$ ${p.price}</span>
                            <a href="detail.html?id=${p.id}" class="btn-primary btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                </article>
            `;
        });
    }

    mostrar(dados); // mostra todos inicialmente

    // filtrar ao mudar select
    selectCategoria.addEventListener("change", () => {
        const valor = selectCategoria.value;
        const filtrados = valor === "" ? dados : dados.filter(p => p.category.name === valor);
        mostrar(filtrados);
    });
}

aplicarFiltroSimples();