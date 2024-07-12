import { TActivity } from "../types/activity";

const ActivityLogs = ({ activity }: { activity: TActivity }) => {
  const showModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal instanceof HTMLDialogElement) {
      // This checks if modal is not null and is a dialog element
      modal.showModal();
    }
  };

  const hideModal = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };
  return (
    <>
      <button className="btn" onClick={showModal}>
        Show Details
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box justify-center">
          <h3 className="font-bold text-lg text-white text-start">
            Activity logs: {activity.name}
          </h3>
          <div className="mt-2">
            {activity.logs.map((log, index) => (
              <div key={index} className="flex justify-between">
                <p>{log.action === "pending" ? "created" : log.action}</p>
                <p>{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ActivityLogs;
