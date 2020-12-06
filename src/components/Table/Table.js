import React from 'react';
import './Table.css';
import TableCell from '../TableCell/TableCell';
import TableColumn from '../TableColumn/TableColumn';

function Table(props) {
  const { dataList, pagination, handleClickTableCell, handleSortColumn, columns } = props;
  const indexOfLastData = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstData = indexOfLastData - pagination.itemsPerPage;
  const currentDataList = dataList.slice(indexOfFirstData, indexOfLastData);

  return (
    <table className='table'>
      <thead>
        <tr className='table__item'>
          {columns.map((column, index) => (
            <TableColumn key={index} id={index} column={column} handleSortColumn={handleSortColumn} />
          ))}
        </tr>
      </thead>
      <tbody>
        {currentDataList.map((data, index) => (
          <TableCell key={index} data={data} handleClickTableCell={handleClickTableCell} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;