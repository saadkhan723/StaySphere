import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main className="main-layout">
      <Outlet />
    </main>
  );
}

export default MainLayout;