<h1>Pure JavaScript TODO list</h1>

In this project, I build front part of application a todo list using pure JavaScript and fetch methods. The todo list will be able to add, mark as read, and delete tasks. I used the GET, POST, PUT, and DELETE fetch methods to interact with a RESTful API that handle the CRUD operations.

Features:
- User can add a new task to the todo list.
- User can mark a task as complete or incomplete.
- User can delete a task from the todo list.
- The todo list is persistent and data is stored on a remote server.
- The user interface is responsive and easy to use.

Functionality:

1. Retrieve Todo List: When the page loads, a GET request is made to the server to retrieve the todo list. The response is a JSON array of task objects.
2. Display Todo List: The retrieved todo list is displayed in the user interface as a list of tasks. Each task has a button to mark it as complete  and a delete button to delete the task.
3. Add Task: When the user adds a new task to the todo list, a POST request is made to the server with the task information. The response is the newly created task object, which is added to the todo list.
4. Mark Task as Complete or Incomplete: When the user marks a task as complete or incomplete, a PUT request is made to the server with the updated task information. The response is the updated task object, which is updated in the todo list.
5. Delete Task: When the user deletes a task, a DELETE request is made to the server with the task ID. The response is the deleted task object, which is removed from the todo list.
6. Store Data: All changes to the todo list are stored on the remote server.


After downloading the project files open a terminal and navigate to the project directory. Navigate to the "back-end" folder. Run the command "npm install" to install the required packages, then "npm start" to start the server. Open the index.html file in a web browser to view the todo list.
