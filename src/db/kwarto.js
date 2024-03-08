import client from "$db/mongo"

const kwartos = client.db("tafthanan").collection("kwartos")

export const getKwarto = async(kwarto) => {
    const result = kwartos.findOne({name: kwarto})
    if (result) {
        return result
    }

    return null
}
