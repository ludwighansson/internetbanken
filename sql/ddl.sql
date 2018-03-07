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
    REFERENCES `internetbanken`.`Kund` (`idKund`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `internetbanken`.`Logg`
-- -----------------------------------------------------
DROP TABLE IF EXISTS logg;
CREATE TABLE IF NOT EXISTS `internetbanken`.`logg` (
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
CREATE TRIGGER loggUpdate
AFTER UPDATE
ON bankkonto FOR EACH ROW
INSERT INTO logg (kontoNummer, saldo, saldoTransaktion)
VALUES (NEW.idBankkonto, NEW.saldo, NEW.saldo - OLD.saldo);



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



START TRANSACTION;

UPDATE bankkonto
SET 
	saldo = saldo + 10000
WHERE 
	idBankkonto = "1";
    
UPDATE bankkonto
SET 
	saldo = saldo - 10000
WHERE
	idBankkonto = "2";

COMMIT;

select * from bankkonto;

SELECT * FROM logg;

CALL swish(1, 2, 5000);

