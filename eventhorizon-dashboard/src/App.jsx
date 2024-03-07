import { auth } from "./firebase/firebaseConfig";
import Dashboard from "./pages/Dashboard";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import AddEvent from "./pages/AddEvent";
import EventBooking from "./pages/EventBooking";
import AddPasses from "./pages/AddPasses";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import AddReport from "./pages/AddReport";
import DashboardWithGraph from "./pages/DashboardGraph";


defineCustomElements(window);
const PrivateRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? <Navigate to="/" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element :<Home/>,
    children: [
      { index: true, element: <Dashboard/>},
      {
        path: "events/:eventid",
        element: <EventBooking />,
      },
      {
        path: "add-event",
        element: <AddEvent />,
      },
      {
        path: "add-report",
        element: <AddReport />,
      },
      {
        path: "add-passes",
        element: <AddPasses />,
      },
    ],
  },
]);

function App() {
  return (
    <>
              <RouterProvider router={router} />  
    </>
  );
}

// user
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default App;
