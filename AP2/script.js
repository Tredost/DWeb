const users = [
    { username: 'Mangeli', password: '202cb962ac59075b964b07152d234b70' }, // MD5 hash of 'password'
    // Add more users as needed
];

document.addEventListener('DOMContentLoaded', function () {
    const loginContainer = document.getElementById('login-container');
    const mainContainer = document.getElementById('main-container');
    const atletasContainer = document.getElementById('atletas-container');

    const isLoggedIn = false;

    if (isLoggedIn) {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';
        atletasContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'block';
        mainContainer.style.display = 'none';
        atletasContainer.style.display = 'none';
    }
});

function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const user = users.find(u => u.username === usernameInput.value && u.password === md5(passwordInput.value));

    if (user) {
        alert('Login efetuado!');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        document.getElementById('atletas-container').style.display = 'none';
    } else {
        alert('Usuário ou senha inválido!');
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('atletas-container').style.display = 'none';
}

function md5(input) {
    return CryptoJS.MD5(input).toString();
}

const div_container = document.getElementById('atletas-container');

function carregarAtletas(endpoint) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('atletas-container').style.display = 'block';

    div_container.innerHTML = '';

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            data.forEach((atleta) => {
                cria_cartao(atleta);
            });
            const botaoVoltar = document.createElement('button');
            botaoVoltar.textContent = 'Voltar';
            botaoVoltar.onclick = voltarParaMain;
            div_container.appendChild(botaoVoltar);
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

    container_atleta.appendChild(titulo);
    container_atleta.appendChild(imagem);
    container_atleta.appendChild(botaoDetalhes);

    div_container.appendChild(container_atleta);
}

function voltarParaMain() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('atletas-container').style.display = 'none';
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
    fetch(`https://botafogo-atletas.mange.li/${id}`)
    .then(response => response.json())
    .then(data => {
        // Faça algo com os detalhes recebidos
    })
    .catch(error => console.error('Erro ao obter detalhes:', error));
}