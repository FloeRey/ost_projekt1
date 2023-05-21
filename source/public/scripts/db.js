/*import env from "../../env.js";

const { baseUrl } = env;

export default async function sendToDB(newTask) {
  return fetch(`${baseUrl}task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  })
    .then((response) => {
      if (response.ok) {
        return "success";
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    })

    .catch((error) => {
      throw error;
    });
}
*/
