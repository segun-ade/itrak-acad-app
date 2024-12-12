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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `news_id` varchar(45) NOT NULL,
  `school_id` varchar(45) DEFAULT NULL,
  `class_id` varchar(45) DEFAULT NULL,
  `student_id` varchar(45) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `term` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `news_date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `displayatstartup` varchar(45) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `read_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`news_id`),
  KEY `FK1_idx` (`school_id`),
  KEY `FK2_idx` (`class_id`),
  KEY `FK3_idx` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES ('0001','MSB0001A','NUR3','oluwsupo0001','2024/2025','1st','Exam - Timetable',NULL,'2024-10-10',NULL,NULL,100,'Yes'),('0002','MSB0001A','NUR3','oluwsupo0001','2024/2025','1st','School Timetable',NULL,'2024-10-10',NULL,NULL,0,'No'),('0003','MSB0001A','NUR3','oluwsupo0001','2024/2025','1st','Next PTA meeting',NULL,'2024-10-10',NULL,NULL,100,'Yes'),('0004','MSB0001A','NUR3','oluwsupo0001','2024/2025','1st','End-of-Year Party',NULL,'2024-10-10',NULL,NULL,100,'Yes'),('0005','MSB0001A','NUR3','oluwsupo0001','2024/2025','1st','School Bus Students',NULL,'2024-10-10',NULL,NULL,0,'No');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:17
