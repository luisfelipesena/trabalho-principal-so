import React, { useState } from "react";
import { GanttChart } from "./components/GanttChart";
import { MemoryUsageChart } from "./components/MemoryUsageChart";
import { PageReplacement } from "./components/PageReplacement";
import { ProcessInput } from "./components/ProcessInput";
import { ProcessList } from "./components/ProcessList";
import { Scheduler } from "./components/Scheduler";
import type { Page } from "./models/Page";
import type { Process } from "./models/Process";
import { MAX_PAGES_PER_PROCESS } from "./utils/constants";

export function App() {
	const [processes, setProcesses] = useState<Process[]>([]);
	const [quantum, setQuantum] = useState(1);
	const [overhead, setOverhead] = useState(0);
	const [ramSize, setRamSize] = useState(12 * 1024);
	const [scheduledProcesses, setScheduledProcesses] = useState<Process[]>([]);
	const [memoryState, setMemoryState] = useState<{ ram: Page[]; disk: Page[] }>(
		{ ram: [], disk: [] },
	);

	const handleAddProcess = (process: Process) => {
		const newProcess = {
			...process,
			id: processes.length + 1,
			pages: Array.from({ length: process.pages.length }, (_, index) => ({
				id: index + 1,
				processId: processes.length + 1,
				inMemory: false,
			})),
		};
		setProcesses([...processes, newProcess]);
	};

	const handleSchedule = (scheduledProcesses: Process[]) => {
		setScheduledProcesses(scheduledProcesses);
	};

	const handleMemoryUpdate = (ram: Page[], disk: Page[]) => {
		setMemoryState({ ram, disk });
	};

	const handleReset = () => {
		setProcesses([]);
		setScheduledProcesses([]);
		setMemoryState({ ram: [], disk: [] });
	};

	return (
		<div>
			<h1>
				Simulador de Escalonamento de Processos e Gerenciamento de Memória
			</h1>
			<ProcessInput onAddProcess={handleAddProcess} />
			<button onClick={handleReset}>Limpar Processos</button>
			<ProcessList processes={processes} />
			<div>
				<label>
					Quantum:
					<input
						type="number"
						value={quantum}
						onChange={(e) => setQuantum(Number(e.target.value))}
					/>
				</label>
				<label>
					Sobrecarga:
					<input
						type="number"
						value={overhead}
						onChange={(e) => setOverhead(Number(e.target.value))}
					/>
				</label>
				<label>
					Tamanho da RAM (KB):
					<input
						type="number"
						value={ramSize / 1024}
						onChange={(e) => setRamSize(Number(e.target.value) * 1024)}
						min="1"
					/>
				</label>
			</div>
			<Scheduler
				processes={processes}
				quantum={quantum}
				overhead={overhead}
				onSchedule={handleSchedule}
			/>
			<PageReplacement
				processes={scheduledProcesses}
				ramSize={ramSize}
				onMemoryUpdate={handleMemoryUpdate}
			/>
			<GanttChart processes={scheduledProcesses} />
			<MemoryUsageChart
				ram={memoryState.ram}
				disk={memoryState.disk}
				ramSize={ramSize}
			/>
		</div>
	);
}