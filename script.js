console.log("SPA Responsive QA carregada com sucesso!");

function animarContador(id, valorFinal) {
    let valorAtual = 0;
    const elemento = document.getElementById(id);

    const intervalo = setInterval(() => {
        if (valorAtual < valorFinal) {
            valorAtual++;
            elemento.textContent = valorAtual;
        } else {
            clearInterval(intervalo);
        }
    }, 200);
}

animarContador("total-testes", 3);
animarContador("total-bugs", 2);
animarContador("total-checklist", 4);

function filtrarBugs(status, botaoSelecionado) {

    const botoes = document.querySelectorAll(".filtro-btn");

    botoes.forEach((botao) => {
        botao.classList.remove("ativo");
    });

    botaoSelecionado.classList.add("ativo");

    const bugs = document.querySelectorAll(".bug-card");

    bugs.forEach((bug) => {

        if (status === "todos") {
            bug.style.display = "block";
        }

        else if (bug.dataset.status === status) {
            bug.style.display = "block";
        }

        else {
            bug.style.display = "none";
        }

    });

}

function atualizarContadoresBugs() {
    const contadorTodos = document.getElementById("count-todos");

    if (!contadorTodos) {
        return;
    }

    const bugs = document.querySelectorAll(".bug-card");

    const total = bugs.length;
    const abertos = document.querySelectorAll('.bug-card[data-status="aberto"]').length;
    const corrigidos = document.querySelectorAll('.bug-card[data-status="corrigido"]').length;

    document.getElementById("count-todos").textContent = total;
    document.getElementById("count-abertos").textContent = abertos;
    document.getElementById("count-corrigidos").textContent = corrigidos;
}

atualizarContadoresBugs();

const perguntasQA = [
    "A aplicação carregou corretamente?",
    "O menu de navegação funcionou?",
    "Os cards ficaram organizados visualmente?",
    "A versão mobile ficou responsiva?",
    "Os textos ficaram legíveis?"
];

let perguntaAtual = 0;
let respostasSim = 0;

function responderQA(resposta) {
    if (resposta === "sim") {
        respostasSim++;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntasQA.length) {
        document.getElementById("pergunta-qa").textContent = perguntasQA[perguntaAtual];
        document.getElementById("progresso-qa").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntasQA.length}`;
    } else {
        exibirResultadoQA();
    }
}

function exibirResultadoQA() {
    const resultado = document.getElementById("resultado-qa");
    const textoResultado = document.getElementById("texto-resultado-qa");

    resultado.style.display = "block";

    if (respostasSim === perguntasQA.length) {
        textoResultado.textContent = "✅ Resultado positivo: a aplicação apresentou boa qualidade nos pontos avaliados.";
    } else if (respostasSim >= 3) {
        textoResultado.textContent = "⚠️ Resultado parcial: a aplicação está funcional, mas alguns pontos precisam ser revisados.";
    } else {
        textoResultado.textContent = "❌ Atenção: a aplicação precisa de melhorias antes de ser considerada aprovada.";
    }
}

const botaoTema = document.getElementById("toggle-theme");

if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("light-mode");

    if (botaoTema) {
        botaoTema.textContent = "☀️ Tema claro";
    }
}

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("tema", "claro");
            botaoTema.textContent = "☀️ Tema claro";
        } else {
            localStorage.setItem("tema", "escuro");
            botaoTema.textContent = "🌙 Tema escuro";
        }
    });
}