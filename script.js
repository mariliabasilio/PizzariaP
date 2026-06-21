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
const overlayLOG = document.getElementById("overlayLOG");
const btnCadastro = document.getElementById("btnCadastro");

// carregar o nome de usuario do overlay cadastrado
const usuarioNomeSpan = document.getElementById("usuarioNome");

function atualizarNomeUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.nome && usuarioNomeSpan) {
        usuarioNomeSpan.textContent = usuario.nome;
    }
}

//fim de cadastrar o nome de usuario no overlay cadastrado

btnCadastro.addEventListener("click", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        overlay.classList.add("ativo");
    } else {
        atualizarNomeUsuario();
        overlayLOG.classList.add("ativo");
    }
});

const btnFecharLOG = document.getElementById("btnFecharLOG");
btnFecharLOG.addEventListener("click", () => {
    overlayLOG.classList.remove("ativo");
});

const btnFechar = document.getElementById("btnFechar");
btnFechar.addEventListener("click", () => {
    overlay.classList.remove("ativo");
});

// fim overlay

//remove o cadastro
const btnRmvCad = document.getElementById("btnRmvCad");

btnRmvCad.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    overlayLOG.classList.remove("ativo");
});

// fim remover cadastro

// cadastro nome e telefone

const btnConfirmar = document.getElementById("btnConfirmar");

const inputTelefone = document.getElementById("inputTelefone");
const inputNome = document.getElementById("inputNome");

const usuario = JSON.parse(
    localStorage.getItem("usuario")
);

btnConfirmar.addEventListener("click", () => {

    const nome = inputNome.value.trim();
    const telefone = inputTelefone.value.replaceAll(" ", "");
    
    if (!nome || !telefone) {
        alert('Preencha nome e telefone!');
    return;}

    const usuario = { nome, telefone };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    overlay.classList.remove("ativo");

});



// fim cadastro nome e telefone

// finalizando e enviando mensagem para o whatsapp

const btnFinalizar = document.getElementById("btnFinalizar");


btnFinalizar.addEventListener("click", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
    alert("Faça seu cadastro para finalizar o pedido!");
    overlay.classList.add("ativo");
    return;}

    if (total <= 0) {
        alert("Adicione pelo menos um item ao carrinho!");
        return;
    }

    let texto = `NOVO PEDIDO\n\n`;
    texto += `Cliente: ${usuario.nome}\n`;
    texto += `Telefone: ${usuario.telefone}\n\n`;
    texto += `Itens:\n`;
    carrinho.forEach(item => {
        texto += `• ${item.nome} x${item.quantidade}\n`;
    });

    const url = `https://wa.me/558585631664?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
});