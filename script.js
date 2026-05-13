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