-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema internetbanken
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema internetbanken
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `internetbanken` DEFAULT CHARACTER SET utf8 ;
USE `internetbanken` ;

-- -----------------------------------------------------
-- Table `internetbanken`.`Kund`
-- -----------------------------------------------------
DROP TABLE IF EXISTS kund;
CREATE TABLE IF NOT EXISTS `internetbanken`.`kund` (
  `idKund` INT NOT NULL AUTO_INCREMENT,
  `fornamn` VARCHAR(40) NOT NULL,
  `efternamn` VARCHAR(40) NOT NULL,
  `fodd` DATE NOT NULL,
  `adress` VARCHAR(40) NOT NULL,
  `ort` VARCHAR(40) NOT NULL,
  `pinkod` INT(4) NOT NULL,
  PRIMARY KEY (`idKund`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `internetbanken`.`Bankkonto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS bankkonto;
CREATE TABLE IF NOT EXISTS `internetbanken`.`bankkonto` (
  `idBankkonto` INT NOT NULL AUTO_INCREMENT,
  `saldo` INT NULL,
  `Kund_idKund` INT NOT NULL,
  PRIMARY KEY (`idBankkonto`),
  INDEX `fk_Bankkonto_Kund_idx` (`Kund_idKund` ASC),
  CONSTRAINT `fk_Bankkonto_Kund`
    FOREIGN KEY (`Kund_idKund`)
    REFERENCES Kund (idKund)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS accountManager;
CREATE TABLE IF NOT EXISTS accountManager (
	accountID INT(11),
    customerID INT(11),
    FOREIGN KEY (customerID) REFERENCES Kund(idKund),
    FOREIGN KEY (accountID) REFERENCES bankkonto(idBankkonto)
);

-- -----------------------------------------------------
-- Table `internetbanken`.`Logg`
-- -----------------------------------------------------
DROP TABLE IF EXISTS logg;
CREATE TABLE IF NOT EXISTS `internetbanken`.`logg` (
  `action` VARCHAR(15) NOT NULL,
  `kontoNummer` INT NOT NULL,
  `saldo` INT NULL,
  `saldoTransaktion` INT NULL,
  `tid` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`kontoNummer`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



DROP TRIGGER IF EXISTS loggUpdate;
DROP TRIGGER IF EXISTS loggDelete;
DROP TRIGGER IF EXISTS loggInsert;


CREATE TRIGGER loggUpdate
AFTER UPDATE
ON bankkonto FOR EACH ROW
INSERT INTO logg (action, kontoNummer, saldo, saldoTransaktion)
VALUES ('UPDATE', NEW.idBankkonto, NEW.saldo, NEW.saldo - OLD.saldo);


CREATE TRIGGER loggDelete
AFTER DELETE
ON bankkonto FOR EACH ROW
INSERT INTO logg (action, kontoNummer, saldo, saldoTransaktion)
VALUES ('DELETE', OLD.idBankkonto, OLD.saldo, OLD.saldo);

CREATE TRIGGER loggInsert
AFTER INSERT
ON bankkonto FOR EACH ROW
INSERT INTO logg (action, kontoNummer, saldo, saldoTransaktion)
VALUES ('INSERT', NEW.idBankkonto, NEW.saldo, NEW.saldo);

DROP PROCEDURE IF EXISTS swish;
DELIMITER ;;
CREATE PROCEDURE swish(
	tillIdBankkonto INT,
    franIdBankkonto INT,
    transaktionsPeng INT
)
BEGIN

START TRANSACTION;

UPDATE bankkonto
	SET saldo = saldo + transaktionsPeng
WHERE 
	idBankkonto = tillIdBankkonto;
    
UPDATE bankkonto
	SET saldo = (saldo - transaktionsPeng) - transaktionsPeng * 0.02 
WHERE
	idBankkonto = franIdBankkonto;
    
UPDATE bankkonto
	SET saldo = saldo + transaktionsPeng * 0.02
WHERE
	Kund_idKund = "1337";
    
COMMIT;

END
;;
DELIMITER ;



-- ------------------------- --
-- Stored Procedures --
-- ------------------------- --

DROP PROCEDURE IF EXISTS getAllAccountsOnUserID;
DROP PROCEDURE IF EXISTS createUser;

DELIMITER //
CREATE PROCEDURE getAllAccountsOnUserID(
	id INT(11)
)
BEGIN
	SELECT 
	*
    FROM bankkonto AS b
		JOIN kund AS k
			ON b.Kund_idKund = k.idKund
    WHERE  k.idKund = id
;
END
//

DELIMITER ;

DELIMITER //
CREATE PROCEDURE createUser(
  cFornamn VARCHAR(40),
  cEfternamn VARCHAR(40),
  cFodd DATE,
  cAdress VARCHAR(40),
  cOrt VARCHAR(40),
  cPinkod INT(4)
)
BEGIN
	INSERT INTO Kund (fornamn, efternamn, fodd, adress, ort, pinkod) 
    VALUES (cFornamn, cEfternamn, cFodd, cAdress, cOrt, cPinkod);
    
    SELECT idKund AS id INTO @kundID
	FROM Kund 
	ORDER BY idKund 
    DESC LIMIT 1;
    
    INSERT INTO bankkonto(Kund_idKund)
    VALUES (@kundID);
    
    SELECT idBankkonto AS id INTO @bankID
	FROM bankkonto 
	ORDER BY idBankkonto 
    DESC LIMIT 1;
    
    INSERT INTO accountManager(accountID, customerID)
	VALUES (@kundID, @bankID);

    
END
//

DELIMITER ;

DELIMITER //
CREATE PROCEDURE shareAccountWithUser(
  userID INT(11),
  accountID INT(11)
)
BEGIN
    INSERT INTO accountManager(accountID, customerID)
	VALUES (userID, @accountID);   
END
//

DELIMITER ;














