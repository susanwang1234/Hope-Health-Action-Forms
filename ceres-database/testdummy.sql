CREATE TABLE Dummies(
	dummies_id INT PRIMARY KEY AUTO_INCREMENT,
	dummies_name VARCHAR(60),
	dummies_info INT
);

INSERT INTO Dummies(dummies_name, dummies_info) VALUES("Dummy1", 111);
INSERT INTO Dummies(dummies_name, dummies_info) VALUES("Dummy2", 222);

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;