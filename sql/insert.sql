DELETE  FROM bankkonto;
DELETE FROM kund;


CALL createUser("Simon", "Stender", "1995-02-18", "Kungsmarksvägen 17", "Karlskrona", 1111);
CALL createUser("Hampus", "Åkesson", "1998-10-03", "Gamla infartsvägen 3B", "Karlskrona", 1112);
CALL createUser("Ludwig",  "Hansson", "1998-08-10", "Stadsvägen 10", "Karlskrona", 1113);
CALL createUser("Eva", "Bengtsson", "1990-10-03", "Bergvägen 3", "Stockholm", 1114);
CALL createUser("Adam", "Borg", "1994-03-20", "Stjärtvägen 20", "Göteborg", 1115);
CALL createUser("Stefan", "Holm", "1984-01-20", "Hoppvägen 10", "Svanholm", 1116);
CALL createUser("Kevin", "Kevsson", "2005-12-24", "Olyckansväg 10", "Gävle", 1117);
CALL createUser("Jörgen", "Larsson", "1985-12-24", "Kungsplan 10", "Karlskrona", 1118);
CALL createUser("Kevin", "Carlsson", "1998-12-24", "Svensväg 10", "Stockholm", 1119);
CALL createUser("Paula", "Svensson", "1988-12-24", "Marieberg 10", "Hörby", 1110);
CALL createUser("Erik", "Pettersson", "1978-12-24", "Svanvägen 1", "Landskrona", 1100);
CALL createUser("Hanna", "Åkesson", "1998-10-03", "Ekelidsgatan 12", "Hörby", 1000);
CALL createUser("Secret", "Account", "2018-03-11", "Campus BTH", "Karlskrona", 1111);


CALL addAccountToUser(1);
CALL addAccountToUser(2);
CALL addAccountToUser(3);

CALL depositMoney(1, 1000);
CALL depositMoney(2, 2500);
CALL depositMoney(3, 3200);
CALL depositMoney(4, 932);
CALL depositMoney(5, 1230);
CALL depositMoney(6, 4230);
CALL depositMoney(7, 5390);
CALL depositMoney(8, 1590);
CALL depositMoney(9, 2530);
CALL depositMoney(10, 6539);
CALL depositMoney(11, 65);
CALL depositMoney(12, 653);
CALL depositMoney(13, 639);
CALL depositMoney(14, 339);
CALL depositMoney(15, 29);


CALL shareAccountWithUser(10,1);
CALL shareAccountWithUser(9,1);
CALL shareAccountWithUser(8,1);
CALL shareAccountWithUser(12,2);
CALL shareAccountWithUser(3,2);
CALL shareAccountWithUser(4,2);
CALL shareAccountWithUser(5,6);
CALL shareAccountWithUser(7,6);
CALL shareAccountWithUser(3,6);



select * from bankkonto;


    