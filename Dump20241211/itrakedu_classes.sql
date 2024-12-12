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
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` varchar(45) NOT NULL,
  `teacher_id` varchar(45) DEFAULT NULL,
  `class_name` varchar(45) DEFAULT NULL,
  `class_cat` varchar(45) DEFAULT NULL,
  `class_subsect` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `FK_idx_classes_teachers` (`teacher_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `FK_idx_classes_teachers` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES ('GRAD1','ekechis1','GRADE1','PRIMARY','A'),('GRAD2A','osujcar1','GRADE2','PRIMARY','A'),('GRAD2B','osujcar1','GRADE2','PRIMARY','B'),('GRAD3','osujcar1','GRADE3','PRIMARY','A'),('GRAD4','osujcar1','GRADE4','PRIMARY','A'),('GRAD5A','osujcar1','GRADE5','PRIMARY','A'),('GRAD5B','osujcar1','GRADE5','PRIMARY','B'),('GRAD5C','osujcar1','GRADE5','PRIMARY','C'),('NUR1','ekechis1','NURSERY1','NURSERY','A'),('NUR2','ekechis1','NURSERY2','NURSERY','A'),('NUR3','ekechis1','NURSERY3','NURSERY','A'),('PNUR','ekechis1','PRE-NURSERY','PRE-NURSERY','A');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:05
