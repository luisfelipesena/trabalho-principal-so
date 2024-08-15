import type { Process } from "../../models/Process";
import { SJF } from "./SJF";

describe("SJF Scheduling Algorithm", () => {
	it("should schedule processes in order of shortest job first", () => {
		const processes: Process[] = [
			{ id: 1, arrivalTime: 0, executionTime: 10, deadline: 20, pages: [] },
			{ id: 2, arrivalTime: 0, executionTime: 5, deadline: 10, pages: [] },
			{ id: 3, arrivalTime: 0, executionTime: 8, deadline: 15, pages: [] },
		];

		const scheduledProcesses = SJF(processes, 1, 0);

		expect(scheduledProcesses).toHaveLength(3);
		expect(scheduledProcesses[0].id).toBe(2);
		expect(scheduledProcesses[1].id).toBe(3);
		expect(scheduledProcesses[2].id).toBe(1);
		expect(scheduledProcesses[0].startTime).toBe(0);
		expect(scheduledProcesses[1].startTime).toBe(5);
		expect(scheduledProcesses[2].startTime).toBe(13);
	});

	it("should handle processes with different arrival times", () => {
		const processes: Process[] = [
			{ id: 1, arrivalTime: 0, executionTime: 10, deadline: 20, pages: [] },
			{ id: 2, arrivalTime: 2, executionTime: 5, deadline: 10, pages: [] },
			{ id: 3, arrivalTime: 4, executionTime: 3, deadline: 8, pages: [] },
		];

		const scheduledProcesses = SJF(processes, 1, 1);

		expect(scheduledProcesses).toHaveLength(3);
		expect(scheduledProcesses[0].id).toBe(1);
		expect(scheduledProcesses[1].id).toBe(3);
		expect(scheduledProcesses[2].id).toBe(2);
		expect(scheduledProcesses[0].startTime).toBe(0);
		expect(scheduledProcesses[1].startTime).toBe(11);
		expect(scheduledProcesses[2].startTime).toBe(15);
	});

	it("should consider overhead between processes", () => {
		const processes: Process[] = [
			{ id: 1, arrivalTime: 0, executionTime: 5, deadline: 10, pages: [] },
			{ id: 2, arrivalTime: 0, executionTime: 3, deadline: 8, pages: [] },
		];

		const scheduledProcesses = SJF(processes, 1, 2);

		expect(scheduledProcesses).toHaveLength(2);
		expect(scheduledProcesses[0].id).toBe(2);
		expect(scheduledProcesses[1].id).toBe(1);
		expect(scheduledProcesses[0].startTime).toBe(0);
		expect(scheduledProcesses[1].startTime).toBe(5); // 3 (execution) + 2 (overhead)
	});
});
