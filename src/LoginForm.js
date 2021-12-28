import { useState } from 'react';
import { performLogin } from "./util";
import styles from "./LoginForm.module.css";

// ================ LOGIN FORM ====================
//
// You are provided with an incomplete login form.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.
//
// Tasks:
//  * Login button should trigger the performLogin() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the performLogin() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the performLogin function to find out how to log in successfully.

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [disableBtn, setDisable] = useState(false);

  const setValue = e => {
    const { value, type } = e.target;

    if (type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  const performLoginAction = async () => {
    setDisable(true);
    setError(null);
    try {
      await performLogin({ email, password });
      setDisable(false);
      window.alert("success");
    } catch(err) {
      setError(String(err));
      setDisable(false);
    }
  };

  console.log("check", email.length, password.length, disableBtn);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <label htmlFor={"email"}>Email</label>
        <input id={"email"} type={"email"} onChange={setValue} />
      </div>
      <div className={styles.row}>
        <label htmlFor={"password"}>Password</label>
        <input id={"password"} type={"password"} onChange={setValue} />
      </div>

      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      <div className={styles.errorMessage}>{error}</div>

      <div className={styles.row}>
        <button onClick={performLoginAction} disabled={!email.length || password.length < 6 || disableBtn}>Login</button>
      </div>
    </div>
  );
}
