import { DeleteCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { tableName } from "./table.js";
import { toBuildingAndUnitCompositeKey, toMallKey } from "./util.js";
import data from './test_malls.json' with { type: 'json' };
export const addStore = async (
  d,
  {
    store_name,
    unit_id,
    mall,
    building,
    city,
    lease_start_date,
    lease_end_date,
    contact,
    category,
    rent,
  },
) => {
  const mallKey = toMallKey(mall);
  const pc = new PutCommand({
    TableName: tableName,
    Item: {
      PK: mallKey,
      SK: toBuildingAndUnitCompositeKey(building, unit_id),
      GSI1PK: mallKey,
      GSI1SK: lease_end_date,
      store_name,
      mall,
      building,
      city,
      lease_start_date,
      lease_end_date,
      contact,
      category,
      rent,
    },
  });

  const response = await d.send(pc);
  return response
};

export const clearMallTable = async (d) => {
  let lastKey;
  do {
    const scanResponse = await d.send(
      new ScanCommand({
        TableName: tableName,
        ExclusiveStartKey: lastKey,
      }),
    );

    const deletePromises = await scanResponse.Items.map((item) => {
      d.send(
        new DeleteCommand({
          TableName: tableName,
          Key: {
            PK: item.PK,
            SK: item.SK,
          },
        }),
      );
    });

    await Promise.all(deletePromises);
    console.log(`Deleted ${scanResponse.Items.length} items`);
  } while (lastKey);
  console.log("All items deleted.");
};


export const addTestStores = async (d) => {
  data.forEach(item => addStore(d, item))
  console.log(`${data.length} items added.`)
}

