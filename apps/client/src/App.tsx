import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SignupPage } from "./pages/Signup";
import { LoginPage } from './pages/Login';
import { MainPage } from './pages/Main';
import { useAppDispatch, useAppSelector, useConnect } from './hooks';
import { selectUerData, setUserData } from './features/auth/authSlice';
import { ChatWindow } from './components';

export const App = () => {
  const { socket } = useConnect();
  const queryClient = new QueryClient();

  useEffect(() => {
    const t0 = performance.now();

    socket.on("pong", () => {
      const t1 = performance.now();
      console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    });
    socket.emit("ping");

    return () => {
      socket.removeAllListeners("pong");
    };
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserData());
  }, []);

  const userData = useAppSelector(selectUerData);

  const router = createBrowserRouter([
    {
      index: true,
      element: <LoginPage />
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/main',
      element: <MainPage />,
      children: [
        {
          path: 'chat/:chatId',
          element: <ChatWindow />
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
