export const toMallKey = (mall) =>
  `MALL#${mall.replace(/ +/g, "_").toLowerCase()}`;

export const toBuildingAndUnitCompositeKey = (building, unit) => {
  return `BUILDING#${building.replace(/ +/g, "_").toLowerCase()}#UNIT#${unit?.replace(/ +/g, "_").toLowerCase() ?? ""}`;
};
