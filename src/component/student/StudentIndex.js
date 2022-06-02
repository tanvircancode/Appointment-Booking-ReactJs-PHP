import "../../styles/commonStyles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function StudentIndex() {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [teacherReg, setTeacherReg] = useState(false);
  const [inputs, setInputs] = useState({});
  const [loggedName, setLoggedName] = useState("");

  const [createSession, setCreateSession] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [foundSearchValue, setFoundSearchValue] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const d = new Date();
  let day = d.getDay();

  useEffect(() => {
    checkSession(id);
    getUsers();
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSession(sid) {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/checkStudSession.php?id=" + sid,
    }).then(function (response) {
      console.log(response.data);
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
      navigate("/login");
    });
  };

  function getName() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/getName.php?id=" + id,
    }).then(function (response) {
      setLoggedName(response.data.name);
    });
  }
  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
    search(e.target.value);
  };

  const search = (val) => {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/studentSearch.php?search=" + val,
    }).then(function (response) {
      if (response.data.length > 0) {
        setSearchLoading(false);
        setFoundSearchValue(true);
        setUsers(response.data);
      } else {
        setFoundSearchValue(false);
      }
    });
  };

  function getUsers() {
    axios({
      method: "get",
      url: "http://localhost:80/api/admin/fetchCommonAll.php",
    }).then(function (response) {
      // console.log(response.data);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:80/api/admin/registerFromAdmin.php",
      data: inputs,
    }).then(function (response) {
      //handle success

      if (response.data.status) {
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
    <div className="container-fluid" style={{ paddingBottom: "60px" }}>
      {/* {!loading && <div className="recordFound">Loading...</div>} */}
      {createSession ? (
        <div className="row">
          <div className="tbl">
            <Link
              to={`/student/${id}/allAppointList`}
              className="btn btn-info studentAllAppoint">
              Your Appointment List
            </Link>
            <Link
              to={`/student/${id}/appointlist`}
              className="btn btn-info todayAppointment">
              Today's Appointment
            </Link>
            <div className="studentButton">
              <span>Hi {loggedName}</span>
              <button className="studentLogout" onClick={() => logout(id)}>
                Logout
              </button>
              <br></br>
              <Link
                to={`commoninfoedit`}
                className="btn btn-info edit updateProfile">
                Update Profile
              </Link>
            </div>
            {showTable && (
              <div className="table-responsive studentTable">
                <input
                  style={{
                    border: "3px solid grey",
                    width: "60%",
                    display: "flex",
                    margin: "0 auto",
                    marginBottom: "20px",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  className="form-control search"
                  onChange={onChangeHandler}
                  placeholder="Search by Teacher or Course name"></input>

                {!foundSearchValue && (
                  <div className="recordFound">Record not found</div>
                )}
                {foundSearchValue && (
                  <table className="table table-bordered table-striped table-hover ">
                    <thead>
                      <tr style={{ background: "grey", color: "white" }}>
                        <th scope="col">ID</th>
                        <th>Status</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">Roll</th> */}
                        <th scope="col">Course</th>
                        <th scope="col">Dept</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody id="myTable">
                      {users.map((user, key) => (
                        <tr key={key}>
                          {!user.roll && (
                            <>
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
                              {/* <td>{user.roll}</td> */}
                              <td>{user.course}</td>
                              <td>{user.department}</td>

                              <td>
                                <Link
                                  to={`teacher/${user.id}/teacherhours`}
                                  className="btn btn-info edit">
                                  See Available hours
                                </Link>
                                {/* <button
                                onClick={() => deleteUser(user.id)}
                                className="btn btn-danger delete">
                                Delete
                              </button> */}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* add user */}
          {showForm && (
            <div classname="container-fluid">
              <div classname="row">
                <div className="formBody">
                  <div className="adminCard">
                    <button className="adminHome">Home</button>
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
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* end add user */}

          <div className="col-md-2 col-lg-2  col-sm-2 col-xs-2"></div>
        </div>
      ) : (
        <div className="recordFound">Please login First</div>
      )}
    </div>
  );
}
