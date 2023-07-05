migrate((db) => {
  const collection = new Collection({
    "id": "l30q8tae66xtef0",
    "created": "2023-07-05 10:22:39.191Z",
    "updated": "2023-07-05 10:22:39.191Z",
    "name": "books",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r4mtjf81",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 4,
          "max": 20,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("l30q8tae66xtef0");

  return dao.deleteCollection(collection);
})
