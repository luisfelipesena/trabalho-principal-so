import type { Page } from "./Page";

export interface Process {
  id: number;
  arrivalTime: number;
  executionTime: number;
  deadline: number;
  pages: Page[];
  startTime?: number;
  endTime?: number;
  waitingTime?: number;
}