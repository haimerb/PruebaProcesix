-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-08-2019 a las 00:34:31
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodegas`
--

CREATE TABLE `bodegas` (
  `codigo_bodega` int(10) NOT NULL,
  `nombre_bodega` varchar(50) NOT NULL,
  `localizacion_bodega` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `bodegas`
--

INSERT INTO `bodegas` (`codigo_bodega`, `nombre_bodega`, `localizacion_bodega`) VALUES
(1, 'Mi Bodega', 'Aquí Esta'),
(4, 'La Bodega1', 'Cali Sur '),
(5, 'Bodega Editado', 'Ahora esta Aca'),
(6, 'Mi Gran Bodega ', 'Cali Norte '),
(7, 'Mi Gran Bodega ', 'Cali Norte '),
(8, 'Mi Gran Bodega ', 'Cali Norte '),
(9, 'Mi Gran Bodega ', 'Cali Norte '),
(10, 'Mi Gran Bodega ', 'Cali Norte '),
(11, 'Mi Gran Bodega ', 'Cali Norte '),
(12, 'ESTA BODEGA', 'Aqui Esta}'),
(15, 'ESTA BODEGA', 'Aqui Esta}'),
(17, 'ESTA BODEGA', 'Aqui Esta}'),
(19, 'Bodegota', '754PPG8M'),
(21, 'Bodegota', '754PPG8M'),
(22, 'Aqui Esta', 'La Bodega'),
(23, 'Aqui Esta', '754PPG8M'),
(24, 'Bodegota', 'Aqui'),
(26, 'Aqui Esta', 'La Bodega'),
(27, 'Aqui Esta', 'Boeguita'),
(28, 'Bodegota', 'Aqui');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `codigo_producto` int(10) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `codigo_bodega` int(10) NOT NULL,
  `precio_producto` float(10,2) NOT NULL,
  `unidades_disponibles` int(10) NOT NULL,
  `tipo_producto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo_producto`, `nombre_producto`, `codigo_bodega`, `precio_producto`, `unidades_disponibles`, `tipo_producto`) VALUES
(1, 'Polvorosos', 1, 100.00, 10, 'ESE'),
(2, 'Arroz Diana', 1, 1700.00, 1, 'grano'),
(3, 'Arroz Diana', 1, 1700.00, 1, 'grano');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodegas`
--
ALTER TABLE `bodegas`
  ADD PRIMARY KEY (`codigo_bodega`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`codigo_producto`),
  ADD KEY `fk_codigo_bodega_bodega` (`codigo_bodega`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bodegas`
--
ALTER TABLE `bodegas`
  MODIFY `codigo_bodega` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `codigo_producto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_codigo_bodega_bodega` FOREIGN KEY (`codigo_bodega`) REFERENCES `bodegas` (`codigo_bodega`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
