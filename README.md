# chat-with-bharathi
A chat app built with `React` for front-end and `Google Firebase` for a data store. 


This app lets you do two things

* Chat with me
* Chat in a common chatroom  

<hr />

## Prerequisites

1. You need to have a Firebase account and create a project in it.
2. You need to enable `Firestore Database` and `Authentication` with Google.

Refer to the Firebase documentation [here](https://firebase.google.com/) for help.
<hr />

## Running the app
1. Update your firebase configurations in `ENV_CONSTANTS.js`
2. Use `npm run start` to start the application

<hr />

## Hosting the app
App can be hosted in Firebase from your cli tool. Firebase helps you with the hosting configuration with the help of `firebase-tools` npm package. 
#### Install Firebase tools
```npm install -g firebase-tools```

#### Steps:

1. Choose hosting from the list of options and proceed with the Firebase configuration for hosting

    ```firebase init```
2. Build the Firebase app

    ```npm run build ```
3. Deploy the Firebase app

    ```firebase deploy```
<hr />

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
