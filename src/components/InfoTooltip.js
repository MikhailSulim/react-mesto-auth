function InfoTooltip() {
  return (
    <div
      // className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}
      className="popup popup_is-opened"
    >
      <div className="popup__container">
        <button
          className={`popup__close `}
          type="button"
          // onClick={onClose}
        />

        {/* <div className="popup__image-info popup__image-info_error" /> */}
        <div className="popup__image-info popup__image-info_success" />

        {/* <h2
          style={{ textAlign: "center", marginBottom: "23px" }}
          className="popup__title"
        >
          Что-то пошло не так! Попробуйте ещё раз.
        </h2> */}
        <h2
          style={{ textAlign: "center", marginBottom: "23px" }}
          className="popup__title"
        >
          Вы успешно зарегистрировались!
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
