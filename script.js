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

// ===== DASHBOARD QA - Gráficos =====
document.addEventListener('DOMContentLoaded', () => {
  // ---------- GRÁFICO DE BUGS ----------
  const ctxBugs = document.getElementById('grafico-bugs').getContext('2d');
  let tipoBugs = 'pie'; // inicia como pizza
  let graficoBugs;

  function criarGraficoBugs(tipo) {
    if (graficoBugs) graficoBugs.destroy();
    graficoBugs = new Chart(ctxBugs, {
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

  // ---------- GRÁFICO DE MÉTRICAS QA ----------
  const ctxQA = document.getElementById('grafico-qa').getContext('2d');
  let tipoMetricas = 'bar'; // inicia como barras
  let graficoQA;

  function criarGraficoMetricas(tipo) {
    if (graficoQA) graficoQA.destroy();
    graficoQA = new Chart(ctxQA, {
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
});