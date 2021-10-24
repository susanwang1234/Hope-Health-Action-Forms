-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: ceresdb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ceresdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ceresdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ceresdb`;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Department` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,'Rehab');
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DepartmentQuestion`
--

DROP TABLE IF EXISTS `DepartmentQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DepartmentQuestion` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `departmentId` int unsigned NOT NULL,
  `questionId` int unsigned NOT NULL,
  `isRequired` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentquestion_departmentid_foreign` (`departmentId`),
  KEY `departmentquestion_questionid_foreign` (`questionId`),
  CONSTRAINT `departmentquestion_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`),
  CONSTRAINT `departmentquestion_questionid_foreign` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DepartmentQuestion`
--

LOCK TABLES `DepartmentQuestion` WRITE;
/*!40000 ALTER TABLE `DepartmentQuestion` DISABLE KEYS */;
INSERT INTO `DepartmentQuestion` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,4,1),(5,1,5,1),(6,1,6,1),(7,1,7,1),(8,1,8,1),(9,1,9,1),(10,1,10,1),(11,1,11,1),(12,1,12,1),(13,1,13,1);
/*!40000 ALTER TABLE `DepartmentQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dummies`
--

DROP TABLE IF EXISTS `Dummies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dummies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `dummies_name` varchar(60) DEFAULT NULL,
  `dummies_info` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dummies`
--

LOCK TABLES `Dummies` WRITE;
/*!40000 ALTER TABLE `Dummies` DISABLE KEYS */;
INSERT INTO `Dummies` VALUES (1,'Dummy1',111),(2,'Dummy2',222);
/*!40000 ALTER TABLE `Dummies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Form`
--

DROP TABLE IF EXISTS `Form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Form` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `departmentId` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `form_departmentid_foreign` (`departmentId`),
  CONSTRAINT `form_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Form`
--

LOCK TABLES `Form` WRITE;
/*!40000 ALTER TABLE `Form` DISABLE KEYS */;
/*!40000 ALTER TABLE `Form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FormResponse`
--

DROP TABLE IF EXISTS `FormResponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FormResponse` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `departmentQuestionId` int unsigned NOT NULL,
  `formId` int unsigned NOT NULL,
  `response` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formresponse_departmentquestionid_foreign` (`departmentQuestionId`),
  KEY `formresponse_formid_foreign` (`formId`),
  CONSTRAINT `formresponse_departmentquestionid_foreign` FOREIGN KEY (`departmentQuestionId`) REFERENCES `DepartmentQuestion` (`id`),
  CONSTRAINT `formresponse_formid_foreign` FOREIGN KEY (`formId`) REFERENCES `Form` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FormResponse`
--

LOCK TABLES `FormResponse` WRITE;
/*!40000 ALTER TABLE `FormResponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `FormResponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `inputType` varchar(20) NOT NULL,
  `responseType` varchar(20) NOT NULL,
  `isMSPP` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
INSERT INTO `Question` VALUES (1,'Beds available','text','number',1),(2,'Beds days','text','number',1),(3,'Patient days','text','number',1),(4,'Hospitalized','text','number',1),(5,'Discharged alive','text','number',1),(6,'Died before 48h','text','number',1),(7,'Died after 48h','text','number',1),(8,'Days hospitalised','text','number',1),(9,'Referrals','text','number',1),(10,'Transfers','text','number',1),(11,'Self-discharged','text','number',1),(12,'Stayed in the ward','text','number',1),(13,'Admissions','text','number',1);
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rehab_Report`
--

DROP TABLE IF EXISTS `Rehab_Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rehab_Report` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `curr_date` datetime DEFAULT NULL,
  `beds_available` int DEFAULT NULL,
  `bed_days` int DEFAULT NULL,
  `patient_days` int DEFAULT NULL,
  `hospitalised` int DEFAULT NULL,
  `discharged` int DEFAULT NULL,
  `self_discharges` int DEFAULT NULL,
  `deaths_before_48` int DEFAULT NULL,
  `deaths_after_48` int DEFAULT NULL,
  `days_hospitalised` int DEFAULT NULL,
  `referrals` int DEFAULT NULL,
  `transfers` int DEFAULT NULL,
  `stays` int DEFAULT NULL,
  `admissions` int DEFAULT NULL,
  `outpatients` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rehab_Report`
--

LOCK TABLES `Rehab_Report` WRITE;
/*!40000 ALTER TABLE `Rehab_Report` DISABLE KEYS */;
INSERT INTO `Rehab_Report` VALUES (1,'2021-10-04 20:53:15',19,434,377,17,2,1,1,0,334,0,0,13,4,16),(2,'2021-10-05 07:44:04',22,435,378,17,2,1,1,0,335,0,0,13,4,16);
/*!40000 ALTER TABLE `Rehab_Report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'admin'),(2,'user'),(3,'departmentHead');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `departmentId` int unsigned NOT NULL,
  `roleId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_unique` (`username`),
  KEY `user_departmentid_foreign` (`departmentId`),
  KEY `user_roleid_foreign` (`roleId`),
  CONSTRAINT `user_departmentid_foreign` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`),
  CONSTRAINT `user_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin','$2b$12$kUy4kEGLkdmB9hgSxtyOYetqixdHXOWOa/OSNKcYopCZVhQogwjOm',1,1);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20211008040614_create_dummy_table.ts',1,'2021-10-24 00:44:52'),(2,'20211009055642_create_rehab_report_table.ts',1,'2021-10-24 00:44:52'),(3,'20211009062452_create_department_table.ts',1,'2021-10-24 00:44:52'),(4,'20211009063318_create_role_table.ts',1,'2021-10-24 00:44:52'),(5,'20211009064206_create_user_table.ts',1,'2021-10-24 00:44:52'),(6,'20211009225937_create_questions_table.ts',1,'2021-10-24 00:44:52'),(7,'20211009230819_create_department_questions_table.ts',1,'2021-10-24 00:44:52'),(8,'20211009231746_create_forms_table.ts',1,'2021-10-24 00:44:52'),(9,'20211009233803_create_forms_responses_table.ts.ts',1,'2021-10-24 00:44:52');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-24  0:47:07
