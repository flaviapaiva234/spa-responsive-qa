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
    const bugs = document.querySelectorAll(".bug-card");

    const total = bugs.length;
    const abertos = document.querySelectorAll('.bug-card[data-status="aberto"]').length;
    const corrigidos = document.querySelectorAll('.bug-card[data-status="corrigido"]').length;

    document.getElementById("count-todos").textContent = total;
    document.getElementById("count-abertos").textContent = abertos;
    document.getElementById("count-corrigidos").textContent = corrigidos;
}

atualizarContadoresBugs();