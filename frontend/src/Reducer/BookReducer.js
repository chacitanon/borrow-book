export const BookReducer = (state, action) => {
  switch (action.type) {

    case 'RETRIEVE':
      return action.data;

    case 'ADD':
      if (state.find(el => el.book_id === action.book_id)) {
        return state.map(el =>
          action.book_id === el.book_id
            ? {
              ...el,
              qty: el.qty + (action.qty || 1),
            }
            : el
        );
      }

      return [
        {
          id: action.id,
          image: action.image,
          name: action.name,
          price: action.price,
          qty: action.qty || 1,
        },
        ...state,
      ];

    case 'UPDATE_QTY':
      return state.map(el =>
        action.bookId === el.book_id
          ? {
            ...el,
            qty: +action.qty

          }
          : el
      );


    case 'DELETE':
      return state.filter(el => action.bookId !== el.book_id);

    default:
      return [...state];
  }
};
