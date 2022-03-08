import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const code = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const reset = () => {
    if (!password || password !== passwordConfirmation) {
      setError("Les mots de passe sont incomplets ou différents");
      return;
    }
    fetch(`https://api.leqg.app/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setSuccess("Le mot de passe a bien été réinitialisé.");
      })
      .catch((error) => {
        setError("An error occurred: ", error.response);
      });
  };

  if (success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-10 max-w-lg">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-bold text-2xl text-gray-700 text-center">
              Mot de passe oublié
            </h1>
            <p className="text-sm text-gray-500 text-center w-5/6">{success}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 max-w-lg">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-bold text-2xl text-gray-700 text-center">
            Mot de passe oublié
          </h1>
          <p className="text-sm text-gray-500 text-center w-5/6">
            Choisissez un mot de passe que vous pourrez retenir après votre
            bière.
          </p>
          <input
            type="password"
            placeholder="Mot de passe"
            className="border-2 rounded-lg w-full h-12 px-4"
            value={password}
            onChange={setPassword}
          />
          <input
            type="password"
            placeholder="Mot de passe, encore"
            className="border-2 rounded-lg w-full h-12 px-4"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            onClick={reset}
            className="bg-blue-400 text-white rounded-md font-semibold px-4 py-3 w-full"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
