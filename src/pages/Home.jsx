import { NavLink, useRouteLoaderData } from "react-router-dom";
import "../assets/css/home.css";

const keyFeatures = [
  "User Registration and Login",
  "Protected Dashboard Routes",
  "Edit User Details",
  "Query String Handling",
  "Schema-based Form Validation",
  "Toast Notifications and Loaders",
  "Multi-user API State Handling",
];

const techStack = [
  "React JS",
  "React Router DOM",
  "React Hook Form + Yup",
  "JSON Server (Self-made REST API)",
  "React Toastify and React Spinners",
];

const authenticationFlow = [
  "User registers through the API",
  "Credentials are validated during login",
  "Authentication state controls route access",
  "Protected routes restrict unauthenticated users",
  "Logout updates session state on the client",
  "User profile changes sync with the API",
];

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
          {keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="home-block">
        <h3>Tech Stack</h3>
        <ul>
          {techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="home-block">
        <h3>Authentication Flow</h3>
        <ol>
          {authenticationFlow.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="home-block">
        <h3>Demo Notice ⚠️</h3>
        <p>
          This project uses a JSON Server API hosted on a free-tier service.{" "}
          <strong>
            User registrations, logins, and profile edits are not permanently
            stored.
          </strong>
          Data may reset when the API restarts, sleeps due to inactivity, or is
          redeployed.
        </p>
        <p>
          You can freely register and test the application with your own data,
          but please note that{" "}
          <strong>your data will not be stored permanently</strong>.
        </p>
      </div>

      <div className="home-block">
        <h3>🧪 Demo User (Always Available After Reset)</h3>
        <p>
          You can use the following pre-seeded demo account to test login
          functionality at any time:
        </p>
        <pre style={{ color: "white", marginTop: "10px" }}>
          {"id: 0"}
          <br />
          {"name: Demo User"}
          <br />
          {"mobile: 9999999999"}
          <br />
          {"password: demo123"}
        </pre>
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
          <NavLink to="/register"> register </NavLink> to explore authenticated
          features and understand practical frontend authentication workflows.
        </p>
      </div>
    </section>
  );
}
