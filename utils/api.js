import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const FLASH_CARDS = "FLASHCARDS:DECKS";
const NOTIFICATION_KEY = "FLASHCARDS:NOTIFICATIONS";

export function getDecks() {
  return AsyncStorage.getItem(FLASH_CARDS).then((res) => {
    let data = JSON.parse(res);
    //   console.log(data)
    return data;
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(FLASH_CARDS).then((res) => {
    const data = JSON.parse(res);
    return data[id];
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    FLASH_CARDS,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(FLASH_CARDS).then((res) => {
    let data = JSON.parse(res);
    data = {
      ...data,
      [title]: {
        ...data[title],
        questions: [...data[title].questions, card],
      },
    };
    console.log("data", data);
    AsyncStorage.setItem(FLASH_CARDS, JSON.stringify(data));
  });
}

export function removeDeck(title) {
  return AsyncStorage.getItem(FLASH_CARDS).then((res) => {
    let data = JSON.parse(res);
    data[title] = undefined;
    delete data[title];

    AsyncStorage.setItem(FLASH_CARDS, JSON.stringify(data));
  });
}

export function removeItems() {
  return AsyncStorage.removeItem(FLASH_CARDS)
    .then(() => console.log("cleared"))
    .catch((err) => console.log(err));
}

export function clearNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Study Today!",
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setMinutes(tomorrow.getDate() + 1);
            tomorrow.setHours(17);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: "day",
              },

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            );
          }
        });
      }
    });
}
