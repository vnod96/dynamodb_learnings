import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getEmployeeAndTasks, getEmployeesByOffice, getTasksByEmployee, getTasksByProject } from "./access_patterns.js";
import { addTask } from "./data_ingestion_functions.js";

const d = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

// updateTable();
// describeTable();
//

// getTasksByEmployee(d, "swami")
getTasksByProject(d, "Cutover Q1")
// getEmployeeAndTasks(d, "vinod.k")
// getEmployeesByOffice(d, "chennai");

// getEmployeesByManager("john.doe")
//
// getEmployeesWhoseBirthdayOrAnniversary("chennai", "15-07")

// addOffice({
//   city: "chennai",
//   state: "TN",
//   country: "India",
// });

// addEmploy({
//   name: "John Doe",
//   dob: "12-12-1980",
//   hiring_date: "15-07-2012",
//   salary: "30000000",
//   office: "chennai",
//   manager: ""
// })
// addEmploy({
//   name: "Vinod K",
//   dob: "26-02-1995",
//   hiring_date: "15-07-2025",
//   salary: "300000",
//   office: "chennai",
//   manager: empKey("john.doe")
// })

// addTask(d, {
//   id: "123",
//   title: "Switch Over",
//   project: "Cutover Q1",
//   employee: "vinod.k"
// });
