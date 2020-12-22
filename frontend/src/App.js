import React from "react";
import './App.less';
import "./theme.less";
import "antd/dist/antd.less";

import { Switch, Route } from "react-router-dom";


import Layout from './components/Layout/Layout';
import Register from './pages/Register/Register';
import AdminRegister from './pages/Register/AdminRegister';
import Login from './pages/Login/Login';
import AdminLogin from './pages/Login/AdminLogin';
import HomePage from './pages/Home/HomePage';
import BookForPastner from './pages/BookFor/BookForPastner';
import AddBook from './pages/BookFor/AddBook';
import EditBook from './pages/BookFor/EditBook';
import AllBook from './pages/AllBook/AllBook';
import SingleBook from './pages/SingleBook/SingleBook';
import Cart from './pages/Cart/Cart';
import UserBorrow from './pages/UserBorrow/UserBorrow';
import { BookContextProvider } from "./Context/bookContext";


function App() {
  return (
    <BookContextProvider>
      <Layout>
        <Switch>
          <HomePage exact path="/" />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/book" component={BookForPastner} />
          <Route exact path="/admin/book/add" component={AddBook} />
          <Route exact path="/admin/book/edit/:id" component={EditBook} />
          <Route exact path="/book" component={AllBook} />
          <Route exact path="/book/:id" component={SingleBook} />
          <Route exact path="/Cart" component={Cart} />
          <Route exact path="/admin/register" component={AdminRegister} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/user/borrow" component={UserBorrow} />

        </Switch>
      </Layout>
    </BookContextProvider>
  );
}

export default App;
