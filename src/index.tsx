import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { CourseManage, Main, NoPermission, Home, AuthRedirect, UserCourses, Users, HomeConfig, Login, Courses, Tags, GroupsV2, GroupManage, Reports, Managers, EmployeeUsers } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isWxBrowser, isWxWorkBrowser } from 'models';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="login" element={
        <Login />
      } />
      <Route path="authorize" element={<AuthRedirect />} />
      <Route path="" element={
        <Main /> 
      }>
        <Route path="" element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="publishCourses" element={<Courses publish={true} />} />
        <Route path="courses/:courseId" element={<CourseManage />} />
        <Route path="publishCourses/:courseId" element={<CourseManage />} />
        <Route path="courses/create" element={<CourseManage />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserCourses />} />
        <Route path="groups" element={<GroupsV2 />} />
        <Route path="groups/create" element={<GroupManage />} />
        <Route path="groups/:managerId" element={<GroupManage />} />
        <Route path="homeConfig" element={<HomeConfig />} />
        <Route path="tags" element={<Tags />} />
        <Route path="reports" element={<Reports />} />
        <Route path="managers" element={<Managers />} />
        <Route path="employeeUsers" element={<EmployeeUsers />} />
      </Route>
    </Routes>    
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
