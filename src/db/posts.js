import client from '$db/mongo'

export const posts = client.db('tafthanan').collection('posts')

export const getPost = async({id}) => {

    

}