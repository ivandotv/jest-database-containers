DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
  ID SERIAL PRIMARY KEY,
  FIRST_NAME VARCHAR(50) NOT NULL,
  LAST_NAME VARCHAR(50) NOT NULL,
  EMAIL VARCHAR(50) NOT NULL
);

INSERT INTO
Users (FIRST_NAME, LAST_NAME,EMAIL)
VALUES
('Ivan','Bambino','ivan@example.com'),
('Mario', 'Markoni','mario@example.com'),
('Bruno','Brunoti','bruno@example.com');
