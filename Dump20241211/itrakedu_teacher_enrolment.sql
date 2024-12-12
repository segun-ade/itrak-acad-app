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
-- Table structure for table `teacher_enrolment`
--

DROP TABLE IF EXISTS `teacher_enrolment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_enrolment` (
  `enrolment_id` varchar(45) NOT NULL,
  `teacher_id` varchar(45) DEFAULT NULL,
  `subject_id` varchar(45) DEFAULT NULL,
  `students_no` int DEFAULT NULL,
  `teaching_capacity` int DEFAULT NULL,
  PRIMARY KEY (`enrolment_id`),
  KEY `FK_idx_enrol_teachers` (`teacher_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_enrol_subjects` (`subject_id`),
  CONSTRAINT `FK_idx_enrol_subjects` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `FK_idx_enrol_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_enrolment`
--

LOCK TABLES `teacher_enrolment` WRITE;
/*!40000 ALTER TABLE `teacher_enrolment` DISABLE KEYS */;
INSERT INTO `teacher_enrolment` VALUES ('20240825AS1','osujcar1','AGRIC SC.',1,20),('20240825B1','osujcar1','BIOLOGY',1,20),('20240825BS1','osujcar1','BASIC SC.',1,20),('20240825C1','osujcar1','C.R.K',1,20),('20240825E1','ekechis1','ENGLISH',3,10),('20240825E2','osujcar1','ENGLISH',3,20),('20240825F1','osujcar1','FRENCH',1,20),('20240825FM1','osujcar1','F.MATHS',1,20),('20240825M1','ekechis1','MATHP01',1,10),('20240825M2','ekechis1','MATHN01',1,10),('20240825M3','osujcar1','MATHG01',1,20);
/*!40000 ALTER TABLE `teacher_enrolment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:24
