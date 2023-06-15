import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  Redirect,
  useParams,
} from "react-router-dom";

function MainLayout() {
  return <h2>Main page</h2>;
}

function UsersLayout() {
  const { userId, page } = useParams();
  return (
    <>
      <h2>Users layout</h2>
      <Link to="/">Main page</Link>
      {userId ? (
        page === "edit" ? (
          <UserEditPage id={userId} />
        ) : page === "profile" ? (
          <UserPage id={userId} />
        ) : (
          <Redirect to={`/users/${userId}/profile`} />
        )
      ) : (
        <UsersListPage />
      )}
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
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function UserPage({ id }) {
  return (
    <>
      <h4>User page</h4>
      <ul>
        <li>
          <Link to="/users">Users list page</Link>
        </li>
        <li>
          <Link to={`/users/${id}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>User ID: {id}</p>
    </>
  );
}

function UserEditPage({ id }) {
  return (
    <>
      <h4>Edit user page</h4>
      <ul>
        <li>
          <Link to={`/users/${id}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${Number(id) + 1}/profile`}>Another User</Link>
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
      <Switch>
        <Route path="/" exact component={MainLayout} />
        <Route
          path="/users/:userId?/:page(profile|edit)?"
          component={UsersLayout}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
