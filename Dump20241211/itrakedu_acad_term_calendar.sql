-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: itrakedu
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acad_term_calendar`
--

DROP TABLE IF EXISTS `acad_term_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acad_term_calendar` (
  `calendar_id` int NOT NULL,
  `school_id` varchar(45) DEFAULT NULL,
  `session_id` varchar(45) DEFAULT NULL,
  `term` varchar(45) DEFAULT NULL,
  `term_starts` date DEFAULT NULL,
  `term_ends` date DEFAULT NULL,
  `mid_term_test_rev_starts` date DEFAULT NULL,
  `mid_term_test_rev_ends` date DEFAULT NULL,
  `mid_term_test_starts` date DEFAULT NULL,
  `mid_term_test_ends` date DEFAULT NULL,
  `open_day` date DEFAULT NULL,
  `mid_term_break_starts` date DEFAULT NULL,
  `mid_term_break_ends` date DEFAULT NULL,
  `exam_rev_starts` date DEFAULT NULL,
  `exam_rev_ends` date DEFAULT NULL,
  `thanksgiving_day` date DEFAULT NULL,
  `exam_starts` date DEFAULT NULL,
  `exam_ends` date DEFAULT NULL,
  `eot_party` date DEFAULT NULL,
  `holiday_starts` date DEFAULT NULL,
  `holiday_ends` date DEFAULT NULL,
  PRIMARY KEY (`calendar_id`),
  KEY `FK_acadcal_sessid` (`session_id`) /*!80000 INVISIBLE */,
  KEY `FK_acadcal_school_id` (`school_id`),
  CONSTRAINT `FK_acadcal_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`),
  CONSTRAINT `FK_acadcal_sessid` FOREIGN KEY (`session_id`) REFERENCES `acad_sessions` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acad_term_calendar`
--

LOCK TABLES `acad_term_calendar` WRITE;
/*!40000 ALTER TABLE `acad_term_calendar` DISABLE KEYS */;
INSERT INTO `acad_term_calendar` VALUES (20242501,'MSB0001A','2024/2025','1st','2024-09-09','2024-12-13','2024-10-07','2024-10-11','2024-10-14','2024-10-18','2024-10-24','2024-10-25','2024-10-28','2024-11-18','2024-11-22','2024-11-21','2024-11-25','2024-12-04','2024-12-12','2024-12-13','2024-12-05');
/*!40000 ALTER TABLE `acad_term_calendar` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:15
