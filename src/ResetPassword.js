import { useState } from "react";

const errors = {
  "Auth.form.error.code.provide":
    "Ce lien de mot de passe oublié est expiré ou invalide.",
  "Auth.form.error.password.matching": "Les mots de passe sont différents",
};

function ResetPassword() {
  const [, code] = window.location.search.split("code=");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const reset = () => {
    if (!password || password !== passwordConfirmation) {
      setError("Les mots de passe sont incomplets ou différents");
      return;
    }
    const body = new FormData();
    body.set("code", code);
    body.set("password", password);
    body.set("passwordConfirmation", passwordConfirmation);
    fetch(`https://api.leqg.app/auth/reset-password`, {
      method: "POST",
      body,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw await res.json();
        }
        setSuccess("Le mot de passe a bien été réinitialisé.");
      })
      .catch(({ data }) => {
        const error = data[0].messages[0].id;
        setError(
          errors[error] ||
            "Erreur inconnue, nous avons été informés. Merci de réessayer plus tard"
        );
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe, encore"
            className="border-2 rounded-lg w-full h-12 px-4"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
