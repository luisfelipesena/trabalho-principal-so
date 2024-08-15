import type { Process } from "../../models/Process";

export function EDF(
	processes: Process[],
	quantum: number,
	overhead: number,
): Process[] {
	const sortedProcesses = [...processes].sort(
		(a, b) => a.arrivalTime - b.arrivalTime,
	);
	const executedProcesses: Process[] = [];
	let currentTime = 0;

	while (sortedProcesses.length > 0) {
		const availableProcesses = sortedProcesses.filter(
			(p) => p.arrivalTime <= currentTime,
		);

		if (availableProcesses.length === 0) {
			currentTime = sortedProcesses[0].arrivalTime;
			continue;
		}

		const earliestDeadline = availableProcesses.reduce((a, b) =>
			a.deadline < b.deadline ? a : b,
		);
		const index = sortedProcesses.findIndex(
			(p) => p.id === earliestDeadline.id,
		);
		sortedProcesses.splice(index, 1);

		const startTime = currentTime;
		const endTime = startTime + earliestDeadline.executionTime;

		executedProcesses.push({
			...earliestDeadline,
			startTime,
			endTime,
			waitingTime: startTime - earliestDeadline.arrivalTime,
		});

		currentTime = endTime + overhead;
	}

	return executedProcesses;
}
