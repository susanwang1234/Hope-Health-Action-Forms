CREATE TABLE IF NOT EXISTS `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password` varchar(50) NOT NULL,
  `departmentID` int NOT NULL,
  `roleID` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`departmentID`) REFERENCES `Department`(`id`),
  FOREIGN KEY (`roleID`) REFERENCES `Role`(`id`)
);

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;