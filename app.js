const queues = {
  V: [],
  A: [],
  D: [],
  B: [],
};

const state = {
  atendidos: 0,
  picoLotacao: 0,
  esperaMax: 0,
  horaAtendimento: 0,
  minutoAtendimento: 0,
  atendidosPorPrioridade: { V: 0, A: 0, D: 0, B: 0 },
};

const statusEl = document.getElementById("status");
const statsEl = document.getElementById("stats");
const finalReportEl = document.getElementById("final-report");

const arrivalForm = document.getElementById("arrival-form");
const serviceForm = document.getElementById("service-form");

function totalNaFila() {
  return queues.V.length + queues.A.length + queues.D.length + queues.B.length;
}

function formatHora(h, m) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function atualizarPainel() {
  statsEl.innerHTML = "";
  const linhas = [
    `Fila V: ${queues.V.length}`,
    `Fila A: ${queues.A.length}`,
    `Fila D: ${queues.D.length}`,
    `Fila B: ${queues.B.length}`,
    `Total atendidos: ${state.atendidos}`,
    `Atendidos por prioridade: V=${state.atendidosPorPrioridade.V} A=${state.atendidosPorPrioridade.A} D=${state.atendidosPorPrioridade.D} B=${state.atendidosPorPrioridade.B}`,
    `Pico de lotação: ${state.picoLotacao}`,
    `Espera máxima: ${state.esperaMax} min`,
    `Último horário de atendimento: ${formatHora(state.horaAtendimento, state.minutoAtendimento)}`,
  ];

  linhas.forEach((linha) => {
    const li = document.createElement("li");
    li.textContent = linha;
    statsEl.appendChild(li);
  });
}

arrivalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cliente = {
    senha: Number(document.getElementById("senha").value),
    prioridade: document.getElementById("prioridade").value,
    hora: Number(document.getElementById("hora-chegada").value),
    minuto: Number(document.getElementById("minuto-chegada").value),
  };

  queues[cliente.prioridade].push(cliente);

  const total = totalNaFila();
  if (total > state.picoLotacao) {
    state.picoLotacao = total;
  }

  statusEl.textContent = `Paciente ${cliente.senha} (${cliente.prioridade}) adicionado às ${formatHora(cliente.hora, cliente.minuto)}.`;
  arrivalForm.reset();
  document.getElementById("prioridade").value = "V";
  atualizarPainel();
});

serviceForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.horaAtendimento = Number(document.getElementById("hora-atendimento").value);
  state.minutoAtendimento = Number(document.getElementById("minuto-atendimento").value);

  const ordem = ["V", "A", "D", "B"];
  let atendido = null;

  for (const prioridade of ordem) {
    if (queues[prioridade].length > 0) {
      atendido = queues[prioridade].shift();
      break;
    }
  }

  if (!atendido) {
    statusEl.textContent = "Sem pacientes aguardando.";
    atualizarPainel();
    return;
  }

  state.atendidos += 1;
  state.atendidosPorPrioridade[atendido.prioridade] += 1;

  const minAtendimento = state.horaAtendimento * 60 + state.minutoAtendimento;
  const minChegada = atendido.hora * 60 + atendido.minuto;
  const espera = Math.max(0, minAtendimento - minChegada);

  if (espera > state.esperaMax) {
    state.esperaMax = espera;
  }

  statusEl.textContent = `Paciente atendido: ${atendido.senha} - ${atendido.prioridade} (espera ${espera} min).`;
  serviceForm.reset();
  atualizarPainel();
});

document.getElementById("final-report-btn").addEventListener("click", () => {
  finalReportEl.textContent = [
    "--- RELATÓRIO FINAL ---",
    `Total atendidos: ${state.atendidos}`,
    `Atendidos por prioridade: V=${state.atendidosPorPrioridade.V} A=${state.atendidosPorPrioridade.A} D=${state.atendidosPorPrioridade.D} B=${state.atendidosPorPrioridade.B}`,
    `Pacientes aguardando: V=${queues.V.length} A=${queues.A.length} D=${queues.D.length} B=${queues.B.length}`,
    `Pico de lotação: ${state.picoLotacao}`,
    `Espera máxima: ${state.esperaMax} min`,
  ].join("\n");
});

atualizarPainel();
