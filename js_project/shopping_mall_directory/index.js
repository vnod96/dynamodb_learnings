import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createTable } from "./table.js";
import { addTestStores, clearMallTable } from "./data_ingestion.js";
import { getStoreByMallAndBuilding, getStoresByMall } from "./access_patterns.js";

const d = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

// createTable(d);

// clearMallTable(d);
// addTestStores(d);


// 1.a All stores in a mall
getStoresByMall(d, "Sunrise Mall")

// 1.b. All Stores in a particular mall building
getStoreByMallAndBuilding(d, "Sunrise Mall", "Block B")