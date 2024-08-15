import type { Process } from "../../models/Process";

export function RoundRobin(
	processes: Process[],
	quantum: number,
	overhead: number,
): Process[] {
	const remainingProcesses = processes.map((p) => ({
		...p,
		remainingTime: p.executionTime,
	}));
	const executedProcesses: Process[] = [];
	let currentTime = 0;

	while (remainingProcesses.length > 0) {
		const process = remainingProcesses.shift()!;

		if (currentTime < process.arrivalTime) {
			currentTime = process.arrivalTime;
		}

		const executionTime = Math.min(process.remainingTime, quantum);
		const startTime = currentTime;
		const endTime = startTime + executionTime;

		executedProcesses.push({
			...process,
			startTime,
			endTime,
			waitingTime: startTime - process.arrivalTime,
		});

		process.remainingTime -= executionTime;
		currentTime = endTime + overhead;

		if (process.remainingTime > 0) {
			remainingProcesses.push(process);
		}
	}

	return executedProcesses;
}
