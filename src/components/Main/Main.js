import React from 'react';
import './Main.css';
import Table from '../Table/Table';
import Filter from '../Filter/Filter';
import TableNav from '../TableNav/TableNav';
import SelectedUserInfo from '../SelectedUserInfo/SelectedUserInfo';

function Main(props) {
  const { 
    dataList, 
    activeNum, 
    handleClickNav, 
    pagination, 
    selectedCell, 
    handleClickTableCell,
    handleSortColumn,
    handleFilter,
    columns,
  } = props;

  return (
    <main className='main'>
      <Table 
        dataList={dataList}
        pagination={pagination}
        handleClickTableCell={handleClickTableCell}
        handleSortColumn={handleSortColumn}
        columns={columns}
      />
      <TableNav 
        handleClickNav={handleClickNav}
        dataList={dataList}
        pagination={pagination}
        activeNum={activeNum}
      />
      <div className='main__table-block'>
        <SelectedUserInfo selectedCell={selectedCell} />
        <Filter handleFilter={handleFilter} />
      </div>
    </main>
  );
}

export default Main;