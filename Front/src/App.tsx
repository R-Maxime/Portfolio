import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Home';
import Auth from './datas/Auth';
import Admin from './pages/Admin';
import AdminWorks from './pages/Admin/Works';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          {Auth.isAuthenticated() && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/works" element={<AdminWorks />} />
              <Route path="/admin/work/:id" element={<div>Work by id</div>} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
