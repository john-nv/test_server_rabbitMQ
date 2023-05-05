const fs = require('fs')
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
        // //show data in forder
        // console.log(JSON.parse(msg.content.toString()))
        // console.log('done')
        // ghi nội dung của msg vào file
        const fileName = `./logs/liveMatch/${Date.now()}.json`
        const content = JSON.parse(msg.content.toString())
        
        fs.writeFile(fileName, JSON.stringify(content), { flag: 'a+' }, (err) => {
          if (err) throw err
          console.log(`Data has been saved to ${fileName}`)
        })
      }, {
        noAck: true,
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}

module.exports = AMQPReceiver