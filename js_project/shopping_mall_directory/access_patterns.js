import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import { tableName } from "./table.js"
import { toBuildingAndUnitCompositeKey, toMallKey } from "./util.js"

export const getStoresByMall = async (d, mall) => {
  const response = await d.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: {
        ":pk" : toMallKey(mall)
      }
  }))
  console.log(response)
}

export const getStoreByMallAndBuilding = async (d, mall, building) => {
  
  const response = await d.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :pk and begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": toMallKey(mall),
      ":skPrefix": toBuildingAndUnitCompositeKey(building, null)
    }
  }))
  
  console.log(response.Items)
  
}