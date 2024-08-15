import type React from "react";
import { useState } from "react";
import type { Process } from "../models/Process";

interface ProcessInputProps {
	onAddProcess: (process: Process) => void;
}

export function ProcessInput({ onAddProcess }: ProcessInputProps) {
	const [arrivalTime, setArrivalTime] = useState("");
	const [executionTime, setExecutionTime] = useState("");
	const [deadline, setDeadline] = useState("");
	const [pages, setPages] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newProcess = {
			id: 0,
			arrivalTime: Number(arrivalTime),
			executionTime: Number(executionTime),
			deadline: Number(deadline),
			pages: [],
		};
		onAddProcess(newProcess);
		setArrivalTime("");
		setExecutionTime("");
		setDeadline("");
		setPages("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Tempo de chegada:
				<input
					type="number"
					value={arrivalTime}
					onChange={(e) => setArrivalTime(e.target.value)}
				/>
			</label>
			<label>
				Tempo de execução:
				<input
					type="number"
					value={executionTime}
					onChange={(e) => setExecutionTime(e.target.value)}
				/>
			</label>
			<label>
				Deadline:
				<input
					type="number"
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>
			</label>
			<label>
				Número de páginas:
				<input
					type="number"
					value={pages}
					onChange={(e) => setPages(e.target.value)}
				/>
			</label>
			<button type="submit">Adicionar processo</button>
		</form>
	);
}
