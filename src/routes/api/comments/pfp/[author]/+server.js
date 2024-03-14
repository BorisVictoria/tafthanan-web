import { getPfpByUsername } from "$db/users"
import {json} from '@sveltejs/kit'


export const GET = async({params, locals}) => {

    const result = await getPfpByUsername(params.author)

    console.log(result)
    
    if (result === null) {
        return json(null)
    }

    return json(result)
}

