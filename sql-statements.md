#Change all types that are not Routine to Programma
UPDATE Efforts SET type=0 WHERE NOT (type=2 OR type=-1);
