import { FEEDBACK_ENDPOINTS } from "../constants/ENDPOINTS";

const FeedbackService = {
  async createUserFeedback(token, userForId, userFromId, feedback) {
    return await fetch(
      `${FEEDBACK_ENDPOINTS.CREATE_USER_FEEDBACK}/${userForId}/${userFromId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beaerer ${token}`,
        },
        body: JSON.stringify(feedback),
      }
    ).then(async (response) => {
      const userFeedback = await response.json();
      return userFeedback;
    });
  },

  async getUserFeedback(token, userId) {
    return await fetch(`${FEEDBACK_ENDPOINTS.GET_USER_FEEDBACK}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },

  async getUserFeedbackFrom(token, userId) {
    return await fetch(
      `${FEEDBACK_ENDPOINTS.GET_USER_FEEDBACK_FROM}/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },

  async getAllUserFeedbacks(token) {
    return await fetch(`${FEEDBACK_ENDPOINTS.GET_ALL_USER_FEEDBACKS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },

  async createTaskFeedback(token, taskId, userFromId, feedback) {
    return await fetch(
      `${FEEDBACK_ENDPOINTS.CREATE_TASK_FEEDBACK}/${taskId}/${userFromId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedback),
      }
    ).then(async (response) => {
      const taskFeedback = await response.json();
      return taskFeedback;
    });
  },

  async getTaskFeedback(token, taskId) {
    return await fetch(`${FEEDBACK_ENDPOINTS.GET_TASK_FEEDBACK}/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },

  async getAllTaskFeedbacks(token) {
    return await fetch(`${FEEDBACK_ENDPOINTS.GET_ALL_TASK_FEEDBACKS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },

  async createArrangementFeedback(token, arrangementId, userFromId, feedback) {
    return await fetch(
      `${FEEDBACK_ENDPOINTS.CREATE_ARRANGEMENT_FEEDBACK}/${arrangementId}/${userFromId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedback),
      }
    ).then(async (response) => {
      const arrangementFeedback = await response.json();
      return arrangementFeedback;
    });
  },

  async getArrangementFeedback(token, arrangementId) {
    return await fetch(
      `${FEEDBACK_ENDPOINTS.GET_ARRANGEMENT_FEEDBACK}/${arrangementId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },

  async getAllArrangementFeedbacks(token) {
    return await fetch(`${FEEDBACK_ENDPOINTS.GET_ALL_ARRANGEMENT_FEEDBACKS}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      const feedbackList = await response.json();
      return feedbackList;
    });
  },
};
export default FeedbackService;
