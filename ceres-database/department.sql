CREATE TABLE IF NOT EXISTS `Department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;