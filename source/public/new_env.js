const env = {
  baseUrl: "http://localhost:3000/api",
  //baseUrl: "https://rocket2sky.com/todo/api",
  MODE: "offline",
  usePollingUpdate: false,
  testAccount: false,
  theme: "dark",
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
    checkUserIsLogged: `${env.baseUrl}/user/login`,
    getUserSettings: `${env.baseUrl}/user/getUserData`,
    createNewUser: `${env.baseUrl}/user/createNewUser`,
  },
};

export { env, URLS };
