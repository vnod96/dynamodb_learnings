# Shopping Mall directory
---

### Requirements
1. As a Maintenance Worker, I need to know which stores are currently in each Mall down to the Building they are located.
2. As a Helpdesk Employee, I need to locate related stores in Mall locations by Store Category.
3. As a Property Manager, I need to identify upcoming leases in need of renewal.


### Entity
Store 
- store_id
- store_name
- floor
- unit
- building
- mall
- city
- lease_start_date
- lease_end_date
- owner_name
- rent
- category
- deposit
- contact_number

### Access Patterns
1. As a Maintenance Worker, I need to know which stores are currently in each Mall down to the Building they are located.
   a. All Stores in a particular mall
   b. All Stores in a particular mall building
   c. Find the store located in unit B47
   d. All Latte Larry’s in a particular mall building
PK - mall_id
SK - building_id, unit_id

2. As a Helpdesk Employee, I need to locate related stores in Mall locations by Store Category.
   a. Stores by Category at Mall
Find stores by mall and filter by category

3. As a Property Manager, I need to identify upcoming leases in need of renewal.
  a. Stores by upcoming lease
  b. Stores will renewals for Q4
  c. Spite-stores with release renewals this year
GSI1PK - mall_id
GSI1SK - lease_end_date