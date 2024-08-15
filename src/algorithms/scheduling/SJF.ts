import type { Process } from "../../models/Process";

export function SJF(
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

		const shortestJob = availableProcesses.reduce((a, b) =>
			a.executionTime < b.executionTime ? a : b,
		);
		const index = sortedProcesses.findIndex((p) => p.id === shortestJob.id);
		sortedProcesses.splice(index, 1);

		const startTime = currentTime;
		const endTime = startTime + shortestJob.executionTime;

		executedProcesses.push({
			...shortestJob,
			startTime,
			endTime,
			waitingTime: startTime - shortestJob.arrivalTime,
		});

		currentTime = endTime + overhead;
	}

	return executedProcesses;
}
