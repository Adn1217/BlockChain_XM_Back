<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Stack base

1. MongoDB 5.0.
2. Nest JS.

# Ejecutar el desarrollo

1. Clonar el repositorio.
2. Ejecutar:

```
npm install
```

3. Tener Nest CLI instalado:

```
npm install -g @nestjs/cli
```

4. Copiar archivo **.env.template** como **.env**

5. Ajustar variables de entorno definidas en el **.env**

6. Levantar el proyecto:

```
npm run start:dev
```

## Endpoints

### USERS

GetUsers:

**GET**

```
http://localhost:{PORT}/users/
```

CreateUser:

**POST**

```
http://localhost:{PORT}/users/
```

Payload (Body):

```
{
"email": "axy1311@hotmail.com",
"privateKey":"C12asas..johas",
"publicKey": "4Fasaksjas..as"
}
```

CreateUserRandom:

**POST**

```
http://localhost:{PORT}/users/random
```

### TRANSFERS

GenerateTransfer:

**POST**

```
http://localhost:{PORT}/transfers/Nativa
```

Payload (Body):

```
{
    "receiver": "0xC12AA...670d7dB5",
    "amount": 0.1
}
```

GenerateTransferERC20:

**POST**

```
http://localhost:{PORT}/transfers/ERC20
```

Payload (Body):

```
{
    "receiver": "0x58455...f20B6788",
    "amount": 0.1
}
```

### PURCHASES

GetPurchaseByEmailWeb2:

Return list of all purchases done by one user email.

**GET**
(With Query Params)

```
http://localhost:{PORT}/purchases/web2/?email={email}
```

GetPurchaseByEmailWeb3:

Return the amount of the last transaction done by that user on the blockchain contract.

**GET**
(With Query Params)

```
http://localhost:{PORT}/purchases/web3/?email={email}}
```

CreatePurchaseWeb2:

Create a purchase directly in the BD without using web3.

**POST**

```
http://localhost:{PORT}/purchases/web2
```

Headers:

```
Authorization: bearer {email}
```

**Note:** email has to exist in the BD.

Payload (Body):

```
{
    "offerId": 4
}
```

**Note:** The offerId has to exist with status "free" in the BD.

CreatePurchaseWeb3:

Create a purchase using web3 and then it is saved in the web2 BD.

**POST**

```
http://localhost:{PORT}/purchases/web3
```

Headers:

```
Authorization: bearer {email}
```

**Note:** email has to exist in the BD.

Payload (Body):

```
{
    "offerId": 4
}
```

**Note**: The offerId has to exist with status "free" on the BD.

### WITHDRAWALS

generateWithdraw:

Transfer money from contract to a receiver. It has to be executed by an account autorized to withdraw from contract (withdrawOnlyOwner = XMCOP_OWNER).

```
http://localhost:{PORT}/withdrawals
```

Payload (Body):

{
"receiver": "0xC12AA...670d7dB5",
"amount": 0.1
}

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
