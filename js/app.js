const seletor = (css) => document.querySelector(css);
function criarParagrafo(rotulo, valor) {
  const p = document.createElement("p");
  p.textContent = `${rotulo}: ${valor}`;
  return p;
}
function atualizarDashboard() {
  const ta = seletor("#total-alunos"),
    tc = seletor("#total-cursos"),
    tm = seletor("#total-matriculas"),
    tu = seletor("#total-usuarios");
  if (!ta || !tc || !tm || !tu) return;
  ta.textContent = alunos.length;
  tc.textContent = cursosCadastrados.length;
  tm.textContent = matriculas.length;
  tu.textContent = usuarios.length;
  seletor("#alunos-ativos").textContent = alunos.filter(
    (a) => a.status === "ativo",
  ).length;
  seletor("#cursos-ativos").textContent = cursosCadastrados.filter(
    (c) => c.ativo,
  ).length;
  seletor("#matriculas-ativas").textContent = matriculas.filter(
    (m) => m.status === "ativa",
  ).length;
  seletor("#usuarios-ativos").textContent = usuarios.filter(
    (u) => u.status === "ativo",
  ).length;
}
function classeStatus(s) {
  if (s === "ativo" || s === "ativa") return "status-ativo";
  if (s === "inativo" || s === "inativa") return "status-inativo";
  if (s === "trancado" || s === "trancada") return "status-trancado";
  return "";
}
function criarCardAluno(aluno, permitirRemocao = true) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.dataset.id = String(aluno.id);
  const titulo = document.createElement("h3");
  titulo.textContent = aluno.nome;
  const email = criarParagrafo("E-mail", aluno.email),
    curso = criarParagrafo("Curso", aluno.curso),
    status = criarParagrafo("Status", aluno.status),
    classe = classeStatus(aluno.status);
  if (classe) status.classList.add(classe);
  const acoes = document.createElement("div");
  acoes.classList.add("card-acoes");
  const det = document.createElement("button");
  det.type = "button";
  det.textContent = "Ver detalhes";
  det.addEventListener("click", (event) => {
    console.log("Elemento que disparou o evento:", event.target);
    exibirDetalhesAluno(aluno);
  });
  acoes.append(det);
  if (permitirRemocao) {
    const rem = document.createElement("button");
    rem.type = "button";
    rem.textContent = "Remover";
    rem.classList.add("botao-secundario");
    rem.addEventListener("click", () => removerAluno(aluno.id));
    acoes.append(rem);
  }
  card.append(titulo, email, curso, status, acoes);
  return card;
}
function renderizarAlunos(
  listaAlunos,
  destino = "#lista-alunos",
  permitirRemocao = true,
) {
  const lista = seletor(destino);
  if (!lista) return;
  lista.textContent = "";
  const msg = seletor("#mensagem-lista");
  if (listaAlunos.length === 0) {
    if (msg) {
      msg.textContent = "Nenhum aluno encontrado.";
      msg.className = "mensagem mensagem-aviso";
    }
    return;
  }
  if (msg) {
    msg.textContent = "";
    msg.className = "mensagem";
  }
  for (const aluno of listaAlunos)
    lista.append(criarCardAluno(aluno, permitirRemocao));
}
function renderizarCursos(listaCursos) {
  const lista = seletor("#lista-cursos");
  if (!lista) return;
  lista.textContent = "";
  for (const curso of listaCursos) {
    const card = document.createElement("article");
    card.classList.add("card");
    const titulo = document.createElement("h3");
    titulo.textContent = `${curso.sigla} — ${curso.nome}`;
    const status = criarParagrafo("Status", curso.ativo ? "ativo" : "inativo");
    status.classList.add(curso.ativo ? "status-ativo" : "status-inativo");
    card.append(titulo, status);
    lista.append(card);
  }
}
function renderizarMatriculas(listaMatriculas) {
  const lista = seletor("#lista-matriculas");
  if (!lista) return;
  lista.textContent = "";
  for (const m of listaMatriculas) {
    const card = document.createElement("article");
    card.classList.add("card");
    const titulo = document.createElement("h3");
    titulo.textContent = `Matrícula ${m.numero}`;
    const a = criarParagrafo("Aluno", m.aluno),
      c = criarParagrafo("Curso", m.curso),
      s = criarParagrafo("Status", m.status),
      cl = classeStatus(m.status);
    if (cl) s.classList.add(cl);
    card.append(titulo, a, c, s);
    lista.append(card);
  }
}
function renderizarUsuarios(listaUsuarios) {
  const lista = seletor("#lista-usuarios");
  if (!lista) return;
  lista.textContent = "";
  for (const u of listaUsuarios) {
    const card = document.createElement("article");
    card.classList.add("card");
    const titulo = document.createElement("h3");
    titulo.textContent = u.nome;
    const perfil = criarParagrafo("Perfil", u.perfil),
      status = criarParagrafo("Status", u.status);
    status.classList.add(
      u.status === "ativo" ? "status-ativo" : "status-inativo",
    );
    card.append(titulo, perfil, status);
    lista.append(card);
  }
}
function exibirDetalhesAluno(aluno) {
  const nome = seletor("#detalhe-nome");
  if (!nome) return;
  nome.textContent = `Nome: ${aluno.nome}`;
  seletor("#detalhe-email").textContent = `E-mail: ${aluno.email}`;
  seletor("#detalhe-curso").textContent = `Curso: ${aluno.curso}`;
  seletor("#detalhe-status").textContent = `Status: ${aluno.status}`;
}
function aplicarFiltros() {
  const busca = seletor("#busca"),
    status = seletor("#filtro-status");
  if (!busca || !status) return;
  const termo = busca.value.trim().toLowerCase(),
    st = status.value;
  renderizarAlunos(
    alunos.filter(
      (a) =>
        a.nome.toLowerCase().includes(termo) && (st === "" || a.status === st),
    ),
  );
}
function removerAluno(id) {
  const indice = alunos.findIndex((a) => a.id === id);
  if (indice === -1) return;
  alunos.splice(indice, 1);
  aplicarFiltros();
  atualizarDashboard();
}
function cadastrarAluno(event) {
  event.preventDefault();
  const formulario = event.target;
  const novo = {
    id: alunos.length === 0 ? 1 : Math.max(...alunos.map((a) => a.id)) + 1,
    nome: seletor("#nome").value.trim(),
    email: seletor("#email").value.trim(),
    curso: seletor("#curso").value,
    status: seletor("#status").value,
  };
  alunos.push(novo);
  const msg = seletor("#mensagem-cadastro");
  if (msg) {
    msg.textContent = `Aluno ${novo.nome} cadastrado nesta sessão.`;
    msg.className = "mensagem mensagem-sucesso";
  }
  renderizarAlunos(alunos, "#lista-alunos-form", false);
  formulario.reset();
  atualizarDashboard();
}
function configurarEventos() {
  const bd = seletor("#btn-atualizar-dashboard");
  if (bd) bd.addEventListener("click", atualizarDashboard);
  const ba = seletor("#btn-atualizar");
  if (ba) ba.addEventListener("click", () => renderizarAlunos(alunos));
  const busca = seletor("#busca");
  if (busca) busca.addEventListener("input", aplicarFiltros);
  const fs = seletor("#filtro-status");
  if (fs) fs.addEventListener("change", aplicarFiltros);
  const form = seletor("#form-aluno");
  if (form) form.addEventListener("submit", cadastrarAluno);
  const link = seletor("#link-alunos");
  if (link) link.setAttribute("title", "Acessar cadastro de alunos");
}
function inicializarPagina() {
  atualizarDashboard();
  renderizarAlunos(alunos);
  renderizarAlunos(alunos, "#lista-alunos-form", false);
  renderizarCursos(cursosCadastrados);
  renderizarMatriculas(matriculas);
  renderizarUsuarios(usuarios);
  configurarEventos();
}
inicializarPagina();
