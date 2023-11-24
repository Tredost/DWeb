const users = [
    { username: 'Mangeli', password: '202cb962ac59075b964b07152d234b70' },
];

const loginContainer = document.getElementById('login-container');
    const mainContainer = document.getElementById('main-container');
    const atletasContainer = document.getElementById('atletas-container');
    const detalhesContainer = document.getElementById('detalhes-container');
    const selecaoSeletor = document.getElementById('selecao-seletor'); //aquii

document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = false;

    if (isLoggedIn) {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';
        atletasContainer.style.display = 'none';
        detalhesContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'block';
        mainContainer.style.display = 'none';
        atletasContainer.style.display = 'none';
        detalhesContainer.style.display = 'none';
    }
});

function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const user = users.find(u => u.username === usernameInput.value && u.password === md5(passwordInput.value));

    if (user) {
        localStorage.setItem('autorizado','true')
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        document.getElementById('atletas-container').style.display = 'none';
        document.getElementById('detalhes-container').style.display = 'none';
    } else {
        alert('Usuário ou senha inválido!');
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('atletas-container').style.display = 'none';
    document.getElementById('detalhes-container').style.display = 'none';
}


function selecionarOpcao() {
    const opcaoSelecionada = selecaoSeletor.value;

    switch (opcaoSelecionada) {
        case 'masculino':
            button1();
            break;
        case 'feminino':
            button2();
            break;
        case 'ambos':
            button3();
            break;
        case 'sair':
            logout();
            break;
        default:
            // Lógica padrão, se necessário
    }
}

selecaoSeletor.addEventListener('change', selecionarOpcao); //aquiii gpt


function md5(input) {
    return CryptoJS.MD5(input).toString();
}

function carregarAtletas(endpoint) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('atletas-container').style.display = 'block';

    atletasContainer.innerHTML = '';

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            data.forEach((atleta) => {
                cria_cartao(atleta);
            });
        })
        .catch(error => console.error('Erro ao obter os dados:', error));
}

function cria_cartao(entrada) {
    const container_atleta = document.createElement('div');
    container_atleta.className = 'cartao';

    const titulo = document.createElement('h3');
    titulo.innerHTML = entrada.nome;

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;

    const botaoDetalhes = document.createElement('button');
    botaoDetalhes.textContent = 'Detalhes';
    botaoDetalhes.onclick = function () {
        buttonDetalhes(entrada.id);
    };

    container_atleta.appendChild(titulo);
    container_atleta.appendChild(imagem);
    container_atleta.appendChild(botaoDetalhes);

    atletasContainer.appendChild(container_atleta);
}

function fecharDetalhes() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('atletas-container').style.display = 'block';
    document.getElementById('detalhes-container').style.display = 'none';
}

function button1() {
    carregarAtletas('https://botafogo-atletas.mange.li/masculino');
}

function button2() {
    carregarAtletas('https://botafogo-atletas.mange.li/feminino');
}

function button3() {
    carregarAtletas('https://botafogo-atletas.mange.li/all');
}


function buttonDetalhes(id) {

    detalhesContainer.innerHTML = '';
    document.getElementById('detalhes-container').style.display = 'block';
    fetch(`https://botafogo-atletas.mange.li/${id}`)
        .then(response => response.json())
        .then(data => {
            detalhesContainer.innerHTML = '';
            detalhesContainer.innerHTML = `
                <h2 style="text-align: center;">${data.nome_completo}</h2>
                <img src="${data.imagem}" alt="${data.nome}">
                <p><strong>Posição:</strong> ${data.posicao}</p>
                <p><strong>Altura:</strong> ${data.altura}</p>
                <p><strong>Nascimento:</strong> ${data.nascimento}</p>
                <p><strong>Descrição:</strong> ${data.descricao}</p>
            `;
            const botaoFechar = document.createElement('button');
            botaoFechar.textContent = 'Fechar';
            botaoFechar.onclick = fecharDetalhes;
            detalhesContainer.appendChild(botaoFechar);
    })
    .catch(error => console.error('Erro ao obter detalhes:', error));
}