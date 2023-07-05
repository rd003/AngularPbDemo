migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l30q8tae66xtef0")

  collection.listRule = "@request.auth.id!=\"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l30q8tae66xtef0")

  collection.listRule = null

  return dao.saveCollection(collection)
})
