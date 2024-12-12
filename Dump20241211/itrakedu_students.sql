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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` varchar(45) NOT NULL,
  `parent_id` varchar(45) DEFAULT NULL,
  `school_id` varchar(45) DEFAULT NULL,
  `class_id` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `middlename` varchar(45) DEFAULT NULL,
  `reg_no` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `student_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `FK_idx_students_parents` (`parent_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_students_schools` (`school_id`) /*!80000 INVISIBLE */,
  KEY `FK_idx_students_classes` (`class_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `FK_idx_students_classes` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `FK_idx_students_parents` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`parent_id`),
  CONSTRAINT `FK_idx_students_schools` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('adeyjohf0003','gracadem002','MSB0001A','PNUR','JOHNSON','ADEYEMO','F.','8837493',2,'2022-10-23','M','REGULAR'),('adeypatb0003','gracadem002','CHF0003T','GRAD1','PATIENCE','ADEYEMO','B.','8847389',6,'2018-05-05','F','REGULAR'),('oluwfavo0002','adeyolus001','MSB0001A','NUR1','FAVOUR','OLUWASEGUN','O.C.','8872938',3,'2021-07-24','M','REGULAR'),('oluwgooo0004','adeyolus001','BRT0002A','PNUR','GOODNESS','OLUWASEGUN','O.C.','8377847',2,'2023-07-21','M','REGULAR'),('oluwsupo0001','adeyolus001','MSB0001A','NUR3','SUPREME','OLUWASEGUN','O.C.','0098128',5,'2019-11-14','M','REGULAR');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:19
