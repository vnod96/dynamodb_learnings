import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { table, toEmpId, toEmpKey, toTaskKey } from "./util.js";

export const addOffice = async (d, { city, state, country }) => {
  const resp = await d.send(
    new PutCommand({
      TableName: table,
      Item: {
        PK: city,
        SK: city,
        GSI1PK: city,
        GSI1SK: city,
        city,
        state,
        country,
      },
    }),
  );
  console.log(resp);
};

export const addEmploy = async (
  d,
  { name, dob, hiring_date, salary, office, manager },
) => {
  const id = toEmpId(name);
  const key = toEmpKey(id);
  let param = {
    PK: key,
    SK: key,
    GSI1PK: office,
    GSI1SK: key,
    id: id,
    name: name,
    dob: dob,
    hiring_date: hiring_date,
    salary,
    office,
    manager,
  };
  if (manager != null && manager.length > 0) {
    param = {
      ...param,
      GSI2PK: manager,
      GSI2SK: key,
    };
  }
  const response = await d.send(
    new PutCommand({
      TableName: table,
      Item: param,
    }),
  );
  console.log(response);
};

export const addTask = async (d, { id, title, project, employee }) => {
  const key = toTaskKey(id)
  const resp = await d.send(new PutCommand({
    TableName: table,
    Item: {
      PK: toEmpKey(employee),
      SK: key,
      GSI1PK: project,
      GSI1SK: key,
      id,
      title,
      project,
    }
  }))
  console.log(resp)

}

