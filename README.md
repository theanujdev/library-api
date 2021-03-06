# Library API (Backend)

## Overview

This repo is backend API server for library management system made with expressjs and mongoose.

## Features

- Login students and teachers.
- Register students and teachers.
- Find student by name.
- List all students
- CRUD operations on books
- Only teachers can Add, Update, and Delete books
- Student can issue a book

## Run Locally

- Clone the project

```bash
git clone https://github.com/theanujdev/library-api
```

- Go to the project directory

```bash
cd library-api
```

- Install dependencies

```bash
yarn install
```

- Create a new file `.env`. Copy all the content from `.env.example` and paste it into `.env`. Change the following environment variables in your `.env` file

  `MONGODB_URI`, `JWT_SECRET`, `PORT`

- Start the server

```bash
yarn dev
```

> **Note:** Make sure to run **MongoDB** server in the background.

## Optimizations

Scalability is achieved through the use of best practises and project structure. Morgan logger is used for request logs, and all http errors are handled separately. For authentication, it uses bcrypt and JWT tokens. All fields are validated.

## Feedback

If you have any feedback, please reach out at [@theanujdev](https://twitter.com/theanujdev)

## Authors

- [@theanujdev](https://www.github.com/theanujdev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
