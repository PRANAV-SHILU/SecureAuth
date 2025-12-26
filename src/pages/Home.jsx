import { useRouteLoaderData } from "react-router-dom";

export default function Home() {
  const authData = useRouteLoaderData("root");
  const name = authData?.name;
  return (
    <section>
      <h1>Hello {name ? name : 'User'}!</h1>
      <h2>Welcome to Home page of authentication project</h2>
      <p>Explore our products and services.</p>
      <p>Login or register to get started.</p>
      <p>Enjoy your stay!</p>
    </section>
  );
}
