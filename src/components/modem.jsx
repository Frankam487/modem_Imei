import React, { useState } from "react";
import { FaTiktok, FaWhatsapp, FaFacebook, FaTelegram } from "react-icons/fa";

function Modem() {
  const [imei, setImei] = useState("");
  const [unlockCode, setUnlockCode] = useState("");
  const [error, setError] = useState("");

  const isValidIMEI = (imei) => {
    if (!/^[0-9]{15}$/.test(imei)) return false;
    let sum = 0;
    for (let i = 0; i < 14; i++) {
      let num = parseInt(imei[i]);
      if (i % 2 !== 0) num *= 2;
      sum += num > 9 ? num - 9 : num;
    }
    return (sum + parseInt(imei[14])) % 10 === 0;
  };

  const generateUnlockCode = (imei) => {
    let lastSix = imei.slice(-6);
    let result = [parseInt(lastSix[0])];
    let sum1 = parseInt(lastSix[1]) + parseInt(lastSix[2]);
    result.push(sum1 % 10);
    let sum2 = parseInt(lastSix[3]) + parseInt(lastSix[4]);
    result.push(sum2 % 10);
    result.push(3);
    let unlockCode = "8873" + result.join("");
    return unlockCode;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidIMEI(imei)) {
      setUnlockCode(generateUnlockCode(imei));
      setError("");
    } else {
      setUnlockCode("");
      setError("IMEI invalide. Veuillez entrer un IMEI valide.");
    }
  };
  const number = '+237690461830';
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Déblocage MODEMs</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <label className="block mb-2 text-lg">Entrer votre IMEI :</label>
        <input
          type="text"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          className={`w-full p-2 border rounded-lg mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-600"
          }`}
          maxLength="15"
          placeholder="Ex: 123456789012345"
        />
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition">
          Générer le codee
        </button>
      </form>
      {unlockCode && (
        <div className="mt-4 p-4 bg-green-800 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">Code généré :</p>
          <p className="text-2xl font-bold text-green-400">{unlockCode}</p>
        </div>
      )}
      <div className="mt-6 flex gap-4">
        <a href="" className="text-white transition text-4xl">
          <FaTiktok />
        </a>
        <a href={number}  target="_blank" className="text-green-400 transition text-4xl">
          <FaWhatsapp />
        </a>
        <a href="https://www.facebook.com/Frankam/Shopping" className="text-blue-500 transition text-4xl">
          <FaFacebook />
        </a>
        <a href="" target="_blank" className="text-blue-400 transition text-4xl">
          <FaTelegram />

        </a>
      </div>
    </div>
  );
}

export default Modem;
