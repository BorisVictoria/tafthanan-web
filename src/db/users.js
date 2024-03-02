import db from '$db/mongo'

export const users = db.collection('users')

export const registerUser = async(data) => {

    const result = await db.insertOne(data)
    return result

}

export const loginUser = async(data) => {

    const result = await db.findOne({username: data.username, password: data.password})
    return result

}