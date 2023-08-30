
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './routes/registerForm/Register';
import Login from './routes/login/Login';
import ForgotPassword from './routes/forgotPassword/ForgotPassword';
import ResetPassword from './routes/resetPassword/ResetPassword';
import UrlShortner from './routes/urlPage/UrlShortner';
import UrlList from './routes/urlList/UrlList';
import Dashboard from './routes/dashboard/Dashboard';
import EmailVerify from './routes/emailVerify/EmailVerify';
import Errorpage from './routes/errorPage/ErrorPage';

function App() {

  const api = "https://url-shortner-wrk8.onrender.com"

  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard api={api} />} />
          <Route path="/sign-up" element={<Register api={api} />} />
          <Route path="/login" element={<Login api={api} />} />
          <Route path="/forgot_password" element={<ForgotPassword api={api} />} />
          <Route path="/reset_password/:verification/:token" element={<ResetPassword api={api} />} />
          <Route path="/url_shortner" element={<UrlShortner api={api} />} />
          <Route path="/url_list" element={<UrlList api={api} />} />
          <Route path='/user/:id/verify/:token' element={<EmailVerify api={api} />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}


export default App;
