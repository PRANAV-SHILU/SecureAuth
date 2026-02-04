import { NavLink, useRouteLoaderData } from "react-router-dom";
import "../assets/css/home.css";

export default function Home() {
  const authData = useRouteLoaderData("root");
  const name = authData?.name;

  return (
    <section className="home">
      <div className="home-hero">
        <h1>Hello {name ? name : "User"}!</h1>
        <h2>SecureAuth – Modern React Authentication System</h2>
        <p>
          SecureAuth is a frontend-focused authentication system built using
          React and React Router DOM. It demonstrates real-world authentication
          patterns without relying on backend authentication or databases.
        </p>
      </div>

      <div className="home-block">
        <h3>Key Features</h3>
        <ul>
          <li>User Registration and Login</li>
          <li>Protected Dashboard Routes</li>
          <li>Edit User Details</li>
          <li>Query String Handling</li>
          <li>Schema-based Form Validation</li>
          <li>Toast Notifications and Loaders</li>
          <li>Multi-user API State Handling</li>
        </ul>
      </div>

      <div className="home-block">
        <h3>Tech Stack</h3>
        <ul>
          <li>React JS</li>
          <li>React Router DOM</li>
          <li>React Hook Form + Yup</li>
          <li>JSON Server (Self-made REST API)</li>
          <li>React Toastify and React Spinners</li>
        </ul>
      </div>

      <div className="home-block">
        <h3>Authentication Flow</h3>
        <ol>
          <li>User registers through the API</li>
          <li>Credentials are validated during login</li>
          <li>Authentication state controls route access</li>
          <li>Protected routes restrict unauthenticated users</li>
          <li>Logout updates session state on the client</li>
          <li>User profile changes sync with the API</li>
        </ol>
      </div>

      <div className="home-block">
        <h3>Project Scope</h3>
        <p>
          This project is intentionally frontend-only. It does not use backend
          authentication, databases, JWTs, cookies, or sessions. The focus is on
          learning routing architecture and authentication logic in React.
        </p>
      </div>

      <div className="home-cta">
        <p>
          <NavLink to="/login"> Log in </NavLink> or{" "}
          <NavLink to="/register"> register </NavLink> to explore authenticated features and understand
          practical frontend authentication workflows.
        </p>
      </div>
    </section>
  );
}
