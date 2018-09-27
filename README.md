# atticlab-eos-wallet

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Additional info

[Material Design for Vue.js](https://github.com/vuematerial/vue-material)

[vue-webpack-boilerplate](https://github.com/vuematerial/webpack)

## Created from vue-cli template

[vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init vuematerial/webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

## Run local (dev)
To run application in dev mode you will need a local EOS

### Docker image

[EOS Docker Quickstart](https://developers.eos.io/eosio-nodeos/docs/docker-quickstart)

Pull Dev Docker image with a compiled version of the EOSIO software designed for local development:
```bash
docker pull eosio/eos-dev
```

Start EOSIO node with shell script:
```bash
./starteos.sh
```

Check it is working:
```bash
docker logs --tail 10 eosio
```

HTTP endpoint to check that RPC interface is working:
```
http://localhost:8888/v1/chain/get_info
```

### Cleos alias

```bash
alias cleos='docker exec -it eosio /opt/eosio/bin/cleos -u http://0.0.0.0:8888 --wallet-url http://0.0.0.0:8888'
alias mcleos='docker exec -it eosio /opt/eosio/bin/cleos -u https://junglebp.atticlab.net --wallet-url https://junglebp.atticlab.net'
alias lcleos='docker exec -it eosio /opt/eosio/bin/cleos -u http://dev.cryptolions.io:38888 --wallet-url http://0.0.0.0:8888'
	
```

[see more](https://developers.eos.io/eosio-nodeos/docs/cleos-overview)

### Stopping EOSIO Container
When you need to stop, use:
```bash
docker stop eosio
```


## TEST Wallet
### Create keys
```bash 
lcleos create keys
```
private: 5JJHLYPCbY5uUfKoTaKYCmRswZYvz9ioWUZEJesCc8GxtzGYbeq
public: EOS8hLsrT7PxExvP1WW3Ny24HDCFN5Ei1C8GCTMuoYeWuSW6VEc4c

### Create wallet
```bash 
lcleos wallet create -n lion
```
pass PW5JpYzCRzEaGHEnx8xLCkEk5QBucUSmY5jE6b7LqQ8TdR5MYT9NY

### Open wallet
```bash 
lcleos wallet open -n lion
```
### Unlock wallet
```bash 
lcleos wallet unlock -n lion
```
### Import private keys
```bash
lcleos wallet import -n lion --private-key 5JJHLYPCbY5uUfKoTaKYCmRswZYvz9ioWUZEJesCc8GxtzGYbeq
```

### Import test net owner private key
```bash
lcleos wallet import -n lion --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
```
cleos set contract eosio build/contracts/eosio.bios -p eosio@active
