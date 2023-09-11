# Placement Cell application for Coding Ninja

This is a sample placement cell application. Employees need to sign up first before using the application.
Employees can save students information. They can also record interview information, placement information
and download placement report in `.csv` format.

## Install Application

In the project directory, you need to run:

### `npm install`

This will install all the dependencies and dev-dependencies. Then set all the required environment
variables for the project to run. To view all the environment variables, view the  `src/config/environment.ts`
file. You will get an idea of which variables to set.

### `npm run build`
After setting up the environment variables, finally run this command to compile the application.

### `npm run prod`
Lastly, run this command to start the application. The application will start and at specified port,
(for specifying port, set the `PORT` environment variable) it will listen for incoming requests.



