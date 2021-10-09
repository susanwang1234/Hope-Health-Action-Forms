CREATE TABLE IF NOT EXISTS `Department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `Department` (departmentName) VALUES ('Rehab');

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;