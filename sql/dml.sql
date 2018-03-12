SELECT
		b.idBankkonto,
		b.saldo,
		CONCAT(k.fornamn, ' ', k.efternamn, ' (Kund ID: ', k.idKund, ')') AS holder
		FROM bankkonto AS b
			JOIN accountManager AS am
				ON am.accountID = b.idBankkonto
			JOIN Kund AS k
				ON k.idKund = b.Kund_idKund;
                
call addAccountToUser(1);
			
select * from bankkonto;

CALL getAllAccountsOnUserID(2);
    
    

CALL addAccountToUser(2);
CALL shareAccountWithUser(1, 2);


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
    
    select * from bankkonto;
    
call getAllAccountsOnUserID(1);

SELECT * FROM logg
ORDER BY tid DESC;


SELECT 
	am.accountID  AS ID,
	CONCAT(k.fornamn, ' ', k.efternamn, ' (Kund ID: ', k.idKund, ')') AS namn
    FROM accountManager AS am
		JOIN Kund AS k
			ON k.idKund = am.customerID
	
;
    
    
    
    
    
    
    
    
    
    
    
    