// ==========================================
// 1. CONTROLE DE SESSÃO E SEGURANÇA
// ==========================================
const usuarioLogado = localStorage.getItem('usuarioLogado');
const paginaAtual = window.location.pathname.split("/").pop();

// Função para sair do sistema
function deslogar() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// Bloqueio de páginas internas para quem não está logado
const paginasPrivadas = ['dashboard.html', 'meus-agendamentos.html', 'reserva.html'];
if (!usuarioLogado && paginasPrivadas.includes(paginaAtual)) {
    window.location.href = "index.html";
}

// ==========================================
// 2. MÁSCARA DE TELEFONE (VERSÃO DEFINITIVA)
// ==========================================
const inputTelefone = document.getElementById('telefone');
if (inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
        let num = e.target.value.replace(/\D/g, ""); // Pega só números
        if (num.length > 11) num = num.slice(0, 11); // Limita a 11 dígitos

        let valorFormatado = "";
        if (num.length > 0) {
            valorFormatado = "(" + num.substring(0, 2);
            if (num.length > 2) valorFormatado += ") " + num.substring(2, 7);
            if (num.length > 7) valorFormatado += "-" + num.substring(7, 11);
        } else {
            valorFormatado = "(  ) ";
        }
        e.target.value = valorFormatado;
    });

    // Garante que o campo não fique vazio ao ganhar foco
    inputTelefone.addEventListener('focus', (e) => {
        if (e.target.value === "") e.target.value = "(  ) ";
    });
}

// ==========================================
// 3. INTERFACE DINÂMICA (HOME E MENU)
// ==========================================
function ajustarInterface() {
    const containerBotoes = document.getElementById('botoes-dinamicos');
    const menuNav = document.getElementById('menu-nav');
    const nomeExibicao = document.getElementById('nome-cliente');

    if (usuarioLogado) {
        if (containerBotoes) {
            containerBotoes.innerHTML = `
                <a href="dashboard.html" class="btn-main">Agendar Serviço</a>
                <a href="meus-agendamentos.html" class="btn-main" style="background-color: transparent; border: 2px solid #e1b12c; color: #e1b12c;">Meus Serviços</a>
            `;
        }
        if (nomeExibicao) nomeExibicao.textContent = usuarioLogado;
        if (menuNav) {
            menuNav.innerHTML = `
                <li><a href="index.html">Início</a></li>
                <li><a href="dashboard.html">Tatuadores</a></li>
                <li><a href="meus-agendamentos.html">Minha Agenda</a></li>
                <li><a href="javascript:void(0)" onclick="deslogar()">Sair</a></li>
            `;
        }
    }
}
document.addEventListener('DOMContentLoaded', ajustarInterface);

// ==========================================
// 4. CADASTRO E LOGIN (SISTEMA DE LISTA)
// ==========================================
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

        if (!regex.test(senha)) {
            document.getElementById('senha-erro').textContent = "Senha fora do padrão!";
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
        if (usuarios.find(u => u.nome === nome)) {
            alert("Usuário já existe!");
            return;
        }

        usuarios.push({ nome: nome, senha: senha });
        localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
        alert("Cadastro realizado! Agora faça login.");
        window.location.href = "login.html";
    });
}

const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('login-nome').value.trim();
        const senha = document.getElementById('login-senha').value;
        let usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
        
        const user = usuarios.find(u => u.nome === nome && u.senha === senha);
        if (user) {
            localStorage.setItem('usuarioLogado', user.nome);
            window.location.href = "index.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    });
}

// ==========================================
// 5. RESERVA E AGENDAMENTOS
// ==========================================
const formReserva = document.getElementById('formReserva');
if (formReserva) {
    const params = new URLSearchParams(window.location.search);
    const tatuador = params.get('tatuador');
    if (tatuador) document.getElementById('tatuador-selecionado').value = tatuador;

    formReserva.addEventListener('submit', (e) => {
        e.preventDefault();
        const novaReserva = {
            cliente: usuarioLogado,
            tatuador: document.getElementById('tatuador-selecionado').value,
            estilo: document.getElementById('estilo').value,
            data: document.getElementById('data').value,
            status: 'Pendente'
        };

        let agendamentos = JSON.parse(localStorage.getItem('listaAgendamentos')) || [];
        agendamentos.push(novaReserva);
        localStorage.setItem('listaAgendamentos', JSON.stringify(agendamentos));

        alert("Tattoo agendada com sucesso!");
        window.location.href = 'meus-agendamentos.html';
    });
}

// Carregar Agenda na página meus-agendamentos.html
const containerCards = document.getElementById('lista-cards');
if (containerCards) {
    const agendamentos = JSON.parse(localStorage.getItem('listaAgendamentos')) || [];
    const meusAgendamentos = agendamentos.filter(a => a.cliente === usuarioLogado);
    const msgVazia = document.getElementById('msg-vazia');

    if (meusAgendamentos.length > 0) {
        if (msgVazia) msgVazia.style.display = 'none';
        containerCards.innerHTML = '';
        
        meusAgendamentos.forEach((res, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${res.tatuador}</h3>
                <p><b>Data:</b> ${res.data}</p>
                <p><b>Estilo:</b> ${res.estilo}</p>
                <button onclick="removerAgendamento('${res.data}', '${res.tatuador}')" class="btn-main" style="background:#ff4d4d; border:none; margin-top:10px; cursor:pointer;">Cancelar</button>
            `;
            containerCards.appendChild(card);
        });
    }
}

// Função para cancelar agendamento
window.removerAgendamento = function(data, tatuador) {
    if (confirm("Deseja realmente cancelar este agendamento?")) {
        let agendamentos = JSON.parse(localStorage.getItem('listaAgendamentos')) || [];
        const novaLista = agendamentos.filter(a => !(a.cliente === usuarioLogado && a.data === data && a.tatuador === tatuador));
        localStorage.setItem('listaAgendamentos', JSON.stringify(novaLista));
        location.reload();
    }
};

// ==========================================
// 6. OLHINHO DA SENHA (CADASTRO E LOGIN)
// ==========================================
function setupEye(btnId, inputId) {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.onclick = () => {
            const input = document.getElementById(inputId);
            input.type = input.type === 'password' ? 'text' : 'password';
            btn.textContent = input.type === 'password' ? '👁️' : '🙈';
        };
    }
}
setupEye('togglePassword', 'senha');
setupEye('togglePasswordLogin', 'login-senha');