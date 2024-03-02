import {MongoClient} from 'mongodb'
import {VITE_MONGO_DB_URL} from '$env/static/private'

const client = new MongoClient(VITE_MONGO_DB_URL)

export const startMongo = async () => {

    console.log("The bluetooth device is ready to pair")
    return client.connect()

}

export default client.db()