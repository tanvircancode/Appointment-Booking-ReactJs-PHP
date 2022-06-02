/* eslint-disable array-callback-return */
import "../styles/commonStyles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [createSession, setCreateSession] = useState(false);
  const [loggedName, setLoggedName] = useState("");

  const [requestForm, setRequestForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasData, setHasData] = useState(false);
  const [teacherReg, setTeacherReg] = useState(false);
  const [inputs, setInputs] = useState({});

  const { id } = useParams();

  useEffect(() => {
    checkSession(id);
    getUsers();
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSession(sid) {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/checkStudSession.php?id=" + id,
    }).then(function (response) {
      if (response.data.is_session === "1") {
        setCreateSession(true);
      }
    });
  }

  const logout = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/users/session_delete.php?id=" + id,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (res) {
      navigate("/adminlogin");
    });
  };

  function getName() {
    axios({
      method: "get",
      url: "http://localhost:80/api/admin/getAdminName.php?id=" + id,
    }).then(function (response) {
      setLoggedName(response.data.username);
    });
  }

  function getUsers() {
    axios({
      method: "get",
      url: "http://localhost:80/api/admin/fetchCommonAll.php",
    }).then(function (response) {
      console.log(response.data);
      if (response.data.length === 0 || response.data.status === false) {
        setHasData(true);
      }

      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/admin/deleteuser.php?id=" + id,
    }).then(function (response) {
      getUsers();
    });
  };
  const approveUser = (id) => {
    axios({
      method: "put",
      url: "http://localhost:80/api/admin/approveUser.php?id=" + id,
    }).then(function (response) {
      getUsers();
    });
  };
  const rejectUser = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/admin/rejectUser.php?id=" + id,
    }).then(function (response) {
      getUsers();
    });
  };
  const navigate = useNavigate();

  const addTeacherForm = () => {
    setShowTable(false);
    setRequestForm(false);
    setShowForm(true);
    setTeacherReg(true);
  };

  const addStudentForm = () => {
    setShowTable(false);
    setRequestForm(false);
    setShowForm(true);
    setTeacherReg(false);
  };
  const addRequestForm = () => {
    setShowTable(false);
    setShowForm(false);
    setTeacherReg(false);
    setRequestForm(true);
  };
  const gotoAdminHome = () => {
    setShowTable(true);
    setShowForm(false);
    setTeacherReg(false);
    setRequestForm(false);
    getUsers();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:80/api/admin/registerFromAdmin.php",
      data: inputs,
    }).then(function (response) {
      //handle success

      if (response.data.status) {
        setInputs("");

        setErrorMessage("");
        gotoAdminHome();
      }
      if (response.data.status === false) {
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
      <div className="container-fluid" style={{ paddingBottom: "60px" }}>
        {createSession ? (
          <div className="row">
            <div className="tbl">
              <div className="adminButton">
                <button className="addTeacher" onClick={addTeacherForm}>
                  Add Teacher
                </button>
                <button className="addStudent" onClick={addStudentForm}>
                  Add Student
                </button>
                <button className="regRequest" onClick={addRequestForm}>
                  Registration Request(s)
                </button>
                <div className="adminButtonTwo">
                  <span>Hi {loggedName}</span>
                  <button className="studentLogout" onClick={() => logout(id)}>
                    Logout
                  </button>
                </div>
                {requestForm && (
                  <button className="regRequest" onClick={gotoAdminHome}>
                    Home
                  </button>
                )}
              </div>

              {showTable && !hasData && (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover ">
                    <thead>
                      <tr style={{ background: "grey", color: "white" }}>
                        <th scope="col">ID</th>
                        <th>Status</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Roll</th>
                        <th scope="col">Course</th>
                        <th scope="col">Dept</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody id="myTable">
                      {users.map((user, key) => (
                        <tr key={key}>
                          <td>{user.id}</td>
                          <td
                            style={{
                              backgroundColor: "#ff2929",
                              color: "#fff",
                            }}>
                            {user.roll ? "Student" : "Teacher"}
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.roll}</td>
                          <td>{user.course}</td>
                          <td>{user.department}</td>

                          <td>
                            <Link
                              to={`user/${user.id}/edit`}
                              className="btn btn-info edit">
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="btn btn-danger delete">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {hasData && (
              <div className="adminrecordFound">No records found</div>
            )}

            {/* add user */}
            {showForm && (
              <div classname="container-fluid">
                <div classname="row">
                  <div className="formBody">
                    <div className="adminCard">
                      <button className="adminHome" onClick={gotoAdminHome}>
                        Home
                      </button>
                      {/* <Link to={"/adminhome"} className="adminHome">
                      Edit
                    </Link> */}
                      <div className="cardBody">
                        <form onSubmit={handleSubmit} className="formSubmit">
                          <h2 className="logregheader">
                            Add {teacherReg ? "Teacher" : "Student"}
                          </h2>

                          <div className="input-group mb-3 hidden">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your name"
                              name="name"
                              required
                              onChange={handleChange}
                            />
                          </div>

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
                          {!teacherReg && (
                            <div className="input-group mb-3 ">
                              <input
                                type="number"
                                className="form-control"
                                name="roll"
                                required
                                onChange={handleChange}
                                placeholder="Enter Roll"
                              />
                            </div>
                          )}

                          <div className="input-group mb-3 hidden">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Dept"
                              required
                              name="department"
                              onChange={handleChange}
                            />
                          </div>
                          <button>Register</button>
                          {errorMessage && (
                            <p
                              style={{
                                color: "#ffffffde",
                                fontSize: "20px",
                                textAlign: "center",
                                fontWeight: "500",
                              }}>
                              {" "}
                              {errorMessage}{" "}
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
            )}

            {/* end add user */}

            {/* registration request start */}
            {requestForm && (
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover ">
                  <thead>
                    <tr style={{ background: "grey", color: "white" }}>
                      <th scope="col">ID</th>
                      <th>Status</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Roll</th>
                      <th scope="col">Course</th>
                      <th scope="col">Dept</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody id="myTable">
                    {users.map(
                      (user, key) =>
                        user.is_approved === "0" && (
                          <tr key={key}>
                            <td>{user.id}</td>
                            <td
                              style={{
                                backgroundColor: "#ff2929",
                                color: "#fff",
                              }}>
                              {user.roll ? "Student" : "Teacher"}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.roll}</td>
                            <td>{user.course}</td>
                            <td>{user.department}</td>

                            <td>
                              <button
                                onClick={() => approveUser(user.id)}
                                className="btn btn-danger approve-btn delete">
                                Approve
                              </button>
                              <button
                                onClick={() => rejectUser(user.id)}
                                className="btn btn-danger reject-btn delete">
                                Reject
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {/* registration request end */}

            <div className="col-md-2 col-lg-2  col-sm-2 col-xs-2"></div>
          </div>
        ) : (
          <div className="recordFound">Please login First</div>
        )}
      </div>
    </>
  );
}
