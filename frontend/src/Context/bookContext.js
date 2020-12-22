import React, { createContext, useEffect, useReducer } from 'react';
import axios from "../config/axios";
import { BookReducer } from "../Reducer/BookReducer";
import LocalStorageService from '../services/LocalStorageService';


export const BookContext = createContext();

export function BookContextProvider({ children }) {
  const [selectItem, dispatch] = useReducer(BookReducer, []);

  const retrieveAllItems = async () => {
    let data = {};
    if (LocalStorageService.getToken()) {
      ({ data } = await axios.get('/carts'));
    }
    dispatch({ type: 'RETRIEVE', data: data });
  };

  const addItem = async (id, attr) => {
    dispatch({ type: 'ADD', ...attr });
    await axios.post(`/carts/${id}`, {
      qty: attr.qty || 1,
    });
  };

  const sendUpdatedData = async bookId => {
    await axios.post(`/carts/${bookId}`, {
      qty: selectItem.find(item => item.book_id === bookId)
    });
  };

  const updateQty = async (bookId, qty) => {
    const { data: { qty: newQty } } = await axios.post(`/carts/${bookId}`, { qty });
    newQty === 0
      ? deleteBook(bookId)
      : await dispatch({ type: 'UPDATE_QTY', bookId, qty: newQty });
  };


  const deleteBook = async bookId => {
    await axios.delete(`/carts//${bookId}`);
    dispatch({ type: 'DELETE', bookId });
  };
  // useEffect(() => {
  //   retrieveAllItems();
  // }, []);
  return (
    <BookContext.Provider value={{
      retrieveAllItems,
      addItem,
      dispatch,
      updateQty,
      deleteBook,
      sendUpdatedData,
      selectItem
    }}>
      {children}
    </BookContext.Provider>
  );
}