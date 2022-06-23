# Serverless - AWS Node.js Typescript

This project is a simple serverless CRUD

## What it use?

  - Serverless Framework
  - Redis
  - Mysql2 lib
  - Typescript
  - Docker-compose

## FIRST

run docker-compose up -d

create the table

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  permissionLevel INT DEFAULT 0,
  rg VARCHAR(30),
  cpf VARCHAR(30),
  sexo VARCHAR(30),
  active TINYINT DEFAULT TRUE,
  superUser TINYINT DEFAULT FALSE,
  PRIMARY KEY (id)
)