import type { TActivity } from "../types/activity";
import instance from "../utils/axios";
import { notifySuccess, notifyWarn } from "../utils/toast";

const ActionButtons = ({
  activity,
  setActivities,
}: {
  activity: TActivity;
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const isPending = activity.status === "pending";

  const handleStatusChange = async (
    status: "ongoing" | "paused" | "completed"
  ) => {
    try {
      const { data } = await instance.patch(`/activity/${activity._id}`, {
        status,
      });
      setActivities((prev) =>
        prev.map((act) => (act._id === activity._id ? data.activity : act))
      );
      notifySuccess("Activity status updated successfully");
    } catch (error: any) {
      console.log(error);
      notifyWarn(error.response.data.message);
    }
  };
  return (
    <details className="dropdown">
      <summary className="btn min-h-8 h-8 bg-transparent ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {activity.status !== "ongoing" ? (
          <li onClick={() => handleStatusChange("ongoing")}>
            <button>{isPending ? "start" : "resume"}</button>
          </li>
        ) : (
          <>
            <li onClick={() => handleStatusChange("paused")}>
              <button>Pause</button>
            </li>
            <li onClick={() => handleStatusChange("completed")}>
              <button>End</button>
            </li>
          </>
        )}
      </ul>
    </details>
  );
};

export default ActionButtons;
