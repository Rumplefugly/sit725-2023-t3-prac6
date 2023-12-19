const {client, runDBConnection} = require('../dbConnection');

let collection;

async function initializeCollection() {
    collection = await runDBConnection();
}

async function getAllCats() {
//async function getAllCats(collection) { // Works because it passes the collection
    const docs = await collection.find({}).toArray();
    return docs;
}

async function postCat(cat) {
    const result = await collection.insertOne(cat);
    return result;
}

module.exports = { initializeCollection, getAllCats, postCat }