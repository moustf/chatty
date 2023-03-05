import { useState } from 'react'
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000/test');

function App() {
  const [count, setCount] = useState(0);

  socket.emit('connection', 'hello');

  socket.on('echo', (data) => {
    console.log(data);
  })

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}

export default App
