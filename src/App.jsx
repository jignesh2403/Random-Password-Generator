import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [message, setMessage] = useState("");
  const passwordInputRef = useRef(null);

  const generatePassword = useCallback(() => {
    const userInputs = `${name}${phone}${date.replace(/-/g, "")}`.trim();

    if (!userInputs) {
      setPassword("");
      setMessage("Please provide some input to generate a password.");
      return;
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const specialChars = "@#$%^&*";
    let characters = alphabet;

    if (includeSpecialChars) {
      characters += specialChars;
    }

    let tempPassword = userInputs;

    
    if (includeSpecialChars && !/[!@#$%^&*]/.test(tempPassword)) {
      const specialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      tempPassword += specialChar;
    }

   
    while (tempPassword.length < length) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      tempPassword += randomChar;
    }

 
    const finalPassword = tempPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0, length);

    setPassword(finalPassword);
    setMessage("Password successfully generated!");
  }, [name, phone, date, length, includeSpecialChars]);

  const copyToClipboard = useCallback(() => {
    if (password) {
      passwordInputRef.current?.select();
      navigator.clipboard.writeText(password);
      setMessage("Password copied to clipboard!");
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, includeSpecialChars, generatePassword]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Password Generator
        </h1>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              ref={passwordInputRef}
              value={password}
              className="p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500"
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="bg-amber-400 hover:bg-amber-500 text-white p-3 rounded-md"
            >
              Copy
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password Length: {length}
            </label>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="specialChars"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              className="h-5 w-5 text-indigo-600"
            />
            <label htmlFor="specialChars" className="ml-2 text-sm">
              Include Special Characters
            </label>
          </div>
          {message && <p className="text-green-600 text-sm">{message}</p>}
        </div>
        <div className="bg-white p-4 rounded-md mt-6 text-center">
          <span className="text-gray-700 font-medium">Made By </span>
          <a
            href="https://github.com/jignesh2403"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-bold hover:underline"
          >
            JIGNESH
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
