//Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  });
}

//Получение информации о пользователе
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
}); 

//Получение текущих курсов валюты
const ratestBoard = new RatesBoard();
const getCourses =() => {
  ApiConnector.getStocks (response => {
    if (response.success) {
      ratestBoard.clearTable();
      ratestBoard.fillTable(response.data);
    }
  });
}
getCourses();
setInterval(getCourses, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager;
//Пополнение баланса
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(response.success, "Счет пополнен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}
//Ковертирование валюты
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Конвертация проведена");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}
//Перевод валюты
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(response.success, "Перевод осуществлен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}
//Работа с избранным
const favoritesWidget = new FavoritesWidget;
//Запрос начального списка избранного
const getList =() => {
  ApiConnector.getFavorites (response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
}
getList();
//Добавление пользователя в избранное
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(response.success, "Пользователь добавлен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}
//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(response.success, "Пользователь удален");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}