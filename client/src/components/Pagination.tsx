import React, { Dispatch, SetStateAction } from 'react'



type Props = {
    totalPages: number,
    page: number,
    updateParams: (params: Record<string, string>) => void
}

export const Pagination = ({totalPages, page, updateParams} : Props) => {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <button
        onClick={() => updateParams({ page: String(Math.max(1, page - 1)) })
      }
        //</div>(p) => p - 1)
        disabled={page === 1}
      >
        Prev
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        onClick={() => updateParams({ page: String(Math.min(totalPages ?? 1, page + 1)),})}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  )
}
