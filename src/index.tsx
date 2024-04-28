import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { Main,  Home,  Users,  Login,  GroupsV2, GroupManage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="login" element={
        <Login />
      } />
      <Route path="" element={
        <Main /> 
      }>
        <Route path="" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="saleInfos" element={<GroupsV2 />} />
        <Route path="saleInfos/create" element={<GroupManage />} />
        <Route path="saleInfos/:id" element={<GroupManage />} />
      </Route>
    </Routes>    
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
