import type { Process } from "../../models/Process";

export function FIFO(
	processes: Process[],
	quantum: number,
	overhead: number,
): Process[] {
	const sortedProcesses = [...processes].sort(
		(a, b) => a.arrivalTime - b.arrivalTime,
	);
	const executedProcesses: Process[] = [];
	let currentTime = 0;

	for (const process of sortedProcesses) {
		if (currentTime < process.arrivalTime) {
			currentTime = process.arrivalTime;
		}

		const executionEndTime = currentTime + process.executionTime;
		executedProcesses.push({
			...process,
			startTime: currentTime,
			endTime: executionEndTime,
			waitingTime: currentTime - process.arrivalTime,
		});

		currentTime = executionEndTime + overhead;
	}

	return executedProcesses;
}
