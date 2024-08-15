import type { Process } from "../../models/Process";
import { RoundRobin } from "./RoundRobin";

describe("Round Robin Scheduling Algorithm", () => {
	it("should schedule processes in round robin fashion", () => {
		const processes: Process[] = [
			{ id: 1, arrivalTime: 0, executionTime: 10, deadline: 20, pages: [] },
			{ id: 2, arrivalTime: 0, executionTime: 5, deadline: 10, pages: [] },
			{ id: 3, arrivalTime: 0, executionTime: 8, deadline: 15, pages: [] },
		];

		const scheduledProcesses = RoundRobin(processes, 4, 1);

		expect(scheduledProcesses).toHaveLength(7);
		expect(scheduledProcesses.map((p) => p.id)).toEqual([1, 2, 3, 1, 2, 3, 1]);
		expect(scheduledProcesses.map((p) => p.startTime)).toEqual([
			0, 5, 10, 15, 20, 22, 27,
		]);
		expect(scheduledProcesses.map((p) => p.endTime)).toEqual([
			4, 9, 14, 19, 21, 26, 29,
		]);
	});

	it("should handle processes with different arrival times", () => {
		const processes: Process[] = [
			{ id: 1, arrivalTime: 0, executionTime: 10, deadline: 20, pages: [] },
			{ id: 2, arrivalTime: 2, executionTime: 5, deadline: 10, pages: [] },
			{ id: 3, arrivalTime: 4, executionTime: 8, deadline: 15, pages: [] },
		];

		const scheduledProcesses = RoundRobin(processes, 4, 1);

		expect(scheduledProcesses).toHaveLength(7);
		expect(scheduledProcesses.map((p) => p.id)).toEqual([1, 2, 3, 1, 2, 3, 1]);
		expect(scheduledProcesses.map((p) => p.startTime)).toEqual([
			0, 5, 10, 15, 20, 22, 27,
		]);
		expect(scheduledProcesses.map((p) => p.endTime)).toEqual([
			4, 9, 14, 19, 21, 26, 29,
		]);
	});
});
