import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { validateEmail } from "./loginHelpers";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>(); // Uncommon issue: `undefined` type here is unnecessary.
  const [password, setPassword] = useState<string>(""); // Uncommon issue: Empty initial state might lead to issues if password length is validated upfront.
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Uncommon issue: Validation logic directly in component instead of external validation library.
    if (!email || !validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", { // Uncommon issue: Hardcoded URL instead of environment variable.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Uncommon issue: Error message handling does not use error details from response.
        setError("Failed to log in. Please try again.");
      } else {
        console.log("Login successful!"); // Uncommon issue: Logging sensitive user actions to the console.
      }
    } catch (e) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p className={styles.error}>{error}</p>}
      <label>
        Email:
        <input
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
