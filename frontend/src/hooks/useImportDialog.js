import { deleteUser, getJobApps } from "api";
import {
  getUserIdFromLocalStorage,
  storeUserIdFromLocalStorage,
} from "common/utils";
import { useState } from "react";

const useImportDialog = (refreshJobApps, handleOpenNotification) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenImportDialog = () => {
    setOpen(true);
  };

  const handleImportData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const oldUserId = getUserIdFromLocalStorage();
    const newUserId = data.get("userId").trim();

    if (oldUserId === newUserId) {
      handleOpenNotification("You are already on your account!", 3000, "error");
      setLoading(false);
    } else {
      await getJobApps(newUserId)
        .then((res) => {
          storeUserIdFromLocalStorage(newUserId);
          deleteUser(oldUserId);

          refreshJobApps().then(() => {
            handleOpenNotification(
              "Successfully imported data!",
              2000,
              "success"
            );
          });
        })
        .catch((err) => {
          // setError(true);
          handleOpenNotification(
            "Error importing data. Please check if the user ID is correct, or if your connection is stable!",
            5000,
            "error"
          );
          console.error(err);
        });
      setLoading(false);
      handleClose();
    }
  };

  return {
    importDialogProps: {
      open,
      onClose: handleClose,
    },
    handleOpenImportDialog,
    handleClose,
    handleImportData,
    loading,
  };
};

export default useImportDialog;
