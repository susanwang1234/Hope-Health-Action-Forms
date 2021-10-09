CREATE TABLE IF NOT EXISTS `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `Role` (roleName) VALUES ('admin');
INSERT INTO `Role` (roleName) VALUES ('user');
INSERT INTO `Role` (roleName) VALUES ('departmentHead');

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;