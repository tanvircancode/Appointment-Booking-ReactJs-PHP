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
  const { sid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkSession(sid);
    getUser();
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSession(sid) {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/checkStudSession.php?id=" + sid,
    }).then(function (response) {
      console.log(response.data.is_session);
      if (response.data.is_session === "1") {
        setCreateSession(true);
      }
    });
  }

  const logout = (sid) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/users/session_delete.php?id=" + sid,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(function (res) {
      console.log(res);
      navigate("/login");
    });
  };

  function getName() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/getName.php?id=" + sid,
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
      console.log(response.data);
    });
  }

  return (
    <div className="container-fluid" style={{ paddingBottom: "60px" }}>
      {createSession ? (
        <div className="row">
          <div className="tbl">
          <Link
              to={`/student/${sid}`}
              className="btn btn-info teacherWeeklyHrs">
              Home
            </Link>
            <div className="studentButton">
              <span>Hi {loggedName}</span>
              <button className="studentLogout" onClick={() => logout(sid)}>
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
                  </tr>
                  <tr>
                    <td></td>
                    {inputs.saturday === null ? (
                      <td>Not Available</td>
                    ) : inputs.saturday !== null && inputs.saturday > 0 ? (
                      <td>
                        <Link to={`makereq/1`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}

                    {inputs.sunday === null ? (
                      <td>Not Available</td>
                    ) : inputs.sunday !== null && inputs.sunday > 0 ? (
                      <td>
                        <Link to={`makereq/2`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}
                    {inputs.monday === null ? (
                      <td>Not Available</td>
                    ) : inputs.monday !== null && inputs.monday > 0 ? (
                      <td>
                        <Link to={`makereq/3`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}
                    {inputs.tuesday === null ? (
                      <td>Not Available</td>
                    ) : inputs.tuesday !== null && inputs.tuesday > 0 ? (
                      <td>
                        <Link to={`makereq/4`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}
                    {inputs.wednesday === null ? (
                      <td>Not Available</td>
                    ) : inputs.wednesday !== null && inputs.wednesday > 0 ? (
                      <td>
                        <Link to={`makereq/5`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}
                    {inputs.thursday === null ? (
                      <td>Not Available</td>
                    ) : inputs.thursday !== null && inputs.thursday > 0 ? (
                      <td>
                        <Link to={`makereq/6`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}
                    {inputs.friday === null ? (
                      <td>Not Available</td>
                    ) : inputs.friday !== null && inputs.friday > 0 ? (
                      <td>
                        <Link to={`makereq/7`} className="btn btn-info edit">
                          Make App Req
                        </Link>
                      </td>
                    ) : (
                      <td>
                        <button className="btn btn-info edit">Booked/Not yet inserted</button>
                      </td>
                    )}
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
