import React from 'react';

const Pagination = ({ total, perPage, curPage, paginate }) => {
  const handleClick = (e, curPage) => {
    e.preventDefault();
    paginate(curPage);
  };

  const pages = Math.ceil(total / perPage);

  return pages > 1 ? (
    <ul className="pagination col s12">
      {[...Array(pages)].map((el, index) => (
        <li
          className={index === curPage ? 'active' : 'waves-effect'}
          key={index}
        >
          <a href="#!" onClick={e => handleClick(e, index)}>
            {index + 1}
          </a>
        </li>
      ))}
    </ul>
  ) : null;
};

export default Pagination;
