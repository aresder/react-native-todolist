CREATE DATABASE db_react_native_todolist

USE db_react_native_todolist

CREATE TABLE todos(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	`todo` TEXT NOT NULL,
	`complete` BOOL DEFAULT FALSE,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT NULL,
	PRIMARY KEY (id)
)

INSERT INTO todos (todo) VALUES ('Hari ini saya akan mandi')