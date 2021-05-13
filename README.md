# Welcome to Siena-Seguros repository



## What was developed:
---
# Backend Test

Develop the workflow's REST API following the specification bellow and document it.

---

## Defining a workflow

|Name|Type|Description|
|-|-|-|
|UUID|UUID|workflow unique identifier|
|status|Enum(inserted, consumed)|workflow status|
|data|JSONB|workflow input|
|steps|Array|name of workflow steps

## Endpoints

|Verb|URL|Description|
|-|-|-|
|POST|/workflow|insert a workflow on database and on queue and respond request with the inserted workflow|
|PATCH|/workflow/{UUID}|update status from specific workflow|
|GET|/workflow|list all workflows|
|GET|/workflow/consume|consume a workflow from queue and generate a PDF file with workflow.Data|
---
## Technologies

- Node.js
- Express.js
- PostgreSQL
---
## Instructions to start

- Create a PostgreSQL database with database.sql file in main folder.
- You will need NPM in your machine.
- In main folder, open terminal and run command 'npm install'.
- After installation, run command 'npm start'.
- Open your browser or Postman (Browser to test route to download PDF), and test the endpoints above.
---
## Endpoints documentation

You will need elaborate a specific body to make requests

Body Examples:

```
Status examples: 
1 - Inserted
2 - Consumed
```
---
```
POST /workflow

{
    "UUID": "testando5",
    "status": 2,
    "data": {
        "id": 0,
        "status": 1,
        "bol": true
    },
    "steps": [1,2,3,"ok",false]
}

Response: 200 OK

[
    {
        "id": 7,
        "uuid": "testando7",
        "status": 2,
        "json_data": "{\"id\":0,\"status\":1,\"bol\":true}",
        "array_data": "1,2,3,ok,false"
    }
]
```
---
```
PATCH /workflow/uuid

{
    "status": 2,
}

Response: 200 OK
```
---
```
GET /workflow

Response: 200 OK

[
    {
        "id": 5,
        "uuid": "testando3",
        "status": 2,
        "json_data": "{\"id\":0,\"status\":1,\"bol\":true}",
        "array_data": "1,2,3,ok,false"
    },
    {
        "id": 4,
        "uuid": "testando1",
        "status": 1,
        "json_data": "{\"id\":0,\"status\":1,\"bol\":true}",
        "array_data": "1,2,3,ok,false"
    },
    {
        "id": 6,
        "uuid": "testando5",
        "status": 1,
        "json_data": "{\"id\":0,\"status\":1,\"bol\":true}",
        "array_data": "1,2,3,ok,false"
    }
]
```
---
```
GET /workflow/consume

Response: 200 OK

Generate PDF with all data in GET /workflow
```
---

```
In case of error on these endpoints this is the format of error object:

[
    error: {
        message: 'Message of error',
        code: 'code of error to correctly HTTP Method'
    }
]
```