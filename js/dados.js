const alunos = [
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana@exemplo.com",
    curso: "ADS",
    status: "ativo",
  },
  {
    id: 2,
    nome: "Carlos Silva",
    email: "carlos@exemplo.com",
    curso: "CC",
    status: "inativo",
  },
  {
    id: 3,
    nome: "Mariany Santos",
    email: "mariany@exemplo.com",
    curso: "ES",
    status: "ativo",
  },
  {
    id: 4,
    nome: "João Pereira",
    email: "joao@exemplo.com",
    curso: "ADS",
    status: "trancado",
  },
];
const cursosCadastrados = [
  {
    id: 1,
    sigla: "ADS",
    nome: "Análise e Desenvolvimento de Sistemas",
    ativo: true,
  },
  { id: 2, sigla: "CC", nome: "Ciência da Computação", ativo: true },
  { id: 3, sigla: "ES", nome: "Engenharia de Software", ativo: false },
];
const matriculas = [
  { numero: "2026001", aluno: "Ana Souza", curso: "ADS", status: "ativa" },
  { numero: "2026002", aluno: "Carlos Silva", curso: "CC", status: "trancada" },
  { numero: "2026003", aluno: "Mariany Santos", curso: "ES", status: "ativa" },
];
const usuarios = [
  { id: 1, nome: "Administrador", perfil: "administrador", status: "ativo" },
  {
    id: 2,
    nome: "Secretaria Acadêmica",
    perfil: "secretaria",
    status: "ativo",
  },
  { id: 3, nome: "Usuário Consulta", perfil: "consulta", status: "inativo" },
];
