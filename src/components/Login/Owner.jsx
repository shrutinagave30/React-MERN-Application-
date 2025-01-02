import Navbar from "../Navbar/Navbar";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Owner() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(false);

  function verify() {
    let errDiv = document.getElementById("errDiv");

    if (username === "") {
      setError(true);
      errDiv.innerHTML = "<p>Email cannot be empty!</p>";
      return false;
    }
    if (password.length < 6) {
      setError(true);
      errDiv.innerHTML = "<p>Password length should me more than 6!</p>";
      return false;
    }
    return true;
  }

  async function handleBtn(e) {
    setError(false);

    e.preventDefault();

    if (verify()) {
      let response = await axios.get(`http://localhost:5000/owner`, {
        params: {
          user: username,
          password: password,
        },
      });
      console.log(response.data);

      if(response.data.data === 'ok'){
        navigate('/dashboard')
      }
      else{
        document.getElementById("errDiv").innerHTML="<p>Invalid credentials</p>"
      }
    }
  }

  return (
    <div>
      <Navbar content="Owner Login, Login to continue..." />
      <form>
        <div
          id="errDiv"
          style={err ? { display: "flex" } : { display: "none" }}
        ></div>
        <section>
          <section className="section">Enter username</section>
          <input
            className="input"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </section>

        <section>
          <section className="section">Enter password</section>
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </section>

        <button onClick={handleBtn}>Owner-Login</button>
      </form>
    </div>
  );
}

export default Owner;
