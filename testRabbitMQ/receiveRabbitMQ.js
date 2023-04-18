const amqplib = require('amqplib')

class AMQPReceiver {
  constructor(amqpUrl, exchangeName, exchangeType) {
    this.amqpUrl = amqpUrl
    this.exchangeName = exchangeName
    this.exchangeType = exchangeType
  }

  async receiveData() {
    try {
      const conn = await amqplib.connect(this.amqpUrl)
      const channel = await conn.createChannel()

      await channel.assertExchange(this.exchangeName, this.exchangeType, {
        durable: false,
        autoDelete: true
      })

      const { queue } = await channel.assertQueue('')
      console.log(queue)

      await channel.bindQueue(queue, this.exchangeName, '')
      await channel.consume(queue, (msg) => {
        // show data
        // console.log(JSON.parse(msg.content.toString()))
        console.log('done')
      }, {
        noAck: true,
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = AMQPReceiver