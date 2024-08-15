import type { Page } from '../../models/Page';

export function LRU(pages: Page[], ramSize: number): Page[] {
  const lruPages: Page[] = [];
  const updatedPages: Page[] = [];
  const pageMap = new Map<number, number>();

  for (const page of pages) {
    const existingIndex = lruPages.findIndex(p => p.id === page.id);

    if (existingIndex !== -1) {
      // Page is already in memory, move it to the end (most recently used)
      lruPages.splice(existingIndex, 1);
      lruPages.push(page);
      updatedPages.push({ ...page, inMemory: true });
    } else if (lruPages.length < ramSize) {
      // There's space in RAM, add the page
      lruPages.push(page);
      updatedPages.push({ ...page, inMemory: true });
    } else {
      // RAM is full, replace the least recently used page
      const lruPage = lruPages.shift()!;
      lruPages.push(page);
      updatedPages.push(
        { ...lruPage, inMemory: false },
        { ...page, inMemory: true }
      );
    }

    // Update the page map for quick lookup
    pageMap.set(page.id, updatedPages.length - 1);
  }

  // Add any pages that are still in RAM but not accessed again
  lruPages.forEach(page => {
    if (!pageMap.has(page.id)) {
      updatedPages.push({ ...page, inMemory: true });
    }
  });

  return updatedPages;
}