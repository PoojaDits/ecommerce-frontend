import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
  data: T[]
  itemsPerPage?: number
  initialPage?: number
}

export function usePagination<T>({
  data,
  itemsPerPage = 8,
  initialPage = 1,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const maxPage = Math.max(1, Math.ceil(data.length / itemsPerPage))

  // Ensure current page is valid when data changes
  const safePage = Math.min(Math.max(1, currentPage), maxPage)

  const currentData = useMemo(() => {
    const begin = (safePage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }, [data, safePage, itemsPerPage])

  const next = () => {
    setCurrentPage((curr) => Math.min(curr + 1, maxPage))
  }

  const prev = () => {
    setCurrentPage((curr) => Math.max(curr - 1, 1))
  }

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page)
    setCurrentPage(Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentData, currentPage: safePage, maxPage }
}
