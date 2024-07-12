import type { TActivity } from "../types/activity";
import { formatTime } from "../utils/helpers";
import ActionButtons from "./ActionButtons";
import ActiveDuration from "./ActiveDuration";
import Loader from "./Loader";
import instance from "../utils/axios";
import { notifySuccess } from "../utils/toast";
import ActivityLogs from "./ActivityLogs";

const Table = ({
  activities,
  loading,
  setActivities,
}: {
  activities: TActivity[];
  loading: boolean;
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const deleteActivity = async (id: string) => {
    try {
      await instance.delete(`activity/${id}`);
      setActivities((prev) => prev.filter((activity) => activity._id !== id));
      notifySuccess("Activity deleted successfully");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Serial Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Activity name
                </th>
                <th scope="col" className="px-6 py-3">
                  Active Duration
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Total Active Duration
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {activity.name}
                  </td>
                  <td className="px-6 py-4">
                    {activity.status === "ongoing" ? (
                      <ActiveDuration
                        duration={new Date(activity.lastResumedAt)}
                      />
                    ) : (
                      "00:00:00"
                    )}
                  </td>
                  {/* <td className="px-6 py-4">
                    {formatTime(new Date(activity.totalActiveDuration))}
                  </td> */}
                  <td className="px-6 py-4">{activity.status}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="flex justify-between">
                      {activity.status != "completed" ? (
                        <ActionButtons
                          setActivities={setActivities}
                          activity={activity}
                        />
                      ) : (
                        <ActivityLogs activity={activity} />
                      )}
                      <button onClick={() => deleteActivity(activity._id)}>
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
