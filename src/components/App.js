import React, { useState } from "react";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import { register, authorize, getTokenData } from "../utils/ApiAuth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  // переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // переменные состояния, отвечающие за карточки
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [cards, setCards] = useState([]);

  // переменные состояния, отвечающие за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // переменные состояния, твечающие за лоадеры
  const [isLoading, setIsLoading] = React.useState(false);

  // переменные состояния, отвечающие за авторизацию
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userLogin, setUserLogin] = React.useState(null);
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  // функции открытия/закрытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    // resetValidation();
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    // записать очищение
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsConfirmDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error("error", error));
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  function handleCardDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeleteCardPopupOpen(!isConfirmDeleteCardPopupOpen);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .setUserAvatar(newAvatar)
      .then((link) => {
        setCurrentUser(link);
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);
    api
      .createCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error("error", error))
      .finally(() => {
        setTimeout(() => {
          // чтобы не было видно процесса обратной замены надписи
          setIsLoading(false);
        }, 500);
      });
  }

  // функции для аутентификации на сайте

  function cbLogin({ email, password }) {
    // функция авторизации
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        setIsLoggedIn(true);
        // setEmailValue(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function cbRegister({ email, password }) {
    register(email, password)
      .then((res) => {
        // setPopupStatus({image: checkmarkImg, message: 'Вы успешно зарегистрировались!'});
        // console.log(res);
        setIsRegister(true);
        setIsInfoTooltipOpen(!isInfoTooltipOpen);
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        // setPopupStatus({image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.'});
        setIsRegister(false);
        setIsInfoTooltipOpen(!isInfoTooltipOpen);
      });
    // .finally(handleInfoTooltip);
  }
  // const cbRegister = async ({ email, password }) => {
  //   try {
  //     const data = await register(email, password);
  //     if (!data) {
  //       throw new Error("Ошибка регистрации");
  //     }

  //     if (data.token) {
  //       localStorage.setItem("jwt", data.token);
  //       setIsLoggedIn(true);
  //       setUserData(data.user);
  //       navigate("/sign-in");
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //   }
  // };

  // function checkToken() {
  //   const jwt = localStorage.getItem("jwt");

  //   getTokenData(jwt)
  //     .then((res) => {
  //       // console.log(res.data.email);
  //       setUserLogin(res.data.email );
  //       setIsLoggedIn(true);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  function cbLogOut() {
    setIsLoggedIn(false);
    setUserLogin(null);
    localStorage.removeItem("jwt");
  }

  // React.useEffect(() => {
  //   checkToken();
  // }, [checkToken]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    getTokenData(jwt)
      .then((res) => {
        // console.log(res.data.email);
        setUserLogin(res.data.email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      // console.log("dsdsdsd");
      api
        .getAllData()
        .then((res) => {
          const [initialCards, userData] = res;
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((error) => console.error("error", error));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  loginText={userLogin}
                  signText="Выйти"
                  onClick={cbLogOut}
                  route=""
                />
                <ProtectedRouteElement
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header loginText="" signText="Регистрация" route="/signup" />
                <Login isLoggedIn={isLoggedIn} onLogin={cbLogin} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header loginText="" signText="Войти" route="/signin" />
                <Register isLoggedIn={isLoggedIn} onRegister={cbRegister} />
              </>
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardId={deletedCard}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*   
Не хватает закрытия модальных окон по Esc и оверлей. Лучший способ реализации это описать еще один компонент Popup, 
который будет возвращать обертку div className='.popup ...' В этот компонент передавать children isOpen и функцию закрытия onClose. 
С помощью хука useEffect обхявить обработчик закрытия по Esc и описать проверку, что Если стейт isOpen в истине, 
тогда вешать слушатель на document. Из хука, вне проверки нужно будет вернуть колбэком удаление слушателя 
return () => {document.remove...}. 
В массив зависимостей записать также isOpen, чтобы реакт понимал когда нужно вешать и когда удалять обработчик. 
Также в этом компоненте можно описать функцию клика по overlay. Проверку осуществить через event.target и event.currentTarget. 
Повесить этот обработчик на сам div на событие onClick. Компонент использовать в PopupWithForm и ImagePopup вместо div
*/
