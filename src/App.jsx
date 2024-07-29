import { useState, useCallback } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
    setCopySuccess(""); // Reset copy success message
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        setCopySuccess("Password copied!");
      },
      () => {
        setCopySuccess("Failed to copy password.");
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500">
      <h1 className="text-center text-2xl font-bold">Password Generator</h1>
      <div className="mt-4">
        <label className="block text-sm font-medium">
          Length:
          <input
            type="number"
            min="1"
            max="100"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="ml-2 border border-gray-300 rounded p-1"
          />
        </label>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">
          Include Numbers:
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">
          Include Special Characters:
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={passwordGenerator}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Generate Password
        </button>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">Generated Password:</label>
        <div className="mt-2 p-2 bg-gray-700 text-white rounded">
          {password}
        </div>
        {password && (
          <div className="mt-2 text-center">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Copy Password
            </button>
          </div>
        )}
        {copySuccess && (
          <div className="mt-2 text-center text-sm text-green-300">
            {copySuccess}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
