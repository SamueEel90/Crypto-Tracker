// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllCryptosOverview from './pages/AllCryptosOverview';
import WalletPage from './pages/WalletPage';
import Header from './components/Header';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/CryptoOverview" element={<AllCryptosOverview />} />
        <Route path="/YourWallet" element={< WalletPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
