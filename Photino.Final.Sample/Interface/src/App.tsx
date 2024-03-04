import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import photinoLogo from './assets/photino.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => receiveMessage(alert), [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tryphotino.io" target="_blank">
          <img src={photinoLogo} className="logo" alt="Photino logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className='buttons'>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => sendMessage("Hello from JavaScript! 🚀")}>
            Send to main 🚀
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and Photino logos to learn more
      </p>
    </>
  )
}

function sendMessage(data: string) {
  const message = { key: "PHOTINO_TEST_CHANNEL", data }
  //@ts-ignore
  window.external.sendMessage(JSON.stringify(message));
}

function receiveMessage(callback: (data: string) => void) {
  //@ts-ignore
  window.external.receiveMessage((data: string) => {
    const payload = JSON.parse(data) as { key: string, data: string };
    if (payload.key === "PHOTINO_TEST_CHANNEL") {
      callback(payload.data);
    }
  });
}

export default App
