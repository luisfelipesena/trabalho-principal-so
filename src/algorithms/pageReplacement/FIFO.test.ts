import type { Page } from "../../models/Page";
import { FIFO } from "./FIFO";

describe("FIFO Page Replacement Algorithm", () => {
	it("should replace pages in first-in-first-out order", () => {
		const pages: Page[] = [
			{ id: 1, processId: 1, inMemory: false },
			{ id: 2, processId: 1, inMemory: false },
			{ id: 3, processId: 1, inMemory: false },
			{ id: 4, processId: 1, inMemory: false },
			{ id: 1, processId: 1, inMemory: false },
			{ id: 5, processId: 1, inMemory: false },
		];

		const updatedPages = FIFO(pages, 3);

		expect(updatedPages).toHaveLength(9);
		expect(updatedPages[0].id).toBe(1);
		expect(updatedPages[0].inMemory).toBe(true);
		expect(updatedPages[1].id).toBe(2);
		expect(updatedPages[1].inMemory).toBe(true);
		expect(updatedPages[2].id).toBe(3);
		expect(updatedPages[2].inMemory).toBe(true);
		expect(updatedPages[3].id).toBe(1);
		expect(updatedPages[3].inMemory).toBe(false);
		expect(updatedPages[4].id).toBe(4);
		expect(updatedPages[4].inMemory).toBe(true);
		expect(updatedPages[5].id).toBe(2);
		expect(updatedPages[5].inMemory).toBe(false);
		expect(updatedPages[6].id).toBe(1);
		expect(updatedPages[6].inMemory).toBe(true);
		expect(updatedPages[7].id).toBe(3);
		expect(updatedPages[7].inMemory).toBe(false);
		expect(updatedPages[8].id).toBe(5);
		expect(updatedPages[8].inMemory).toBe(true);
	});

	it("should handle RAM size larger than number of pages", () => {
		const pages: Page[] = [
			{ id: 1, processId: 1, inMemory: false },
			{ id: 2, processId: 1, inMemory: false },
			{ id: 3, processId: 1, inMemory: false },
		];

		const updatedPages = FIFO(pages, 5);

		expect(updatedPages).toHaveLength(3);
		expect(updatedPages.every((page) => page.inMemory)).toBe(true);
	});

	it("should handle empty page list", () => {
		const pages: Page[] = [];

		const updatedPages = FIFO(pages, 3);

		expect(updatedPages).toHaveLength(0);
	});
});
