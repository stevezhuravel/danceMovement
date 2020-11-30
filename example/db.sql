-- This deletes a previous instance of database dancemovement-dev for fresh install
DROP DATABASE IF EXISTS dancemovement-dev;
CREATE DATABASE dancemovement-dev;
USE dancemovement-dev;

-- Create tables in new table (these are the same as ../tables.sql)
CREATE TABLE users (
  usrname VARCHAR (60) UNIQUE,
  password VARCHAR (60),
  usr_id INT AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE media (
  name VARCHAR (70) UNIQUE, 
  id INT AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE playlist ( 
  list_id INT AUTO_INCREMENT PRIMARY KEY,
  usr_id INT, 
  media_list VARCHAR (400),
  FOREIGN KEY(usr_id) REFERENCES users(usr_id)
);

-- Create user and configurations that bypass MySQL 8 authentication issues for node db
-- https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
-- https://github.com/mysqljs/mysql/pull/1962#issuecomment-390900841
DROP USER IF EXISTS dev;
CREATE USER IF NOT EXISTS 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY '1111';
GRANT ALL PRIVILEGES ON * . * TO 'dev'@'localhost';
ALTER USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY '1111';
FLUSH PRIVILEGES;