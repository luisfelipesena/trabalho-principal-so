import type { Process } from '../../models/Process';

export function RoundRobin(processes: Process[], quantum: number, overhead: number): Process[] {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const executedProcesses: Process[] = [];
  let currentTime = 0;
  let currentProcessIndex = 0;

  while (currentProcessIndex < sortedProcesses.length) {
    const process = sortedProcesses[currentProcessIndex];
    const executionTime = Math.min(process.executionTime, quantum);

    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    const executionEndTime = currentTime + executionTime;
    executedProcesses.push({
      ...process,
      startTime: currentTime,
      endTime: executionEndTime,
      waitingTime: currentTime - process.arrivalTime,
    });

    process.executionTime -= executionTime;
    currentTime = executionEndTime + overhead;

    if (process.executionTime === 0) {
      currentProcessIndex++;
    }
  }

  return executedProcesses;
}