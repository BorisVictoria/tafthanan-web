<script>
    import {EJSON} from 'bson'
    export let data;
    data = EJSON.deserialize(data)
    const {user} = data

</script>

<h1>User Information</h1>
<p>UserID: {user._id}</p>
<p>Username: {user.username}</p>
<p>Email: {user.email}</p>
<p>Password: {user.password}</p>


<style>

</style>