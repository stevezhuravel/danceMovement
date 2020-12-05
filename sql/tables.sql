create table users (
usrname VARCHAR (60) UNIQUE,
password VARCHAR (60),
usr_id INT AUTO_INCREMENT PRIMARY KEY
);
create table media (
name VARCHAR (70) UNIQUE, 
id INT AUTO_INCREMENT PRIMARY KEY
);
create table playlist ( 
list_id INT AUTO_INCREMENT PRIMARY KEY,
usr_id INT, 
media_list VARCHAR (400),
FOREIGN KEY(usr_id) REFERENCES users(usr_id)
);