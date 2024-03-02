import {startMongo} from '$db/mongo'

startMongo().then(() => {
    console.log("The bluetooth device is connected sucessfully")
})

