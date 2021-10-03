-- CREATE SCHEMA Rehab_Report DEFAULT CHARACTER SET utf8 ;
-- USE Rehab_Report;

CREATE TABLE Rehab_Deaths (
  id INT NOT NULL AUTO_INCREMENT,
  report_id INT NOT NULL,
  before_48 TINYINT NULL,
  cause VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
  INDEX report_id_idx (report_id ASC) VISIBLE,
  CONSTRAINT report_id
    FOREIGN KEY (report_id)
    REFERENCES Rehab_Report (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO Rehab_Deaths(report_id, before_48, cause) VALUES(22, 2, "unknown");
INSERT INTO Rehab_Deaths(report_id, before_48, cause) VALUES(33, 3, "unknown");

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
