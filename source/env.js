const env = {
  baseUrl: "http://localhost:3000/api",
  MODE: "online",
  usePollingUpdate: false,
  theme: "dark",

  taskUrls: (base) => {
    const urls = {
      getTask: `${base}/task/getAllTasks`,
      updateTask: `${base}/task/newTask`,
      editTask: `${base}/task/editTask`,
      completeTask: `${base}/task/complete`,
      deleteTask: `${base}/task/deleteTask`,
    };
    return urls;
  },
};

export default env;
