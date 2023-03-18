import { useEffect } from "react";
import { useConnect } from "./hooks/useConnect";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { SignupPage } from "./pages/Signup";
import "./App.css";

function App() {
  const { socket } = useConnect();

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

  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <SignupPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
