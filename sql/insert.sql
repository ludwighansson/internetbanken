DELETE FROM kund;
INSERT INTO kund (fornamn, efternamn, fodd, adress, ort, pinkod)
VALUES 
("Simon", "Stender", "1995-02-18", "Kungsmarksvägen 17", "Karlskrona", 1357),
("Hampus", "Åkesson", "1998-10-03", "Gamla infartsvägen 3B", "Karlskrona", 2468),
("Ludwig",  "Hansson", "1998-08-10", "Stadsvägen 10", "Karlskrona", 3579),
("Eva", "Bengtsson", "1990-10-03", "Bergvägen 3", "Stockholm", 7531),
("Adam", "Borg", "1994-03-20", "Stjärtvägen 20", "Göteborg", 8642),
("Stefan", "Holm", "1984-01-20", "Hoppvägen 10", "Svanholm", 9753),
("Kevin", "Kevsson", "2005-12-24", "Olyckansväg 10", "Gävle", 1234);

DELETE FROM bankkonto;
INSERT INTO bankkonto (saldo, Kund_idKund)
VALUES 
(95000, 1), 
(90000, 2),
(85000, 3),
(80000, 4),
(75000, 5),
(70000, 6),
(65000, 7),
(60000, 1),
(55000, 2),
(50000, 3),
(45000, 1),
(40000, 2),
(35000, 3),
(30000, 4),
(25000, 5),
(0, 1337);

select * from bankkonto;
