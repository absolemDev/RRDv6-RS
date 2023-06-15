import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";

function MainLayout() {
  return <h2>Main page</h2>;
}

function UsersLayout() {
  return (
    <>
      <h2>Users layout</h2>
      <Link to="/">Main page</Link>
      <Routes>
        <Route path="" element={<UsersListPage />} />
        <Route path=":userId" element={<Navigate to="profile" />} />
        <Route path=":userId/profile" element={<UserPage />} />
        <Route path=":userId/edit" element={<UserEditPage />} />
        <Route path=":userId/*" element={<Navigate to="profile" />} />
      </Routes>
    </>
  );
}

function UsersListPage() {
  const users = [
    { id: 0, name: "User 0" },
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
  ];
  return (
    <>
      <h3>Users list page</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function UserPage() {
  const { userId } = useParams();
  return (
    <>
      <h4>User page</h4>
      <ul>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>User ID: {userId}</p>
    </>
  );
}

function UserEditPage() {
  const { userId } = useParams();
  return (
    <>
      <h4>Edit user page</h4>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${Number(userId) + 1}/profile`}>Another User</Link>
        </li>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
      </ul>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <h1>App layout</h1>
      <Link to="/users">Users list page</Link>
      <Routes>
        <Route path="" element={<MainLayout />} />
        <Route path="users/*" element={<UsersLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
