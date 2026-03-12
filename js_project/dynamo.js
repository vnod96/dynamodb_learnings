import { CreateTableCommand, DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

const ddClient = DynamoDBDocumentClient.from(client);

export const addData = async () => {
  const response = await ddClient.send(new PutCommand({
    TableName: 'generic_table',
    Item: {
      pk: "PRODUCT_ID#123",
      sk: "USA",
      data: "CocaCola"
    }
  }))
  console.log(response)
}

export const listTables = async () => {
  const listCmd = new ListTablesCommand({})
  const response = await client.send(listCmd)
  console.log(response)
}

export const createTable = async () => {
  const createCmd = new CreateTableCommand({
    TableName: "generic_table",
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
      {
        AttributeName: "sk",
        KeyType: "RANGE",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S"
      },
      {
        AttributeName: "sk",
        AttributeType: "S"
      }
    ],
    BillingMode: "PAY_PER_REQUEST",
  });

  const response = await ddClient.send(createCmd);
  console.log(response);
  return response;
};
