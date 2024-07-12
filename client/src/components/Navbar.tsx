import useAuth from "./hooks/useAuth";
import CreateActivity from "./CreateActivity";
import { TActivity } from "../types/activity";
import instance from "../utils/axios";
import { useNavigate } from "react-router-dom";
instance;

const Navbar = ({
  setActivities,
}: {
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const logout = async () => {
    await instance.get("user/auth/logout");
    setUser(null);
    navigate("login");
  };

  return (
    <nav className="flex h-[12vh] justify-center items-center px-16 py-4 text-base text-center text-gray-300 border-b border-solid backdrop-blur bg-zinc-900 bg-opacity-90 border-neutral-700 max-md:px-5">
      <div className="flex gap-5 justify-between max-w-full w-[1280px] max-md:flex-wrap">
        <h1>My Todo App</h1>
        <div className="flex gap-5 justify-center items-center">
          <CreateActivity setActivities={setActivities} />
          <div className="flex text-white font-medium justify-center items-center">
            {user?.name || ""}
          </div>
          <div
            onClick={logout}
            className="flex text-white cursor-pointer font-medium justify-center items-center"
          >
            {"Logout"}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
