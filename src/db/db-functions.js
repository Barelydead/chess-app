const mongo = require("mongodb").MongoClient;
const mongoId = require("mongodb").ObjectID;

/**
 * A Module contianing database functions
 *
 */
module.exports = {
    dsn: process.env.DBWEBB_DSN || "mongodb://localhost:27017/chess",

    /**
     * Connect to the db and recive db object
     * @return {object} database
     */
    async connect() {
        const db  = await mongo.connect(this.dsn);

        return db;
    },

    /**
     * close db.
     */
    async close(db) {
        await db.close();
    },

    /**
     * close db.
     */
    async getCollection(collection) {
        const db  = await this.connect();
        const col = await db.collection(collection);
        const res = await col.find().toArray();

        await this.close(db);

        return res;
    },


    /**
     * Get Item
     */
    async getItem(collection, id) {
        const db  = await this.connect();
        const col = await db.collection(collection);
        const res = await col.find({ _id: mongoId(id) }).toArray();

        await this.close(db);

        return res;
    },

    /**
     * Get Item
     */
    async getUser(collection, username) {
        const db  = await this.connect();
        const col = await db.collection(collection);
        const res = await col.find({ username: username }).toArray();

        await this.close(db);

        return res;
    },


    /**
     * Get Item
     */
    async getChat() {
        const db  = await this.connect();
        const col = await db.collection("chat");
        const res = await col.find().sort({time: -1}).limit(20).toArray();

        await this.close(db);

        return res.reverse();
    },

    /**
     * Delete item from a collection
     */
    async deleteItem(collection, id) {
        const db  = await this.connect();
        const col = await db.collection(collection);
        const res = await col.deleteOne({ _id: mongoId(id)});

        await this.close(db);

        return res;
    },

    /**
     * Insert Item
     */
    async insertItem(collection, data) {
        const db  = await this.connect();
        const col = await db.collection(collection);
        const res = await col.insertOne(data);

        await this.close(db);

        return res;
    },
};
