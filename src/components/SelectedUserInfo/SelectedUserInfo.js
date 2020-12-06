import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './SelectedUserInfo.css';

function SelectedUserInfo(props) {
  const { selectedCell } = props;
  const { firstName, lastName, description, address } = selectedCell;

  return (
    <div className='user-info'>
      <span className='user-info__text'>Выбран пользователь <b>{firstName || ''} {lastName || ''}</b></span>
      <span className='user-info__text'>Описание:</span>
      <TextareaAutosize className='user-info__description' value={description || ''} readOnly maxRows={20} />
      <span className='user-info__text'>Адрес проживания: <b>{address?.streetAddress || ''}</b></span>
      <span className='user-info__text'>Город: <b>{address?.city || ''}</b></span>
      <span className='user-info__text'>Провинция/штат: <b>{address?.state || ''}</b></span>
      <span className='user-info__text'>Индекс: <b>{address?.zip || ''}</b></span>
    </div>
  );
}

export default SelectedUserInfo;