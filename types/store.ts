import { Task } from './task';

// Banco de dados temporário na memória
export let globalTasks: Task[] = [
  { 
    id: '1', 
    titulo: 'Prova de PPDM', 
    data: '15/06/2026', 
    categoria: 'Prova',
    descricao: 'Matéria de React Native, navegação e conceitos de componentes nativos.',
    professor: 'Irineu'
  },
  { 
    id: '2', 
    titulo: 'Entrega de BCD', 
    data: '18/06/2026', 
    categoria: 'Trabalho',
    descricao: 'Modelagem relacional de banco de dados e comandos SQL avançados.',
    professor: 'Irineu'
  }
];

export const setGlobalTasks = (newTasks: Task[]) => {
  globalTasks = newTasks;
};
