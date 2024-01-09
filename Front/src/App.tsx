import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Hello</>} />
        <Route path="/login" element={<Login /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
