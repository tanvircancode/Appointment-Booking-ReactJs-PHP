import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reg from "./page/Reg.js";
import Login from "./page/Login.js";

import AdminHome from "./component/AdminHome.js";
import EditUser from "./component/EditUser.js";
import AdminLogin from "./component/AdminLogin.js";

import StudentIndex from "./component/student/StudentIndex.js";
import TeacherHours from "./component/teacher/TeacherHours.js";
import StudTeacherHours from "./component/student/StudTeacherHours.js";
import MakeRequest from "./component/student/MakeRequest.js";
import StudentAppointList from "./component/student/StudentAppointList.js";
import StudTodayAppoint from "./component/student/StudTodayAppoint.js";

import TeacherAppointList from "./component/teacher/TeacherAppointList.js";
import TeacherTodayAppoint from "./component/teacher/TeacherTodayAppoint.js";

import SingleEditHour from "./component/teacher/SingleEditHour.js";
import SingleAddHour from "./component/teacher/SingleAddHour.js";
import CommonInfoEdit from "./component/teacher/CommonInfoEdit.js";

import TeacherIndex from "./component/teacher/TeacherIndex.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/login/reg" element={<Reg />} />
        <Route path="/reg/login" element={<Login />} />


        <Route path="/" element={<AdminLogin />} />
        <Route path="/student/:id" element={<StudentIndex />} />
        <Route path="/teacher/:id" element={<TeacherIndex />} />

        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome/:id" element={<AdminHome />} />

        {/* Admin end */}

        {/* TeacherHours */}
        <Route path="/teacher/:id/teacherhours" element={<TeacherHours />} />
        <Route
          path="/student/:sid/teacher/:id/teacherhours"
          element={<StudTeacherHours />}
        />
        {/* end TeacherHours */}

        {/* make req */}
        <Route
          path="/student/:sid/teacher/:id/teacherhours/makereq/:day"
          element={<MakeRequest />}
        />
        {/* end make req */}

        {/*Student  Appointment List */}

        <Route
          path="/student/:id/allAppointList"
          element={<StudentAppointList />}
        />
        <Route path="/student/:id/appointlist" element={<StudTodayAppoint />} />

        {/* end Student Appointment List */}

        {/*Teacher  Appointment List */}

        <Route
          path="/teacher/:id/allAppointList"
          element={<TeacherAppointList />}
        />
        <Route
          path="/teacher/:id/appointlist"
          element={<TeacherTodayAppoint />}
        />

        {/* end Teacher Appointment List */}

        <Route
          path="/teacher/:id/teacherhours/edithour"
          element={<SingleEditHour />}
        />
        <Route
          path="/teacher/:id/teacherhours/addhour"
          element={<SingleAddHour />}
        />
        {/* for update student and teacher profile */}
        <Route
          path="/student/:id/commoninfoedit"
          element={<CommonInfoEdit />}
        />
        <Route
          path="/student/:id/allAppointList/commoninfoedit"
          element={<CommonInfoEdit />}
        />
        <Route
          path="/student/:id/appointlist/commoninfoedit"
          element={<CommonInfoEdit />}
        />
        <Route
          path="/teacher/:id/commoninfoedit"
          element={<CommonInfoEdit />}
        />
        {/* for update student and teacher profile  */}

        <Route path="/adminhome/:aid/user/:id/edit" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
