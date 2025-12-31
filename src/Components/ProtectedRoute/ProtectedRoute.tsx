// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import { FC, ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import FullscreenLoader from "../Loader/FullscreenLoader";

// const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
//   const { user,loading } = useSelector<RootState, UserState>(state => state.userSlice);

//   return loading ? <FullscreenLoader/> : (user?.role === "admin" ? (
//     <>{children}</>
//   ) : (
//     <Navigate to="/" />
//   ))
// };

// export default ProtectedRoute;

import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserInfoQuery } from "../../Redux/Api/userApi";
import FullscreenLoader from "../Loader/FullscreenLoader";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading, error } = useUserInfoQuery();

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (error || !data?.user || data.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;