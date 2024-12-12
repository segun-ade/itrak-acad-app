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
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(45) NOT NULL,
  `session_id` varchar(100) NOT NULL,
  `term` varchar(45) NOT NULL,
  `week` int NOT NULL,
  `monday` varchar(1) DEFAULT NULL,
  `tuesday` varchar(1) DEFAULT NULL,
  `wednesday` varchar(1) DEFAULT NULL,
  `thursday` varchar(1) DEFAULT NULL,
  `friday` varchar(1) DEFAULT NULL,
  `saturday` varchar(45) DEFAULT NULL,
  `sunday` varchar(45) DEFAULT NULL,
  `week_start` date DEFAULT NULL,
  `week_end` date DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `FK_idx_attendance_students` (`student_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_attendance_sessions` (`session_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `FK_idx_attendance_sessions` FOREIGN KEY (`session_id`) REFERENCES `acad_sessions` (`session_id`),
  CONSTRAINT `FK_idx_attendance_students` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'oluwsupo0001','2024/2025','1st',1,'N','Y','Y','Y','Y',NULL,NULL,'2024-09-08','2024-09-14'),(2,'oluwsupo0001','2024/2025','1st',2,'Y','Y','Y','Y','Y',NULL,NULL,'2024-09-15','2024-09-21'),(3,'oluwsupo0001','2024/2025','1st',3,'N','Y','Y','Y','N',NULL,NULL,'2024-09-22','2024-09-28'),(4,'oluwsupo0001','2024/2025','1st',4,'Y','Y','N','Y','Y',NULL,NULL,'2024-09-29','2024-10-05'),(5,'oluwsupo0001','2024/2025','1st',5,'Y','Y','Y','Y','Y',NULL,NULL,'2024-10-06','2024-10-12');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:36
