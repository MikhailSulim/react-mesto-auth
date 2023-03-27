function Register() {
  return (
    <form className="register" name="form__register">
      <h2 className="register__title" color="#fff">
        Регистрация
      </h2>
      <input
        type="email"
        id="input-register-email"
        className="register__input register__input_email"
        placeholder="Email"
        name="email"
        required
        // onChange={onChange}

        // value={values.avatar || ""}
      />

      <input
        type="password"
        id="input-register-password"
        className="register__input register__input_password"
        placeholder="Пароль"
        name="password"
        required
        // onChange={onChange}

        // value={values.avatar || ""}
      />

      <button className="register__button">Зарегистрироваться </button>
      <p className="register__link">Уже зарегистрированы? Войти</p>
    </form>
  );
}

export default Register;
