import React from "react";
import type { Process } from "../models/Process";

interface GanttChartProps {
	processes: Process[];
}

export function GanttChart({ processes }: GanttChartProps) {
	const sortedProcesses = [...processes].sort(
		(a, b) => (a.startTime ?? 0) - (b.startTime ?? 0),
	);
	const maxEndTime = Math.max(...sortedProcesses.map((p) => p.endTime ?? 0));

	return (
		<div>
			<h2>Gantt Chart</h2>
			<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
				{sortedProcesses.map((process) => (
					<div
						key={process.id}
						style={{ display: "flex", alignItems: "center" }}
					>
						<div style={{ width: "100px" }}>Process {process.id}</div>
						<div
							style={{
								height: "20px",
								backgroundColor: "lightblue",
								width: `${(((process.endTime ?? 0) - (process.startTime ?? 0)) / maxEndTime) * 100}%`,
								marginLeft: `${((process.startTime ?? 0) / maxEndTime) * 100}%`,
							}}
						/>
					</div>
				))}
			</div>
			<div>Time: 0 to {maxEndTime}</div>
		</div>
	);
}
