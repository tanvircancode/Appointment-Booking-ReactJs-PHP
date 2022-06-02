import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/loginStyles.css";
import "../../styles/commonStyles.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function TeacherProfile() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUser() {
    axios({
      method: "get",
      url: "http://localhost:80/api/admin/edituser.php?id=" + id,
    }).then(function (response) {
      // console.log(response.data);
      setInputs(response.data);
    });
  }

  return (
    <>
      <div className="bodyStyle">
        <h2 className="firstHeader">
          University Teacher-Student Appointment System
        </h2>
        <div className="studentButton">
            <button className="studentUpdate">Update</button>
            <button className="studentLogout">Logout</button>
          </div>
        <div classname="container-fluid">
          <div classname="row">
            <div className="formBody">
              <div className="card">
                <div className="cardBody">
                  <div className="inputAlign">
                    <form>
                      <h2 className="logregheader">Edit user</h2>

                      <span className="inputLabel">Name </span>
                      <div className="input-group mb-3 ">
                        <input
                          type="text"
                          value={inputs.name}
                          className="form-control"
                          name="name"
                          readOnly
                        />
                      </div>
                      <span className="inputLabel">Email </span>

                      <div className="input-group mb-3">
                        <input
                          value={inputs.email}
                          type="email"
                          className="form-control"
                          name="email"
                          readOnly
                        />
                      </div>

                      <span className="inputLabel">Course</span>

                      <div className="input-group mb-3">
                        <input
                          value={inputs.course}
                          type="text"
                          className="form-control"
                          name="course"
                          readOnly
                        />
                      </div>

                      <span className="inputLabel">Department</span>

                      <div className="input-group mb-3">
                        <input
                          type="text"
                          defaultValue={inputs.department}
                          className="form-control"
                          name="department"
                          readOnly
                        />
                      </div>
                      <Link to={`teacher/${id}/teacherhours`}>
                        See Available hours
                      </Link>
                      <Link to={"/student"} className="editHome">
                        Home
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
