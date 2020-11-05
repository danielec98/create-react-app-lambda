SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


-- Database: `mdmc`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `camere`
--

CREATE TABLE `camere` (
  `id` bigint(20) NOT NULL,
  `id_struttura` bigint(20) NOT NULL,
  `prezzo` float NOT NULL,
  `foto` varchar(255) NOT NULL,
  `numero_ospiti` int(2) NOT NULL,
  `riscaldamento` tinyint(1) NOT NULL,
  `aria_condizionata` tinyint(1) NOT NULL,
  `servizio_in_camera` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `dati_ospiti`
--

CREATE TABLE `dati_ospiti` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL,
  `data_di_nascita` date NOT NULL,
  `foto_doc` varchar(255) NOT NULL,
  `id_prenotazione` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamento`
--

CREATE TABLE `pagamento` (
  `id` bigint(20) NOT NULL,
  `id_prenotazione` bigint(20) NOT NULL,
  `numero_carta` varchar(100) NOT NULL,
  `cvv` int(4) NOT NULL,
  `scadenza` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `id` bigint(20) NOT NULL,
  `id_struttura` bigint(20) NOT NULL,
  `id_camere` bigint(20) NOT NULL,
  `id_cliente` bigint(20) NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `prezzo` float NOT NULL,
  `pagamento_tasse` tinyint(1) NOT NULL,
  `confermata` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `strutture`
--

CREATE TABLE `strutture` (
  `id` bigint(20) NOT NULL,
  `tipologia` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `citta` varchar(100) NOT NULL,
  `indirizzo` varchar(100) NOT NULL,
  `prezzo` float NOT NULL,
  `numero_ospiti` int(2) NOT NULL,
  `id_gestore` bigint(20) NOT NULL,
  `wifi` tinyint(1) NOT NULL,
  `parcheggio` tinyint(1) NOT NULL,
  `piscina` tinyint(1) NOT NULL,
  `descrizione` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `tipo` tinyint(1) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL,
  `citta` varchar(100) NOT NULL,
  `cap` int(5) NOT NULL,
  `indirizzo` varchar(100) NOT NULL,
  `telefono` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `partita_iva` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `data_di_nascita` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`tipo`, `nome`, `cognome`, `citta`, `cap`, `indirizzo`, `telefono`, `email`, `password`, `partita_iva`, `id`, `data_di_nascita`) VALUES
(0, 'daniele', 'cannizzaro', 'palermo', 90127, 'l.muratori 9', 33445566, 'dan@ciao.com', 'albero123', NULL, 1, '1998-12-11');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `camere`
--
ALTER TABLE `camere`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_struttura` (`id_struttura`);

--
-- Indici per le tabelle `dati_ospiti`
--
ALTER TABLE `dati_ospiti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prenotazione` (`id_prenotazione`);

--
-- Indici per le tabelle `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pagamento_ibfk_1` (`id_prenotazione`);

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prenotazioni_ibfk_1` (`id_cliente`),
  ADD KEY `prenotazioni_ibfk_2` (`id_struttura`),
  ADD KEY `prenotazioni_ibfk_3` (`id_camere`);

--
-- Indici per le tabelle `strutture`
--
ALTER TABLE `strutture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `strutture_ibfk_1` (`id_gestore`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `camere`
--
ALTER TABLE `camere`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `dati_ospiti`
--
ALTER TABLE `dati_ospiti`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `strutture`
--
ALTER TABLE `strutture`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `camere`
--
ALTER TABLE `camere`
  ADD CONSTRAINT `camere_ibfk_1` FOREIGN KEY (`id_struttura`) REFERENCES `strutture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `dati_ospiti`
--
ALTER TABLE `dati_ospiti`
  ADD CONSTRAINT `dati_ospiti_ibfk_1` FOREIGN KEY (`id_prenotazione`) REFERENCES `prenotazioni` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `pagamento`
--
ALTER TABLE `pagamento`
  ADD CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`id_prenotazione`) REFERENCES `prenotazioni` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `prenotazioni_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `utenti` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prenotazioni_ibfk_2` FOREIGN KEY (`id_struttura`) REFERENCES `strutture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prenotazioni_ibfk_3` FOREIGN KEY (`id_camere`) REFERENCES `camere` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `strutture`
--
ALTER TABLE `strutture`
  ADD CONSTRAINT `strutture_ibfk_1` FOREIGN KEY (`id_gestore`) REFERENCES `utenti` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;