import React, { useState } from "react";
import { EDF } from "../algorithms/scheduling/EDF";
import { FIFO as FIFOScheduling } from "../algorithms/scheduling/FIFO";
import { RoundRobin } from "../algorithms/scheduling/RoundRobin";
import { SJF } from "../algorithms/scheduling/SJF";
import type { Process } from "../models/Process";

interface SchedulerProps {
	processes: Process[];
	quantum: number;
	overhead: number;
	onSchedule: (scheduledProcesses: Process[]) => void;
}

export function Scheduler({
	processes,
	quantum,
	overhead,
	onSchedule,
}: SchedulerProps) {
	const [algorithm, setAlgorithm] = useState<
		"FIFO" | "SJF" | "RoundRobin" | "EDF"
	>("FIFO");
	const [scheduledProcesses, setScheduledProcesses] = useState<Process[]>([]);

	const handleRunAlgorithm = () => {
		let result: Process[] = [];
		switch (algorithm) {
			case "FIFO":
				result = FIFOScheduling(processes, quantum, overhead);
				break;
			case "SJF":
				result = SJF(processes, quantum, overhead);
				break;
			case "RoundRobin":
				result = RoundRobin(processes, quantum, overhead);
				break;
			case "EDF":
				result = EDF(processes, quantum, overhead);
				break;
		}
		setScheduledProcesses(result);
		onSchedule(result);
	};

	return (
		<>
			<h2>Escalonamento</h2>
			<div>
				<label>
					Algoritmo:
					<select
						value={algorithm}
						onChange={(e) =>
							setAlgorithm(
								e.target.value as "FIFO" | "SJF" | "RoundRobin" | "EDF",
							)
						}
					>
						<option value="FIFO">FIFO</option>
						<option value="SJF">SJF</option>
						<option value="RoundRobin">Round Robin</option>
						<option value="EDF">EDF</option>
					</select>
				</label>
				<button onClick={handleRunAlgorithm}>Executar</button>
			</div>
			<div>
				<h3>Processos escalonados:</h3>
				<ul>
					{scheduledProcesses.map((process) => (
						<li key={process.id}>
							Processo {process.id} - Tempo de chegada: {process.arrivalTime} -
							Tempo de execução: {process.executionTime} - Deadline:{" "}
							{process.deadline}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
