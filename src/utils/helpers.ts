import type { Process } from "../models/Process";

export function calculateAverageTurnaround(processes: Process[]): number {
	const totalTurnaround = processes.reduce((total, process) => {
		const turnaround =
			(process.waitingTime ?? 0) + (process.executionTime ?? 0);
		return total + turnaround;
	}, 0);

	return totalTurnaround / processes.length;
}

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
