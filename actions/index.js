export const ADD_DECK = "ADD_DECK";
export const GET_DECKS = "GET_DECKS";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_DECK = "REMOVE_DECK";

export function addNewDeck(title) {
  return {
    type: ADD_DECK,
    title: {
      [title]: {
        title,
        questions: [],
      },
    },
  };
}

export function getAllDecks(decks) {
  console.log(decks);
  return {
    type: GET_DECKS,
    decks,
  };
}

export function AddCardInDeck(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}

export function removeItem(title) {
  return {
    type: REMOVE_DECK,
    title,
  };
}
