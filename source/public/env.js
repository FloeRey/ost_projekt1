const env = {
  // baseUrl: "http://localhost:3000/api",
  baseUrl: "https://rocket2sky.com/todo/api",
  MODE: "online",
  useAccount: true,
  usePollingUpdate: false,
};

const settings = {
  guestId: "88889999",
};

const URLS = {
  tasks: {
    getTask: `${env.baseUrl}/task/getAllTasks`,
    updateTask: `${env.baseUrl}/task/newTask`,
    editTask: `${env.baseUrl}/task/editTask`,
    completeTask: `${env.baseUrl}/task/complete`,
    deleteTask: `${env.baseUrl}/task/deleteTask`,
  },
  users: {
    login: `${env.baseUrl}/user/login`,
    getUserSettings: `${env.baseUrl}/user/getUserSettings`,
    getGuestId: `${env.baseUrl}/user/getGuestId`,
    updateFilter: `${env.baseUrl}/user/updateFilter`,
  },
};

export { env, settings, URLS };
