import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/loginStyles.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Reg() {
  const navigate = useNavigate();
  const eye = <FontAwesomeIcon icon={faEye} />;

  const [inputs, setInputs] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const [teacherReg, setTeacherReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const addTeacherForm = () => {
    setTeacherReg(true);
  };

  const addStudentForm = () => {
    // setInputs("");
    setTeacherReg(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:80/api/users/register.php",
      data: inputs,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (response) {
      if (response.data.status) {
        navigate("/login");
      } else {
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
        <h2 className="firstHeader">
          University Teacher-Student Appointment System
        </h2>
        <div classname="container-fluid">
          <div classname="row">
            <div className="formBody">
              <div className="card">
                <div className="cardBody">
                  <div className="adminButton">
                    <button className="addTeacher" onClick={addTeacherForm}>
                      Register As Teacher
                    </button>
                    <button className="addStudent" onClick={addStudentForm}>
                      Register As Student
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <h2 className="logregheader">
                      {teacherReg ? "Teacher " : "Student "}Register
                    </h2>

                    <div className="input-group mb-3 hidden">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="pass-wrapper">
                      <div className="input-group mb-3">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter a Password"
                          name="password"
                          onChange={handleChange}
                          required
                        />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                      </div>
                    </div>
                    {!teacherReg && (
                      <div className="input-group mb-3 hidden">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter your Roll"
                          name="roll"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                    {teacherReg && (
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="course"
                          placeholder="Enter Course"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    <div className="input-group mb-3 hidden">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Dept"
                        name="department"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button className="btn btn-info">Register</button>
                    <Link to={`/login`} className="btn btn-info edit">
                      Login
                    </Link>
                    {errorMessage && (
                      <p
                        style={{
                          color: "#ffffffde",
                          fontSize: "20px",
                          textAlign: "center",
                          fontWeight: "500",
                        }}>
                        {errorMessage}
                      </p>
                    )}

                    {/* <input
                      type="submit"
                      className="submitButton btn btn-primary btn-block"
                      name="submit"
                      value="Submit"
                    />
                    <input
                      type="hidden"
                      name="action"
                      value="login"
                      id="action"
                    /> */}
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
