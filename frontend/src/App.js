import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './component/layout/Header/Header';
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Product from './component/Product/Product';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import { Navigate } from 'react-router-dom';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from './component/layout/NotFound/NotFound';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    const loadData = async () => {
      try {
  
        if (user) {
          await store.dispatch(loadUser());
          await getStripeApiKey();
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadData();
  }, []);
  return (

    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route exact path="/product/:id" element={<ProductDetails/>} />
          <Route exact path="/products" element={<Product/>} />
          <Route path="/products/:keyword" element={<Product/>} />
          <Route exact path="/search" element={<Search/>} />
          
          <Route
            path="/account"
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to="/account" replace />
              )
            }
          />
          <Route
            path="/me/update"
            element={
              isAuthenticated ? (
                <UpdateProfile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/password/update"
            element={
              isAuthenticated ? (
                <UpdatePassword />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/login" element={<LoginSignUp/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route
            path="/shipping"
            element={
              isAuthenticated ? (
                <Shipping />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/order/confirm"
            element={
              isAuthenticated ? (
                <ConfirmOrder />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {stripeApiKey && (
            <Route 
              path="/process/payment"
              element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
              }
            />
          )}
          <Route
            path="/success"
            element={
              isAuthenticated ? (
                <OrderSuccess />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? (
                <MyOrders />
              ) : (
                <Navigate to="/orders" replace />
              )
            }
          />
          <Route
            path="/order/:id"
            element={
              isAuthenticated  ? (
                <OrderDetails />
              ) : (
                <Navigate to="/order/:id" replace />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            }
          />
          <Route
            path="/admin/products"
            element={
              isAuthenticated ? (
                <ProductList />
              ) : (
                <Navigate to="/admin/products" replace />
              )
            }
          />
          <Route
            path="/admin/product"
            element={
              isAuthenticated ? (
                <NewProduct />
              ) : (
                <Navigate to="/admin/product" replace />
              )
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              isAuthenticated ? (
                <UpdateProduct />
              ) : (
                <Navigate to="/admin/product/:id" replace />
              )
            }
          />
          <Route
            path="/admin/orders"
            element={
              isAuthenticated ? (
                <OrderList />
              ) : (
                <Navigate to="/admin/orders" replace />
              )
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              isAuthenticated ? (
                <ProcessOrder />
              ) : (
                <Navigate to="/admin/order/:id" replace />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              isAuthenticated ? (
                <UserList />
              ) : (
                <Navigate to="/admin/users" replace />
              )
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              isAuthenticated ? (
                <UpdateUser />
              ) : (
                <Navigate to="/admin/user/:id" replace />
              )
            }
          />
          <Route
            path="/admin/reviews"
            element={
              isAuthenticated ? (
                <ProductReviews />
              ) : (
                <Navigate to="/admin/reviews" replace />
              )
            }
          />
          <Route path="*" element={<NotFound />}
        />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
