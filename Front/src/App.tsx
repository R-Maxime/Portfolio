import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Home';
import Auth from './datas/Auth';
import Admin from './pages/Admin';
import AdminWorkById from './pages/Admin/Works/WorkById';
import AdminWorks from './pages/Admin/Works/Work';
import WorkById from './pages/Work/WorkById';
import Header from './components/Header';
import Works from './pages/Work/Works';
import Error from './components/Error';
import './styles/global.scss';
import ReactGA from 'react-ga';
import constant from '../constant.js';

ReactGA.initialize(constant.TRACKING_ID);

function App(): React.ReactElement {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/works" element={<Works />} />
          <Route path="/work/:id" element={<WorkById />} />
          {Auth.isAuthenticated() && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/works" element={<AdminWorks />} />
              <Route path="/admin/work/:id" element={<AdminWorkById />} />
            </>
          )}

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
