import React from "react";
import type { Page } from "../models/Page";

interface MemoryUsageChartProps {
	ram: Page[];
	disk: Page[];
	ramSize: number;
}

export function MemoryUsageChart({
	ram,
	disk,
	ramSize,
}: MemoryUsageChartProps) {
	const totalPages = ram.length + disk.length;
	const ramPercentage = (ram.length / totalPages) * 100;
	const diskPercentage = (disk.length / totalPages) * 100;

	return (
		<div>
			<h2>Gráfico de Uso de Memória</h2>
			<div>Tamanho da RAM: {ramSize / 1024} KB</div>
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
					Disco ({disk.length})
				</div>
			</div>
			<div>Total de Páginas: {totalPages}</div>
		</div>
	);
}
