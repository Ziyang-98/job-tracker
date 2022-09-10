import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { deleteJobApp, getJobApps, getUser, updateJobApp } from "api";
import { JobAppStatus } from "common/jobAppStatus";
import {
  getUserIdFromLocalStorage,
  storeUserIdFromLocalStorage,
  formatRawJobAppData,
} from "common/utils";

const defaultJobApps = [[], [], [], [], []];

const useJobApps = (handleOpenNotification) => {
  const [jobApps, setJobApps] = useState(defaultJobApps);

  const refreshJobApps = async () => {
    const userId = getUserIdFromLocalStorage();

    getJobApps(userId)
      .then((res) => {
        const { jobApps } = res.data;
        const formattedJobApps = formatRawJobAppData(jobApps);
        setJobApps(formattedJobApps);
      })
      .catch((err) => {
        console.error(err);
        handleOpenNotification(
          "Error connecting to server. Please refresh and try again later!",
          5000,
          "error"
        );
      });
  };

  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    getUser(userId)
      .then((res) => {
        const { userId } = res.data;
        storeUserIdFromLocalStorage(userId);
      })
      .catch((err) => {
        console.error(err);
      });
    refreshJobApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = (jobApp, newStatus) => {
    if (jobApp.status === JobAppStatus.planning) {
      // Set date applied as current date if job app is moved from planning status
      jobApp.dateApplied = dayjs().format("DD/MM/YYYY").toString();
      jobApp.lastContactDate = null;
    }

    jobApp.status = newStatus;
    console.log(jobApp);
    updateJobApp(getUserIdFromLocalStorage(), jobApp).catch((err) => {
      console.error(err);
      handleOpenNotification(
        "Error updating status. Please refresh and try again later!",
        5000,
        "error"
      );
    });
  };

  const handleDeleteJobApp = (rawStatusType, jobAppIndex, jobAppId) => {
    const newJobApps = [...jobApps];
    newJobApps[rawStatusType].splice(jobAppIndex, 1);
    setJobApps(newJobApps);

    deleteJobApp(getUserIdFromLocalStorage(), jobAppId)
      .then(() => {
        handleOpenNotification("Entry deleted successfully", 1500, "success");
      })
      .catch((err) => {
        console.error(err);
        handleOpenNotification(
          "Error deleting entry. Please refresh and try again later!",
          5000,
          "error"
        );
      });
  };

  return {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
  };
};

export default useJobApps;
