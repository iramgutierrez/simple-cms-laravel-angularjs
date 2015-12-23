-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 23-12-2015 a las 17:49:26
-- Versión del servidor: 5.5.46-0ubuntu0.14.04.2
-- Versión de PHP: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ig`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Skills', 'skills', '2015-12-21 23:33:39', '0000-00-00 00:00:00'),
(2, 'Projects', 'projects', '2015-12-23 16:54:14', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `custom_fields`
--

CREATE TABLE IF NOT EXISTS `custom_fields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `field` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `custom_fields_post_id_foreign` (`post_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `custom_fields`
--

INSERT INTO `custom_fields` (`id`, `post_id`, `field`, `slug`, `value`, `created_at`, `updated_at`) VALUES
(1, 1, 'custom 1', 'custom-1', 'Custom value 1 Custom value 1 Custom value 1 Custom value 1 Custom value 1 Custom value 1 Custom value 1 Custom value 1 Custom value 1 ', '2015-12-22 21:58:32', '0000-00-00 00:00:00'),
(2, 1, 'custom 1', 'custom-1', 'Custom value 2 Custom value 2 Custom value 2 Custom value 2 Custom value 2 Custom value 2 Custom value 2 Custom value 2 Custom value 2 ', '2015-12-22 21:58:32', '0000-00-00 00:00:00'),
(3, 1, 'Custom 2', 'custom-2', 'Custom 2a ', '2015-12-22 22:22:13', '0000-00-00 00:00:00'),
(4, 21, '', '', '111111', '2015-12-24 05:25:48', '2015-12-24 05:25:48'),
(5, 22, '2222', '', 'bbbbbbb', '2015-12-24 05:27:34', '2015-12-24 05:27:34'),
(6, 23, 'ccccc', '', '3333', '2015-12-24 05:28:21', '2015-12-24 05:28:21'),
(13, 24, '44444a', '44444a', 'ddddda', '2015-12-24 05:44:04', '2015-12-24 05:44:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2015_12_21_225422_create_categories_table', 1),
('2015_12_21_225621_create_posts_table', 2),
('2015_12_21_230614_create_custom_fields_table', 3),
('2015_12_22_193105_create_posts_status_field', 4),
('2015_12_22_215532_create_custom_fields_slug_field', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `available` tinyint(1) NOT NULL,
  `excerpt` text COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `posts_category_id_foreign` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=25 ;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `name`, `slug`, `available`, `excerpt`, `content`, `created_at`, `updated_at`) VALUES
(1, 2, 'Primer Skill', 'primer-skill', 1, 'Primer Skill Primer Skill', 'Primer Skill Primer Skill Primer Skill Primer Skill ', '2015-12-23 16:54:22', '0000-00-00 00:00:00'),
(2, NULL, '', '', 0, '', '', '2015-12-24 03:54:19', '2015-12-24 03:54:19'),
(3, 2, 'dfasdf asf asdf asdf asfd', 'dfasdf-asf-asdf-asdf-asfd', 0, 'asdfasfdasdfa', 'asdfasdfasfd', '2015-12-24 04:27:30', '2015-12-24 04:27:30'),
(4, 2, 'dfasdf asf asdf asdf asfd', 'dfasdf-asf-asdf-asdf-asfd', 0, 'asdfasfdasdfa', 'asdfasdfasfd', '2015-12-24 04:27:36', '2015-12-24 04:27:36'),
(5, 2, 'dfasdf asf asdf asdf asfd sd', 'dfasdf-asf-asdf-asdf-asfd-sd', 0, 'asdfasfdasdfa', 'asdfasdfasfd', '2015-12-24 04:28:42', '2015-12-24 04:28:42'),
(6, 2, 'fasdfasfd', 'fasdfasfd', 0, 'afdasdf', 'asdfasdf', '2015-12-24 04:34:46', '2015-12-24 04:34:46'),
(7, 2, 'dsfasdf', 'dsfasdf', 0, 'dfasdf', 'fsdafasdf', '2015-12-24 04:35:43', '2015-12-24 04:35:43'),
(8, 2, 'sdfasfd', 'sdfasfd', 0, 'adsfasdf', 'asdfasdf', '2015-12-24 04:40:56', '2015-12-24 04:40:56'),
(9, 2, 'afdasf', 'afdasf', 0, 'adfasfd', 'afdasdf', '2015-12-24 04:43:29', '2015-12-24 04:43:29'),
(10, 2, 'dsfsadf', 'dsfsadf', 0, 'asdfasf', 'dfasdfsdaf', '2015-12-24 04:43:45', '2015-12-24 04:43:45'),
(11, 2, 'asdfasfd', 'asdfasfd', 0, 'adfasdf', 'adfasdf', '2015-12-24 04:46:24', '2015-12-24 04:46:24'),
(12, 1, 'asdfasdf', 'asdfasdf', 0, 'adsfsadfasdf', 'asdfasdfasdf', '2015-12-24 04:47:36', '2015-12-24 04:47:36'),
(13, 2, 'sdfadfasdf', 'sdfadfasdf', 0, 'adfasdfasdf', 'asdfasdf', '2015-12-24 05:03:38', '2015-12-24 05:03:38'),
(14, 1, 'adsfasdf', 'adsfasdf', 0, 'asdfasdf', 'asdfasdfasdf', '2015-12-24 05:04:11', '2015-12-24 05:04:11'),
(15, 2, 'asdfsadf', 'asdfsadf', 0, 'asdfasdf', 'asdfasdf', '2015-12-24 05:06:12', '2015-12-24 05:06:12'),
(16, 2, 'adsfasdfasd', 'adsfasdfasd', 0, 'sadfasdfasd', 'asfdasdfasdf', '2015-12-24 05:06:49', '2015-12-24 05:06:49'),
(17, 2, 'sdfasdf', 'sdfasdf', 0, 'asdfasdf', 'asdfasdfasdfasdf', '2015-12-24 05:07:10', '2015-12-24 05:07:10'),
(18, 2, 'adfasdfasdf', 'adfasdfasdf', 0, 'asdfasdf', 'asdfasdfasdf', '2015-12-24 05:08:03', '2015-12-24 05:08:03'),
(19, 1, 'asdfasdfasdfasdfasdf', 'asdfasdfasdfasdfasdf', 0, 'asdfasdf', 'asdfasdfasdf', '2015-12-24 05:14:32', '2015-12-24 05:14:32'),
(20, 1, 'adfafas fa asfd', 'adfafas-fa-asfd', 0, 'asdfasdfasf', 'adfasdfasdfasdf', '2015-12-24 05:24:57', '2015-12-24 05:24:57'),
(21, 1, 'adfafas fa asfdasdfasdfa sdfasdfasdf', 'adfafas-fa-asfdasdfasdfa-sdfasdfasdf', 0, 'asdfasdfasf', 'adfasdfasdfasdf', '2015-12-24 05:25:48', '2015-12-24 05:25:48'),
(22, 1, 'dfsasfdasdfasf', 'dfsasfdasdfasf', 0, 'adfadsfasdfasdfasdfasdfadfadfadf', 'asdfasfdasdfasdf', '2015-12-24 05:27:34', '2015-12-24 05:27:34'),
(23, 1, 'fasdfasdfasd adf asdf asdf asdfasdfasdfasdfasdf', 'fasdfasdfasd-adf-asdf-asdf-asdfasdfasdfasdfasdf', 0, 'asfdasfasfasdfasdf', 'asdfasdfadfasdf', '2015-12-24 05:28:21', '2015-12-24 05:28:21'),
(24, 1, 'asdf asdf asdf asdf asdfasdf asdf asdfasfda sfddfsa111111', 'asdf-asdf-asdf-asdf-asdfasdf-asdf-asdfasfda-sfddfsa111111', 0, 'fasdfasdf', 'asdfasdfasdf', '2015-12-23 23:44:04', '2015-12-24 05:44:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `custom_fields`
--
ALTER TABLE `custom_fields`
  ADD CONSTRAINT `custom_fields_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
