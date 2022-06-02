import "../../styles/commonStyles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function StudentIndex() {
  const [users, setUsers] = useState([]);

  const [inputs, setInputs] = useState({});

  const [checkTeacherId, setCheckTeacherId] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [foundSearchValue, setFoundSearchValue] = useState(true);

  const [loggedName, setLoggedName] = useState("");
  const [createSession, setCreateSession] = useState(false);

  const { id } = useParams();
  // const { day } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkSession(id);
    getUsers();
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSession(id) {
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

  const logout = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/users/session_delete.php?id=" + id,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (res) {
      console.log(res);
      navigate("/login");
    });
  };

  function getName() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/getName.php?id=" + id,
    }).then(function (response) {
      setLoggedName(response.data.name);
      console.log(response.data);
    });
  }

  function getUsers() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/fetchTodayTeacherApp.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      setUsers(response.data);
      console.log(users.length);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:80/api/admin/registerFromAdmin.php",
      data: inputs,
    }).then(function (response) {
      //handle success
      console.log(response.data);
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
      {createSession ? (
        <div className="row">
          <div className="tbl">
            <Link
              to={`/teacher/${id}`}
              className="btn btn-info teacherWeeklyHrs">
              Home
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
            {users.length > 0 ? (
              <div className="table-responsive studentTable">
                <table className="table table-bordered table-striped table-hover ">
                  <thead>
                    <tr style={{ background: "grey", color: "white" }}>
                      <th scope="col">Day</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Course</th>
                      <th scope="col">Agenda</th>
                    
                    </tr>
                  </thead>
                  <tbody id="myTable">
                    {users.map((user, key) => (
                      <>
                        <tr key={key}>
                          {user.day === "1" && <td>Saturday</td>}
                          {user.day === "2" && <td>Sunday</td>}
                          {user.day === "3" && <td>Monday</td>}
                          {user.day === "4" && <td>Tuesday</td>}
                          {user.day === "5" && <td>Wednesday</td>}
                          {user.day === "6" && <td>Thursday</td>}
                          {user.day === "7" && <td>Friday</td>}

                          <td>{user.student_name}</td>
                          <td>{user.course}</td>
                          <td>{user.agenda}</td>
                          
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="todayRecordFound">Record not found</div>
            )}
          </div>

          <div className="col-md-2 col-lg-2  col-sm-2 col-xs-2"></div>
        </div>
      ) : (
        <div className="recordFound">Please login First</div>
      )}
    </div>
  );
}
