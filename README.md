## Chat Application

Chat application made using Next.js and Firebase. User can enter the username and chat with other users. List of all users present in db is shown and user has to select whom he wants to chat with. User can logout and change username.

Chat messages can be text with emojis or an Image message. Messages are transferred in real time using firebase's realtime updates feature.

## Setup and Running locally

- Run `npm install`
- Run `npm run dev`

App should start on url http://localhost:3000

app uses firebase which is already configured, to run with different firebase project, update credentials in `firebase.ts` file.

## Deployment

App is deployed at: https://chat-assignment-26be3.web.app/

## Tech Stack

- Next.js as frontend framework - it handles most of the tooling as well as project structure helping in rapid development. This app being a SPA is statically exported as it doesn't require any server features of next.js
- TailwindCSS & DaisyUI - UI library to quick development of UI components.
- Firestore - Users and messages storing. Also used to get realtime updates on users & chat messages.
- Firebase storage - Chat messages images are uploaded and stored here. A chat message is also stored in firestore with type of message and url.
- Firebase hosting - for static deployment of frontend app.

## Limitations

- Message Limit is not added, so all messages for the selected user are rendered.
- No auth, so username is itself being used as authorization token.
- Users list is not sorted as per latest message