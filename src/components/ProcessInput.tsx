import React, { useState } from 'react';
import type { Process } from '../models/Process';

interface ProcessInputProps {
  onAddProcess: (process: Process) => void;
}

export function ProcessInput({ onAddProcess }: ProcessInputProps) {
  const [arrivalTime, setArrivalTime] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProcess: Process = {
      id: 0, // Assign a unique ID
      arrivalTime,
      executionTime,
      deadline,
      pages: [],
    };
    onAddProcess(newProcess);
    setArrivalTime(0);
    setExecutionTime(0);
    setDeadline(0);
    setNumPages(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tempo de chegada:
        <input
          type="number"
          value={arrivalTime}
          onChange={(event) => setArrivalTime(Number(event.target.value))}
        />
      </label>
      <br />
      <label>
        Tempo de execução:
        <input
          type="number"
          value={executionTime}
          onChange={(event) => setExecutionTime(Number(event.target.value))}
        />
      </label>
      <br />
      <label>
        Deadline:
        <input
          type="number"
          value={deadline}
          onChange={(event) => setDeadline(Number(event.target.value))}
        />
      </label>
      <br />
      <label>
        Número de páginas:
        <input
          type="number"
          value={numPages}
          onChange={(event) => setNumPages(Number(event.target.value))}
        />
      </label>
      <br />
      <button type="submit">Adicionar processo</button>
    </form>
  );
}