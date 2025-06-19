import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";

//COMPONENTS
import Login from "./pages/Auth/Login";
import RedirectURI from "./pages/Auth/RedirectURI";
import Dashboard from "./pages/Dashboard";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import Statistics from "./pages/Statistics";
import Projects from "./pages/Projects";

function App() {
  const routes = createBrowserRouter([
    {
      index: true,
      path: "/login",
      element: <Login />,
    },
    {
      path: "/callback",
      element: <RedirectURI />,
    },

    {
      path: "/",
      element: <MasterLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },

        {
          path: "projects",
          element: <Projects />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
