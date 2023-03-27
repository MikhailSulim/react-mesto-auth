function Login() {
  return (
    <form className="form-auth" name="form__login">
      <h2 className="form-auth__title" color="#fff">
        Вход
      </h2>
      <input
        type="email"
        id="input-login-email"
        className="form-auth__input form-auth__input_email"
        placeholder="Email"
        name="email"
        required
        // onChange={onChange}

        // value={values.avatar || ""}
      />

      <input
        type="password"
        id="input-login-password"
        className="form-auth__input form-auth__input_password"
        placeholder="Пароль"
        name="password"
        required
        // onChange={onChange}

        // value={values.avatar || ""}
      />

      <button className="form-auth__button">Войти</button>
    </form>
  );
}

export default Login;
