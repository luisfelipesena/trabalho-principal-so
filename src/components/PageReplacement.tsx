import React, { useState, useEffect } from "react";
import { FIFO as FIFOPageReplacement } from "../algorithms/pageReplacement/FIFO";
import { LRU } from "../algorithms/pageReplacement/LRU";
import type { Page } from "../models/Page";
import type { Process } from "../models/Process";
import { PAGE_SIZE } from "../utils/constants";

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
  const [memoryState, setMemoryState] = useState<{ ram: Page[]; disk: Page[] }>({
    ram: [],
    disk: [],
  });

  useEffect(() => {
    const allPages = processes.flatMap((p) => p.pages);
    const ramSizeInPages = Math.floor(ramSize / PAGE_SIZE);

    let updatedPages: Page[];
    if (algorithm === "FIFO") {
      updatedPages = FIFOPageReplacement(allPages, ramSizeInPages);
    } else {
      updatedPages = LRU(allPages, ramSizeInPages);
    }

    const ram = updatedPages.filter((p) => p.inMemory);
    const disk = updatedPages.filter((p) => !p.inMemory);

    setMemoryState({ ram, disk });
    onMemoryUpdate(ram, disk);
  }, [processes, ramSize, algorithm, onMemoryUpdate]);

  return (
    <div>
      <h2>Substituição de Páginas</h2>
      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as "FIFO" | "LRU")}>
        <option value="FIFO">FIFO</option>
        <option value="LRU">LRU</option>
      </select>
      <div>
        <h3>RAM ({memoryState.ram.length} páginas)</h3>
        <ul>
          {memoryState.ram.map((page) => (
            <li key={`${page.processId}-${page.id}`}>
              Processo {page.processId}, Página {page.id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Disco ({memoryState.disk.length} páginas)</h3>
        <ul>
          {memoryState.disk.map((page) => (
            <li key={`${page.processId}-${page.id}`}>
              Processo {page.processId}, Página {page.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}