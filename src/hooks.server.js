import {run} from '$db/mongo'

run().then(() => {
    console.log("The bluetooth device is connected sucessfully")
})

