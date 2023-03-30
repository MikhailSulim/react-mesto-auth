function Register() {
  return (
    <form className="form-auth" name="form__register">
      <h2 className="form-auth__title" color="#fff">
        Регистрация
      </h2>
      <input
        type="email"
        id="input-register-email"
        className="form-auth__input v__input_email"
        placeholder="Email"
        name="email"
        required
        // onChange={onChange}

        // value={values.avatar || ""}
      />

      <input
        type="password"
        id="input-register-password"
        className="form-auth__input form-auth__input_password"
        placeholder="Пароль"
        name="password"
        required
        // onChange={onChange}

        // value={values.avatar || ""}
      />

      <button className="form-auth__button">Зарегистрироваться </button>
      <a href="" className="form-auth__link">Уже зарегистрированы? Войти</a>
    </form>
  );
}

export default Register;
