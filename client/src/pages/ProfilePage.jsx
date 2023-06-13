import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import { AccountNav } from "../components/AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(false);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!ready) return "Loading...";

  if (ready && !user && !redirect) return <Navigate to={"/login"} />;

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const profileContent = (
    <div className="text-center max-w-lg mx-auto">
      <span>
        Logged in as {user.name} ({user.email})
      </span>
      <button onClick={logout} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && profileContent}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
