/**
 * Builds a query string from the provided filters, excluding undefined, null, or empty values.
 * @param filters - An object where each key represents a filter and its value is a string.
 * @returns A query string starting with '?' if there are valid filters, otherwise an empty string.
 */
export const buildQueryString = (filters: Record<string, string>) => {
  const filteredFilters: Record<string, string> = {}

  for (const key in filters) {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      filteredFilters[key] = filters[key].toString()
    }
  }

  const queryString = new URLSearchParams(filteredFilters).toString()
  return queryString.length > 0 ? `?${queryString}` : ''
}
