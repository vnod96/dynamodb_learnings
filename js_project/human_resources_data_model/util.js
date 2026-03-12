export const table = "my_hr";
export const index = "GSI1-INDEX";
export const index2 = "GSI2-INDEX";
export const toEmpId = (name) => name.replace(" ", ".").toLowerCase();
export const toEmpKey = (id) => `emp#${id}`;
export const toProjectKey = (id) => `project#${id}`;
export const toTaskKey = (id) => `task#${id}`;