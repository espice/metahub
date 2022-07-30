import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  return <div>{loading ? <div>Loading...</div> : children}</div>;
};

export default ProtectedRoute;
