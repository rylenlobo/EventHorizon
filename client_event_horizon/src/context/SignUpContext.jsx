import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const signUpContext = createContext(null);

const SignUpContext = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stepCount, setStepCount] = useState(1);
  const [profile_pic, setProfilePic] = useState(null);
  const [responseData, setResponseData] = useState("");

  return (
    <signUpContext.Provider
      value={{
        email,
        password,
        stepCount,
        setEmail,
        setPassword,
        setStepCount,
        responseData,
        setResponseData,
      }}
    >
      {children}
    </signUpContext.Provider>
  );
};

export default SignUpContext;
