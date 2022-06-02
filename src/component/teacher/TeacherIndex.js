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
  const [approve, setApprove] = useState(false);
  // const [loading, setLoading] = useState();


  const { id } = useParams();

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
        // setLoading(true);
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
      url: "http://localhost:80/api/users/fetchAppReq.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      if (response.data.status === false) {
        setCheckTeacherId(true);
      } else {
        setUsers(response.data);
      }
    });
  }
  const rejectReq = (id, teacher_id, day) => {
    axios({
      method: "delete",
      url: "http://localhost:80/api/users/rejectReq.php?id=" + id,
    }).then(function (response) {
      console.log(teacher_id);

      if (response.data.status === true) {
        axios({
          method: "put",
          url: "http://localhost:80/api/users/retainTeacherHours.php",
          data: {
            teacher_id: teacher_id,
            day: day,
          },
        }).then(function (response) {
          console.log(response.data);
          getUsers();
        });
      }
    });
  };
  const approveReq = (id, teacher_id, day) => {
    axios({
      method: "put",
      url: "http://localhost:80/api/users/approveReq.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      getUsers();
      // if (response.data.status === true) {
      //   axios({
      //     method: "put",
      //     url: "http://localhost:80/api/users/updateDay.php",
      //     data: {
      //       teacher_id: teacher_id,
      //       day: day,
      //     },
      //   }).then(function (response) {
      //     console.log(response.data);

      //   });
      // }
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
      {createSession && (
        <div className="row">
          <div className="tbl">
            <Link
              to={`/teacher/${id}/teacherhours`}
              className="btn btn-info teacherWeeklyHrs">
              See Weekly Hours
            </Link>
            <Link
              to={`/teacher/${id}/allAppointList`}
              className="btn btn-info TeacherAllAppoint">
              Your Appointment List
            </Link>
            <Link
              to={`/teacher/${id}/appointlist`}
              className="btn btn-info TeacherTodayAppointment">
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
            <div className="table-responsive studentTable">
              <table className="table table-bordered table-striped table-hover ">
                <thead>
                  <tr style={{ background: "grey", color: "white" }}>
                    <th scope="col">Date</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Course</th>
                    <th scope="col">Agenda</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {!checkTeacherId && (
                  <tbody id="myTable">
                    {users.map((user, key) => (
                      <>
                        {user.is_approved === "0" && (
                          <tr key={key}>
                            <td>{user.date}</td>
                            <td>{user.student_name}</td>
                            <td>{user.course}</td>
                            <td>{user.agenda}</td>

                            <td>
                              <button
                                onClick={() =>
                                  approveReq(user.id, user.teacher_id, user.day)
                                }
                                className="btn btn-danger delete"
                                style={{
                                  backgroundColor: "green",
                                  border: "none",
                                }}>
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  rejectReq(user.id, user.teacher_id, user.day)
                                }
                                className="btn btn-danger delete">
                                Reject
                              </button>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>

          <div className="col-md-2 col-lg-2  col-sm-2 col-xs-2"></div>
        </div>
      )}
      {/* {!loading && <div>Loading...</div>} */}
      {!createSession && <div className="recordFound">Please login First</div>}
    </div>
  );
}
