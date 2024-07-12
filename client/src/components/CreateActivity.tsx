import { useState } from "react";
import instance from "../utils/axios";
import { notifyError, notifySuccess } from "../utils/toast";
import { TActivity } from "../types/activity";

const CreateActivity = ({
  setActivities,
}: {
  setActivities: React.Dispatch<React.SetStateAction<TActivity[]>>;
}) => {
  const showModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal instanceof HTMLDialogElement) {
      // This checks if modal is not null and is a dialog element
      modal.showModal();
    }
  };

  const hideModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const createActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await instance.post("activity", { name });
      notifySuccess("Activity created successfully");
      setName("");
      setActivities((prev) => [...prev, data.activity]);
      setLoading(false);
      hideModal();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      notifyError(error.response.data.message);
    }
  };

  return (
    <>
      <button className="btn text-white" onClick={showModal}>
        Create +
      </button>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Activity</h3>
          <div className="modal-action justify-center flex-col">
            <form method="dialog">
              <label htmlFor="name">Activity Name</label>
              <div className="flex mb-5 justify-center items-center">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter activity name"
                  className="mt-1 block w-full px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  disabled={loading}
                  onClick={createActivity}
                  className="text-white bg-blue-500 mt-2 rounded-lg px-3 py-2"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
            <button onClick={hideModal} className="btn bg-gray-700 text-white">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateActivity;
