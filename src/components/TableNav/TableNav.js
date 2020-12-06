import React from 'react';
import './TableNav.css';

function TableNav(props) {
  const { handleClickNav, dataList, pagination, activeNum } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(dataList.length / pagination.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='table-nav'>
      <ul className='table-nav__list'>
        {pageNumbers.map((number) => {
          return (
          <li
            key={number}
            id={number}
            onClick={handleClickNav}
            className={`table-nav__item ${(number === activeNum) ? 'table-nav__item_active' : ''}`}
          >
            {number}
          </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableNav;