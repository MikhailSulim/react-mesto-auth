import { Link } from "react-router-dom";

function Header({ loginText, signText, route, onClick }) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__auth">
        <p className="header__login">{loginText}</p>
        <Link to={route} className="header__signin" onClick={onClick}>
          {signText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
