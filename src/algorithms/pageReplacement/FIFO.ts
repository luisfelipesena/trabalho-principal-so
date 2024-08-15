import type { Page } from "../../models/Page";

export function FIFO(pages: Page[], ramSize: number): Page[] {
	const ramPages: Page[] = [];
	const updatedPages: Page[] = [];

	for (const page of pages) {
		if (ramPages.length < ramSize) {
			ramPages.push(page);
			updatedPages.push({ ...page, inMemory: true });
		} else {
			const replacedPage = ramPages.shift()!;
			ramPages.push(page);
			updatedPages.push(
				{ ...replacedPage, inMemory: false },
				{ ...page, inMemory: true },
			);
		}
	}

	return updatedPages;
}
