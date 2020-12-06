import React from 'react';
import './PopupWithForm.css';
import { useFormWithValidation } from '../../utils/formValidator';

function PopupWithForm(props) {
  const { isOpen, onClose, handleSubmitPopupWithForm } = props;

  const validate = useFormWithValidation();

  function handleClose() {
    onClose();
    setTimeout(() => validate.resetForm(), 300);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const values = {
      id: validate.values.id,
      firstName: validate.values.firstName,
      lastName: validate.values.lastName,
      email: validate.values.email,
      phone: validate.values.phone,
    };
    handleSubmitPopupWithForm(values);
    handleClose();
  }
  function handleCloseByBackground(e) {
    if (e.target.classList.contains('popup')) {
      handleClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div onClick={handleCloseByBackground} className={`popup ${(isOpen) ? 'popup_opened' : ''}`}>
      <form onSubmit={handleSubmit} id='popupWithForm' className='popup__container'>
        <button onClick={handleClose} className='popup__close' type='button'></button>
        <h2 className='popup__title'>Добавление ряда</h2>
        <label className='popup__input-title' htmlFor='id'>Id</label>
        <input
          onChange={validate.handleChange}
          id='id'
          className={`popup__input ${(validate.errors.id) ? 'popup__input_type_error' : ''}`}
          type='text'
          name='id' 
          minLength='1' 
          maxLength='10' 
          required
          value={validate.values.id || ''}
          placeholder='Введите id'
          pattern='[0-9]{1,10}'
        />
        <span className={`popup__input-error ${(validate.errors.id) ? 'popup__input-error_visible' : ''}`} id="id-error">Неправильный формат id</span>
        <label className='popup__input-title' htmlFor='firstName'>First name</label>
        <input
          onChange={validate.handleChange}
          id='firstName'
          className='popup__input'
          type='text'
          name='firstName'
          minLength='1'
          maxLength='30'
          required
          value={validate.values.firstName || ''}
          placeholder='Введите имя'
          pattern='[A-Za-z]{1,30}'
        />
        <span className={`popup__input-error ${(validate.errors.firstName) ? 'popup__input-error_visible' : ''}`} id="firstName-error">Неправильный формат имени</span>
        <label className='popup__input-title' htmlFor='lastName'>Last name</label>
        <input
          onChange={validate.handleChange}
          id='lastName'
          className='popup__input'
          type='text'
          name='lastName'
          minLength='1'
          maxLength='30'
          required
          value={validate.values.lastName || ''}
          placeholder='Введите фамилию'
          pattern='[A-Za-z]{1,30}'
        />
        <span className={`popup__input-error ${(validate.errors.lastName) ? 'popup__input-error_visible' : ''}`} id="lastName-error">Неправильный формат фамилии</span>
        <label className='popup__input-title' htmlFor='email'>Email</label>
        <input
          onChange={validate.handleChange}
          id='email'
          className='popup__input'
          type='email'
          name='email'
          minLength='1'
          maxLength='60'
          required
          value={validate.values.email || ''}
          placeholder='Введите email'
        />
        <span className={`popup__input-error ${(validate.errors.email) ? 'popup__input-error_visible' : ''}`} id="email-error">Неправильный формат email</span>
        <label className='popup__input-title' htmlFor='phone'>Phone</label>
        <input
          onChange={validate.handleChange}
          id='phone'
          className='popup__input'
          type='text'
          name='phone'
          minLength='1'
          maxLength='30'
          required
          value={validate.values.phone || ''}
          placeholder='Номер телефона в формате (___)___-____'
          pattern='[(]{1}\d{3}[)]{1}\d{3}[-]{1}\d{4}'
        />
        <span className={`popup__input-error ${(validate.errors.phone) ? 'popup__input-error_visible' : ''}`} id="phone-error">Неправильный формат номера телефона</span>
        <button className={`popup__submit ${(validate.isValid) ? '' : 'popup__submit_disabled'}`} disabled={(validate.isValid) ? false : true} type="submit">Добавить в таблицу</button>
      </form>
    </div>
  );
}

export default PopupWithForm;