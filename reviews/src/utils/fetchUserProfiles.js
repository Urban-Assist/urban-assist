import amqp from 'amqplib'

async function getUserDetails(userID){
//connect to server, create channel and assert queue
const conection = await amqp.connect('amqp://localhost')
const channel = await conection.createChannel()
//to do change the queue name with the env variable
const queue = await channel.assertQueue('fetchUserDetails', {exclusive:true})

//unique queue for matching the responses with the requests
const uniqueID = Math.random().toString();

return new Promise((resolve) => {
channel.consume(queue.queue, (msg) => {

if(msg.properties.correlationId === uniqueID){

    resolve(JSON.parse(msg.content.toString())) // parse and return the userData
}, {noAck:true})
//send the message to the queue

})
}

export {getUserDetails}