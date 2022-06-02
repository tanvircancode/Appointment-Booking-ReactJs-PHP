/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-no-undef */
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/loginStyles.css";
import "../../styles/commonStyles.css";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function TeacherHours() {
  const [inputs, setInputs] = useState({});
  const [createSession, setCreateSession] = useState(false);
  const [loggedName, setLoggedName] = useState("");

  // const [satState, setSatState] = useState(false);
  // const [sunState, setSunState] = useState(false);
  // const [monState, setMonState] = useState(false);
  // const [tuesState, setTuesState] = useState(false);
  // const [wedState, setWedState] = useState(false);
  // const [thursState, setThursState] = useState(false);
  // const [friState, setFriState] = useState(false);

  const [dayNull, setDayNull] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkSession(id);
    getUser();
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

  const deleteDay = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/users/deleteTeacherHour.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      getUser();
    });
  };

  function getUser() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/teacherHours.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      if (response.data.status === false) {
        setDayNull(true);
      }
      setInputs(response.data);
    });
  }

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
            </div>
            <div className="table-responsive studentTable">
              <table className="table table-bordered table-striped table-hover ">
                <thead>
                  <tr style={{ background: "grey", color: "white" }}>
                    {/* <th scope="col">Days</th> */}
                    <th scope="col"></th>
                    <th scope="col">Sat</th>
                    <th scope="col">Sun</th>
                    <th scope="col">Mon</th>
                    <th scope="col">Tues</th>
                    <th scope="col">Wednes</th>
                    <th scope="col">Thurs</th>
                    <th scope="col">Friday</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="myTable">
                  <tr>
                    <td>Total Hours</td>
                    <td>{inputs.saturday}</td>
                    <td>{inputs.sunday}</td>
                    <td>{inputs.monday}</td>
                    <td>{inputs.tuesday}</td>
                    <td>{inputs.wednesday}</td>
                    <td>{inputs.thursday}</td>
                    <td>{inputs.friday}</td>
                    <td>
                      {inputs.saturday === null &&
                        inputs.sunday === null &&
                        inputs.monday === null &&
                        inputs.tuesday === null &&
                        inputs.wednesday === null &&
                        inputs.thursday === null &&
                        inputs.friday === null && (
                          <Link to={`addhour`} className="btn btn-info edit">
                            Add
                          </Link>
                        )}

                      {dayNull && (
                        <Link to={`addhour`} className="btn btn-info edit">
                          Add
                        </Link>
                      )}
                      {inputs.saturday !== null &&
                        inputs.sunday !== null &&
                        inputs.monday !== null &&
                        inputs.tuesday !== null &&
                        inputs.wednesday !== null &&
                        inputs.thursday !== null &&
                        inputs.friday !== null &&
                        !dayNull && (
                          <Link to={`edithour`} className="btn btn-info edit">
                            Edit
                          </Link>
                        )}
                      {/* {!dayNull && (
                      <Link to={`edithour`} className="btn btn-info edit">
                        Edit
                      </Link>
                    )} */}
                      {inputs.saturday !== null &&
                        inputs.sunday !== null &&
                        inputs.monday !== null &&
                        inputs.tuesday !== null &&
                        inputs.wednesday !== null &&
                        inputs.thursday !== null &&
                        inputs.friday !== null &&
                        !dayNull && (
                          <button
                            onClick={() => deleteDay(id)}
                            className="btn btn-danger delete">
                            Delete
                          </button>
                        )}

                      {/* Change id after session work */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="recordFound">Please login First</div>
      )}
    </div>
  );
}
