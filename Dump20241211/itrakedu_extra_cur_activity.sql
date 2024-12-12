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
-- Table structure for table `extra_cur_activity`
--

DROP TABLE IF EXISTS `extra_cur_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extra_cur_activity` (
  `activity_id` varchar(45) NOT NULL,
  `student_id` varchar(45) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `term` varchar(45) DEFAULT NULL,
  `school_id` varchar(45) DEFAULT NULL,
  `class_id` varchar(45) DEFAULT NULL,
  `act_type` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `score` int DEFAULT NULL,
  `grade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `FK_idx_activity_schools` (`school_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_activity_classes` (`class_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `FK_idx_activity_classes` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `FK_idx_activity_schools` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extra_cur_activity`
--

LOCK TABLES `extra_cur_activity` WRITE;
/*!40000 ALTER TABLE `extra_cur_activity` DISABLE KEYS */;
INSERT INTO `extra_cur_activity` VALUES ('20240826EX001','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','Practical','Chem-Practical','Chemistry Practical','2024-10-10','08:00:00',80,'B'),('20240826EX002','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','Practical','Chem-Practical','Chemistry Practical','2024-09-09','08:00:00',90,'A'),('20240826EX003','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','Practical','Cooking','Cooking','2024-10-10','08:00:00',65,'C'),('20240826EX004','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','Practical','Cooking','Cooking','2024-10-09','08:00:00',80,'B'),('20240826EX005','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','Sports','Basketball','Basketball','2024-10-10','08:00:00',80,'B'),('20240826EX006','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','Sports','Basketball','Basketball','2024-10-09','08:00:00',50,'D'),('20240826EX007','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','HSE','Swimming','Swimming','2024-10-10','08:00:00',25,'F'),('20240826EX008','oluwsupo0001','2024/2025','1st','MSB0001A','NUR3','HSE','Swimming','Swimming','2024-10-03','08:00:00',30,'F');
/*!40000 ALTER TABLE `extra_cur_activity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:31
