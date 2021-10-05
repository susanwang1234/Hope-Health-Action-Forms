CREATE TABLE IF NOT EXISTS Rehab_Report(
  id INT NOT NULL AUTO_INCREMENT,
  curr_date DATETIME NULL,
  beds_available INT NULL,
  bed_days INT NULL,
  patient_days INT NULL,
  hospitalised INT NULL,
  discharged INT NULL,
  self_discharges INT NULL,
  deaths_before_48 INT NULL,
  deaths_after_48 INT NULL,
  days_hospitalised INT NULL,
  referrals INT NULL,
  transfers INT NULL,
  stays INT NULL,
  admissions INT NULL,
  outpatients INT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
);

INSERT INTO Rehab_Report(
  curr_date,
  beds_available,
  bed_days,
  patient_days,
  hospitalised,
  discharged,
  self_discharges,
  deaths_before_48,
  deaths_after_48,
  days_hospitalised,
  referrals,
  transfers,
  stays,
  admissions,
  outpatients
) VALUES(
  "2021-10-4 20:53:15",
  19,
  434,
  377,
  17,
  2,
  1,
  1,
  0,
  334,
  0,
  0,
  13,
  4,
  16
);

INSERT INTO Rehab_Report(
  curr_date,
  beds_available,
  bed_days,
  patient_days,
  hospitalised,
  discharged,
  self_discharges,
  deaths_before_48,
  deaths_after_48,
  days_hospitalised,
  referrals,
  transfers,
  stays,
  admissions,
  outpatients
) VALUES(
  "2021-10-5 07:44:04",
  22,
  435,
  378,
  17,
  2,
  1,
  1,
  0,
  335,
  0,
  0,
  13,
  4,
  16
);

ALTER USER 'HHA' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;