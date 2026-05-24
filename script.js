console.log("SPA Responsive QA carregada com sucesso!");

// ===== ANIMAÇÃO DOS CONTADORES =====
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

// ===== FUNÇÕES PARA FILTRAR BUGS (se existirem na página) =====
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
        } else if (bug.dataset.status === status) {
            bug.style.display = "block";
        } else {
            bug.style.display = "none";
        }
    });
}

function atualizarContadoresBugs() {
    const contadorTodos = document.getElementById("count-todos");
    if (!contadorTodos) return;

    const bugs = document.querySelectorAll(".bug-card");
    const total = bugs.length;
    const abertos = document.querySelectorAll('.bug-card[data-status="aberto"]').length;
    const corrigidos = document.querySelectorAll('.bug-card[data-status="corrigido"]').length;

    document.getElementById("count-todos").textContent = total;
    document.getElementById("count-abertos").textContent = abertos;
    document.getElementById("count-corrigidos").textContent = corrigidos;
}

atualizarContadoresBugs();

// ===== ASSISTENTE INTERATIVO DE QA =====
const perguntasQA = [
    "A aplicação carregou corretamente?",
    "O menu de navegação funcionou?",
    "Os cards ficaram organizados visualmente?",
    "A versão mobile ficou responsiva?",
    "Os textos ficaram legíveis?"
];

let perguntaAtual = 0;
let respostasSim = 0;

// Função que atualiza a barra de progresso (largura + texto)
function atualizarBarraProgresso() {
    const barraFill = document.getElementById('progress-bar-fill');
    if (!barraFill) return;

    const porcentagem = (perguntaAtual / perguntasQA.length) * 100;
    barraFill.style.width = `${porcentagem}%`;
    barraFill.textContent = `${Math.round(porcentagem)}%`;
}

// Função chamada ao clicar em Sim ou Não
function responderQA(resposta) {
    if (resposta === "sim") {
        respostasSim++;
    }
    perguntaAtual++;

    // Atualiza a barra de progresso a cada resposta
    atualizarBarraProgresso();

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

// ===== TEMA CLARO/ESCURO =====
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

// ===== DASHBOARD QA - GRÁFICOS (e inicialização da barra de progresso) =====
document.addEventListener('DOMContentLoaded', () => {
    // ---------- GRÁFICO DE BUGS ----------
    const ctxBugs = document.getElementById('grafico-bugs');
    if (ctxBugs) {
        const ctx = ctxBugs.getContext('2d');
        let tipoBugs = 'pie';
        let graficoBugs;

        function criarGraficoBugs(tipo) {
            if (graficoBugs) graficoBugs.destroy();
            graficoBugs = new Chart(ctx, {
                type: tipo,
                data: {
                    labels: ['Abertos', 'Corrigidos', 'Em andamento'],
                    datasets: [{
                        label: 'Bugs',
                        data: [8, 15, 3],
                        backgroundColor: ['#e74c3c', '#2ecc71', '#f39c12'],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: tipo === 'bar' ? { y: { beginAtZero: true } } : {},
                    plugins: {
                        legend: tipo === 'pie' ? { position: 'bottom' } : { display: true }
                    }
                }
            });
        }

        criarGraficoBugs(tipoBugs);

        const btnBugs = document.getElementById('toggle-bugs');
        if (btnBugs) {
            btnBugs.addEventListener('click', () => {
                if (tipoBugs === 'pie') {
                    tipoBugs = 'bar';
                    btnBugs.textContent = 'Bugs: Gráfico Barras 📊';
                } else {
                    tipoBugs = 'pie';
                    btnBugs.textContent = 'Bugs: Gráfico Pizza 🍕';
                }
                criarGraficoBugs(tipoBugs);
            });
        }
    }

    // ---------- GRÁFICO DE MÉTRICAS QA ----------
    const ctxQA = document.getElementById('grafico-qa');
    if (ctxQA) {
        const ctx = ctxQA.getContext('2d');
        let tipoMetricas = 'bar';
        let graficoQA;

        function criarGraficoMetricas(tipo) {
            if (graficoQA) graficoQA.destroy();
            graficoQA = new Chart(ctx, {
                type: tipo,
                data: {
                    labels: ['Testes Executados', 'Aprovação (%)', 'Checklist Concluído'],
                    datasets: [{
                        label: 'Resultados',
                        data: [120, 87, 18],
                        backgroundColor: ['#3498db', '#9b59b6', '#1abc9c'],
                        borderColor: '#2c3e50',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: tipo === 'bar' ? { y: { beginAtZero: true } } : {},
                    plugins: {
                        legend: tipo === 'pie' ? { position: 'bottom' } : { display: true }
                    }
                }
            });
        }

        criarGraficoMetricas(tipoMetricas);

        const btnMetricas = document.getElementById('toggle-metricas');
        if (btnMetricas) {
            btnMetricas.addEventListener('click', () => {
                if (tipoMetricas === 'bar') {
                    tipoMetricas = 'pie';
                    btnMetricas.textContent = 'Métricas: Gráfico Pizza 🍕';
                } else {
                    tipoMetricas = 'bar';
                    btnMetricas.textContent = 'Métricas: Gráfico Barra 📊';
                }
                criarGraficoMetricas(tipoMetricas);
            });
        }
    }

    // ---------- INICIALIZAÇÃO DA BARRA DE PROGRESSO DO ASSISTENTE QA ----------
    const barraFill = document.getElementById('progress-bar-fill');
    if (barraFill) {
        barraFill.style.width = '0%';
        barraFill.textContent = '0%';
    }

    // ===== BOTÃO EXPORTAR RELATÓRIO PDF (usando impressão nativa) =====
    const botaoPdf = document.getElementById('exportarRelatorioBtn');
    if (botaoPdf) {
        botaoPdf.addEventListener('click', function () {
            window.print();
        });
    } else {
        console.log("Botão 'exportarRelatorioBtn' não encontrado");
    }
});