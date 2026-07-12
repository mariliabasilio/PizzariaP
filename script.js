const btnCarrinho = document.getElementById("btnCarrinho");
const painelCarrinho = document.getElementById("painelCarrinho");

btnCarrinho.addEventListener("click", () => {
    painelCarrinho.classList.toggle("ativo");
});

let carrinho = [];
let total = 0;

function adicionarCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    calcularTotal();
}

function atualizarCarrinho() {
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

function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    calcularTotal();
}

function diminuirQuantidade(index) {
    carrinho[index].quantidade--;
    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }
    calcularTotal();
}

function calcularTotal() {
    total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });
    atualizarCarrinho();
}

// --- Modal de dados do cliente ---
const overlay = document.getElementById("overlay");
const btnFechar = document.getElementById("btnFechar");
const btnConfirmar = document.getElementById("btnConfirmar");
const btnFinalizar = document.getElementById("btnFinalizar");

btnFinalizar.addEventListener("click", () => {
    if (total <= 0) {
        alert("Adicione pelo menos um item ao carrinho!");
        return;
    }
    overlay.classList.add("ativo"); // abre modal
});

btnFechar.addEventListener("click", () => {
    overlay.classList.remove("ativo");
});

btnConfirmar.addEventListener("click", () => {
    const nome = document.getElementById("inputNome").value.trim();
    const telefone = document.getElementById("inputTelefone").value.trim();
    const endereco = document.getElementById("inputEndereco").value.trim();

    if (!nome || !telefone || !endereco) {
        alert("Preencha todos os dados!");
        return;
    }

    let texto = `NOVO PEDIDO\n\n`;
    texto += `Cliente: ${nome}\n`;
    texto += `Telefone: ${telefone}\n`;
    texto += `Endereço: ${endereco}\n\n`;
    texto += `Itens:\n`;
    carrinho.forEach(item => {
        texto += `• ${item.nome} x${item.quantidade}\n`;
    });

    const url = `https://wa.me/558585631664?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    carrinho = [];
    total = 0;
    atualizarCarrinho();
});

function verificarHorario() {

    const agora = new Date();
    const diaSemana = agora.getDay(); // 0=Domingo
    const hora = agora.getHours();

    const status = document.getElementById("statusHorario");

    const abertoDias = [0,2,3,4,5,6]; // Domingo e Terça a Sábado
    const horaAbertura = 18;
    const horaFechamento = 23;

    if (abertoDias.includes(diaSemana) &&
        hora >= horaAbertura &&
        hora < horaFechamento){

        status.innerHTML = "🟢 <strong>ABERTO</strong> • Funcionamos das 18h às 23h";
        status.classList.add("aberto");
        status.classList.remove("fechado");

    }else{

        status.innerHTML = "🔴 <strong>FECHADO</strong> • Funcionamos das 18h às 23h";
        status.classList.add("fechado");
        status.classList.remove("aberto");

    }

}

/*botão de levar pro topo*/

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


    // Atualiza ao carregar
verificarHorario();

    // Atualiza a cada minuto para manter status correto
setInterval(verificarHorario, 60000);

        
overlay.classList.remove("ativo");
