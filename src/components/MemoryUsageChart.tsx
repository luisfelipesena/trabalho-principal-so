import React from "react";
import type { Page } from "../models/Page";

interface MemoryUsageChartProps {
	ram: Page[];
	disk: Page[];
}

export function MemoryUsageChart({ ram, disk }: MemoryUsageChartProps) {
	const totalPages = ram.length + disk.length;
	const ramPercentage = (ram.length / totalPages) * 100;
	const diskPercentage = (disk.length / totalPages) * 100;

	return (
		<div>
			<h2>Memory Usage Chart</h2>
			<div
				style={{
					display: "flex",
					height: "20px",
					width: "100%",
					marginBottom: "10px",
				}}
			>
				<div
					style={{
						width: `${ramPercentage}%`,
						backgroundColor: "lightgreen",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					RAM ({ram.length})
				</div>
				<div
					style={{
						width: `${diskPercentage}%`,
						backgroundColor: "lightcoral",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Disk ({disk.length})
				</div>
			</div>
			<div>Total Pages: {totalPages}</div>
		</div>
	);
}
