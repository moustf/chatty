import { io } from 'socket.io-client';
import './App.css';

const socket = io();

function App() {
  socket.on('connection', () => {
    console.log('The client connected successfully!');
  });

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}

export default App
