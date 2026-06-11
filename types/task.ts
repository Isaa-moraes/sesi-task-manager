// Garante que toda tarefa criada no sistema tenha obrigatoriamente 
// um id, um título, uma data e pertença a uma das três
// categorias pré-definidas (Trabalho, Prova ou Atividade)

export interface Task {
  id: string;
  titulo: string;
  data: string;
  categoria: 'Trabalho' | 'Prova' | 'Atividade';
  descricao: string;
  professor: string;
}