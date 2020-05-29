import { GET_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from "../actions";

function reducer(state = {}, action) {
  // console.log("reducer",action.decks)
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      return {
        ...state,
        ...action.title,
      };

    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card],
        },
      };
    case REMOVE_DECK:
      state[action.title] = undefined;
      delete state[action.title];
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default reducer;
