migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l30q8tae66xtef0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jru2mzw6",
    "name": "author",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 4,
      "max": 20,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azdz3tkd",
    "name": "year",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l30q8tae66xtef0")

  // remove
  collection.schema.removeField("jru2mzw6")

  // remove
  collection.schema.removeField("azdz3tkd")

  return dao.saveCollection(collection)
})
