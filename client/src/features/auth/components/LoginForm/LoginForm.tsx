import { useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginForm.module.css";
import axios from "axios";
import type { ApiResponse } from "../../../../shared/types/api.types";
import type { User } from "../../types/auth.types";

export function LoginForm() {
  // 🔴 Todo: implement login logic.
  // 1. handle the form submission and validation logic. 
  //    - username: admin, alice, bob, carol, or dave
  //    - password: 123
  // 2. call the login API with axios and handle the response. api: POST http://localhost:4000/api/users/login
  // 3. display error message if login fails.
  // 4. on successful login, update the auth context with the user information
  //    (the dropdown closes by itself, because UserBadge re-renders once there is a user).
const API_URL = 'http://localhost:4000/api';

  const {login} = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    setError('');

    if(username.trim()==="" || password.trim() === "") {
      setError("Username and password are required");
      return;
    }
    setSubmit(true);
    try{
      const res = await axios.post<ApiResponse<User>>(`${API_URL}/users/login`,{
        username,
        password
      })
      login(res.data.data);
    }catch{
      setError("Loggin in failed.")
      setSubmit(false)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Username</label>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input type="password" className={styles.input} />
        </div>
        {/* <div className={styles.error}>Wrong username or password</div> */}
        <button type="submit" className={styles.submit} onClick={login}>
          Login
        </button>
      </form>
      <div className={styles.hint}>
        <p>Try: admin, alice, bob, carol, or dave</p>
        <p>Password: 123</p>
      </div>
    </>
  );
}
