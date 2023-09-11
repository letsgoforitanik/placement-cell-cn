import * as employeeService from "./employee";
import * as studentService from "./student";
import * as interviewService from "./interview";

// service layer abstracts all the database related 
// functionalities, so that consumers (i.e. controllers)
// don't directly rely on actual implementation.
// this pattern is beneficial if later we change the database
// provider. If in future, we change database, we won't have to make
// changes in all the places. 
export { employeeService, studentService, interviewService }