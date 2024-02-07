import React from 'react';
import Main from './components/Main';
import Signin from './pages/signin.jsx';
import Signup from './pages/signup.jsx';
import ForgetPass from './pages/forgetPassword';
import ResetPass from './pages/resetPassword';
import Profile from './pages/profile';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import UserCreate from './pages/userCreate.jsx';
import UserEdit from './pages/userEdit.jsx';
import UserList from './pages/userList.jsx';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app-container">
        <BrowserRouter>
          <div className="content-below-navbar">
            <Header />
            <Routes>
              <Route path='/' element={<Main />}></Route>
              <Route path='/user/:email/update' element={user ? <Profile /> : <Navigate to='/' />}></Route>{/*for Profile page. */}
              <Route path='/signin' element={<Signin />}></Route>{/*for Redirect login page. */}
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}></Route>{/*for Redirect signup page.*/}
              <Route path='/forget-password' element={<ForgetPass />}></Route>{/*forget password page.*/}
              <Route path='/reset-password/:resetToken' element={<ResetPass />}></Route> {/*reset password page.*/}
              <Route path="/users" element={<UserList />}></Route> {/*employee list */}
              {/* <Route path="/employee/:id" component={EmployeeDetails} /> */}
              <Route path="/user/:id/edit" element={<UserEdit />}></Route> {/*employee edit*/}
              <Route path="/user-create" element={<UserCreate />}></Route> {/*employee create*/}
            </Routes>
          </div>
          <div className="clear-fix"></div>
          <Footer />
        </BrowserRouter>
    </div>
  );
}
export default App;