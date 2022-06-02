import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/loginStyles.css";
import "../../styles/commonStyles.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function CommonInfoEdit() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [createSession, setCreateSession] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    checkSession(id);

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSession(sid) {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/checkStudSession.php?id=" + id,
    }).then(function (response) {
      console.log(response.data.is_session);
      if (response.data.is_session === "1") {
        setCreateSession(true);
      }
    });
  }

  function getUser() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/teacherinfoedit.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }

  // works perfectly with admin api
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:80/api/admin/updateuser.php?id=" + id,
      data: inputs,
    }).then(function (response) {
      //handle success
      console.log(response.data);
      if (response.data.status) {
        navigate(`/student/${id}`);
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
        {createSession ? (
        <div classname="container-fluid">
          <div classname="row">
            <div className="formBody">
              <div className="card">
                <div className="cardBody">
                  <div className="inputAlign">
                    <form onSubmit={handleSubmit}>
                      <h2 className="logregheader">Edit user</h2>

                      <span className="inputLabel">Name </span>
                      <div className="input-group mb-3 ">
                        <input
                          type="text"
                          value={inputs.name}
                          className="form-control"
                          name="name"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Email </span>

                      <div className="input-group mb-3">
                        <input
                          value={inputs.email}
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={handleChange}
                        />
                      </div>

                      {inputs.roll && (
                        <span className="inputLabel">Roll No</span>
                      )}

                      {inputs.roll && (
                        <div className="input-group mb-3 ">
                          <input
                            value={inputs.roll}
                            type="number"
                            className="form-control"
                            name="roll"
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                      )}

                      {inputs.course && (
                        <span className="inputLabel">Course</span>
                      )}

                      {inputs.course && (
                        <div className="input-group mb-3">
                          <input
                            value={inputs.course}
                            type="text"
                            className="form-control"
                            name="course"
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      <span className="inputLabel">Department</span>

                      <div className="input-group mb-3">
                        {inputs.course ? (
                          <input
                            type="text"
                            defaultValue={inputs.department}
                            className="form-control"
                            name="department"
                            onChange={handleChange}
                          />
                        ) : (
                          <input
                            type="text"
                            defaultValue={inputs.department}
                            className="form-control"
                            name="department"
                            onChange={handleChange}
                            readOnly
                          />
                        )}
                      </div>
                      <button style={{ border: "none" }}>Update</button>
                      {inputs.roll ? (
                        <>
                          <Link to={`/student/${id}`} className="editHome">
                            Home
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to={`/teacher/${id}`} className="editHome">
                            Home
                          </Link>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <div className="recordFound">Please login First</div>
        )}
      </div>
    </>
  );
}
