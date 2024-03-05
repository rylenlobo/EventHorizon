import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Index from "./components/Index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firbaseConfig";
import CommitteesContext from "./context/CommitteesContext";
import BannersContext from "./context/BannersContext";
import CategoriesContext from "./context/CategoriesContext";
import SignUpContext from "./context/SignUpContext";
import EventBooking from "./pages/EventBooking";
import { isMobile } from "react-device-detect";
import { SignUpForm, ScanIdCard, ConfirmDetails } from "./pages/SignUp";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

defineCustomElements(window);
const PrivateRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? <Navigate to="/" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "signin",
        element: (
          <PrivateRoute>
            <SignIn />
          </PrivateRoute>
        ),
      },
      {
        path: "signup",
        element: <SignUp />,
        children: [
          { index: true, element: <ScanIdCard /> },
          {
            path: "2",
            element: <ConfirmDetails />,
          },
          { path: "3", element: <SignUpForm /> },
        ],
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:eventid",
        element: <EventBooking />,
      },
    ],
  },
]);

function App() {
  if (!isMobile) {
    return <div>Sorry, this website is only accessible on mobile devices.</div>;
  }

  return (
    <>
      <SignUpContext>
        <CategoriesContext>
          <BannersContext>
            <CommitteesContext>
              <RouterProvider router={router} />
            </CommitteesContext>
          </BannersContext>
        </CategoriesContext>
      </SignUpContext>
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
