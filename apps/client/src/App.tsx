import { useEffect } from "react";
import { useConnect } from "./hooks/useConnect";
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

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
