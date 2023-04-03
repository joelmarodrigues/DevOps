# **DevOps Assignment**
## ***Description***

This is a simple application that allows users to create, read, update and delete event. The application is built using React, Node, Express, FullCalendar and MySQL.
## ***Installation***

To run the application, you need to have Node.js and MySQL installed on your machine. Also, you need to have a database created in MySQL.
To create a database, run the following command in MySQL:
```sql
CREATE DATABASE `devops_calendar`;
```
The table for the application is created automatically when the application is run for the first time.

To fully run the application, you need to run both the server and the client.

The server-side is located in the `server` folder and the client-side is located in the `client` folder.

The server is configured to run the MySQL from the server and locally. If you want to use your own database, you need to change the database configuration in the `server/config/database.js` file.

***
### ***Running the Server***

Open a terminal and run the following commands:
1. `cd server`
2. `npm install`
3. `npm start`

***
### ***Running the Client***

Open a terminal and run the following commands:
1. `cd client`
2. `npm install`
3. `npm start`

***
### ***Building the Application*** *( for deployment )*

Open a terminal and run the following commands:
1. `cd client`
2.  `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

***
## ***Login Credentials***

There are three types of users in the application: Teacher, Student and Admin. Each user has different permissions. The permissions are handled by Firebase Authentication and Firestore.

The following are the login credentials for each user:

Teacher *(Can create, read, update and delete events)*:

- email: `teacher@faculty.dorset-college.ie`
- password: `123456`

Student *(Can only read events and create, update and delete Notes)*:

- email: `student@student.dorset-college.ie`
- password: `654321`

Admin *(Can create, read, update and delete events and users (in development...))*:

- email: `admin@dorset.ie`
- password: `456789`


