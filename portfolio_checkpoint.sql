-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: portfolio_checkpoint
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (85,'Emeline PAUS'),(86,'Moi'),(87,'WCS'),(88,''),(89,'Emeline PAUS'),(90,'sgsdgdsgdsgds'),(91,'sgsdgdsgdsgds'),(92,'sgsdgdsgdsgds'),(93,'sgsdgdsgdsgds'),(94,'sgsdgdsgdsgds'),(95,'sgsdgdsgdsgds'),(96,'sgsdgdsgdsgds'),(97,'sgsdgdsgdsgds'),(98,'sgsdgdsgdsgds'),(99,'Wild Code School - Bordeaux'),(100,''),(101,'WCS'),(102,''),(103,''),(104,''),(105,''),(106,''),(107,''),(108,''),(109,''),(110,''),(111,''),(112,''),(113,''),(114,''),(115,''),(116,''),(117,''),(118,''),(119,''),(120,''),(121,''),(122,''),(123,''),(124,''),(125,''),(126,''),(127,''),(128,''),(129,''),(130,''),(131,''),(132,''),(133,''),(134,''),(135,''),(136,''),(137,''),(138,''),(139,''),(140,''),(141,''),(142,''),(143,''),(144,''),(145,''),(146,'Ekino'),(147,''),(148,''),(149,''),(150,''),(151,'Dr thibault NOAILLES'),(152,'Test');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `join_client_project`
--

DROP TABLE IF EXISTS `join_client_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `join_client_project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_client` int DEFAULT NULL,
  `id_project` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jcp_client` (`id_client`),
  KEY `fk_jcp_project` (`id_project`),
  CONSTRAINT `fk_jcp_client` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_jcp_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `join_client_project`
--

LOCK TABLES `join_client_project` WRITE;
/*!40000 ALTER TABLE `join_client_project` DISABLE KEYS */;
INSERT INTO `join_client_project` VALUES (15,99,113),(17,101,115),(62,146,160),(67,151,165);
/*!40000 ALTER TABLE `join_client_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `join_language_project`
--

DROP TABLE IF EXISTS `join_language_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `join_language_project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_language` int DEFAULT NULL,
  `id_project` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jlp_language_idx` (`id_language`),
  KEY `fk_jlp_project_idx` (`id_project`),
  CONSTRAINT `fk_jlp_language` FOREIGN KEY (`id_language`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_jlp_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=422 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `join_language_project`
--

LOCK TABLES `join_language_project` WRITE;
/*!40000 ALTER TABLE `join_language_project` DISABLE KEYS */;
INSERT INTO `join_language_project` VALUES (391,55,115),(395,53,165),(396,55,165),(397,54,165),(398,57,165),(399,60,165),(415,54,113),(416,55,113),(417,53,113),(418,57,113),(419,60,113);
/*!40000 ALTER TABLE `join_language_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (53,'HTML'),(54,'CSS'),(55,'JavaScript'),(56,'PHP'),(57,'React'),(60,'Redux'),(61,'Node'),(65,'Express'),(66,'SQL');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `background` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (113,'BET FICTION','https://bet-app0920.herokuapp.com/','6 semaines','https://images.squarespace-cdn.com/content/v1/54a44991e4b034981b4654c7/1608356561819-LSEPLHK4GM0SC9CFWCEM/ke17ZwdGBToddI8pDm48kNMIMLR5HyT8T-Jl3SGhJah7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mhydAgiKdIfeAoxVgE7c7q4sG_vuJrMOZ7XoXilib1sTJeOOQgxJjPHQIyFj-oA0A/Gradient+Abstract+Shapes+Background+Color-01.jpg?format=1500w'),(115,'MYTHOLODEX','https://cannotread-app.herokuapp.com/','24 heures','https://media-exp1.licdn.com/dms/image/C4E1BAQG0Oe6e1TfyAw/company-background_10000/0/1600034179520?e=2159024400&v=beta&t=8eBzWybiiyg_3vqvlU-Gf1DksJ-xyIk5l2ll4wfx_1g'),(160,'MOVISIO','','48 heures','https://www.granbyexpress.com/wp-content/uploads/sites/9/2020/12/Salle-de-cinema-Deposit-photos-1600x1017.jpg'),(165,'Serenity','','7 semaines','');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-04 23:44:46
