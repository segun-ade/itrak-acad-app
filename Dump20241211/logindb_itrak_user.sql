-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: logindb
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
-- Table structure for table `itrak_user`
--

DROP TABLE IF EXISTS `itrak_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itrak_user` (
  `email_addr` varchar(100) NOT NULL,
  `pwd` varchar(500) NOT NULL,
  `user_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`email_addr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itrak_user`
--

LOCK TABLES `itrak_user` WRITE;
/*!40000 ALTER TABLE `itrak_user` DISABLE KEYS */;
INSERT INTO `itrak_user` VALUES ('adeyolu03','$2b$10$ekjpSpZBWwHqJ7YXc94bB.ZnH8v6OZ13t88kSUljn.jQgJJNk3i3W','professional'),('glotech247','$2b$10$.PaAlUp51h6r.EfNCTYF/ODNH452XE3RRh0Mhn/CGfCaHhe7O2fzO','company-rep'),('itechmaster22','$2b$10$BEqJNHxaOLHKR9CnslowgevvujXZA9AKpohrcBgc5HjfN6bt2X4ve','vendor'),('undefined','$2b$10$1lqRdHGmhIqKIKHz1kwVNeZ.Rb3Kmg1RYf5wryo7Gnib1By/ALFTK','undefined');
/*!40000 ALTER TABLE `itrak_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 21:52:47
