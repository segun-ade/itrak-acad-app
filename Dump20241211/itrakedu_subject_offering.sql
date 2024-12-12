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
-- Table structure for table `subject_offering`
--

DROP TABLE IF EXISTS `subject_offering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_offering` (
  `offering_id` varchar(45) NOT NULL,
  `subject_id` varchar(45) DEFAULT NULL,
  `student_id` varchar(45) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `teacher_id` varchar(45) DEFAULT NULL,
  `term` varchar(45) DEFAULT NULL,
  `reg_date` date DEFAULT NULL,
  PRIMARY KEY (`offering_id`),
  KEY `FK_idx_offerings_subjects` (`subject_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_offerings_students` (`student_id`),
  KEY `FK_idx_offerings_sessions` (`session_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_offerings_teachers` (`teacher_id`),
  CONSTRAINT `FK_idx_offerings_sessions` FOREIGN KEY (`session_id`) REFERENCES `acad_sessions` (`session_id`),
  CONSTRAINT `FK_idx_offerings_students` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `FK_idx_offerings_subjects` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `FK_idx_offerings_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_offering`
--

LOCK TABLES `subject_offering` WRITE;
/*!40000 ALTER TABLE `subject_offering` DISABLE KEYS */;
INSERT INTO `subject_offering` VALUES ('202425010001','MATHG01','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010002','FRENCH','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010003','F.MATHS','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010004','ENGLISH','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010005','C.R.K','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010006','BIOLOGY','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010007','BASIC SC.','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-25'),('202425010008','MATHP01','adeyjohf0003','2024/2025','ekechis1','1ST','2024-08-25'),('202425010009','ENGLISH','adeyjohf0003','2024/2025','ekechis1','1ST','2024-08-25'),('202425010010','MATHN01','oluwfavo0002','2024/2025','ekechis1','1ST','2024-08-25'),('202425010011','ENGLISH','oluwfavo0002','2024/2025','ekechis1','1ST','2024-08-25'),('202425010012','AGRIC SC.','oluwsupo0001','2024/2025','osujcar1','1ST','2024-08-26');
/*!40000 ALTER TABLE `subject_offering` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:26
