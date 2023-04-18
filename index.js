/*
    Server test
    connect RabbitMQ
*/

const AMQPReceiver = require('./testRabbitMQ/receiveRabbitMQ')

// => in file .env
const amqpUrl = 'amqp://user_broker:sanbul123@103.31.12.63:5672/dataGamev1'
const dataPreMatch = 'dataPreMatch'
const dataLiveMatch = 'dataLiveMatch'
const exchangeType = 'fanout'

const getPreMatch = new AMQPReceiver(amqpUrl, dataPreMatch, exchangeType)
const getLiveMatch = new AMQPReceiver(amqpUrl, dataLiveMatch, exchangeType)
// <=

getPreMatch.receiveData()
getLiveMatch.receiveData()
