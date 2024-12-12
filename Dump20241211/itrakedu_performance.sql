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
-- Table structure for table `performance`
--

DROP TABLE IF EXISTS `performance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `performance` (
  `performance_id` varchar(45) NOT NULL,
  `offering_id` varchar(45) DEFAULT NULL,
  `assessment_no` int DEFAULT NULL,
  `assessment_type` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `grade` varchar(45) DEFAULT NULL,
  `assessment_date` date DEFAULT NULL,
  `assessment_time` time DEFAULT NULL,
  PRIMARY KEY (`performance_id`),
  KEY `FK_idx_performance_offerings` (`offering_id`),
  CONSTRAINT `FK_idx_performance_offerings` FOREIGN KEY (`offering_id`) REFERENCES `subject_offering` (`offering_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance`
--

LOCK TABLES `performance` WRITE;
/*!40000 ALTER TABLE `performance` DISABLE KEYS */;
INSERT INTO `performance` VALUES ('20240825E001','202425010004',1,'Exam','First Term Exam',90,'A','2024-10-10','08:00:00'),('20240825E002','202425010007',1,'Exam','First Term Exam',80,'B','2024-10-10','09:30:00'),('20240825E003','202425010004',1,'Exam','First Term Exam',95,'A','2024-10-07','09:00:00'),('20240825E004','202425010007',1,'Exam','First Term Exam',79,'B','2024-10-10','10:30:00'),('20240825T001','202425010001',1,'Test','Mid-Term Test',50,'C','2024-10-10','11:30:00'),('20240825T002','202425010002',1,'Test','Mid-Term Test',30,'F','2024-10-11','13:00:00'),('20240825T003','202425010001',1,'Test','Mid-Term Test',57,'C','2024-10-11','12:30:00'),('20240825T004','202425010002',1,'Test','Mid-Term Test',35,'F','2024-10-10','10:00:00');
/*!40000 ALTER TABLE `performance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:39
