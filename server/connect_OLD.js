const { MongoClient } = require('mongodb');


async function main() {
    const uri = "mongodb+srv://lingSoft:vamoslapa@oficina.65g8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabase(client);
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabase(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}