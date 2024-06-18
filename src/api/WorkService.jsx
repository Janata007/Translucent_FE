import { WORK_ENDPOINTS } from "../constants/ENDPOINTS";

const WorkService = {
  async saveTask(token, task, byUserId, forUserId) {
    return await fetch(`${WORK_ENDPOINTS.SAVE_TASK}/${byUserId}/${forUserId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    }).then(async (response) => {
      const task = await response.json();
      return task;
    });
  },

  async getAllTasks(token) {
    return await fetch(`${WORK_ENDPOINTS.GET_ALL_TASKS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const tasks = await response.json();
      return tasks;
    });
  },

  async removeTask(token, id) {
    return await fetch(`${WORK_ENDPOINTS.REMOVE_TASK}/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const task = await response.json();
      return task;
    });
  },

  async getTaskWithUserForUser(token, taskId) {
    return await fetch(
      `${WORK_ENDPOINTS.GET_TASK_WITH_USER_FOR_USER}/${taskId}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    ).then(async (response) => {
      const taskWithUserForUser = await response.json();
      return taskWithUserForUser;
    });
  },

  async getTasksForUser(token, userId) {
    return await fetch(`${WORK_ENDPOINTS.GET_TASKS_FOR_USER}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const tasks = await response.json();
      console.log("TASKS FETCHED " + tasks.length)
      return tasks;
    });
  },

  async getTaskWithFeedbackList(token, taskId) {
    return await fetch(
      `${WORK_ENDPOINTS.GET_TASK_WITH_FEEDBACK_LIST}/${taskId}/feedback`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const taskWithFeedback = await response.json();
      return taskWithFeedback;
    });
  },

  async setTaskToFinished(token, id) {
    return await fetch(
      `${WORK_ENDPOINTS.SET_TASK_TO_FINISHED}/${id}/finished`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const task = await response.json();
      return task;
    });
  },
};
export default WorkService;
