## Hi and Welcome to my Todo Application.

### To Run, go on https://rocket2sky.com/todo/api/ , or simply run the html file in the public folder.

### For Full Experience use the AWS Server and setup your public env.js file to UseAccount true if you want to create and use your own Account - or use "false" to take the public account.

> Like a Premium Version, if you create your own Account has much more advantages, like store Filter Settings.

### If you run the API on localhost and you dont get the .env data from me, please use Mode:"offline" in the public env.js file.

> if you use Mode:"online", you have to use the AWS API, otherwise you need to go in "local"

### use "usePollingUpdate" for auto refresh if you work on multi tabs or whatever.. should be replacced with websockets.

### some functionallity are maybee missing for full satisfaction.

- websocket for update on different tabs.
- work local and sync with db. Actually the local stuff is going if you go online, but updates your local stuff.
- Cookie for Login Session.
- adjust the height of Task, description in a collapse.
- use Dialog instead of alert when delete an task.
- use of en & de language.

## Commands

Folgende Befehle sind möglich

| Befehl            | Beschreibung                                  |
| ----------------- | --------------------------------------------- |
| npm run stylelint | Testet ob die CSS Files in Ordnung sind.      |
| npm run w3c       | Testet ob die HTML Files in Ordnung sind.     |
| npm run eslint    | Testet ob die JS Files in Ordnung sind.       |
| npm run all       | Führt die Tests für CSS/HTML/JS aus.          |
| npm run server    | Started den Web-Server: http://localhost:3000 |
