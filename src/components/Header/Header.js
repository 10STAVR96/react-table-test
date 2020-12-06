import React from 'react';
import './Header.css';

function Header(props) {
  const { handleGetSmallData, handleGetLargeData, isDisableButton, handleAddTableCell } = props;

  return (
    <header className='header'>
      <button 
        onClick={handleGetSmallData}
        className={`header__button ${isDisableButton ? 'header__button_disabled' : ''}`}
        type='button'
        disabled={isDisableButton ? true : false}
      >Загрузить небольшой объем данных</button>
      <button
        onClick={handleGetLargeData}
        className={`header__button ${isDisableButton ? 'header__button_disabled' : ''}`}
        type='button'
        disabled={isDisableButton ? true : false}
      >Загрузить большой объем данных</button>
      <button
        onClick={handleAddTableCell}
        className={`header__button ${isDisableButton ? 'header__button_disabled' : ''}`}
        type='button'
        disabled={isDisableButton ? true : false}
      >Добавить</button>
    </header>
  );
}

export default Header;