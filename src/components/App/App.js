import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import * as MainApi from '../../utils/MainApi';
import { 
  TABLE_COLUMNS,
  defaultMethod,
  ascMethod,
  descMethod,
} from '../../utils/utils';

function App() {
  const [dataList, setDataList] = React.useState([]);
  const [isDisableButton, setIsDisableButton] = React.useState(false);
  const [isPopupOpened, setIsPopupOpened] = React.useState(false);
  const [activeNum, setActiveNum] = React.useState(1); // активный элемент навигации в таблице
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    itemsPerPage: 50,
  });
  const [selectedCell, setSelectedCell] = React.useState({});
  const [isPreload, setIsPreload] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true); // true - идет поиск, false - ошибка
  const [errorMessage, setErrorMessage] = React.useState(false); // состояние ошибки для прелоудера при фильтрации
  const [columns, setColumns] = React.useState(TABLE_COLUMNS);

  function handleAddTableCell() {
    setIsPopupOpened(true);
  }
  function closeAllPopups() {
    setIsPopupOpened(false);
  }
  function handleSubmitPopupWithForm(values) {
    setIsPreload(false);
    setDataList([values, ...dataList]);
  }
  function defautStateSettings() {
    let newPagination = {...pagination};
    newPagination.currentPage = 1;
    setPagination(newPagination);
    setActiveNum(1);
    setSelectedCell({});
    setIsDisableButton(false);
  }
  function startPreload() {
    setIsDisableButton(true);
    setErrorMessage(false);
    setIsPreload(true);
    setIsSuccess(true);
  }
  function incomingError(err) {
    setIsSuccess(false);
    setIsDisableButton(false);
    console.log(err);
  }
  function incomingData(data) {
    setDataList(data);
    defautStateSettings();
    setIsPreload(false);
  }
  function handleGetSmallData() {
    startPreload();
    MainApi.getSmallData()
      .then((res) => incomingData(res))
      .catch((err) => incomingError(err));
  }
  function handleGetLargeData() {
    startPreload();
    MainApi.getLargeData()
      .then((res) => incomingData(res))
      .catch((err) => incomingError(err));
  }
  function handleClickNav(evt) {
    let newPagination = {...pagination};
    newPagination.currentPage = evt.target.id;
    setPagination(newPagination);
    setActiveNum(+evt.target.id);
  }
  function handleClickTableCell(data) {
    setSelectedCell(data);
  }
  function sortDataList({label, type}, sortMethod) {
    let sortedDataList;
    const num = type === Number;

    if (dataList.some((item) => item[label])) {
      sortMethod === ascMethod || sortMethod === defaultMethod ?
      sortedDataList = dataList.sort((a, b) => num ?
      a[label] - b[label] :
      ('' + a[label]).localeCompare(b[label]))
      :
      sortedDataList = dataList.sort((a, b) => num ?
      b[label] - a[label] : 
      ('' + b[label]).localeCompare(a[label]))
    }
    return sortedDataList;
  }
  function handleSortColumn(obj, id) {
    let currentSortMethod = defaultMethod;

    switch (obj.sortMethod) {
      case defaultMethod:
        currentSortMethod = ascMethod;
        break;
      case ascMethod:
        currentSortMethod = descMethod;
        break;
      case descMethod:
        currentSortMethod = ascMethod;
        break;
      default:
        currentSortMethod = ascMethod;
    }

    const changeColumn = columns.map((item, index) => ({ ...item, sortMethod: id === index ? currentSortMethod : defaultMethod }));
    const sortedData = sortDataList(obj, currentSortMethod);
    setDataList(sortedData);
    setColumns(changeColumn);
  }
  function handleFilter(value) {
    const res = dataList.filter(obj => Object.values(obj).some(key => typeof(key) !== 'object' ? key.toString().includes(value) : null));
    if (res.length < 1) {
      setIsPreload(true);
      setIsSuccess(false);
      setErrorMessage(true);
    }
    setDataList(res);
  }

  return (
    <>
      <Header
        handleGetSmallData={handleGetSmallData}
        handleGetLargeData={handleGetLargeData}
        isDisableButton={isDisableButton}
        handleAddTableCell={handleAddTableCell}
      />
      {(isPreload) ?
        <Preloader isSuccess={isSuccess} errorMessage={errorMessage} />
      :
      (dataList && dataList.length > 0) ? 
        <Main 
          dataList={dataList}
          activeNum={activeNum}
          handleClickNav={handleClickNav}
          pagination={pagination}
          selectedCell={selectedCell}
          handleClickTableCell={handleClickTableCell}
          handleSortColumn={handleSortColumn}
          handleFilter={handleFilter}
          columns={columns}
        />
      : ''}
      <PopupWithForm isOpen={isPopupOpened} onClose={closeAllPopups} handleSubmitPopupWithForm={handleSubmitPopupWithForm} />
    </>
  );
}

export default App;
