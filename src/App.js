import React from 'react';
import { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSocket } from './context/socket';
import Game from './pages/game';
import List from './pages/list';
import Login from './pages/login';
import CreateGame from './pages/createGame';
import Signup from './pages/signup';
import Index from './pages';
import Header from './components/Header';
import Snackbar from './components/Snackbar';
import { useSnackbar } from './context/snackbar';
import { QueryClient, QueryClientProvider } from 'react-query';

const AuthRoutes = () => {
  const isAuth = localStorage.getItem('user');

  return isAuth ? (
    <Navigate to="/games" replace />
  ) : (
    <div className="layout-container">
      <Header fallback={'/'} />
      <Outlet />
    </div>
  );
};

const UserRoutes = ({ disconnectSocket }) => {
  const isAuth = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    disconnectSocket(isAuth._id);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return isAuth ? (
    <div className="layout-container">
      <Header fallback={'/games'} logout={logout} />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

const queryClient = new QueryClient();

function App() {
  const snackbarCtx = useSnackbar();
  const { connectSocket, disconnectSocket } = useSocket();

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      connectSocket(user._id);
    }
    return () => {
      if (user) disconnectSocket(user._id);
    };
  }, [connectSocket, disconnectSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<AuthRoutes />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>

        <Route
          path="/"
          element={<UserRoutes disconnectSocket={disconnectSocket} />}
        >
          <Route index element={<Navigate to="/games" replace />} />
          <Route path="games" element={<List />} />
          <Route path="create" element={<CreateGame />} />
          <Route path="games/:gameId" element={<Game />} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>

      {snackbarCtx.isDisplayed && <Snackbar />}
    </QueryClientProvider>
  );
}

export default App;
