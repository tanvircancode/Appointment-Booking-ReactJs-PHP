import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/loginStyles.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import Home from '../page/Home.js';

export default function Login() {
  const navigate = useNavigate();
  const eye = <FontAwesomeIcon icon={faEye} />;

  const [inputs, setInputs] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:80/api/admin/adminLogin.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (response) {
      //handle success
      console.log(response.data);
      if (response.data.status) {
        axios({
          method: "post",
          url: "http://localhost:80/api/users/session_insert.php",
          data: response.data.session_id,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        }).then(function (res) {
          navigate(`/adminhome/${res.data.session_id}`);

          console.log(res);
        });
      }
      if (!response.data.status) {
        // navigate("/");
        console.log(response.data);
        setErrorMessage(response.data.message);
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <>
      <div className="bodyStyle">
        <h2 className="adminHeader">
          University Teacher-Student Appointment System
        </h2>
        <div classname="container-fluid">
          <div classname="row">
            <div className="formBody">
              <div className="card">
                <div className="cardBody">
                  <form onSubmit={handleSubmit}>
                    <h2 className="adminlog">Admin Login</h2>

                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="pass-wrapper">
                      <div className="input-group mb-3">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter a Password"
                          name="password"
                          required
                          onChange={handleChange}
                        />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                      </div>
                    </div>

                    <button className="btn btn-info">Login as Admin</button>
                    <Link
                      to={`/login`}
                      className="btn btn-info edit">
                      Login As User
                    </Link>
                    {errorMessage && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "20px",
                          textAlign: "center",
                          fontWeight: "500",
                        }}>
                        {" "}
                        {errorMessage}{" "}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
