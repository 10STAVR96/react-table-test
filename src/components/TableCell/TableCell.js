import React from 'react';

function TableCell(props) {
  const { data, handleClickTableCell } = props;

  function handleClickItem() {
    handleClickTableCell(data);
  }

  return (
    <tr onClick={handleClickItem} className='table__item'>
      <td className='table__item-cell'>{data.id}</td>
      <td className='table__item-cell'>{data.firstName}</td>
      <td className='table__item-cell'>{data.lastName}</td>
      <td className='table__item-cell'>{data.email}</td>
      <td className='table__item-cell'>{data.phone}</td>
    </tr>
  );
}

export default TableCell;