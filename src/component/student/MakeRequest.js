import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/loginStyles.css";
import "../../styles/commonStyles.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function CommonInfoEdit() {
  const navigate = useNavigate();

  const [teacherInputs, setTeacherInputs] = useState({});
  const [studentInputs, setStudentInputs] = useState({});

  const [createSession, setCreateSession] = useState(false);
  const [loggedName, setLoggedName] = useState("");

  const { sid } = useParams();
  const { id } = useParams();
  const { day } = useParams();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
    checkSession(sid);
    getStudent();
    getUser();
    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkSession(sid) {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/checkStudSession.php?id=" + sid,
    }).then(function (response) {
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
      navigate("/login");
    });
  };

  function getName() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/getName.php?id=" + sid,
    }).then(function (response) {
      setLoggedName(response.data.name);
    });
  }

  //   perfectly works for teacherinfoedit.php cehcked
  function getStudent() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/teacherinfoedit.php?id=" + sid,
    }).then(function (response) {
      setStudentInputs(response.data);
    });
  }

  function getUser() {
    axios({
      method: "get",
      url: "http://localhost:80/api/users/teacherinfoedit.php?id=" + id,
    }).then(function (response) {
      setTeacherInputs(response.data);
    });
  }

  // works perfectly with admin api
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:80/api/users/makeAppointment.php",
      data: {
        tid: teacherInputs.id,
        sid: studentInputs.id,
        date: date,
        course: studentInputs.course,
        student_name: studentInputs.name,
        teacher_name: teacherInputs.name,
        agenda: studentInputs.agenda,
        day: day,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        axios({
          method: "put",
          url: "http://localhost:80/api/users/tempStudHour.php",
          data: {
            day: day,
            tid: teacherInputs.id,
          },
        }).then(function (response) {
          // if (response.data.status) {
          navigate(`/student/${sid}/teacher/${id}/teacherhours`);
          // }
        });
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setStudentInputs((values) => ({ ...values, [name]: value }));
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
              <div className="studentButton">
                <span>Hi {loggedName}</span>
                <button className="studentLogout" onClick={() => logout(sid)}>
                  Logout
                </button>
                <br></br>
              </div>
              <div className="formBody">
                <div className="card">
                  <div className="cardBody">
                    <div className="inputAlign">
                      <form onSubmit={handleSubmit}>
                        <h2 className="logregheader">Make an Appointment</h2>
                        <span className="inputLabel">Today's Date</span>
                        <div className="input-group mb-3 ">
                          <input
                            type="text"
                            value={date}
                            className="form-control"
                            name="date"
                            readOnly
                          />
                        </div>

                        <span className="inputLabel">Teacher Name </span>
                        <div className="input-group mb-3 ">
                          <input
                            type="text"
                            value={teacherInputs.name}
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            readOnly
                          />
                        </div>

                        <span className="inputLabel">Department</span>

                        <div className="input-group mb-3">
                          <input
                            type="text"
                            defaultValue={teacherInputs.department}
                            className="form-control"
                            name="department"
                            onChange={handleChange}
                            readOnly
                          />
                        </div>

                        <span className="inputLabel">Course</span>
                        <div className="input-group mb-3">
                          <input
                            // value={teacherInputs.course}
                            type="text"
                            className="form-control"
                            name="course"
                            onChange={handleChange}
                          />
                        </div>
                        <span className="inputLabel">Agenda</span>
                        <div className="input-group mb-3">
                          <textarea
                            // value={teacherInputs.course}
                            type="text"
                            className="form-control"
                            name="agenda"
                            onChange={handleChange}
                            style={{ resize: "none" }}></textarea>
                        </div>
                        <button type="submit" style={{ border: "none" }}>
                          Create
                        </button>
                        <Link to={`/student/${sid}`} className="editHome">
                          Home
                        </Link>
                        <Link
                          to={`/student/${sid}/teacher/${id}/teacherhours`}
                          className="editBack">
                          Back
                        </Link>
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
