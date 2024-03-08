import client from "$db/mongo"

const kwartos = client.db("tafthanan").collection("kwartos")

export const getAllKwartos = async() => {
    let result = kwartos.find({})
    result = result.toArray()

    if(result) {
        return result
    }

    return null
}

export const getKwarto = async(kwarto) => {
    const result = kwartos.findOne({name: kwarto})
    if (result) {
        return result
    }

    return null
}
