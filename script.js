const btnCarrinho = document.getElementById("btnCarrinho");
const painelCarrinho = document.getElementById("painelCarrinho");

btnCarrinho.addEventListener("click", () => {
    painelCarrinho.classList.toggle("ativo");
});

let carrinho = [];
let total = 0;
function adicionarCarrinho(nome, preco){

    const itemExistente = carrinho.find(item => item.nome === nome);

    if(itemExistente){
        itemExistente.quantidade++;
    }else{
        carrinho.push({
            nome,
            preco,
            quantidade: 1
        });
    }

    calcularTotal();
}

function atualizarCarrinho(){

    const lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {

        lista.innerHTML += `
            <li class="item-carrinho">

                <span>${item.nome}</span>

                <div class="controle-qtd">
                    <button onclick="diminuirQuantidade(${index})">-</button>

                    <span>${item.quantidade}</span>

                    <button onclick="aumentarQuantidade(${index})">+</button>
                </div>

            </li>
        `;
    });

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("quantidade").textContent = carrinho.length;
}

function aumentarQuantidade(index){

    carrinho[index].quantidade++;

    calcularTotal();
}

function diminuirQuantidade(index){

    carrinho[index].quantidade--;

    if(carrinho[index].quantidade <= 0){
        carrinho.splice(index, 1);
    }

    calcularTotal();
}

function calcularTotal(){

    total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });

    atualizarCarrinho();
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