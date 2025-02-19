import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Outlet /> {/* Renders child routes here */}
    </>
  );
}
