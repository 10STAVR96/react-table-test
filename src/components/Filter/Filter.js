import React from 'react';
import './Filter.css';

function Filter(props) {
  const { handleFilter } = props;
  const filterRef = React.useRef();

  function handleFilterSubmit(evt) {
    evt.preventDefault();
    const value = filterRef.current.value;
    handleFilter(value);
  }

  return (
    <form onSubmit={handleFilterSubmit} className='filter'>
      <h3 className='filter__header'>Фильтр</h3>
      <input
        ref={filterRef}
        className='filter__input'
        type='text'
        maxLength='100'
        minLength='1'
        required
        placeholder='ключевые слова или текст'
      />
      <button className='filter__submit' type='submit'>Найти</button>
    </form>
  );
}

export default Filter;