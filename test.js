const Transport = require('@ledgerhq/hw-transport-node-hid').default;

const handleEvents = ({type, device}) => {
  console.log('event in handleEvents')
  console.log(type)
  console.log(device)
}

function main() {
  Transport.listen({ next:event => handleEvents(event) })
}

main()
