const dbConn = require('../../database/DBdriver');
const mongodb = require('mongodb');

module.exports = class Messagerss
{
    constructor(jsonData)
    {
        this.json = jsonData;
        this.collection = 'messagerss';
    }

    prepare()
    {
        const items = [];
        Object.entries(this.json).forEach(([key, value])=>{
            items.push({
                key:key,
                title:value.title,
                desc:value.content,
                link:value.link
            });
        });
        return items;
    }

    async save()
    {
        const db = new dbConn(this.collection);
        const dbC = await db.getConn();
        const res = await dbC.insertOne(this);

        return res.insertedId.toString();
    }

    async fetch()
    {
        const db = new dbConn(this.collection);
        const dbC = await db.getConn();
        return await dbC.findOne({_id: new mongodb.ObjectId(this.json)});
    }

    delete()
    {
        return 'deleted';
    }
}