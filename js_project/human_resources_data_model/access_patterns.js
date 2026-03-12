import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { index, index2, table, toEmpKey, toProjectKey } from "./util.js";

// Requirement #1 As a Project Manager, I need to find all
// tasks and details on a specific employee.
export const getEmployeeAndTasks = async (d, employee) => {
  const resp = await d.send(
    new QueryCommand({
      TableName: table,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": toEmpKey(employee),
      },
    }),
  );
  console.log(resp.Items);
};

// Requirement #2
export const getEmployeesByOffice = async (d, office) => {
  const resp = await d.send(
    new QueryCommand({
      TableName: table,
      IndexName: index,
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: {
        ":pk": office,
      },
    }),
  );
  console.log(resp.Items);
};

// Requirement #3
export const getTasksByEmployee = async (d, employee) => {
  const resp = await d.send(new QueryCommand({
    TableName: table,
    KeyConditionExpression: "PK = :pk and begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": toEmpKey(employee),
      ":skPrefix": "task#"
    }
  }))
  console.log(resp.Items)
}

// Requirement #4
export const getTasksByProject = async (d, project) => {
  const resp = await d.send(new QueryCommand({
    TableName: table,
    IndexName: index,
    KeyConditionExpression: "GSI1PK = :pk and begins_with(GSI1SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": project,
      ":skPrefix": "task#"
    }
  }))
  console.log(resp.Items)
}

// Requirement #7
export const getEmployeesWhoseBirthdayOrAnniversary = async (
  d,
  office,
  date,
) => {
  const resp = await d.send(
    new QueryCommand({
      TableName: table,
      IndexName: index,
      KeyConditionExpression: "GSI1PK = :pk and begins_with(GSI1SK, :skPrefix)",
      FilterExpression:
        " contains(dob, :date) OR contains(hiring_date, :date) ",
      ExpressionAttributeValues: {
        ":pk": office,
        ":skPrefix": "emp#",
        ":date": date,
      },
    }),
  );
  console.log(resp.Items);
};

// Requirement #8
export const getEmployeesByManager = async (d, managerId) => {
  const resp = await d.send(
    new QueryCommand({
      TableName: table,
      IndexName: index2,
      KeyConditionExpression: "GSI2PK = :pk",
      ExpressionAttributeValues: {
        ":pk": toEmpKey(managerId),
      },
    }),
  );
  console.log(resp.Items);
};
