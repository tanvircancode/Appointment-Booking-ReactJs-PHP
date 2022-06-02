import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/loginStyles.css";
import "../../styles/commonStyles.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Reg() {
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
      url: "http://localhost:80/api/users/teacherHours.php?id=" + id,
    }).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "http://localhost:80/api/users/updateTeacherHour.php?id=" + id,
      data: inputs,
    }).then(function (response) {
      navigate(`/teacher/${id}/teacherhours`);
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
              <div className="cardHours">
                <div className="cardBody">
                  <div className="inputAlign">
                    <form onSubmit={handleSubmit}>
                      <h2 className="logregheader">Edit Days hour</h2>
                      <span className="inputLabel">Saturday </span>
                      <div className="input-group mb-3 ">
                        <input
                          type="number"
                          value={inputs.saturday}
                          className="form-control"
                          name="saturday"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Sunday</span>
                      <div className="input-group mb-3">
                        <input
                          value={inputs.sunday}
                          type="number"
                          className="form-control"
                          name="sunday"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Monday</span>
                      <div className="input-group mb-3">
                        <input
                          value={inputs.monday}
                          type="number"
                          className="form-control"
                          name="monday"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Tuesday</span>
                      <div className="input-group mb-3">
                        <input
                          value={inputs.tuesday}
                          type="number"
                          className="form-control"
                          name="tuesday"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Wednesday</span>
                      <div className="input-group mb-3">
                        <input
                          value={inputs.wednesday}
                          type="number"
                          className="form-control"
                          name="wednesday"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Thursday</span>
                      <div className="input-group mb-3">
                        <input
                          value={inputs.thursday}
                          type="number"
                          className="form-control"
                          name="thursday"
                          onChange={handleChange}
                        />
                      </div>
                      <span className="inputLabel">Friday</span>
                      <div className="input-group mb-3">
                        <input
                          value={inputs.friday}
                          type="number"
                          className="form-control"
                          name="friday"
                          onChange={handleChange}
                        />
                      </div>
                      <button className="insertHour">Update</button>
                      <Link
                        to={`/teacher/${id}`}
                        className="btn btn-info homeFromHour">
                        Home
                      </Link>
                      <Link
                        to={`/teacher/${id}/teacherhours`}
                        className="btn btn-info WeekFromHour">
                        See Weekly Hours
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
