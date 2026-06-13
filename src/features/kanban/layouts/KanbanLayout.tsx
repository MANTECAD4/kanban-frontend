import { Link, Outlet } from "react-router";

export const KanbanLayout = () => {
  return (
    <>
      <div>KanbanLayout</div>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">register</Link>
      <Outlet />
    </>
  );
};
