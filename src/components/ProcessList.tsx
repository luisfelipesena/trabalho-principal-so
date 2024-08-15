import React from 'react';
import type { Process } from '../models/Process';

interface ProcessListProps {
  processes: Process[];
}

export function ProcessList({ processes }: ProcessListProps) {
  return (
    <div>
      <h2>Processos</h2>
      <ul>
        {processes.map((process) => (
          <li key={process.id}>
            <h3>Processo {process.id}</h3>
            <p>Tempo de chegada: {process.arrivalTime}</p>
            <p>Tempo de execução: {process.executionTime}</p>
            <p>Deadline: {process.deadline}</p>
            <p>Número de páginas: {process.pages.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}