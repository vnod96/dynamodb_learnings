import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createTable } from "./table.js";
import { addTestStores, clearMallTable } from "./data_ingestion.js";
import {
  getStoreByCategory,
  getStoreByMallAndBuilding,
  getStoreByNameInMall,
  getStoresByMall,
  getStoresWithUpcomingLease,
} from "./access_patterns.js";

const d = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
});

// createTable(d);

// clearMallTable(d);
// addTestStores(d);

async function main() {
  // 1.a All stores in a mall
  await getStoresByMall(d, "Sunrise Mall");
  console.log(
    "================================================================================",
  );
  // 1.b. All Stores in a particular mall building
  await getStoreByMallAndBuilding(d, "Sunrise Mall", "Block B", null);
  console.log(
    "================================================================================",
  );
  // 1.c. Find the store located in unit U-102
  await getStoreByMallAndBuilding(d, "Sunrise Mall", "Block A", "U-102");
  console.log(
    "================================================================================",
  );
  // 1.d. Find the store by Store Name
  await getStoreByNameInMall(d, "Sunrise Mall", "Fresh Greens");
  console.log(
    "================================================================================",
  );

  // 2.a. Stores by Category at Mall
  await getStoreByCategory(d, "Sunrise Mall", "Food & Beverage");
  console.log(
    "================================================================================",
  );

  // 3.a. Stores by upcoming lease
  await getStoresWithUpcomingLease(d, "Sunrise Mall", "2024-10-31");
  console.log(
    "================================================================================",
  );
}

main();
