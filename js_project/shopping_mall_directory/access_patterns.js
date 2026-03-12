import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import { index1Name, tableName } from "./table.js"
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

export const getStoreByMallAndBuilding = async (d, mall, building, unit) => {
  
  const response = await d.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :pk and begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": toMallKey(mall),
      ":skPrefix": toBuildingAndUnitCompositeKey(building, unit)
    }
  }))
  
  console.log(response.Items)
  
}

export const getStoreByNameInMall = async (d, mall, store_name) => {
  const response = await d.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :pk",
    FilterExpression: "contains(store_name, :store_name)",
    ExpressionAttributeValues: {
      ":pk": toMallKey(mall),
      ":store_name": store_name
    }
  }))
  console.log(response.Items)
}

export const getStoreByCategory = async (d, mall, category) => {
  const response = await d.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "PK = :pk",
    FilterExpression: "category = :category",
    ExpressionAttributeValues: {
      ":pk": toMallKey(mall),
      ":category": category
    }
  }))
  console.log(response.Items)
}

export const getStoresWithUpcomingLease = async (d, mall, date) => {
  const response = await d.send(new QueryCommand({
    TableName: tableName,
    IndexName: index1Name,
    KeyConditionExpression: "GSI1PK = :pk and GSI1SK < :date",
    ExpressionAttributeValues: {
      ":pk": toMallKey(mall),
      ":date": date
    }
  }))
  console.log(response.Items)
}