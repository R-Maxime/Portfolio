import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Home';
import Auth from './datas/Auth';
import Admin from './pages/Admin';
import AdminWorkById from './pages/Admin/Works/WorkById';
import AdminWorks from './pages/Admin/Works/Work';
import WorkById from './pages/Work/WorkById';
import Header from './components/Header';
import './styles/index.scss';
import Works from './pages/Work/Works';
import Error from './components/Error';

class App extends Component {
  render() {
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
}

export default App;
