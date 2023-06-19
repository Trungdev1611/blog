import { Routes, Route } from "react-router-dom";
import { PrivateRoute, publicRoute } from "./constant";
import ProtectedRoute from "./ProtectedRoute";
const RouteIndex = () => {
  return (
    <>
      <Routes>
        {publicRoute.map((item) => {
          return (
            <Route path={item.name} key={item.id} element={item.element} />
          );
        })}
        {PrivateRoute.map((item) => {
          return (
            <Route
              path={item.name}
              key={item.id}
              element={<ProtectedRoute>{item.element}</ProtectedRoute>}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default RouteIndex;
