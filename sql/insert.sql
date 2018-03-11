DELETE  FROM bankkonto;
DELETE FROM kund;



CALL createUser("Simon", "Stender", "1995-02-18", "Kungsmarksvägen 17", "Karlskrona", 1357);
CALL createUser("Hampus", "Åkesson", "1998-10-03", "Gamla infartsvägen 3B", "Karlskrona", 2468);
CALL createUser("Ludwig",  "Hansson", "1998-08-10", "Stadsvägen 10", "Karlskrona", 3579);
CALL createUser("Eva", "Bengtsson", "1990-10-03", "Bergvägen 3", "Stockholm", 7531);
CALL createUser("Adam", "Borg", "1994-03-20", "Stjärtvägen 20", "Göteborg", 8642);
CALL createUser("Stefan", "Holm", "1984-01-20", "Hoppvägen 10", "Svanholm", 9753);
CALL createUser("Kevin", "Kevsson", "2005-12-24", "Olyckansväg 10", "Gävle", 1234);

CALL depositMoney(1, 1000);
CALL depositMoney(2, 2500);
CALL depositMoney(3, 3200);
CALL depositMoney(4, 932);
CALL depositMoney(5, 1230);
CALL depositMoney(6, 4230);


select * from kund;
select * from accountManager WHERE customerID = 2;

select * from accountManager;

SELECT * 
	FROM bankkonto AS b
		JOIN accountManager AS am
			ON  b.idBankkonto = am.accountID
		JOIN Kund AS k
			ON k.idKund = am.customerID
	WHERE am.accountID = 1
;

select * from bankkonto;


SELECT 
	k.idKund,
    b.idBankkonto,
    b.saldo
    FROM bankkonto AS b
		JOIN kund AS k
			ON b.Kund_idKund = k.idKund
    WHERE  k.idKund = 2
;
    
CALL getAllAccountsOnUserID(2);
    
    

CALL addAccountToUser(2);
CALL shareAccountWithUser(1, 2);

    
SELECT
b.idBankkonto,
b.saldo,
CONCAT(k.fornamn, ' ', k.efternamn, ' (Kund ID: ', k.idKund, ')')
FROM bankkonto AS b
	JOIN accountManager AS am
		ON am.accountID = b.idBankkonto
	JOIN Kund AS k
		ON k.idKund = b.Kund_idKund
WHERE  am.customerID = 2;
;
    
    
    