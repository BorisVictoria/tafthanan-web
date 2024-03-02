import {MongoClient} from 'mongodb'
import {VITE_MONGO_DB_URL} from '$env/static/private'

const client = new MongoClient(VITE_MONGO_DB_URL)

export const run = async () => {

    await client.connect()
    console.log("The bluetooth device is ready to pair")
    console.log(`Connected to ${client.options.dbName}`)

}

export default client