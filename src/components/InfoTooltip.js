function InfoTooltip({ isOpen, onClose, isRegister }) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className={`popup__close `} type="button" onClick={onClose} />

        <div
          className={`popup__image-info popup__image-info_${
            isRegister ? "success" : "error"
          }`}
        />

        <h2
          style={{ textAlign: "center", marginBottom: "23px" }}
          className="popup__title"
        >
          {isRegister
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
