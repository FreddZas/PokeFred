import "./styles/Pagination.css"

const Pagination = ({currentPage, totalPages, onPageChange, pagesToShow = 10,}) => {
  const handlePageChange = page => {
    onPageChange(page)
  }

  const halfPagesToShow = Math.floor(pagesToShow / 2)
  let startPage = Math.max(currentPage - halfPagesToShow, 1)
  let endPage = Math.min(startPage + pagesToShow - 1, totalPages)

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(endPage - pagesToShow + 1, 1)
  }

  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <button
        className="pagination__prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className='bx bxs-left-arrow' ></i>
      </button>
      <div className="pagination__number">
        {pageNumbers.map(page => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="pagination__next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className='bx bxs-right-arrow'></i>
      </button>
    </div>
  )
}

export default Pagination