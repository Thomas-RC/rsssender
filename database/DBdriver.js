const mongodb = require('mongodb');
const dbClient = mongodb.MongoClient;

module.exports = class DBdriver
{
    constructor(collectionName)
    {
        this.collectionName = collectionName;
    }

    async getConn()
    {

        const dbUrl = 'mongodb://user1:user1password@51.68.137.128/rssapp?authMechanism=SCRAM-SHA-256&authSource=admin';

        try {
            const client = await dbClient.connect(
            dbUrl, {useNewUrlParser: true, useUnifiedTopology: true });

            return await client.db('rssapp').collection(this.collectionName);
        }
        catch (e)
        {
            return console.log('Database Connection Error!', e.message)
        }

    };

}