// Dados iniciais da Aula 10. Os registros ficam apenas na memória durante a execução.
const cursosCadastrados = [
  { id: 1, nome: "Análise e Desenvolvimento de Sistemas", cargaHoraria: 2000, status: "ativo" },
  { id: 2, nome: "Gestão de Recursos Humanos", cargaHoraria: 1600, status: "ativo" },
  { id: 3, nome: "Administração", cargaHoraria: 1800, status: "inativo" }
];

const alunos = [
  { id: 1, nome: "Ana Souza", email: "ana@email.com", curso: "Análise e Desenvolvimento de Sistemas", status: "ativo" },
  { id: 2, nome: "Carlos Silva", email: "carlos@email.com", curso: "Análise e Desenvolvimento de Sistemas", status: "ativo" },
  { id: 3, nome: "Mariny Santos", email: "mariny@email.com", curso: "Gestão de Recursos Humanos", status: "inativo" }
];

const matriculas = [
  { id: 1, aluno: "Ana Souza", curso: "Análise e Desenvolvimento de Sistemas", status: "ativo" },
  { id: 2, aluno: "Carlos Silva", curso: "Análise e Desenvolvimento de Sistemas", status: "ativo" },
  { id: 3, aluno: "Mariny Santos", curso: "Gestão de Recursos Humanos", status: "inativo" }
];

const usuarios = [
  { id: 1, nome: "Administrador do Sistema", perfil: "Administrador", status: "ativo" },
  { id: 2, nome: "Secretaria Acadêmica", perfil: "Secretaria", status: "ativo" },
  { id: 3, nome: "Professor João", perfil: "Professor", status: "inativo" }
];
