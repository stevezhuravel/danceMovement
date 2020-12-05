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

INSERT INTO users(usrname, password, usr_id) VALUES ('testadmin', 'testadmin', 001);

SELECT * FROM users;

INSERT INTO media(name, id)
VALUES
('B-1arm', 001),
('B-2arm', 002),
('B-3arm', 003),
('B-4arm', 004),
('B-6arm', 005),
('B-8', 006),
('B-11neck', 007),
('B-12', 008),
('B-13', 009),
('B-14', 010),
('B-15', 011),
('B-16', 012),
('B-17arm', 013),
('B-19', 014),
('B-20arm', 015),
('B-22arm', 016),
('B-23arm', 017),
('B-24arm', 018),
('B-25arm', 019),
('B-26arm', 020),
('C-1', 021),
('C-2', 022),
('C-4', 023),
('C-5', 024),
('C-6', 025),
('C-G-2', 026),
('C-G-3', 027),
('C-G-4', 028),
('C-G-5', 029),
('E-1', 030),
('E-2', 031),
('E-7', 032),
('E-9', 033),
('E-10', 034),
('E-15', 035),
('E-16 copy', 036),
('E-18 copy', 037),
('E-20 copy', 038),
('E-21 copy', 039),
('E-22 copy', 040),
('E-26 copy', 041),
('E-29 copy', 042),
('E-30 copy', 043),
('E-31 copy', 044),
('E-33 copy', 045),
('H-1-1 copy', 046),
('H-1-4 copy', 047),
('H-1-5 copy', 048),
('H-2-1 copy', 049),
('H-2-2 copy', 050),
('H-2-3 copy', 051),
('H-2-7 copy', 052),
('Kabuki1', 053),
('LH-1', 054),
('LH-3', 055),
('LH-4', 056),
('nodozu copy', 057);

SELECT * FROM media;
DROP TABLE media;