-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2023 at 02:30 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hngx`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `accessToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `googleId`, `name`, `email`, `avatar`, `refreshToken`, `accessToken`, `createdAt`, `updatedAt`) VALUES
(1, '107723107640167537045', 'julian Nwadinobi', 'juliannwadinobi098@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIQPaOnmYJAGp5rm2a9hxB3UGXK7Repf5Dmq6RkG1QV=s96-c', NULL, 'ya29.a0AfB_byBnPtJhMKA2dLLc1-7FP8yJHdsirCCOmIXUjWNhv6FN9iD87rqkzkrRFFK9YwplMduyknUSlDs0iVUea-tpeYlQKmZKD97slxIvppiDJXghmExn7YeTaat8-UiVfxX73QrAcp9NKKhANvQKVLeqDLL0E_VpdMWZaCgYKAZMSARASFQGOcNnCEmhbQPzwCtQq2J8jc9CSIw0171', '2023-09-20 10:43:00', '2023-09-20 10:43:00'),
(2, '100049169571964279770', 'julian louis', 'julianlouis590@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocK7Un3T2UPShNt0GDm3SnI-NvSqz8SRip_m-laZIgo4=s96-c', NULL, 'ya29.a0AfB_byB0pOV2DyT6P536bzzvB60LmHSzPxYV8bMgtqwKyVmh2O-1KB7LSzG8BaxegGM4hW9_vlHh6e_-4LyO5rOLjx-W-h-_8mNpeWZA031TOamL6uCuF5PNGSq2bWPrs9aq2RI05QoY0j3lguoGYCL9kZakc1x8KU2XaCgYKAX4SARISFQGOcNnCqpHzglOA5F0y5_-00JSbAA0171', '2023-09-20 12:04:04', '2023-09-20 12:04:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `googleId` (`googleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
