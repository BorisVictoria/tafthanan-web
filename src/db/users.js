import client from '$db/mongo'

export const users = client.db('tafthanan').collection('users')

export const registerUser = async(data) => {

    const result = await users.insertOne(data)
    return result

}

export const loginUser = async(data) => {

    const result = await users.findOne({username: data.username, password: data.password})
    return result

}