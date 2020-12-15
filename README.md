<p align="center">
  <a href="https://devfel.com/" rel="noopener">
 <img  src="https://devfel.com/imgs/devfel-logo-01.JPG" alt="DevFel"></a>
</p>

<h1 align="center">GoFinance - Backend</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
In this backend application I developed a transaction management application in order to get practice with Node.js together with TypeScript including the use of a Postgres database with TypeORM and sending files with Multer. This application allows the storage of incomes and outcomes financial transactions and allow the registration and listing of those transactions, in addition to allowing the creation of new records in the database by sending a csv file.
  </p>

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Dependencies](#dependencies)
- [Author](#authors)
- [Acknowledgments](#acknowledgement)

---

## 🧐 Application Routes <a name = "about"></a>

- **_POST /transactions:_** The route must receive title, value, type, and category within the body of the request. Type must be income or outcome only. When registering a new transaction, it will be stored within the database having the fields id, title, value, type, category_id, created_at, updated_at. Also the category is an separated table. Before creating a new category the system checks if a category with the same title already exists. If it exists, use the id that already exists in the database.
- **_GET /transactions:_** This route return a listing of all the transactions registered so far, along with the sum of the entries, withdrawals and total credit.
- **_DELETE /transactions/:id:_** This route delete a transaction with the id present in the route parameters;
- **_POST /transactions/import:_** The backend allow the import of a .csv file containing the same information needed to create a transaction: id, title, value, type, category_id, created_at, updated_at, where each line of the CSV file must be a new record for the database, and finally return all transactions that have been imported into your database.

---

## 🏁 Getting Started <a name = "getting_started"></a>

In order to get a copy of this project an run on your local machine for development and testing purposes you will need to clone the project, run the "yarn" command on your terminal to install all the dependencies and execute the command "yarn dev:server".
It is important to note that this project requires a running database, I suggest you use Docker toghether with Insomnia and DBeaver.

---

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Insomnia](https://insomnia.rest/) - Rest Client
- [DBeaver](https://dbeaver.io/) - DB administration tool
- [Docker](https://www.docker.com/) - Docker Container
- [Typescript](https://www.typescriptlang.org/) - Programming Language

---

## 🔁 Dependencies <a name = "dependencies"></a>

Some project library dependencies includes but are not limited to:

- "cors": "^2.8.5",
- "csv-parse": "^4.8.8",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "express-async-errors": "^3.1.1",
- "multer": "^1.4.2",
- "pg": "^8.3.0",
- "reflect-metadata": "^0.1.13",
- "typeorm": "^0.2.24"
- "typescript": "~3.7.2"

---

## ✍️ Author <a name = "authors"></a>

- [@devfel](https://github.com/devfel) - Luiz Flávio Felizardo

---

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Challenge proposed by Rocket Seat within the gostack 14 bootcamp.
