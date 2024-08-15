import React, { useState, useEffect } from "react";
import { FIFO as FIFOPageReplacement } from "../algorithms/pageReplacement/FIFO";
import { LRU } from "../algorithms/pageReplacement/LRU";
import type { Page } from "../models/Page";
import type { Process } from "../models/Process";

interface PageReplacementProps {
	processes: Process[];
	ramSize: number;
	onMemoryUpdate: (ram: Page[], disk: Page[]) => void;
}

export function PageReplacement({
	processes,
	ramSize,
	onMemoryUpdate,
}: PageReplacementProps) {
	const [algorithm, setAlgorithm] = useState<"FIFO" | "LRU">("FIFO");
	const [memoryState, setMemoryState] = useState<{ ram: Page[]; disk: Page[] }>(
		{
			ram: [],
			disk: [],
		},
	);

	useEffect(() => {
		const allPages = processes.flatMap((process) => process.pages);
		let updatedPages: Page[];

		if (algorithm === "FIFO") {
			updatedPages = FIFOPageReplacement(allPages, ramSize / 4096); // Assuming 4KB page size
		} else {
			updatedPages = LRU(allPages, ramSize / 4096);
		}

		const ram = updatedPages.filter((page) => page.inMemory);
		const disk = updatedPages.filter((page) => !page.inMemory);

		setMemoryState({ ram, disk });
		onMemoryUpdate(ram, disk);
	}, [processes, ramSize, algorithm, onMemoryUpdate]);

	return (
		<div>
			<h2>Page Replacement</h2>
			<select
				value={algorithm}
				onChange={(e) => setAlgorithm(e.target.value as "FIFO" | "LRU")}
			>
				<option value="FIFO">FIFO</option>
				<option value="LRU">LRU</option>
			</select>
			<div>
				<h3>RAM ({memoryState.ram.length} pages)</h3>
				<ul>
					{memoryState.ram.map((page) => (
						<li key={`${page.processId}-${page.id}`}>
							Process {page.processId}, Page {page.id}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h3>Disk ({memoryState.disk.length} pages)</h3>
				<ul>
					{memoryState.disk.map((page) => (
						<li key={`${page.processId}-${page.id}`}>
							Process {page.processId}, Page {page.id}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
