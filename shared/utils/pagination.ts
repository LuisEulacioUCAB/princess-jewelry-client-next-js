/**
 * @param {number} page - Page to resolve.
 * @param {number} pageSize - Numbers or record per page.
 * @returns {{skip:number,first:number}} Page Filters.
 */
export function getPageFilters(
  page: number,
  pageSize: number,
): { page: number; first: number } {
  const first = pageSize;

  return {
    page,
    first,
  };
}
