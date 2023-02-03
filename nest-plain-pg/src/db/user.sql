CREATE TABLE users (
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
name varchar(15) UNIQUE NOT NULL,
password varchar(30) NOT NULL,
email varchar(30) UNIQUE NOT NULL
);