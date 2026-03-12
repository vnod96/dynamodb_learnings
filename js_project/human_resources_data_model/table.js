import { CreateTableCommand, DescribeTableCommand, UpdateTableCommand } from "@aws-sdk/client-dynamodb";
import { index, index2, table } from "./util.js";

export const createTable = async (d) => {
  const response = await d.send(
    new CreateTableCommand({
      TableName: table,
      KeySchema: [
        {
          AttributeName: "PK",
          KeyType: "HASH",
        },
        {
          AttributeName: "SK",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "PK",
          AttributeType: "S",
        },
        {
          AttributeName: "SK",
          AttributeType: "S",
        },
        {
          AttributeName: "GSI1PK",
          AttributeType: "S",
        },
        {
          AttributeName: "GSI1SK",
          AttributeType: "S",
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: index,
          
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    }),
  );
  console.log(response);
}

export const describeTable = async (d) => {
  const response = await d.send(new DescribeTableCommand({
    TableName: table
  }));
  console.log(response.Table)
}

export const updateTable = async (d) => {
  const response = await d.send(new UpdateTableCommand({
    TableName: table,
    AttributeDefinitions: [
      {
        AttributeName: "PK",
        AttributeType: "S",
      },
      {
        AttributeName: "SK",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI1PK",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI1SK",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI2PK",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI2SK",
        AttributeType: "S",
      },
    ],
    GlobalSecondaryIndexUpdates: [
      {
        Create: {
          IndexName: index2,
          KeySchema: [
            {
              AttributeName: "GSI2PK",
              KeyType: "HASH",
            },
            {
              AttributeName: "GSI2SK",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
        }
      }
    ]
  }))
}