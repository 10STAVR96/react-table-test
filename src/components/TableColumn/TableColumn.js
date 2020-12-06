import React from 'react';
import { descMethod } from '../../utils/utils';
import '../Table/Table.css';

function TableColumn(props) {
  const { handleSortColumn, column, id } = props;
  const arrowDirection = column.sortMethod !== descMethod ? 'table__arrow_rotate_top' : 'table__arrow_rotate_bottom';

  function handleClick() {
    handleSortColumn(column, id);
  }
  
  return (
    <th onClick={handleClick} className='table__item-header'>
      {column.label}
      <svg className={`table__arrow ${arrowDirection}`} viewBox="0 0 100 85">
        <polygon points="58.263,0.056 100,41.85 58.263,83.641 30.662,83.641 62.438,51.866 0,51.866 0,31.611 62.213,31.611 30.605,0 58.263,0.056" />
      </svg>
    </th>
  );
}

export default TableColumn;