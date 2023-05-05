/*
    Server test
    connect RabbitMQ
*/

const AMQPReceivePreMatch = require('./testRabbitMQ/receiveRabbitMQPreMatch')
const AMQPReceiverLiveMatch = require('./testRabbitMQ/receiveRabbitMQLiveMatch')

// => in file .env
const amqpUrl = 'amqp://user_client:sanbul246a@103.31.12.63:5672/dataFootball'
const dataPreMatch = 'dataPreMatch'
const dataLiveMatch = 'dataLiveMatch'
const exchangeType = 'fanout'

const getPreMatch = new AMQPReceivePreMatch(amqpUrl, dataPreMatch, exchangeType)
const getLiveMatch = new AMQPReceiverLiveMatch(amqpUrl, dataLiveMatch, exchangeType)
// <=

getPreMatch.receiveData()
getLiveMatch.receiveData()