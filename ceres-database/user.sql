CREATE TABLE IF NOT EXISTS `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `pwd` varchar(100) NOT NULL,
  `departmentID` int,
  `roleID` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`departmentID`) REFERENCES `Department`(`id`),
  FOREIGN KEY (`roleID`) REFERENCES `Role`(`id`)
);


INSERT INTO `User` (username,pwd,roleID) 
VALUES (
    'admin',
    '$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm',
    1
    );

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;