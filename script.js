const listaCarrinho = document.getElementById("lista-carrinho");
const totalSpan = document.getElementById("total");

let carrinho = [];
let total = 0;

function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();
}

function removerItem(index) {
    total -= carrinho[index].preco;

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerItem(${index})">X</button>
        `;

        listaCarrinho.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2);
}

// cadastro fechar e abrir overlay joão 

const overlay = document.getElementById("overlay");

const btnCadastro = document.getElementById("btnCadastro");

btnCadastro.addEventListener("click", () => {
    overlay.classList.add("ativo");
});

const fechar = document.querySelector(".fechar");

fechar.addEventListener("click", () => {
    overlay.classList.remove("ativo");
});

// fim overlay