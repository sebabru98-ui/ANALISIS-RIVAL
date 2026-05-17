import { useState, useEffect, useRef } from "react";
import React from "react";
// ─── Datos iniciales goleadoras (pre-cargadas desde xlsx) ──────────────────
const INITIAL_SCORERS = [{"name":"Carnevali, Oriana","team":"U. LA PLATA","goals":5,"pj":8,"pc":0},{"name":"Curri, Manuela","team":"M. MORENO","goals":5,"pj":8,"pc":0},{"name":"Castiglione Corvalan, Guadalupe","team":"C.A.S.I.","goals":4,"pj":8,"pc":0},{"name":"Cuitiño Christin, Melisa","team":"BANCO CIUDAD","goals":4,"pj":8,"pc":0},{"name":"Dimarco, Mia","team":"PUERTO NIZUC","goals":4,"pj":8,"pc":0},{"name":"Gamarra, Milagros","team":"PUCARA","goals":4,"pj":8,"pc":0},{"name":"Gluch, Carolina","team":"MACABI","goals":4,"pj":8,"pc":0},{"name":"Ravetta, Lara","team":"M. GRANDE","goals":4,"pj":8,"pc":0},{"name":"Seoane, Tiziana","team":"PUERTO NIZUC","goals":4,"pj":8,"pc":0},{"name":"Arouxet, Juana","team":"C.I.S.S.A.B.","goals":4,"pj":7,"pc":0},{"name":"Cairo, Sofia","team":"M. MORENO","goals":4,"pj":6,"pc":0},{"name":"Bravo, Lucila Malena","team":"B. HIPOTECARIO","goals":3,"pj":8,"pc":0},{"name":"Fernandez, Sol","team":"M. MORENO","goals":3,"pj":8,"pc":0},{"name":"Galleano, Valentina","team":"PUCARA","goals":3,"pj":8,"pc":0},{"name":"Gluch, Julieta","team":"MACABI","goals":3,"pj":8,"pc":0},{"name":"Pastorelli, Martina Sol","team":"M. MORENO","goals":3,"pj":8,"pc":0},{"name":"Rodriguez, Macarena","team":"PUERTO NIZUC","goals":3,"pj":8,"pc":0},{"name":"Villarmea, Julieta","team":"B. HIPOTECARIO","goals":3,"pj":8,"pc":0},{"name":"Holmgren, Trinidad","team":"C.A.S.I.","goals":3,"pj":6,"pc":0},{"name":"Basini, Renata","team":"C.A.S.I.","goals":2,"pj":8,"pc":0},{"name":"Berger, Victoria","team":"U. LA PLATA","goals":2,"pj":8,"pc":0},{"name":"Canzobre, Martina","team":"PUCARA","goals":2,"pj":8,"pc":0},{"name":"Febles Tripori, Luna Rocio","team":"LANUS","goals":2,"pj":8,"pc":0},{"name":"Fernandez, Juana","team":"HINDU CLUB","goals":2,"pj":8,"pc":0},{"name":"Gomez, Rocio Jazmin","team":"LANUS","goals":2,"pj":8,"pc":0},{"name":"Landolfi, Agustina","team":"BANCO CIUDAD","goals":2,"pj":8,"pc":0},{"name":"Lucini, Martina","team":"CIUDAD","goals":2,"pj":8,"pc":0},{"name":"Moore Castelli, Camila","team":"U. LA PLATA","goals":2,"pj":8,"pc":0},{"name":"Semcheff, Sofia Agustina","team":"CIUDAD","goals":2,"pj":8,"pc":0},{"name":"Sosa, Milagros","team":"BANFIELD","goals":2,"pj":8,"pc":0},{"name":"Testone, Valentina","team":"LANUS","goals":2,"pj":8,"pc":0},{"name":"Vullo, Lucía","team":"BANCO CIUDAD","goals":2,"pj":8,"pc":0},{"name":"Jara, Milagros","team":"PUERTO NIZUC","goals":2,"pj":6,"pc":0},{"name":"Olivetto, Clara","team":"M. MORENO","goals":2,"pj":6,"pc":0},{"name":"Chaves, Nahir","team":"LANUS","goals":2,"pj":3,"pc":0},{"name":"Abate, Agustina Manon","team":"LANUS","goals":1,"pj":8,"pc":0},{"name":"Almaso, Candela","team":"U. LA PLATA","goals":1,"pj":8,"pc":0},{"name":"Alvarez, Morena","team":"U. LA PLATA","goals":1,"pj":8,"pc":0},{"name":"Blanco Nardin, Juana","team":"M. GRANDE","goals":1,"pj":8,"pc":0},{"name":"Burman, Julieta","team":"M. MORENO","goals":1,"pj":8,"pc":0},{"name":"Capalbo, Mercedes","team":"HINDU CLUB","goals":1,"pj":8,"pc":0},{"name":"Chao, Natasha Alexia","team":"BANCO CIUDAD","goals":1,"pj":8,"pc":0},{"name":"Colomba, Maria Ines","team":"C.I.S.S.A.B.","goals":1,"pj":8,"pc":0},{"name":"Durante, Pilar","team":"U. LA PLATA","goals":1,"pj":8,"pc":0},{"name":"Etcheverry, Ines","team":"C.A.S.I.","goals":1,"pj":8,"pc":0},{"name":"Fernandez, Bernardita","team":"HINDU CLUB","goals":1,"pj":8,"pc":0},{"name":"Fernandez, Santina","team":"HINDU CLUB","goals":1,"pj":8,"pc":0},{"name":"Galleano, Candela","team":"PUCARA","goals":1,"pj":8,"pc":0},{"name":"Garansini, Carolina","team":"PUERTO NIZUC","goals":1,"pj":8,"pc":0},{"name":"Gomez Lagrenade, Violeta","team":"PUCARA","goals":1,"pj":8,"pc":0},{"name":"Gutierrez, Agustina Aylen","team":"B. HIPOTECARIO","goals":1,"pj":8,"pc":0},{"name":"Hileman, J Belen","team":"C.A.S.I.","goals":1,"pj":8,"pc":0},{"name":"Kaufman, Nicole","team":"MACABI","goals":1,"pj":8,"pc":0},{"name":"Lopez, Delfina","team":"B. HIPOTECARIO","goals":1,"pj":8,"pc":0},{"name":"Mattiazzi, Juana","team":"M. MORENO","goals":1,"pj":8,"pc":0},{"name":"Muñoz, Candela","team":"PUCARA","goals":1,"pj":8,"pc":0},{"name":"Murgo, Anabella","team":"CIUDAD","goals":1,"pj":8,"pc":0},{"name":"Pazo, Mariana","team":"PUCARA","goals":1,"pj":8,"pc":0},{"name":"Pose, Sofia","team":"C.I.S.S.A.B.","goals":1,"pj":8,"pc":0},{"name":"Rivas, Melisa","team":"PUCARA","goals":1,"pj":8,"pc":0},{"name":"Rofrano, Valentina","team":"PUCARA","goals":1,"pj":8,"pc":0},{"name":"Sapir, Sofía","team":"MACABI","goals":1,"pj":8,"pc":0},{"name":"Spada, Martina","team":"M. GRANDE","goals":1,"pj":8,"pc":0},{"name":"Tandeitnic, Luana","team":"MACABI","goals":1,"pj":8,"pc":0},{"name":"Torreiro, Maria Pilar","team":"LANUS","goals":1,"pj":8,"pc":0},{"name":"Villa, Micaela","team":"PUERTO NIZUC","goals":1,"pj":8,"pc":0},{"name":"Fernandez, Delfina","team":"MACABI","goals":1,"pj":7,"pc":0},{"name":"Fernandez Rubio, Agostina","team":"BANFIELD","goals":1,"pj":7,"pc":0},{"name":"Franco, Adriana Raquel","team":"M. MORENO","goals":1,"pj":7,"pc":0},{"name":"Gallo, Adolfina","team":"U. LA PLATA","goals":1,"pj":7,"pc":0},{"name":"Garcia Larralde, Julieta","team":"M. GRANDE","goals":1,"pj":7,"pc":0},{"name":"Grane, Juana","team":"HINDU CLUB","goals":1,"pj":7,"pc":0},{"name":"Marquez, Catalina","team":"C.I.S.S.A.B.","goals":1,"pj":7,"pc":0},{"name":"Dominguez Velazco, Justina","team":"U. LA PLATA","goals":1,"pj":6,"pc":0},{"name":"Luis, Lourdes Rocio","team":"M. GRANDE","goals":1,"pj":6,"pc":0},{"name":"Rodriguez, Juana","team":"BANFIELD","goals":1,"pj":6,"pc":0},{"name":"Roytman, Ivana","team":"MACABI","goals":1,"pj":6,"pc":0},{"name":"Uranga Imaz, Juana","team":"C.A.S.I.","goals":1,"pj":6,"pc":0},{"name":"Villaverde, Martina","team":"PUERTO NIZUC","goals":1,"pj":6,"pc":0},{"name":"Camporotondo, Delfina","team":"PUERTO NIZUC","goals":1,"pj":5,"pc":0},{"name":"Ruiz, Valentina","team":"LANUS","goals":1,"pj":5,"pc":0},{"name":"Witlis, Morena","team":"MACABI","goals":1,"pj":4,"pc":0}];
// ─── Supabase (base de datos compartida) ─────────────────────────────────────
const SUPABASE_URL = "https://utmhpacgzfegtulxrouq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bWhwYWNnemZlZ3R1bHhyb3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjczMzksImV4cCI6MjA5MjU0MzMzOX0.TrAuORDJO27ZxbpL5BGAzItO0yaf-Fxtvq6ApJ1oyPk";
const KEYS = { rivals:"culp:rivals", standings:"culp:standings", scorers:"culp:scorers", seeded:"culp:seeded", fixture:"culp:fixture", cards:"culp:cards", fixtureSeeded:"culp:fixtureSeeded" };
// ─── Auth simple (modo staff/admin) ─────────────────────────────────────────
const ADMIN_PASSWORD = "culp2026";
const ADMIN_AUTH_KEY = "culp:adminAuth";
const AdminContext = React.createContext(false);
const useIsAdmin = () => React.useContext(AdminContext);
// ─── Fixture pre-cargado (Torneo 2026) ────────────────────────────────────
const INITIAL_FIXTURE_RAW = [
["Fecha 1",true,[
["sáb 07 mar 16:00","PUERTO NIZUC",3,1,"MACABI"],
["sáb 07 mar 16:00","PUCARA",1,0,"B. HIPOTECARIO"],
["sáb 07 mar 16:00","C.A.S.I.",1,1,"M. GRANDE"],
["sáb 07 mar 16:00","LANUS",1,1,"HINDU CLUB"],
["sáb 07 mar 16:00","CIUDAD B",1,2,"M. MORENO"],
["sáb 07 mar 16:00","U. LA PLATA",3,0,"C.I.S.S.A.B."],
["sáb 07 mar 16:00","BANCO CIUDAD",3,0,"BANFIELD"]]],
["Fecha 2",true,[
["sáb 14 mar 16:00","BANCO CIUDAD",3,0,"PUERTO NIZUC"],
["sáb 14 mar 16:00","BANFIELD",2,3,"U. LA PLATA"],
["sáb 14 mar 16:00","C.I.S.S.A.B.",1,1,"CIUDAD B"],
["sáb 14 mar 16:00","M. MORENO",2,1,"LANUS"],
["sáb 14 mar 10:30","HINDU CLUB",0,3,"C.A.S.I."],
["sáb 14 mar 10:30","M. GRANDE",0,2,"PUCARA"],
["sáb 14 mar 16:00","B. HIPOTECARIO",1,1,"MACABI"]]],
["Fecha 3",true,[
["sáb 21 mar 16:00","PUERTO NIZUC",2,1,"B. HIPOTECARIO"],
["sáb 21 mar 16:00","MACABI",3,1,"M. GRANDE"],
["sáb 21 mar 16:00","PUCARA",1,0,"HINDU CLUB"],
["sáb 21 mar 16:00","C.A.S.I.",2,3,"M. MORENO"],
["sáb 21 mar 16:00","LANUS",3,1,"C.I.S.S.A.B."],
["sáb 21 mar 16:00","CIUDAD B",0,1,"BANFIELD"],
["sáb 21 mar 16:00","U. LA PLATA",2,0,"BANCO CIUDAD"]]],
["Fecha 4",true,[
["sáb 28 mar 10:30","U. LA PLATA",2,1,"PUERTO NIZUC"],
["sáb 28 mar 10:30","BANCO CIUDAD",0,1,"CIUDAD B"],
["sáb 28 mar 10:30","BANFIELD",0,1,"LANUS"],
["sáb 28 mar 16:00","C.I.S.S.A.B.",0,1,"C.A.S.I."],
["sáb 28 mar 16:00","M. MORENO",7,2,"PUCARA"],
["sáb 28 mar 16:00","HINDU CLUB",2,2,"MACABI"],
["sáb 28 mar 16:00","M. GRANDE",1,2,"B. HIPOTECARIO"]]],
["Fecha 5",true,[
["sáb 11 abr 16:00","PUERTO NIZUC",2,2,"M. GRANDE"],
["sáb 11 abr 16:00","B. HIPOTECARIO",1,0,"HINDU CLUB"],
["sáb 11 abr 10:30","MACABI",0,1,"M. MORENO"],
["sáb 11 abr 16:00","PUCARA",2,0,"C.I.S.S.A.B."],
["sáb 11 abr 16:00","C.A.S.I.",2,0,"BANFIELD"],
["sáb 11 abr 16:00","LANUS",0,0,"BANCO CIUDAD"],
["sáb 11 abr 16:00","CIUDAD B",1,0,"U. LA PLATA"]]],
["Fecha 6",true,[
["sáb 18 abr 16:00","CIUDAD B",0,5,"PUERTO NIZUC"],
["sáb 18 abr 16:00","U. LA PLATA",2,2,"LANUS"],
["sáb 18 abr 10:30","BANCO CIUDAD",0,2,"C.A.S.I."],
["sáb 18 abr 10:30","BANFIELD",0,2,"PUCARA"],
["sáb 18 abr 16:00","C.I.S.S.A.B.",0,3,"MACABI"],
["sáb 18 abr 16:00","M. MORENO",3,1,"B. HIPOTECARIO"],
["sáb 18 abr 16:00","HINDU CLUB",2,1,"M. GRANDE"]]],
["Fecha 7",true,[
["sáb 25 abr 16:00","PUERTO NIZUC",1,0,"HINDU CLUB"],
["sáb 25 abr 16:00","M. GRANDE",0,0,"M. MORENO"],
["sáb 25 abr 16:00","B. HIPOTECARIO",2,2,"C.I.S.S.A.B."],
["sáb 25 abr 16:00","MACABI",1,0,"BANFIELD"],
["sáb 25 abr 16:00","PUCARA",2,1,"BANCO CIUDAD"],
["sáb 25 abr 16:00","C.A.S.I.",0,0,"U. LA PLATA"],
["sáb 25 abr 16:00","LANUS",1,1,"CIUDAD B"]]],
["Fecha 8",true,[
["sáb 02 may 10:30","LANUS",2,3,"PUERTO NIZUC"],
["sáb 02 may 10:30","CIUDAD B",0,1,"C.A.S.I."],
["sáb 02 may 16:00","U. LA PLATA",2,3,"PUCARA"],
["sáb 02 may 16:00","BANCO CIUDAD",2,2,"MACABI"],
["sáb 02 may 10:30","BANFIELD",1,0,"B. HIPOTECARIO"],
["sáb 02 may 10:30","C.I.S.S.A.B.",3,2,"M. GRANDE"],
["sáb 02 may 16:00","M. MORENO",2,1,"HINDU CLUB"]]],
["Fecha 9",true,[
["sáb 09 may 16:00","PUERTO NIZUC",1,0,"M. MORENO"],
["sáb 09 may 16:00","HINDU CLUB",1,2,"C.I.S.S.A.B."],
["sáb 09 may 16:00","M. GRANDE",3,2,"BANFIELD"],
["sáb 09 may 16:00","B. HIPOTECARIO",3,2,"BANCO CIUDAD"],
["sáb 09 may 16:00","MACABI",1,1,"U. LA PLATA"],
["sáb 09 may 16:00","PUCARA",2,2,"CIUDAD B"],
["sáb 09 may 16:00","C.A.S.I.",1,1,"LANUS"]]],
["Fecha 10",true,[
["sáb 16 may 16:00","C.A.S.I.",2,1,"PUERTO NIZUC"],
["sáb 16 may 10:30","LANUS",1,4,"PUCARA"],
["sáb 16 may 16:00","CIUDAD B",0,2,"MACABI"],
["sáb 16 may 16:00","U. LA PLATA",3,1,"B. HIPOTECARIO"],
["sáb 16 may 16:00","BANCO CIUDAD",2,1,"M. GRANDE"],
["sáb 16 may 16:00","BANFIELD",1,2,"HINDU CLUB"],
["sáb 16 may 16:00","C.I.S.S.A.B.",2,2,"M. MORENO"]]],
["Fecha 11",false,[
["sáb 30 may 16:00","PUERTO NIZUC",0,0,"C.I.S.S.A.B."],
["sáb 30 may 16:00","M. MORENO",0,0,"BANFIELD"],
["sáb 30 may 16:00","HINDU CLUB",0,0,"BANCO CIUDAD"],
["sáb 30 may 16:00","M. GRANDE",0,0,"U. LA PLATA"],
["sáb 30 may 16:00","B. HIPOTECARIO",0,0,"CIUDAD B"],
["sáb 30 may 16:00","MACABI",0,0,"LANUS"],
["sáb 30 may 16:00","PUCARA",0,0,"C.A.S.I."]]],
["Fecha 12",false,[
["sáb 06 jun 16:00","PUCARA",0,0,"PUERTO NIZUC"],
["sáb 06 jun 16:00","C.A.S.I.",0,0,"MACABI"],
["sáb 06 jun 16:00","LANUS",0,0,"B. HIPOTECARIO"],
["sáb 06 jun 16:00","CIUDAD B",0,0,"M. GRANDE"],
["sáb 06 jun 16:00","U. LA PLATA",0,0,"HINDU CLUB"],
["sáb 06 jun 16:00","BANCO CIUDAD",0,0,"M. MORENO"],
["sáb 06 jun 16:00","BANFIELD",0,0,"C.I.S.S.A.B."]]],
["Fecha 13",false,[
["sáb 13 jun 16:00","PUERTO NIZUC",0,0,"BANFIELD"],
["sáb 13 jun 16:00","C.I.S.S.A.B.",0,0,"BANCO CIUDAD"],
["sáb 13 jun 16:00","M. MORENO",0,0,"U. LA PLATA"],
["sáb 13 jun 16:00","HINDU CLUB",0,0,"CIUDAD B"],
["sáb 13 jun 16:00","M. GRANDE",0,0,"LANUS"],
["sáb 13 jun 16:00","B. HIPOTECARIO",0,0,"C.A.S.I."],
["sáb 13 jun 16:00","MACABI",0,0,"PUCARA"]]],
["Fecha 14",false,[
["sáb 20 jun 16:00","MACABI",0,0,"PUERTO NIZUC"],
["sáb 20 jun 16:00","B. HIPOTECARIO",0,0,"PUCARA"],
["sáb 20 jun 16:00","M. GRANDE",0,0,"C.A.S.I."],
["sáb 20 jun 16:00","HINDU CLUB",0,0,"LANUS"],
["sáb 20 jun 16:00","M. MORENO",0,0,"CIUDAD B"],
["sáb 20 jun 16:00","C.I.S.S.A.B.",0,0,"U. LA PLATA"],
["sáb 20 jun 16:00","BANFIELD",0,0,"BANCO CIUDAD"]]],
["Fecha 15",false,[
["sáb 27 jun 16:00","PUERTO NIZUC",0,0,"BANCO CIUDAD"],
["sáb 27 jun 16:00","U. LA PLATA",0,0,"BANFIELD"],
["sáb 27 jun 16:00","CIUDAD B",0,0,"C.I.S.S.A.B."],
["sáb 27 jun 16:00","LANUS",0,0,"M. MORENO"],
["sáb 27 jun 16:00","C.A.S.I.",0,0,"HINDU CLUB"],
["sáb 27 jun 16:00","PUCARA",0,0,"M. GRANDE"],
["sáb 27 jun 16:00","MACABI",0,0,"B. HIPOTECARIO"]]],
["Fecha 16",false,[
["sáb 04 jul 16:00","B. HIPOTECARIO",0,0,"PUERTO NIZUC"],
["sáb 04 jul 16:00","M. GRANDE",0,0,"MACABI"],
["sáb 04 jul 16:00","HINDU CLUB",0,0,"PUCARA"],
["sáb 04 jul 16:00","M. MORENO",0,0,"C.A.S.I."],
["sáb 04 jul 16:00","C.I.S.S.A.B.",0,0,"LANUS"],
["sáb 04 jul 16:00","BANFIELD",0,0,"CIUDAD B"],
["sáb 04 jul 16:00","BANCO CIUDAD",0,0,"U. LA PLATA"]]],
["Fecha 17",false,[
["sáb 11 jul 16:00","PUERTO NIZUC",0,0,"U. LA PLATA"],
["sáb 11 jul 16:00","CIUDAD B",0,0,"BANCO CIUDAD"],
["sáb 11 jul 16:00","LANUS",0,0,"BANFIELD"],
["sáb 11 jul 16:00","C.A.S.I.",0,0,"C.I.S.S.A.B."],
["sáb 11 jul 16:00","PUCARA",0,0,"M. MORENO"],
["sáb 11 jul 16:00","MACABI",0,0,"HINDU CLUB"],
["sáb 11 jul 16:00","B. HIPOTECARIO",0,0,"M. GRANDE"]]],
["Fecha 18",false,[
["sáb 18 jul 16:00","M. GRANDE",0,0,"PUERTO NIZUC"],
["sáb 18 jul 16:00","HINDU CLUB",0,0,"B. HIPOTECARIO"],
["sáb 18 jul 16:00","M. MORENO",0,0,"MACABI"],
["sáb 18 jul 16:00","C.I.S.S.A.B.",0,0,"PUCARA"],
["sáb 18 jul 16:00","BANFIELD",0,0,"C.A.S.I."],
["sáb 18 jul 16:00","BANCO CIUDAD",0,0,"LANUS"],
["sáb 18 jul 16:00","U. LA PLATA",0,0,"CIUDAD B"]]],
["Fecha 19",false,[
["sáb 08 ago 16:00","PUERTO NIZUC",0,0,"CIUDAD B"],
["sáb 08 ago 16:00","LANUS",0,0,"U. LA PLATA"],
["sáb 08 ago 16:00","C.A.S.I.",0,0,"BANCO CIUDAD"],
["sáb 08 ago 16:00","PUCARA",0,0,"BANFIELD"],
["sáb 08 ago 16:00","MACABI",0,0,"C.I.S.S.A.B."],
["sáb 08 ago 16:00","B. HIPOTECARIO",0,0,"M. MORENO"],
["sáb 08 ago 16:00","M. GRANDE",0,0,"HINDU CLUB"]]],
["Fecha 20",false,[
["sáb 22 ago 16:00","HINDU CLUB",0,0,"PUERTO NIZUC"],
["sáb 22 ago 16:00","M. MORENO",0,0,"M. GRANDE"],
["sáb 22 ago 16:00","C.I.S.S.A.B.",0,0,"B. HIPOTECARIO"],
["sáb 22 ago 16:00","BANFIELD",0,0,"MACABI"],
["sáb 22 ago 16:00","BANCO CIUDAD",0,0,"PUCARA"],
["sáb 22 ago 16:00","U. LA PLATA",0,0,"C.A.S.I."],
["sáb 22 ago 16:00","CIUDAD B",0,0,"LANUS"]]],
["Fecha 21",false,[
["sáb 05 sept 16:00","PUERTO NIZUC",0,0,"LANUS"],
["sáb 05 sept 16:00","C.A.S.I.",0,0,"CIUDAD B"],
["sáb 05 sept 16:00","PUCARA",0,0,"U. LA PLATA"],
["sáb 05 sept 16:00","MACABI",0,0,"BANCO CIUDAD"],
["sáb 05 sept 16:00","B. HIPOTECARIO",0,0,"BANFIELD"],
["sáb 05 sept 16:00","M. GRANDE",0,0,"C.I.S.S.A.B."],
["sáb 05 sept 16:00","HINDU CLUB",0,0,"M. MORENO"]]],
["Fecha 22",false,[
["sáb 12 sept 16:00","M. MORENO",0,0,"PUERTO NIZUC"],
["sáb 12 sept 16:00","C.I.S.S.A.B.",0,0,"HINDU CLUB"],
["sáb 12 sept 16:00","BANFIELD",0,0,"M. GRANDE"],
["sáb 12 sept 16:00","BANCO CIUDAD",0,0,"B. HIPOTECARIO"],
["sáb 12 sept 16:00","U. LA PLATA",0,0,"MACABI"],
["sáb 12 sept 16:00","CIUDAD B",0,0,"PUCARA"],
["sáb 12 sept 16:00","LANUS",0,0,"C.A.S.I."]]],
["Fecha 23",false,[
["sáb 26 sept 16:00","PUERTO NIZUC",0,0,"C.A.S.I."],
["sáb 26 sept 16:00","PUCARA",0,0,"LANUS"],
["sáb 26 sept 16:00","MACABI",0,0,"CIUDAD B"],
["sáb 26 sept 16:00","B. HIPOTECARIO",0,0,"U. LA PLATA"],
["sáb 26 sept 16:00","M. GRANDE",0,0,"BANCO CIUDAD"],
["sáb 26 sept 16:00","HINDU CLUB",0,0,"BANFIELD"],
["sáb 26 sept 16:00","M. MORENO",0,0,"C.I.S.S.A.B."]]],
["Fecha 24",false,[
["sáb 03 oct 16:00","C.I.S.S.A.B.",0,0,"PUERTO NIZUC"],
["sáb 03 oct 16:00","BANFIELD",0,0,"M. MORENO"],
["sáb 03 oct 16:00","BANCO CIUDAD",0,0,"HINDU CLUB"],
["sáb 03 oct 16:00","U. LA PLATA",0,0,"M. GRANDE"],
["sáb 03 oct 16:00","CIUDAD B",0,0,"B. HIPOTECARIO"],
["sáb 03 oct 16:00","LANUS",0,0,"MACABI"],
["sáb 03 oct 16:00","C.A.S.I.",0,0,"PUCARA"]]],
["Fecha 25",false,[
["sáb 10 oct 16:00","PUERTO NIZUC",0,0,"PUCARA"],
["sáb 10 oct 16:00","MACABI",0,0,"C.A.S.I."],
["sáb 10 oct 16:00","B. HIPOTECARIO",0,0,"LANUS"],
["sáb 10 oct 16:00","M. GRANDE",0,0,"CIUDAD B"],
["sáb 10 oct 16:00","HINDU CLUB",0,0,"U. LA PLATA"],
["sáb 10 oct 16:00","M. MORENO",0,0,"BANCO CIUDAD"],
["sáb 10 oct 16:00","C.I.S.S.A.B.",0,0,"BANFIELD"]]],
["Fecha 26",false,[
["sáb 31 oct 16:00","BANFIELD",0,0,"PUERTO NIZUC"],
["sáb 31 oct 16:00","BANCO CIUDAD",0,0,"C.I.S.S.A.B."],
["sáb 31 oct 16:00","U. LA PLATA",0,0,"M. MORENO"],
["sáb 31 oct 16:00","CIUDAD B",0,0,"HINDU CLUB"],
["sáb 31 oct 16:00","LANUS",0,0,"M. GRANDE"],
["sáb 31 oct 16:00","C.A.S.I.",0,0,"B. HIPOTECARIO"],
["sáb 31 oct 16:00","PUCARA",0,0,"MACABI"]]]
];
function buildInitialFixture() {
  let id = 17000000;
  return INITIAL_FIXTURE_RAW.map(([label, played, matches]) => ({
    id: ++id, label,
    date: matches[0]?.[0] || "",
    matches: matches.map(([date, home, gl, gv, away]) => ({
      id: ++id, home, away, played,
      golesLocal: played ? gl : 0, golesVisitante: played ? gv : 0,
      scorers: [], cards: [],
      applied: played ? { golesLocal: gl, golesVisitante: gv, scorers: [], cards: [] } : null,
      date
    }))
  }));
}
function computeStandingsFromFixture(fixture) {
  const teams = {};
  const ensure = name => {
    if (!teams[name]) teams[name] = { name, pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,pts:0,dif:0, isUs: name === "U. LA PLATA" };
    return teams[name];
  };
  for (const f of fixture) {
    for (const m of f.matches) {
      if (!m.played) continue;
      const h = ensure(m.home), a = ensure(m.away);
      h.pj++; a.pj++;
      h.gf += m.golesLocal; h.gc += m.golesVisitante;
      a.gf += m.golesVisitante; a.gc += m.golesLocal;
      if (m.golesLocal > m.golesVisitante) { h.pg++; a.pp++; }
      else if (m.golesLocal < m.golesVisitante) { a.pg++; h.pp++; }
      else { h.pe++; a.pe++; }
    }
  }
  return Object.values(teams).map(t => ({...t, pts: t.pg*3+t.pe, dif: t.gf-t.gc}))
    .sort((a,b) => (b.pts-a.pts) || (b.dif-a.dif) || (b.gf-a.gf));
}
// ─── Helpers para vistas (últimos 5, próximo partido, evolución) ──────────
function getLastNResults(fixture, teamName, n=5) {
  const list = [];
  for (const f of fixture) {
    for (const m of f.matches) {
      if (!m.played) continue;
      if (m.home === teamName || m.away === teamName) {
        const isHome = m.home === teamName;
        const gf = isHome ? m.golesLocal : m.golesVisitante;
        const ga = isHome ? m.golesVisitante : m.golesLocal;
        const result = gf > ga ? "G" : gf < ga ? "P" : "E";
        list.push({ result, gf, ga, opp: isHome ? m.away : m.home, fecha: f.label, isHome });
      }
    }
  }
  return list.slice(-n);
}
function getNextFechaIndex(fixture) {
  for (let i = 0; i < fixture.length; i++) {
    if (fixture[i].matches.some(m => !m.played)) return i;
  }
  return Math.max(0, fixture.length - 1);
}
function getNextCulpMatch(fixture) {
  for (const f of fixture) {
    for (const m of f.matches) {
      if (m.played) continue;
      if (m.home === "U. LA PLATA" || m.away === "U. LA PLATA") {
        return { fecha: f.label, date: f.date, match: m, isHome: m.home === "U. LA PLATA", opp: m.home === "U. LA PLATA" ? m.away : m.home };
      }
    }
  }
  return null;
}
function getCulpPositionEvolution(fixture) {
  const points = [];
  for (let i = 0; i < fixture.length; i++) {
    const upto = fixture.slice(0, i+1);
    if (!upto[i].matches.some(m => m.played)) continue;
    const st = computeStandingsFromFixture(upto);
    const pos = st.findIndex(t => t.name === "U. LA PLATA");
    if (pos >= 0) points.push({ label: fixture[i].label.replace(/Fecha\s*/i, "F"), pos: pos+1, pts: st[pos].pts });
  }
  return points;
}
function getH2H(fixture, teamA, teamB) {
  const results = [];
  for (const f of fixture) {
    for (const m of f.matches) {
      if (!m.played) continue;
      if ((m.home===teamA && m.away===teamB) || (m.home===teamB && m.away===teamA)) {
        results.push({ fecha: f.label, home: m.home, away: m.away, gl: m.golesLocal, gv: m.golesVisitante });
      }
    }
  }
  return results;
}
// ─── Videos: categorías y conversión URL → embed ────────────────────────────
const VIDEO_CATEGORIES = ["Fase ofensiva","Fase defensiva","Presiones","Salidas","CC Ofensivos","CC defensivo","Tendencias"];
function videoEmbedInfo(rawUrl) {
  const url = (rawUrl||"").trim();
  if (!url) return null;
  // YouTube: youtu.be/ID  ·  youtube.com/watch?v=ID  ·  youtube.com/shorts/ID  ·  /embed/ID
  const ytShort = url.match(/youtu\.be\/([\w-]{6,})/i);
  const ytWatch = url.match(/[?&]v=([\w-]{6,})/i);
  const ytShorts = url.match(/youtube\.com\/shorts\/([\w-]{6,})/i);
  const ytEmbed = url.match(/youtube\.com\/embed\/([\w-]{6,})/i);
  const ytId = ytShort?.[1] || ytWatch?.[1] || ytShorts?.[1] || ytEmbed?.[1];
  if (ytId) return { kind:"youtube", embed:`https://www.youtube.com/embed/${ytId}`, watch:`https://www.youtube.com/watch?v=${ytId}` };
  // Google Drive: /file/d/ID/ · ?id=ID · /open?id=ID
  const drvPath = url.match(/drive\.google\.com\/file\/d\/([\w-]{10,})/i);
  const drvQuery = url.match(/[?&]id=([\w-]{10,})/i);
  const drvId = drvPath?.[1] || drvQuery?.[1];
  if (drvId) return { kind:"drive", embed:`https://drive.google.com/file/d/${drvId}/preview`, watch:`https://drive.google.com/file/d/${drvId}/view` };
  // Vimeo opcional: vimeo.com/ID
  const vim = url.match(/vimeo\.com\/(\d{6,})/i);
  if (vim) return { kind:"vimeo", embed:`https://player.vimeo.com/video/${vim[1]}`, watch:`https://vimeo.com/${vim[1]}` };
  // Fallback: usar la URL tal cual (puede no funcionar como iframe si el sitio lo bloquea)
  return { kind:"other", embed:url, watch:url };
}

// ─── Persistencia híbrida: localStorage (instantáneo) + Supabase (sync remoto) ─
const _saveStatusListeners = new Set();
function emitSaveStatus(status) { _saveStatusListeners.forEach(fn => { try { fn(status); } catch {} }); }
function subscribeSaveStatus(fn) { _saveStatusListeners.add(fn); return () => _saveStatusListeners.delete(fn); }
function lsGet(key) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } }
function lsSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
let _pendingSaves = 0;
async function load(key) {
  // 1) Intentar Supabase
  try {
    const res = await fetch(SUPABASE_URL + "/rest/v1/culp_data?key=eq." + encodeURIComponent(key) + "&select=value", {
      headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const parsed = JSON.parse(data[0].value);
        lsSet(key, parsed); // refrescar cache local con lo remoto
        return parsed;
      }
    }
  } catch {}
  // 2) Fallback a localStorage (último estado conocido en este dispositivo)
  return lsGet(key);
}
async function save(key, val) {
  // Persistencia instantánea local (no puede fallar) → los datos sobreviven aunque Supabase falle
  lsSet(key, val);
  _pendingSaves++;
  emitSaveStatus("saving");
  try {
    const res = await fetch(SUPABASE_URL + "/rest/v1/culp_data?on_conflict=key", {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify({ key, value: JSON.stringify(val) })
    });
    _pendingSaves--;
    if (!res.ok) {
      const err = await res.text();
      console.error("Supabase save error:", res.status, err);
      emitSaveStatus("error");
      return false;
    }
    if (_pendingSaves === 0) emitSaveStatus("saved");
    return true;
  } catch(e) {
    _pendingSaves--;
    console.error("Save exception:", e);
    emitSaveStatus("error");
    return false;
  }
}
// ─── Supabase Auth (Google OAuth via REST, sin SDK) ─────────────────────────
const AUTH_STORAGE_KEY = "culp:supabaseAuth";
function _getAuth() { try { const v = localStorage.getItem(AUTH_STORAGE_KEY); return v ? JSON.parse(v) : null; } catch { return null; } }
function _setAuth(a) { try { a ? localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(a)) : localStorage.removeItem(AUTH_STORAGE_KEY); } catch {} }
function _userIdFromToken(token) { try { return JSON.parse(atob(token.split(".")[1])).sub; } catch { return null; } }

function loginWithGoogle() {
  const redirect = encodeURIComponent(window.location.origin + window.location.pathname);
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirect}`;
}
async function logoutSupabase() {
  const auth = _getAuth();
  if (auth?.access_token) {
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${auth.access_token}` }
      });
    } catch {}
  }
  _setAuth(null);
}
async function refreshSupabaseToken(refresh_token) {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token })
    });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}
async function fetchSupabaseProfile(accessToken, userId) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=*`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${accessToken}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch { return null; }
}
async function getValidAccessToken() {
  // Devuelve un access_token válido (refresca si está por vencer) o null si no hay sesión
  let auth = _getAuth();
  if (!auth?.access_token) return null;
  const now = Date.now();
  if (auth.expires_at && auth.expires_at < now + 60_000) {
    const fresh = await refreshSupabaseToken(auth.refresh_token);
    if (!fresh?.access_token) { _setAuth(null); return null; }
    auth = {
      access_token: fresh.access_token,
      refresh_token: fresh.refresh_token,
      expires_at: now + (fresh.expires_in||3600)*1000,
      user: fresh.user
    };
    _setAuth(auth);
  }
  return auth.access_token;
}
// Captura el hash de OAuth (#access_token=...) si volvemos de Google y limpia la URL
function consumeOAuthRedirect() {
  if (typeof window === "undefined") return false;
  const hash = window.location.hash || "";
  if (!hash.includes("access_token=")) return false;
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");
  const expires_in = parseInt(params.get("expires_in") || "3600");
  if (!access_token) return false;
  _setAuth({
    access_token, refresh_token,
    expires_at: Date.now() + expires_in*1000
  });
  try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch {}
  return true;
}

// ─── Claude API (acepta imágenes Y PDFs) ─────────────────────────────────────
const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
async function scanPlanilla(base64, mediaType, isPdf) {
  if (!ANTHROPIC_KEY) {
    throw new Error("Falta configurar la API key de Anthropic. Andá a Vercel → Settings → Environment Variables y agregá VITE_ANTHROPIC_API_KEY.");
  }
  const system = `Sos un asistente de análisis de hockey sobre césped. Extraé datos de planillas de partidos (pueden venir en PDF oficial o foto de planilla manual).
Respondé SOLO con un objeto JSON válido, sin texto adicional, sin markdown, sin backticks.
Estructura exacta:
{"equipoLocal":"nombre","equipoVisitante":"nombre","golesLocal":0,"golesVisitante":0,"fecha":"YYYY-MM-DD o vacío","goleadoras":[{"nombre":"Apellido, Nombre","equipo":"local|visitante","minuto":"","tipo":"gol|pc"}],"cornersLocal":0,"cornersVisitante":0,"tarjetas":[{"nombre":"Apellido, Nombre","equipo":"local|visitante","tipo":"verde|amarilla|roja","minuto":""}],"jugadorasLocal":["Apellido, Nombre"],"jugadorasVisitante":["Apellido, Nombre"],"notas":""}
Reglas:
- Los nombres siempre en formato "Apellido, Nombre" (respetá como aparece en la planilla).
- Si un campo no aparece, usá valor vacío "" o 0. Nunca inventes datos.
- Las tarjetas verdes son 2 minutos, amarillas 5 minutos, rojas expulsión.
- Si la planilla dice "PC" o "penalty corner", es tipo "pc". Si dice "gol de juego" o no aclara, es "gol".`;
  const fileBlock = isPdf
    ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } }
    : { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } };
  let res;
  try {
    res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system,
        messages: [{ role: "user", content: [fileBlock, { type: "text", text: "Extraé todos los datos de esta planilla de hockey." }] }]
      })
    });
  } catch (networkErr) {
    throw new Error("Error de red al conectar con la API. Revisá tu conexión.");
  }
  if (!res.ok) {
    const errTxt = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("API key inválida o vencida. Revisá VITE_ANTHROPIC_API_KEY en Vercel.");
    if (res.status === 429) throw new Error("Llegaste al límite de uso. Esperá un momento o revisá tus créditos en console.anthropic.com.");
    if (res.status === 400 && errTxt.includes("credit")) throw new Error("Sin créditos en la cuenta de Anthropic. Agregá método de pago en console.anthropic.com.");
    throw new Error(`Error API (${res.status}): ${errTxt.substring(0, 150) || "desconocido"}`);
  }
  const data = await res.json();
  const text = data.content?.find(b => b.type === "text")?.text || "";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    throw new Error("No se pudo interpretar la respuesta. Probá con un archivo más claro.");
  }
}
// ─── Icons ────────────────────────────────────────────────────────────────────
const P = {
  home:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  plus:"M12 5v14M5 12h14",
  shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  trophy:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z",
  chart:"M18 20V10 M12 20V4 M6 20v-6",
  edit:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  back:"M19 12H5 M12 19l-7-7 7-7",
  check:"M20 6L9 17l-5-5",
  upload:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  scan:"M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  save:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8",
  x:"M18 6L6 18 M6 6l12 12",
  flag:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
  target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  corner:"M15 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9 M18 3l3 3-3 3 M21 6H9",
  image:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  filter:"M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  camera:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  calendar:"M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
  chevron:"M6 9l6 6 6-6",
  share:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13",
  print:"M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6z",
};
const Icon = ({name,size=18,color="currentColor"})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {(P[name]||"").split(" M").map((d,i)=><path key={i} d={i===0?d:"M"+d}/>)}
  </svg>
);
// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {bg:"#080810",card:"#11111C",card2:"#181826",border:"#252535",accent:"#00C8FF",purple:"#7B2FBE",red:"#FF4D6D",green:"#4ade80",gold:"#FFD700",gray:"#7777AA",white:"#FFFFFF"};
const inp = {background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.white,fontSize:14,width:"100%",boxSizing:"border-box",fontFamily:"inherit",outline:"none"};
const FF = "'Barlow Condensed',sans-serif";
// ─── UI ───────────────────────────────────────────────────────────────────────
const Input=({label,...p})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:10,color:C.gray,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase"}}>{label}</label>}<input style={inp} {...p}/></div>);
const Select=({label,options,...p})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:10,color:C.gray,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase"}}>{label}</label>}<select style={{...inp,cursor:"pointer"}} {...p}>{options.map(o=><option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}</select></div>);
const Textarea=({label,...p})=>(<div style={{marginBottom:12}}>{label&&<label style={{display:"block",fontSize:10,color:C.gray,marginBottom:4,letterSpacing:0.8,textTransform:"uppercase"}}>{label}</label>}<textarea style={{...inp,minHeight:72,resize:"vertical"}} {...p}/></div>);
const Btn=({children,onClick,color=C.accent,outline=false,small=false,danger=false,disabled=false,style:sx={}})=>{
  const bg=danger?C.red:color;
  return <button onClick={onClick} disabled={disabled} style={{background:outline?"transparent":(disabled?C.border:bg),border:`1px solid ${disabled?C.border:bg}`,color:outline?bg:C.white,borderRadius:8,padding:small?"6px 12px":"10px 20px",fontSize:small?12:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",gap:6,letterSpacing:0.3,fontFamily:FF,opacity:disabled?0.5:1,transition:"all 0.15s",...sx}}>{children}</button>;
};
const Badge=({text,color=C.accent})=>(<span style={{background:color+"22",color,border:`1px solid ${color}44`,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700,letterSpacing:0.5}}>{text}</span>);
const Modal=({title,onClose,children,wide=false})=>(
  <div style={{position:"fixed",inset:0,background:"#000000DD",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:wide?720:560,maxHeight:"92vh",overflowY:"auto",padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,fontSize:18,color:C.white,fontFamily:FF,letterSpacing:1}}>{title}</h2>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="x" size={20}/></button>
      </div>
      {children}
    </div>
  </div>
);
const SCard=({title,color=C.accent,icon,children})=>(
  <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:12}}>
    {title&&<div style={{display:"flex",alignItems:"center",gap:7,marginBottom:12}}>{icon&&<Icon name={icon} size={13} color={color}/>}<span style={{color,fontSize:11,fontWeight:700,fontFamily:FF,letterSpacing:1}}>{title.toUpperCase()}</span></div>}
    {children}
  </div>
);
// ═══════════════════════════════════════════════════════════════════════════════
// PLANILLA IMPORTER — 3 modos: IA (PDF/foto), Manual (form vacío), Review (post-IA)
// ═══════════════════════════════════════════════════════════════════════════════
const EMPTY_PLANILLA = () => ({
  equipoLocal:"U. LA PLATA", equipoVisitante:"", golesLocal:0, golesVisitante:0,
  fecha:new Date().toISOString().split("T")[0],
  goleadoras:[], cornersLocal:0, cornersVisitante:0,
  tarjetas:[], jugadorasLocal:[], jugadorasVisitante:[], notas:""
});
function PlanillaScanner({rivalName,onApply,onClose,mode="scan"}) {
  const [stage,setStage]=useState(mode==="manual"?"review":"upload");
  const [preview,setPreview]=useState(null);
  const [b64,setB64]=useState(null);
  const [mtype,setMtype]=useState("image/jpeg");
  const [fileName,setFileName]=useState("");
  const [isPdf,setIsPdf]=useState(false);
  const [result,setResult]=useState(mode==="manual"?{...EMPTY_PLANILLA(),equipoVisitante:rivalName||""}:null);
  const [error,setError]=useState("");
  const fileRef=useRef();
  const cameraRef=useRef();
  function handleFile(file) {
    if(!file) return;
    const isPdfFile = file.type==="application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImageFile = file.type.startsWith("image/");
    if(!isPdfFile && !isImageFile) {
      setError("Formato no soportado. Usá PDF, JPG, PNG o WEBP.");
      setStage("error");
      return;
    }
    // Límite de tamaño: 32 MB (Anthropic acepta PDFs hasta 32MB en base64)
    if(file.size > 32*1024*1024) {
      setError("El archivo es muy grande (máx 32 MB). Probá con una versión más liviana.");
      setStage("error");
      return;
    }
    setIsPdf(isPdfFile);
    setMtype(isPdfFile ? "application/pdf" : file.type);
    setFileName(file.name);
    const reader=new FileReader();
    reader.onload=e=>{
      const d=e.target.result;
      if(isPdfFile) {
        setPreview(null);
      } else {
        setPreview(d);
      }
      setB64(d.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }
  async function scan() {
    setStage("scanning");
    try { const d=await scanPlanilla(b64,mtype,isPdf); setResult(JSON.parse(JSON.stringify(d))); setStage("review"); }
    catch(err) { setError(err.message); setStage("error"); }
  }
  function resetUpload() {
    setB64(null); setPreview(null); setFileName(""); setIsPdf(false); setStage("upload");
  }
  const cardColor=t=>t==="verde"?C.green:t==="amarilla"?C.gold:C.red;
  return (
    <Modal title="📄 Importar Planilla" onClose={onClose} wide>
      {stage==="upload"&&(
        <div>
          <p style={{color:C.gray,fontSize:13,margin:"0 0 16px"}}>Subí el <b style={{color:C.white}}>PDF oficial</b> o una <b style={{color:C.white}}>foto de la planilla</b>. Claude extrae todo automáticamente: goles, goleadoras, tarjetas y jugadoras.</p>
          <div onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0]);}} onDragOver={e=>e.preventDefault()}
            onClick={()=>!b64&&fileRef.current.click()}
            style={{border:`2px dashed ${b64?C.accent:C.border}`,borderRadius:12,padding:b64?16:32,textAlign:"center",cursor:b64?"default":"pointer",background:C.card2,minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            {b64?(
              <div style={{width:"100%"}}>
                {isPdf?(
                  <div style={{padding:"20px 10px",textAlign:"center"}}>
                    <div style={{width:70,height:84,margin:"0 auto 12px",background:C.red+"15",border:`2px solid ${C.red}55`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4}}>
                      <Icon name="file" size={28} color={C.red}/>
                      <span style={{color:C.red,fontSize:9,fontWeight:700,letterSpacing:0.5}}>PDF</span>
                    </div>
                    <p style={{color:C.white,fontWeight:700,margin:"0 0 4px",fontSize:14,wordBreak:"break-word"}}>{fileName}</p>
                    <p style={{color:C.gray,fontSize:12,margin:0}}>Listo para analizar con IA</p>
                  </div>
                ):(
                  <img src={preview} alt="planilla" style={{maxWidth:"100%",maxHeight:280,objectFit:"contain",borderRadius:8}}/>
                )}
                <div style={{display:"flex",justifyContent:"center",marginTop:12}}>
                  <Btn small outline onClick={e=>{e.stopPropagation();resetUpload();}}><Icon name="x" size={12}/> Cambiar archivo</Btn>
                </div>
              </div>
            ):(
              <>
                <Icon name="upload" size={40} color={C.border}/>
                <p style={{color:C.white,margin:"12px 0 4px",fontSize:15,fontWeight:600}}>Arrastrá o hacé clic</p>
                <p style={{color:C.gray,margin:"0 0 14px",fontSize:12}}>PDF · JPG · PNG · WEBP (máx 32 MB)</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
                  <Btn small outline onClick={e=>{e.stopPropagation();fileRef.current.click();}}><Icon name="upload" size={12}/> Subir archivo</Btn>
                  <Btn small outline onClick={e=>{e.stopPropagation();cameraRef.current.click();}} color={C.purple}><Icon name="camera" size={12}/> Tomar foto</Btn>
                </div>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*,application/pdf,.pdf" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
          {!ANTHROPIC_KEY&&<div style={{marginTop:12,background:C.gold+"15",border:`1px solid ${C.gold}44`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.gold,display:"flex",alignItems:"center",gap:8}}><span>⚠️</span><span>Aún no configuraste <code style={{background:"#0004",padding:"1px 5px",borderRadius:3}}>VITE_ANTHROPIC_API_KEY</code> en Vercel. Sin esa variable no puede analizar los archivos.</span></div>}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16}}>
            <Btn outline onClick={onClose}>Cancelar</Btn>
            <Btn onClick={scan} disabled={!b64} color={C.purple}><Icon name="scan" size={14}/> Analizar con IA</Btn>
          </div>
        </div>
      )}
      {stage==="scanning"&&(
        <div style={{textAlign:"center",padding:"48px 20px"}}>
          <div style={{width:64,height:64,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.purple}`,borderRadius:"50%",margin:"0 auto 20px",animation:"spin 1s linear infinite"}}/>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{color:C.white,fontSize:16,fontFamily:FF,letterSpacing:1,margin:"0 0 8px"}}>ANALIZANDO PLANILLA...</p>
          <p style={{color:C.gray,fontSize:13,margin:"0 0 4px"}}>Claude está leyendo los datos del partido</p>
          <p style={{color:C.border,fontSize:11,margin:0}}>Puede tardar 10–30 segundos</p>
          {isPdf?(
            <div style={{margin:"20px auto 0",display:"flex",alignItems:"center",gap:10,background:C.card2,padding:"10px 14px",borderRadius:8,maxWidth:280,opacity:0.6}}>
              <Icon name="file" size={20} color={C.red}/>
              <span style={{color:C.gray,fontSize:12,wordBreak:"break-word"}}>{fileName}</span>
            </div>
          ):(preview&&<img src={preview} alt="" style={{maxWidth:240,maxHeight:140,objectFit:"contain",borderRadius:8,marginTop:20,opacity:0.4}}/>)}
        </div>
      )}
      {stage==="error"&&(
        <div style={{textAlign:"center",padding:"32px 20px"}}>
          <Icon name="x" size={48} color={C.red}/>
          <p style={{color:C.red,fontSize:16,margin:"12px 0 8px",fontFamily:FF}}>NO SE PUDO IMPORTAR</p>
          <p style={{color:C.gray,fontSize:13,margin:"0 auto 20px",maxWidth:400}}>{error}</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn outline onClick={resetUpload}><Icon name="upload" size={14}/> Intentar de nuevo</Btn>
            <Btn outline onClick={onClose}>Cancelar</Btn>
          </div>
        </div>
      )}
      {stage==="review"&&result&&(
        <div>
          <div style={{background:C.green+"15",border:`1px solid ${C.green}33`,borderRadius:8,padding:"10px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
            <Icon name="check" size={14} color={C.green}/>
            <span style={{color:C.green,fontSize:13,fontWeight:600}}>Planilla leída. Revisá y corregí antes de aplicar.</span>
          </div>
          <SCard title="Resultado" icon="chart" color={C.accent}>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"flex-end",marginBottom:12}}>
              <Input label="Equipo local" value={result.equipoLocal} onChange={e=>setResult(r=>({...r,equipoLocal:e.target.value}))}/>
              <div style={{paddingBottom:12,textAlign:"center"}}>
                <div style={{fontSize:10,color:C.gray,letterSpacing:0.8,marginBottom:6}}>RESULTADO</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <input type="number" min={0} value={result.golesLocal} onChange={e=>setResult(r=>({...r,golesLocal:+e.target.value}))} style={{...inp,width:52,textAlign:"center",fontSize:22,fontWeight:700,padding:"6px 4px"}}/>
                  <span style={{color:C.gray,fontSize:20}}>—</span>
                  <input type="number" min={0} value={result.golesVisitante} onChange={e=>setResult(r=>({...r,golesVisitante:+e.target.value}))} style={{...inp,width:52,textAlign:"center",fontSize:22,fontWeight:700,padding:"6px 4px"}}/>
                </div>
              </div>
              <Input label="Equipo visitante" value={result.equipoVisitante} onChange={e=>setResult(r=>({...r,equipoVisitante:e.target.value}))}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              <Input label="Fecha" type="date" value={result.fecha} onChange={e=>setResult(r=>({...r,fecha:e.target.value}))}/>
              <Input label="PC local" type="number" min={0} value={result.cornersLocal} onChange={e=>setResult(r=>({...r,cornersLocal:+e.target.value}))}/>
              <Input label="PC visitante" type="number" min={0} value={result.cornersVisitante} onChange={e=>setResult(r=>({...r,cornersVisitante:+e.target.value}))}/>
            </div>
          </SCard>
          <SCard title={`Goleadoras (${result.goleadoras?.length||0})`} icon="trophy" color={C.gold}>
            {(!result.goleadoras||result.goleadoras.length===0)&&<p style={{color:C.gray,fontSize:13,margin:0}}>No se detectaron goles</p>}
            {result.goleadoras?.map((g,i)=>(
              <div key={i} style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
                <input style={{...inp,flex:2}} placeholder="Nombre" value={g.nombre} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],nombre:e.target.value};return{...r,goleadoras:a};})}/>
                <select style={{...inp,flex:1}} value={g.equipo} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],equipo:e.target.value};return{...r,goleadoras:a};})}><option value="local">Local</option><option value="visitante">Visitante</option></select>
                <input style={{...inp,flex:1,maxWidth:70}} placeholder="Min" value={g.minuto} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],minuto:e.target.value};return{...r,goleadoras:a};})}/>
                <select style={{...inp,flex:1,maxWidth:80}} value={g.tipo} onChange={e=>setResult(r=>{const a=[...r.goleadoras];a[i]={...a[i],tipo:e.target.value};return{...r,goleadoras:a};})}><option value="gol">Gol</option><option value="pc">PC</option></select>
                <button onClick={()=>setResult(r=>({...r,goleadoras:r.goleadoras.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="x" size={14}/></button>
              </div>
            ))}
            <Btn small outline onClick={()=>setResult(r=>({...r,goleadoras:[...(r.goleadoras||[]),{nombre:"",equipo:"local",minuto:"",tipo:"gol"}]}))}><Icon name="plus" size={12}/> Agregar</Btn>
          </SCard>
          {result.tarjetas?.length>0&&(
            <SCard title={`Tarjetas (${result.tarjetas.length})`} icon="flag" color={C.red}>
              {result.tarjetas.map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <div style={{width:10,height:14,background:cardColor(t.tipo),borderRadius:2,flexShrink:0}}/>
                  <span style={{color:C.white,fontSize:13,flex:1}}>{t.nombre}</span>
                  <span style={{color:C.gray,fontSize:12}}>{t.equipo} · min {t.minuto}</span>
                  <Badge text={t.tipo.toUpperCase()} color={cardColor(t.tipo)}/>
                </div>
              ))}
            </SCard>
          )}
          {(result.jugadorasLocal?.length>0||result.jugadorasVisitante?.length>0)&&(
            <SCard title="Jugadoras detectadas" icon="users" color={C.purple}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {result.jugadorasLocal?.length>0&&<div><p style={{color:C.accent,fontSize:10,margin:"0 0 6px",letterSpacing:0.8}}>{result.equipoLocal?.toUpperCase()||"LOCAL"}</p>{result.jugadorasLocal.map((j,i)=><div key={i} style={{color:C.gray,fontSize:12,padding:"2px 0"}}>· {j}</div>)}</div>}
                {result.jugadorasVisitante?.length>0&&<div><p style={{color:C.red,fontSize:10,margin:"0 0 6px",letterSpacing:0.8}}>{result.equipoVisitante?.toUpperCase()||"VISITANTE"}</p>{result.jugadorasVisitante.map((j,i)=><div key={i} style={{color:C.gray,fontSize:12,padding:"2px 0"}}>· {j}</div>)}</div>}
              </div>
            </SCard>
          )}
          {result.notas&&<SCard title="Notas" color={C.gray}><p style={{color:C.gray,fontSize:13,margin:0}}>{result.notas}</p></SCard>}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8,flexWrap:"wrap"}}>
            <Btn outline onClick={resetUpload}><Icon name="upload" size={14}/> Otro archivo</Btn>
            <Btn onClick={()=>{onApply(result);onClose();}} color={C.green}><Icon name="check" size={14}/> Aplicar al análisis</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// STANDINGS
// ═══════════════════════════════════════════════════════════════════════════════
function StandingsView({standings,setStandings,fixture}) {
  const isAdmin = useIsAdmin();
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const empty={name:"",pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,isUs:false};
  const submit=()=>{
    const pts=+form.pg*3+(+form.pe),dif=+form.gf-+form.gc;
    const entry={...form,pts,dif,pj:+form.pj,pg:+form.pg,pe:+form.pe,pp:+form.pp,gf:+form.gf,gc:+form.gc};
    const s=editIdx!==null?standings.map((x,i)=>i===editIdx?entry:x):[...standings,entry];
    const sorted=[...s].sort((a,b)=>(b.pts-a.pts)||(b.dif-a.dif));
    setStandings(sorted);save(KEYS.standings,sorted);setEditing(false);
  };
  const renderLast5 = teamName => {
    const last = getLastNResults(fixture||[], teamName, 5);
    if (last.length === 0) return <span style={{color:C.gray,fontSize:11}}>—</span>;
    return (
      <div style={{display:"inline-flex",gap:3,alignItems:"center",justifyContent:"center"}}>
        {last.map((r,i)=>{
          const bg = r.result==="G"?C.green:r.result==="P"?C.red:C.gold;
          return <span key={i} title={`${r.fecha} · ${r.isHome?"vs":"@"} ${r.opp} ${r.gf}-${r.ga}`} style={{display:"inline-block",width:16,height:16,borderRadius:4,background:bg,color:"#000",fontSize:10,fontWeight:800,lineHeight:"16px",textAlign:"center",fontFamily:FF}}>{r.result}</span>;
        })}
      </div>
    );
  };
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>TABLA DE POSICIONES</h2>
        {isAdmin && <Btn small onClick={()=>{setForm({...empty});setEditIdx(null);setEditing(true);}}><Icon name="plus" size={14}/> Agregar</Btn>}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:640}}>
          <thead><tr style={{background:C.accent,color:C.bg}}>{(isAdmin?["#","EQUIPO","PJ","PG","PE","PP","GF","GC","DIF","PTS","ÚLT 5",""]:["#","EQUIPO","PJ","PG","PE","PP","GF","GC","DIF","PTS","ÚLT 5"]).map(h=><th key={h} style={{padding:"10px 6px",textAlign:h==="EQUIPO"?"left":"center",fontFamily:FF,fontWeight:700,fontSize:11,letterSpacing:0.5}}>{h}</th>)}</tr></thead>
          <tbody>
            {standings.length===0&&<tr><td colSpan={isAdmin?12:11} style={{textAlign:"center",padding:32,color:C.gray}}>No hay equipos cargados aún</td></tr>}
            {standings.map((t,i)=>(
              <tr key={i} style={{background:t.isUs?C.purple+"22":i%2===0?C.card:C.card2,borderBottom:`1px solid ${C.border}`}}>
                <td style={{textAlign:"center",padding:"10px 6px",color:C.gray,fontWeight:700}}>{i+1}</td>
                <td style={{padding:"10px 6px",color:t.isUs?C.purple:C.white,fontWeight:t.isUs?700:400}}>{t.isUs&&"🔵 "}{t.name}</td>
                {[t.pj,t.pg,t.pe,t.pp,t.gf,t.gc].map((v,j)=><td key={j} style={{textAlign:"center",padding:"10px 6px",color:"#ccc"}}>{v}</td>)}
                <td style={{textAlign:"center",padding:"10px 6px",color:t.dif>0?C.green:t.dif<0?C.red:"#ccc",fontWeight:700}}>{t.dif>0?"+":""}{t.dif}</td>
                <td style={{textAlign:"center",padding:"10px 6px",color:C.accent,fontWeight:700,fontSize:15}}>{t.pts}</td>
                <td style={{textAlign:"center",padding:"10px 6px",whiteSpace:"nowrap"}}>{renderLast5(t.name)}</td>
                {isAdmin && <td style={{textAlign:"center"}}>
                  <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                    <button onClick={()=>{setForm({...standings[i]});setEditIdx(i);setEditing(true);}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="edit" size={13}/></button>
                    <button onClick={()=>{const s=[...standings];s.splice(i,1);setStandings(s);save(KEYS.standings,s);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={13}/></button>
                  </div>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:10,fontSize:11,color:C.gray,display:"flex",gap:14,flexWrap:"wrap"}}>
        <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:C.green,marginRight:4,verticalAlign:"middle"}}/>Ganó</span>
        <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:C.gold,marginRight:4,verticalAlign:"middle"}}/>Empató</span>
        <span><span style={{display:"inline-block",width:10,height:10,borderRadius:3,background:C.red,marginRight:4,verticalAlign:"middle"}}/>Perdió</span>
        <span style={{color:C.gray}}>· hover para ver detalle</span>
      </div>
      {editing&&(
        <Modal title={editIdx!==null?"Editar equipo":"Agregar equipo"} onClose={()=>setEditing(false)}>
          <Input label="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>{["pj","pg","pe","pp","gf","gc"].map(f=><Input key={f} label={f.toUpperCase()} type="number" min={0} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}/>)}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><input type="checkbox" id="isUs" checked={form.isUs} onChange={e=>setForm({...form,isUs:e.target.checked})}/><label htmlFor="isUs" style={{color:C.gray,fontSize:13}}>Este es Universitario LP</label></div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setEditing(false)}>Cancelar</Btn><Btn onClick={submit}><Icon name="save" size={14}/> Guardar</Btn></div>
        </Modal>
      )}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// SCORERS
// ═══════════════════════════════════════════════════════════════════════════════
function ScorersView({scorers,setScorers,rivals}) {
  const isAdmin = useIsAdmin();
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const [filter,setFilter]=useState("");
  const [teamFilter,setTeamFilter]=useState("");
  const [importing,setImporting]=useState(false);
  const [importText,setImportText]=useState("");
  const [importPreview,setImportPreview]=useState(null);
  const [importError,setImportError]=useState("");
  const teams=[...new Set(scorers.map(s=>s.team))].sort();
  const filtered=scorers.filter(s=>{
    const matchName=!filter||s.name.toLowerCase().includes(filter.toLowerCase());
    const matchTeam=!teamFilter||s.team===teamFilter;
    return matchName&&matchTeam;
  });
  const submit=()=>{
    const entry={...form,goals:+form.goals,pj:+(form.pj||0),pc:+(form.pc||0)};
    const s=editIdx!==null?scorers.map((x,i)=>i===editIdx?entry:x):[...scorers,entry];
    const sorted=[...s].sort((a,b)=>b.goals-a.goals);
    setScorers(sorted);save(KEYS.scorers,sorted);setEditing(false);
  };
  const doPreview=()=>{
    setImportError("");
    try {
      const parsed=parseScorersPaste(importText);
      if(parsed.length===0){ setImportError("No se detectaron filas válidas. Revisá el formato."); setImportPreview(null); return; }
      setImportPreview(parsed);
    } catch(e){ setImportError("Error al parsear: "+e.message); setImportPreview(null); }
  };
  const doImport=()=>{
    if(!importPreview||importPreview.length===0)return;
    const sorted=[...importPreview].sort((a,b)=>b.goals-a.goals);
    setScorers(sorted);save(KEYS.scorers,sorted);
    setImporting(false);setImportText("");setImportPreview(null);setImportError("");
  };
  const closeImport=()=>{setImporting(false);setImportText("");setImportPreview(null);setImportError("");};
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>TABLA DE GOLEADORAS</h2>
        {isAdmin && <div style={{display:"flex",gap:6}}>
          <Btn small color={C.purple} onClick={()=>{setImporting(true);setImportText("");setImportPreview(null);setImportError("");}}><Icon name="upload" size={14}/> Importar</Btn>
          <Btn small onClick={()=>{setForm({name:"",team:"",goals:0,pj:0,pc:0});setEditIdx(null);setEditing(true);}}><Icon name="plus" size={14}/> Agregar</Btn>
        </div>}
      </div>
      {/* Filtros */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        <div style={{position:"relative"}}>
          <input style={{...inp,paddingLeft:34}} placeholder="Buscar jugadora..." value={filter} onChange={e=>setFilter(e.target.value)}/>
          <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><Icon name="eye" size={14} color={C.gray}/></div>
        </div>
        <select style={{...inp,cursor:"pointer"}} value={teamFilter} onChange={e=>setTeamFilter(e.target.value)}>
          <option value="">Todos los equipos</option>
          {teams.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div style={{fontSize:12,color:C.gray,marginBottom:8}}>
        Mostrando {filtered.length} de {scorers.length} jugadoras · {scorers.reduce((a,s)=>a+s.goals,0)} goles totales
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:520}}>
          <thead><tr style={{background:C.purple,color:C.white}}>{(isAdmin?["#","JUGADORA","CLUB","GOLES","PJ","PROM",""]:["#","JUGADORA","CLUB","GOLES","PJ","PROM"]).map(h=><th key={h} style={{padding:"10px 6px",textAlign:["JUGADORA","CLUB"].includes(h)?"left":"center",fontFamily:FF,fontWeight:700,fontSize:11,letterSpacing:0.5}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={isAdmin?7:6} style={{textAlign:"center",padding:32,color:C.gray}}>Sin resultados</td></tr>}
            {filtered.map((s,i)=>{
              const realRank=scorers.findIndex(x=>x.name===s.name&&x.team===s.team);
              const prom = s.pj && s.pj>0 ? (s.goals/s.pj).toFixed(2) : "—";
              return(
                <tr key={i} style={{background:s.team==="U. LA PLATA"?C.accent+"11":i%2===0?C.card:C.card2,borderBottom:`1px solid ${C.border}`}}>
                  <td style={{textAlign:"center",padding:"10px 6px",fontWeight:700}}>{realRank===0?"🥇":realRank===1?"🥈":realRank===2?"🥉":<span style={{color:C.gray}}>{realRank+1}</span>}</td>
                  <td style={{padding:"10px 6px",color:s.team==="U. LA PLATA"?C.accent:C.white,fontWeight:s.team==="U. LA PLATA"?700:400}}>{s.team==="U. LA PLATA"&&"🔵 "}{s.name}</td>
                  <td style={{padding:"10px 6px",color:C.gray}}>{s.team}</td>
                  <td style={{textAlign:"center",padding:"10px 6px",color:C.accent,fontWeight:700,fontSize:16}}>{s.goals}</td>
                  <td style={{textAlign:"center",padding:"10px 6px",color:C.white,fontWeight:600}}>{s.pj||"—"}</td>
                  <td style={{textAlign:"center",padding:"10px 6px",color:C.green,fontWeight:600}}>{prom}</td>
                  {isAdmin && <td style={{textAlign:"center",padding:"10px 4px"}}>
                    <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                      <button onClick={()=>{setForm({...s,pj:s.pj||0,pc:s.pc||0});setEditIdx(scorers.findIndex(x=>x.name===s.name&&x.team===s.team));setEditing(true);}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="edit" size={13}/></button>
                      <button onClick={()=>{const s2=scorers.filter((_,j)=>j!==realRank);setScorers(s2);save(KEYS.scorers,s2);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={13}/></button>
                    </div>
                  </td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* CULP highlight */}
      {!teamFilter&&!filter&&(
        <div style={{marginTop:14,background:C.accent+"11",border:`1px solid ${C.accent}33`,borderRadius:8,padding:12}}>
          <p style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:0.8,margin:"0 0 8px"}}>GOLEADORAS DE CULP</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {scorers.filter(s=>s.team==="U. LA PLATA").map((s,i)=>(
              <span key={i} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 10px",fontSize:12,color:C.white}}>
                {s.name} <span style={{color:C.accent,fontWeight:700}}>{s.goals}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {editing&&(
        <Modal title={editIdx!==null?"Editar goleadora":"Agregar goleadora"} onClose={()=>setEditing(false)}>
          <Input label="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <Input label="Club (escribir)" value={form.team} onChange={e=>setForm({...form,team:e.target.value})} placeholder="Ej: U. LA PLATA"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <Input label="Goles" type="number" min={0} value={form.goals} onChange={e=>setForm({...form,goals:e.target.value})}/>
            <Input label="PJ" type="number" min={0} value={form.pj} onChange={e=>setForm({...form,pj:e.target.value})}/>
            <Input label="PC" type="number" min={0} value={form.pc} onChange={e=>setForm({...form,pc:e.target.value})}/>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setEditing(false)}>Cancelar</Btn><Btn onClick={submit}><Icon name="save" size={14}/> Guardar</Btn></div>
        </Modal>
      )}
      {importing&&(
        <Modal title="Importar tabla de goleadoras" onClose={closeImport} wide>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:12,marginBottom:12,fontSize:12,color:C.gray,lineHeight:1.5}}>
            <p style={{margin:"0 0 6px",color:C.white,fontWeight:700,fontSize:12,letterSpacing:0.5}}>FORMATO ACEPTADO</p>
            Pegá la tabla copiada de la AHC (o cualquier tabla con: <b style={{color:C.white}}>Pos · Nombre · Club · Goles · PJ · Prom</b>).<br/>
            Funciona tanto si está <b style={{color:C.white}}>una columna por línea</b> (formato vertical) como <b style={{color:C.white}}>tab/espacios</b> (una fila por línea).<br/>
            <span style={{color:C.red}}>⚠ Esto reemplaza toda la tabla actual.</span>
          </div>
          <Textarea label="Pegar acá" value={importText} onChange={e=>{setImportText(e.target.value);setImportPreview(null);setImportError("");}} placeholder={"1\nCarnevali, Oriana\nU. LA PLATA\n5\n8\n0.63\n2\n..."} style={{...inp,minHeight:160,fontFamily:"monospace",fontSize:12}}/>
          {importError&&<div style={{background:C.red+"22",border:`1px solid ${C.red}`,color:C.red,borderRadius:8,padding:10,fontSize:13,marginBottom:10}}>{importError}</div>}
          {importPreview&&(
            <div style={{background:C.green+"11",border:`1px solid ${C.green}44`,borderRadius:8,padding:12,marginBottom:12}}>
              <p style={{margin:"0 0 8px",color:C.green,fontWeight:700,fontSize:12,letterSpacing:0.5}}>✓ {importPreview.length} JUGADORAS DETECTADAS</p>
              <div style={{maxHeight:180,overflowY:"auto",fontSize:12,color:C.white}}>
                {importPreview.slice(0,8).map((s,i)=><div key={i} style={{padding:"4px 0",borderBottom:i<7?`1px solid ${C.border}`:"none"}}>{i+1}. <b>{s.name}</b> ({s.team}) — {s.goals}g · {s.pj}pj</div>)}
                {importPreview.length>8&&<div style={{padding:"6px 0 0",color:C.gray,fontStyle:"italic"}}>...y {importPreview.length-8} más</div>}
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
            <Btn outline onClick={closeImport}>Cancelar</Btn>
            {!importPreview&&<Btn color={C.purple} onClick={doPreview} disabled={!importText.trim()}><Icon name="eye" size={14}/> Previsualizar</Btn>}
            {importPreview&&<Btn color={C.green} onClick={doImport}><Icon name="save" size={14}/> Reemplazar tabla ({importPreview.length})</Btn>}
          </div>
        </Modal>
      )}
    </div>
  );
}
// ─── Parser de tablas pegadas (importador de goleadoras) ─────────────────
function parseScorersPaste(text){
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  if(lines.length===0) return [];
  const isInt = s => /^\d+$/.test(s);
  const isFloat = s => /^\d+([.,]\d+)?$/.test(s);
  const result = [];
  // Estrategia 1: una columna por línea (6 líneas = un registro: pos, nombre, club, goles, pj, prom)
  // También aceptamos sin promedio (5 líneas) o sin posición (5/4 líneas).
  // Primero probamos chunks de 6.
  const tryChunks = (size, hasPos, hasProm) => {
    if(lines.length % size !== 0) return null;
    const out = [];
    for(let i=0;i<lines.length;i+=size){
      const chunk = lines.slice(i,i+size);
      let idx = 0;
      if(hasPos){ if(!isInt(chunk[idx])) return null; idx++; }
      const name = chunk[idx++]; const team = chunk[idx++];
      const goals = chunk[idx++]; const pj = chunk[idx++];
      if(!name||!team||!isInt(goals)||!isInt(pj)) return null;
      if(hasProm){ if(!isFloat(chunk[idx])) return null; }
      out.push({name:name.trim(),team:team.trim(),goals:+goals,pj:+pj,pc:0});
    }
    return out;
  };
  const variants = [[6,true,true],[5,true,false],[5,false,true],[4,false,false]];
  for(const [s,p,pr] of variants){
    const r = tryChunks(s,p,pr);
    if(r && r.length>0) return r;
  }
  // Estrategia 2: una fila por línea, separada por tabs o múltiples espacios
  for(const line of lines){
    const cols = line.split(/\t+|\s{2,}/).map(c=>c.trim()).filter(Boolean);
    if(cols.length<3) continue;
    let i=0;
    if(isInt(cols[0]) && cols.length>=4) i=1; // saltar posición
    const name = cols[i++]; const team = cols[i++];
    const goals = cols[i++]; const pj = cols[i] || "0";
    if(!name||!team||!isInt(goals)) continue;
    result.push({name,team,goals:+goals,pj:isInt(pj)?+pj:0,pc:0});
  }
  return result;
}
// ═══════════════════════════════════════════════════════════════════════════════
// FIXTURE — Sync helpers + parser + view + match editor
// ═══════════════════════════════════════════════════════════════════════════════
const US_TEAM = "U. LA PLATA";

function parseFixturePaste(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const result = [];
  let current = null;
  let lastDate = "";
  for (const line of lines) {
    const fechaMatch = line.match(/^(fecha|jornada|f\.|fecha n[º°]?)\s*[:#\-]?\s*(\d+)/i);
    if (fechaMatch) {
      current = { id: Date.now()+Math.random(), label: `Fecha ${fechaMatch[2]}`, date: lastDate, matches: [] };
      result.push(current);
      continue;
    }
    const dateOnly = line.match(/^\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?$/);
    if (dateOnly) {
      lastDate = line;
      if (current) current.date = line;
      continue;
    }
    const vsMatch = line.match(/^(.+?)\s+(?:vs\.?|–|—|-|\bv\b)\s+(.+?)$/i);
    if (vsMatch) {
      if (!current) {
        current = { id: Date.now()+Math.random(), label: `Fecha ${result.length + 1}`, date: lastDate, matches: [] };
        result.push(current);
      }
      const home = vsMatch[1].replace(/^\d+[.\)\-:\s]+/, "").trim();
      const away = vsMatch[2].trim();
      current.matches.push({
        id: Date.now()+Math.random()+current.matches.length,
        home, away,
        played: false,
        golesLocal: 0, golesVisitante: 0,
        scorers: [], cards: [],
        applied: null
      });
    }
  }
  return result;
}

function syncStandings(standings, home, away, gl, gv, sign) {
  let s = [...standings];
  const findOrCreate = name => {
    let i = s.findIndex(t => t.name === name);
    if (i < 0) { s.push({ name, pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,pts:0,dif:0,isUs:name===US_TEAM }); i = s.length-1; }
    return i;
  };
  const hi = findOrCreate(home), ai = findOrCreate(away);
  const hWon = gl > gv, aWon = gv > gl, draw = gl === gv;
  s[hi] = { ...s[hi], pj: s[hi].pj+sign, pg: s[hi].pg+(hWon?sign:0), pe: s[hi].pe+(draw?sign:0), pp: s[hi].pp+(aWon?sign:0), gf: s[hi].gf+sign*gl, gc: s[hi].gc+sign*gv };
  s[ai] = { ...s[ai], pj: s[ai].pj+sign, pg: s[ai].pg+(aWon?sign:0), pe: s[ai].pe+(draw?sign:0), pp: s[ai].pp+(hWon?sign:0), gf: s[ai].gf+sign*gv, gc: s[ai].gc+sign*gl };
  s = s.map(t => ({ ...t, pts: t.pg*3+t.pe, dif: t.gf-t.gc }));
  return s.sort((a,b) => (b.pts-a.pts) || (b.dif-a.dif) || (b.gf-a.gf));
}

function syncScorers(scorers, scList, home, away, sign) {
  let s = [...scorers];
  for (const g of scList) {
    if (!g.nombre) continue;
    const team = g.equipo === "local" ? home : away;
    let i = s.findIndex(x => x.name.toLowerCase() === g.nombre.toLowerCase() && x.team === team);
    if (i < 0) {
      if (sign < 0) continue;
      s.push({ name: g.nombre, team, goals: 0, pc: 0 });
      i = s.length-1;
    }
    s[i] = { ...s[i], goals: s[i].goals+sign, pc: s[i].pc + (g.tipo==="pc" ? sign : 0) };
    if (s[i].goals <= 0) s.splice(i, 1);
  }
  return s.sort((a,b) => b.goals - a.goals);
}

function syncCards(cards, cdList, home, away, sign) {
  let c = [...cards];
  for (const t of cdList) {
    if (!t.nombre) continue;
    const team = t.equipo === "local" ? home : away;
    let i = c.findIndex(x => x.name.toLowerCase() === t.nombre.toLowerCase() && x.team === team);
    if (i < 0) {
      if (sign < 0) continue;
      c.push({ name: t.nombre, team, verde: 0, amarilla: 0, roja: 0 });
      i = c.length-1;
    }
    c[i] = { ...c[i], [t.tipo]: (c[i][t.tipo]||0) + sign };
    if ((c[i].verde||0)<=0 && (c[i].amarilla||0)<=0 && (c[i].roja||0)<=0) c.splice(i, 1);
  }
  return c.sort((a,b) => (b.roja*3+b.amarilla*2+b.verde) - (a.roja*3+a.amarilla*2+a.verde));
}

function MatchEditor({match, onSave, onClose}) {
  const [m, setM] = useState({...match, scorers:[...(match.scorers||[])], cards:[...(match.cards||[])]});
  const upd = (k, v) => setM(prev => ({...prev, [k]: v}));
  const addScorer = () => upd("scorers", [...m.scorers, {nombre:"", equipo:"local", tipo:"gol", minuto:""}]);
  const updScorer = (i, k, v) => upd("scorers", m.scorers.map((s,j)=>j===i?{...s,[k]:v}:s));
  const rmScorer = (i) => upd("scorers", m.scorers.filter((_,j)=>j!==i));
  const addCard = () => upd("cards", [...m.cards, {nombre:"", equipo:"local", tipo:"verde", minuto:""}]);
  const updCard = (i, k, v) => upd("cards", m.cards.map((s,j)=>j===i?{...s,[k]:v}:s));
  const rmCard = (i) => upd("cards", m.cards.filter((_,j)=>j!==i));
  return (
    <Modal title={`${m.home} vs ${m.away}`} onClose={onClose} wide>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"10px 12px",background:C.card2,borderRadius:8,border:`1px solid ${m.played?C.green+"55":C.border}`}}>
        <input type="checkbox" id="played" checked={m.played} onChange={e=>upd("played", e.target.checked)} style={{transform:"scale(1.3)",cursor:"pointer"}}/>
        <label htmlFor="played" style={{color:m.played?C.green:C.gray,fontWeight:700,fontFamily:FF,fontSize:13,letterSpacing:1,cursor:"pointer"}}>{m.played?"PARTIDO JUGADO":"MARCAR COMO JUGADO"}</label>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:12,alignItems:"end",marginBottom:18}}>
        <div>
          <p style={{margin:"0 0 4px",color:C.gray,fontSize:10,letterSpacing:0.8}}>LOCAL</p>
          <p style={{margin:0,color:C.white,fontWeight:700,fontFamily:FF,fontSize:14}}>{m.home}</p>
          <input type="number" min={0} value={m.golesLocal} onChange={e=>upd("golesLocal", +e.target.value)} disabled={!m.played} style={{...inp,fontSize:28,textAlign:"center",fontFamily:FF,marginTop:6,opacity:m.played?1:0.4}}/>
        </div>
        <span style={{color:C.gray,fontSize:18,fontFamily:FF,paddingBottom:14}}>—</span>
        <div>
          <p style={{margin:"0 0 4px",color:C.gray,fontSize:10,letterSpacing:0.8,textAlign:"right"}}>VISITANTE</p>
          <p style={{margin:0,color:C.white,fontWeight:700,fontFamily:FF,fontSize:14,textAlign:"right"}}>{m.away}</p>
          <input type="number" min={0} value={m.golesVisitante} onChange={e=>upd("golesVisitante", +e.target.value)} disabled={!m.played} style={{...inp,fontSize:28,textAlign:"center",fontFamily:FF,marginTop:6,opacity:m.played?1:0.4}}/>
        </div>
      </div>
      {m.played && (
        <>
          <SCard title="Goleadoras" color={C.accent} icon="trophy">
            {m.scorers.length===0 && <p style={{color:C.gray,fontSize:12,margin:"0 0 8px"}}>Sin goles cargados</p>}
            {m.scorers.map((g, i) => (
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px 70px 28px",gap:6,marginBottom:6,alignItems:"center"}}>
                <input style={inp} placeholder="Apellido, Nombre" value={g.nombre} onChange={e=>updScorer(i,"nombre",e.target.value)}/>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={g.equipo} onChange={e=>updScorer(i,"equipo",e.target.value)}>
                  <option value="local">{m.home}</option>
                  <option value="visitante">{m.away}</option>
                </select>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={g.tipo} onChange={e=>updScorer(i,"tipo",e.target.value)}>
                  <option value="gol">Gol</option>
                  <option value="pc">PC</option>
                </select>
                <button onClick={()=>rmScorer(i)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={14}/></button>
              </div>
            ))}
            <Btn small outline onClick={addScorer}><Icon name="plus" size={11}/> Agregar gol</Btn>
          </SCard>
          <SCard title="Tarjetas" color={C.gold} icon="flag">
            {m.cards.length===0 && <p style={{color:C.gray,fontSize:12,margin:"0 0 8px"}}>Sin tarjetas cargadas</p>}
            {m.cards.map((t, i) => (
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px 90px 28px",gap:6,marginBottom:6,alignItems:"center"}}>
                <input style={inp} placeholder="Apellido, Nombre" value={t.nombre} onChange={e=>updCard(i,"nombre",e.target.value)}/>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={t.equipo} onChange={e=>updCard(i,"equipo",e.target.value)}>
                  <option value="local">{m.home}</option>
                  <option value="visitante">{m.away}</option>
                </select>
                <select style={{...inp,cursor:"pointer",padding:"10px 6px"}} value={t.tipo} onChange={e=>updCard(i,"tipo",e.target.value)}>
                  <option value="verde">🟢 Verde</option>
                  <option value="amarilla">🟡 Amarilla</option>
                  <option value="roja">🔴 Roja</option>
                </select>
                <button onClick={()=>rmCard(i)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={14}/></button>
              </div>
            ))}
            <Btn small outline color={C.gold} onClick={addCard}><Icon name="plus" size={11}/> Agregar tarjeta</Btn>
          </SCard>
        </>
      )}
      <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:14,flexWrap:"wrap"}}>
        <Btn outline danger onClick={()=>{if(confirm("¿Eliminar este partido del fixture?")) onSave({...m, _delete:true});}}><Icon name="trash" size={13}/> Eliminar</Btn>
        <div style={{display:"flex",gap:8}}>
          <Btn outline onClick={onClose}>Cancelar</Btn>
          <Btn color={C.green} onClick={()=>onSave(m)}><Icon name="save" size={14}/> Guardar</Btn>
        </div>
      </div>
    </Modal>
  );
}

function FixtureView({fixture, setFixture, standings, setStandings, scorers, setScorers, cards, setCards, rivals, setRivals}) {
  const isAdmin = useIsAdmin();
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(null);
  const [newMatch, setNewMatch] = useState({home:"",away:""});
  const nextIdx = getNextFechaIndex(fixture);
  // Por defecto: colapsar todas las fechas EXCEPTO la próxima
  const [collapsed, setCollapsed] = useState(()=>{
    const init = {};
    fixture.forEach((f, i) => { if (i !== nextIdx) init[f.id] = true; });
    return init;
  });
  const fechaRefs = useRef({});
  const didScroll = useRef(false);
  // Hacer scroll automático a la próxima fecha al cargar (una sola vez)
  useEffect(() => {
    if (didScroll.current) return;
    if (nextIdx < 0 || !fixture[nextIdx]) return;
    const el = fechaRefs.current[fixture[nextIdx].id];
    if (el) {
      setTimeout(() => el.scrollIntoView({behavior:"smooth", block:"start"}), 150);
      didScroll.current = true;
    }
  }, [fixture, nextIdx]);

  const toggleCollapsed = id => setCollapsed(prev => ({...prev, [id]: !prev[id]}));
  const expandAll = () => setCollapsed({});
  const collapseAll = () => { const all = {}; fixture.forEach(f => all[f.id] = true); setCollapsed(all); };

  function applyPaste() {
    const parsed = parseFixturePaste(pasteText);
    if (parsed.length === 0) {
      alert("No se detectaron partidos. Probá con un formato como:\n\nFecha 1\nU. LA PLATA vs MACABI\nPUCARA vs BANFIELD");
      return;
    }
    const merged = [...fixture, ...parsed];
    setFixture(merged); save(KEYS.fixture, merged);
    setPasteText(""); setShowPaste(false);
  }

  function addFecha() {
    const f = { id: Date.now()+Math.random(), label: `Fecha ${fixture.length + 1}`, date: "", matches: [] };
    const updated = [...fixture, f];
    setFixture(updated); save(KEYS.fixture, updated);
  }

  function removeFecha(idx) {
    if (!confirm("¿Eliminar esta fecha completa? Se revertirán los resultados ya cargados.")) return;
    const f = fixture[idx];
    let s = standings, sc = scorers, cd = cards;
    for (const m of f.matches) {
      if (m.applied) {
        s = syncStandings(s, m.home, m.away, m.applied.golesLocal, m.applied.golesVisitante, -1);
        sc = syncScorers(sc, m.applied.scorers, m.home, m.away, -1);
        cd = syncCards(cd, m.applied.cards, m.home, m.away, -1);
      }
    }
    setStandings(s); save(KEYS.standings, s);
    setScorers(sc); save(KEYS.scorers, sc);
    setCards(cd); save(KEYS.cards, cd);
    const updated = fixture.filter((_,i)=>i!==idx);
    setFixture(updated); save(KEYS.fixture, updated);
  }

  function addMatchToFecha(fechaIdx) {
    if (!newMatch.home.trim() || !newMatch.away.trim()) return;
    const updated = fixture.map((f,i) => i===fechaIdx ? {
      ...f,
      matches: [...f.matches, {
        id: Date.now()+Math.random(),
        home: newMatch.home.trim(), away: newMatch.away.trim(),
        played: false, golesLocal: 0, golesVisitante: 0,
        scorers: [], cards: [], applied: null
      }]
    } : f);
    setFixture(updated); save(KEYS.fixture, updated);
    setNewMatch({home:"",away:""}); setShowAdd(null);
  }

  function saveMatch(fechaIdx, matchIdx, updated) {
    const original = fixture[fechaIdx].matches[matchIdx];
    const wasApplied = original.applied;
    let s = standings, sc = scorers, cd = cards;

    if (updated._delete) {
      if (wasApplied) {
        s = syncStandings(s, original.home, original.away, wasApplied.golesLocal, wasApplied.golesVisitante, -1);
        sc = syncScorers(sc, wasApplied.scorers, original.home, original.away, -1);
        cd = syncCards(cd, wasApplied.cards, original.home, original.away, -1);
        setStandings(s); save(KEYS.standings, s);
        setScorers(sc); save(KEYS.scorers, sc);
        setCards(cd); save(KEYS.cards, cd);
      }
      const updatedRivals = rivals.map(r => ({...r, matches: (r.matches||[]).filter(x => x.fixtureRef !== original.id)}));
      setRivals(updatedRivals); save(KEYS.rivals, updatedRivals);
      const newFix = fixture.map((f,i) => i===fechaIdx ? {...f, matches: f.matches.filter((_,j)=>j!==matchIdx)} : f);
      setFixture(newFix); save(KEYS.fixture, newFix);
      setEditing(null);
      return;
    }

    if (wasApplied) {
      s = syncStandings(s, original.home, original.away, wasApplied.golesLocal, wasApplied.golesVisitante, -1);
      sc = syncScorers(sc, wasApplied.scorers, original.home, original.away, -1);
      cd = syncCards(cd, wasApplied.cards, original.home, original.away, -1);
    }

    let newApplied = null;
    if (updated.played) {
      s = syncStandings(s, updated.home, updated.away, +updated.golesLocal, +updated.golesVisitante, +1);
      sc = syncScorers(sc, updated.scorers, updated.home, updated.away, +1);
      cd = syncCards(cd, updated.cards, updated.home, updated.away, +1);
      newApplied = {
        golesLocal: +updated.golesLocal, golesVisitante: +updated.golesVisitante,
        scorers: updated.scorers.map(g=>({...g})),
        cards: updated.cards.map(t=>({...t}))
      };
    }

    const finalMatch = { ...updated, applied: newApplied };
    delete finalMatch._delete;

    setStandings(s); save(KEYS.standings, s);
    setScorers(sc); save(KEYS.scorers, sc);
    setCards(cd); save(KEYS.cards, cd);

    // Sincronizar historial de rivales (si home o away coincide con un rival cargado)
    let updatedRivals = rivals;
    const homeRival = rivals.find(r => r.name.toLowerCase() === updated.home.toLowerCase());
    const awayRival = rivals.find(r => r.name.toLowerCase() === updated.away.toLowerCase());

    function buildRivalMatch(isHome) {
      const rivalSide = isHome ? "local" : "visitante";
      return {
        date: fixture[fechaIdx].date || new Date().toISOString().split("T")[0],
        goalsFor: isHome ? +updated.golesVisitante : +updated.golesLocal,
        goalsAgainst: isHome ? +updated.golesLocal : +updated.golesVisitante,
        pcAgainst: updated.scorers.filter(g => g.equipo === rivalSide && g.tipo === "pc").length,
        scorers: updated.scorers.map(g => ({...g, equipo: g.equipo === rivalSide ? "visitante" : "local"})),
        cards: updated.cards.filter(t => t.equipo === rivalSide).map(t => ({...t})),
        notes: `Cargado desde Fixture · ${fixture[fechaIdx].label}`,
        fixtureRef: original.id
      };
    }

    if (updated.played) {
      if (homeRival) {
        const rm = buildRivalMatch(true);
        const filtered = (homeRival.matches||[]).filter(x => x.fixtureRef !== original.id);
        updatedRivals = updatedRivals.map(r => r.id === homeRival.id ? {...r, matches: [...filtered, rm]} : r);
      }
      if (awayRival) {
        const rm = buildRivalMatch(false);
        const filtered = (awayRival.matches||[]).filter(x => x.fixtureRef !== original.id);
        updatedRivals = updatedRivals.map(r => r.id === awayRival.id ? {...r, matches: [...filtered, rm]} : r);
      }
    } else {
      updatedRivals = updatedRivals.map(r => ({...r, matches: (r.matches||[]).filter(x => x.fixtureRef !== original.id)}));
    }

    if (updatedRivals !== rivals) {
      setRivals(updatedRivals); save(KEYS.rivals, updatedRivals);
    }

    const newFix = fixture.map((f,i) => i===fechaIdx ? {...f, matches: f.matches.map((mm,j)=>j===matchIdx?finalMatch:mm)} : f);
    setFixture(newFix); save(KEYS.fixture, newFix);
    setEditing(null);
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>FIXTURE</h2>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {fixture.length>1 && <>
            <Btn small outline onClick={expandAll}><Icon name="chevron" size={12}/> Expandir todo</Btn>
            <Btn small outline onClick={collapseAll}>Colapsar todo</Btn>
          </>}
          {isAdmin && <>
            <Btn small color={C.purple} onClick={()=>setShowPaste(true)}><Icon name="upload" size={12}/> Pegar fixture</Btn>
            <Btn small outline onClick={addFecha}><Icon name="plus" size={12}/> Nueva fecha</Btn>
          </>}
        </div>
      </div>
      {fixture.length === 0 && (
        <div style={{textAlign:"center",padding:"48px 20px",background:C.card,border:`1px dashed ${C.border}`,borderRadius:12}}>
          <Icon name="calendar" size={40} color={C.border}/>
          <p style={{color:C.gray,margin:"14px 0 4px",fontFamily:FF,letterSpacing:1}}>NO HAY FIXTURE CARGADO</p>
          <p style={{color:C.gray,fontSize:12,margin:"0 0 14px"}}>{isAdmin ? "Pegá los partidos del torneo o agregá fechas manualmente" : "Iniciá sesión como staff para cargar el fixture"}</p>
          {isAdmin && <Btn color={C.purple} onClick={()=>setShowPaste(true)}><Icon name="upload" size={14}/> Pegar fixture</Btn>}
        </div>
      )}
      {fixture.map((f, fi) => {
        const total = f.matches.length;
        const played = f.matches.filter(m=>m.played).length;
        const isCollapsed = collapsed[f.id];
        const isNext = fi === nextIdx;
        return (
          <div key={f.id} ref={el => { if(el) fechaRefs.current[f.id] = el; }} style={{background:C.card,border:`1px solid ${isNext?C.gold+"66":C.border}`,borderRadius:12,marginBottom:12,overflow:"hidden",boxShadow:isNext?`0 0 0 1px ${C.gold}33`:"none",scrollMarginTop:70}}>
            <div onClick={()=>toggleCollapsed(f.id)} style={{padding:"12px 14px",background:C.card2,borderBottom:isCollapsed?"none":`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <span style={{color:isNext?C.gold:C.accent,fontFamily:FF,fontWeight:700,fontSize:16,letterSpacing:1}}>{f.label.toUpperCase()}</span>
                {isNext && <Badge text="PRÓXIMA" color={C.gold}/>}
                {f.date && <span style={{color:C.gray,fontSize:11}}>{f.date}</span>}
                <Badge text={`${played}/${total}`} color={played===total&&total>0?C.green:C.accent}/>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {isAdmin && <button title="Agregar partido" onClick={e=>{e.stopPropagation(); setShowAdd(showAdd===fi?null:fi); setCollapsed(prev=>({...prev,[f.id]:false}));}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer",padding:4}}><Icon name="plus" size={14}/></button>}
                {isAdmin && <button title="Eliminar fecha" onClick={e=>{e.stopPropagation(); removeFecha(fi);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer",padding:4}}><Icon name="trash" size={13}/></button>}
                <span style={{color:C.gray,fontSize:11,transform:isCollapsed?"rotate(-90deg)":"none",transition:"transform 0.15s",display:"inline-block"}}><Icon name="chevron" size={14}/></span>
              </div>
            </div>
            {!isCollapsed && (
              <div style={{padding:"8px 12px"}}>
                {f.matches.length === 0 && showAdd !== fi && <p style={{color:C.gray,fontSize:12,textAlign:"center",padding:"14px 0"}}>Sin partidos en esta fecha</p>}
                {f.matches.map((m, mi) => {
                  const isUs = m.home === US_TEAM || m.away === US_TEAM;
                  const winner = m.played ? (m.golesLocal > m.golesVisitante ? "home" : m.golesLocal < m.golesVisitante ? "away" : "draw") : null;
                  return (
                    <div key={m.id} onClick={()=>{ if(isAdmin) setEditing({fechaIdx:fi, matchIdx:mi, match:m}); }} style={{background:isUs?C.accent+"11":C.card2,border:`1px solid ${isUs?C.accent+"44":C.border}`,borderRadius:8,padding:"10px 12px",marginBottom:6,cursor:isAdmin?"pointer":"default"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 80px 1fr",alignItems:"center",gap:8}}>
                        <div style={{textAlign:"right",color:winner==="home"?C.green:C.white,fontWeight:m.home===US_TEAM?700:500,fontSize:13}}>
                          {m.home===US_TEAM&&"🔵 "}{m.home}
                        </div>
                        <div style={{textAlign:"center",fontFamily:FF,fontWeight:700}}>
                          {m.played ? (
                            <span style={{color:C.white,fontSize:18}}>{m.golesLocal} <span style={{color:C.gray,fontSize:13}}>—</span> {m.golesVisitante}</span>
                          ) : (
                            <span style={{color:C.gray,fontSize:11,letterSpacing:1,padding:"3px 8px",border:`1px solid ${C.border}`,borderRadius:6}}>VS</span>
                          )}
                        </div>
                        <div style={{color:winner==="away"?C.green:C.white,fontWeight:m.away===US_TEAM?700:500,fontSize:13}}>
                          {m.away===US_TEAM&&"🔵 "}{m.away}
                        </div>
                      </div>
                      {m.played && (m.scorers.length>0 || m.cards.length>0) && (
                        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8,paddingTop:8,borderTop:`1px dashed ${C.border}`}}>
                          {m.scorers.map((g,i)=><Badge key={"g"+i} text={`⚽ ${g.nombre}${g.tipo==="pc"?" (PC)":""}`} color={C.accent}/>)}
                          {m.cards.map((t,i)=>{const tc=t.tipo==="verde"?C.green:t.tipo==="amarilla"?C.gold:C.red; const em=t.tipo==="verde"?"🟢":t.tipo==="amarilla"?"🟡":"🔴"; return <Badge key={"c"+i} text={`${em} ${t.nombre}`} color={tc}/>;})}
                        </div>
                      )}
                    </div>
                  );
                })}
                {showAdd === fi && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 30px 1fr 50px",gap:6,padding:"8px 0",alignItems:"center"}}>
                    <input style={inp} placeholder="Local" value={newMatch.home} onChange={e=>setNewMatch(n=>({...n,home:e.target.value}))}/>
                    <span style={{color:C.gray,textAlign:"center",fontSize:11}}>vs</span>
                    <input style={inp} placeholder="Visitante" value={newMatch.away} onChange={e=>setNewMatch(n=>({...n,away:e.target.value}))}/>
                    <Btn small onClick={()=>addMatchToFecha(fi)}><Icon name="check" size={11}/></Btn>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {showPaste && (
        <Modal title="Pegar fixture" onClose={()=>setShowPaste(false)} wide>
          <p style={{color:C.gray,fontSize:12,margin:"0 0 10px"}}>
            Pegá la lista de partidos. Reconoce <span style={{color:C.accent}}>"Fecha 1"</span> o <span style={{color:C.accent}}>"Jornada 3"</span> como encabezados, y partidos con <span style={{color:C.accent}}>"Equipo A vs Equipo B"</span>.
          </p>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:10,marginBottom:10,fontSize:11,color:C.gray,fontFamily:"monospace",whiteSpace:"pre-line"}}>
{`Fecha 1
U. LA PLATA vs MACABI
PUCARA vs BANFIELD
C.A.S.I. vs LANUS

Fecha 2
MACABI vs PUCARA
...`}
          </div>
          <textarea style={{...inp,minHeight:200,fontFamily:"monospace",fontSize:12}} value={pasteText} onChange={e=>setPasteText(e.target.value)} placeholder="Pegá acá el fixture..."/>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:10}}>
            <Btn outline onClick={()=>setShowPaste(false)}>Cancelar</Btn>
            <Btn color={C.purple} onClick={applyPaste}><Icon name="check" size={14}/> Importar</Btn>
          </div>
        </Modal>
      )}
      {editing && <MatchEditor match={editing.match} onSave={(m)=>saveMatch(editing.fechaIdx, editing.matchIdx, m)} onClose={()=>setEditing(null)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARDS VIEW
// ═══════════════════════════════════════════════════════════════════════════════
function CardsView({cards, setCards}) {
  const isAdmin = useIsAdmin();
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(null);
  const [editIdx,setEditIdx]=useState(null);
  const [filter,setFilter]=useState("");
  const [teamFilter,setTeamFilter]=useState("");
  const [typeFilter,setTypeFilter]=useState("");
  const teams=[...new Set(cards.map(c=>c.team))].sort();
  const filtered=cards.filter(c=>{
    const matchName=!filter||c.name.toLowerCase().includes(filter.toLowerCase());
    const matchTeam=!teamFilter||c.team===teamFilter;
    const matchType=!typeFilter||(c[typeFilter]||0)>0;
    return matchName&&matchTeam&&matchType;
  });
  const submit=()=>{
    const entry={...form,verde:+form.verde,amarilla:+form.amarilla,roja:+form.roja};
    const c=editIdx!==null?cards.map((x,i)=>i===editIdx?entry:x):[...cards,entry];
    const sorted=[...c].sort((a,b)=>(b.roja*3+b.amarilla*2+b.verde)-(a.roja*3+a.amarilla*2+a.verde));
    setCards(sorted);save(KEYS.cards,sorted);setEditing(false);
  };
  const totalsByTeam = teams.map(team => {
    const list = cards.filter(c => c.team === team);
    return {
      team,
      verde: list.reduce((a,c)=>a+(c.verde||0),0),
      amarilla: list.reduce((a,c)=>a+(c.amarilla||0),0),
      roja: list.reduce((a,c)=>a+(c.roja||0),0)
    };
  }).sort((a,b)=>(b.roja*3+b.amarilla*2+b.verde)-(a.roja*3+a.amarilla*2+a.verde));
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>TARJETAS</h2>
        {isAdmin && <Btn small onClick={()=>{setForm({name:"",team:"",verde:0,amarilla:0,roja:0});setEditIdx(null);setEditing(true);}}><Icon name="plus" size={14}/> Agregar</Btn>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 110px",gap:8,marginBottom:14}}>
        <input style={inp} placeholder="Buscar jugadora..." value={filter} onChange={e=>setFilter(e.target.value)}/>
        <select style={{...inp,cursor:"pointer"}} value={teamFilter} onChange={e=>setTeamFilter(e.target.value)}>
          <option value="">Todos los equipos</option>
          {teams.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
        <select style={{...inp,cursor:"pointer"}} value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
          <option value="">Todas</option>
          <option value="verde">🟢 Verde</option>
          <option value="amarilla">🟡 Amarilla</option>
          <option value="roja">🔴 Roja</option>
        </select>
      </div>
      <div style={{fontSize:12,color:C.gray,marginBottom:10}}>
        {cards.length} jugadoras · 🟢 {cards.reduce((a,c)=>a+(c.verde||0),0)} · 🟡 {cards.reduce((a,c)=>a+(c.amarilla||0),0)} · 🔴 {cards.reduce((a,c)=>a+(c.roja||0),0)}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:C.gold,color:C.bg}}>{(isAdmin?["#","JUGADORA","CLUB","🟢","🟡","🔴",""]:["#","JUGADORA","CLUB","🟢","🟡","🔴"]).map(h=><th key={h} style={{padding:"10px 8px",textAlign:["JUGADORA","CLUB"].includes(h)?"left":"center",fontFamily:FF,fontWeight:700}}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={isAdmin?7:6} style={{textAlign:"center",padding:32,color:C.gray}}>Sin tarjetas registradas</td></tr>}
            {filtered.map((c,i)=>{
              const realRank=cards.findIndex(x=>x.name===c.name&&x.team===c.team);
              return(
                <tr key={i} style={{background:c.team===US_TEAM?C.accent+"11":i%2===0?C.card:C.card2,borderBottom:`1px solid ${C.border}`}}>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.gray,fontWeight:700}}>{realRank+1}</td>
                  <td style={{padding:"10px 8px",color:c.team===US_TEAM?C.accent:C.white,fontWeight:c.team===US_TEAM?700:400}}>{c.team===US_TEAM&&"🔵 "}{c.name}</td>
                  <td style={{padding:"10px 8px",color:C.gray}}>{c.team}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.green,fontWeight:700}}>{c.verde||"—"}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.gold,fontWeight:700}}>{c.amarilla||"—"}</td>
                  <td style={{textAlign:"center",padding:"10px 8px",color:C.red,fontWeight:700}}>{c.roja||"—"}</td>
                  {isAdmin && <td style={{textAlign:"center"}}>
                    <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                      <button onClick={()=>{setForm({...c});setEditIdx(realRank);setEditing(true);}} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="edit" size={13}/></button>
                      <button onClick={()=>{const c2=cards.filter((_,j)=>j!==realRank);setCards(c2);save(KEYS.cards,c2);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={13}/></button>
                    </div>
                  </td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalsByTeam.length>0 && (
        <div style={{marginTop:18}}>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>POR EQUIPO</p>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
            {totalsByTeam.map((t,i)=>(
              <div key={t.team} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:i<totalsByTeam.length-1?`1px solid ${C.border}`:"none",background:t.team===US_TEAM?C.accent+"11":"transparent"}}>
                <span style={{flex:1,color:t.team===US_TEAM?C.accent:C.white,fontWeight:t.team===US_TEAM?700:500}}>{t.team===US_TEAM&&"🔵 "}{t.team}</span>
                <span style={{color:C.green,fontWeight:700,minWidth:36,textAlign:"right"}}>🟢 {t.verde}</span>
                <span style={{color:C.gold,fontWeight:700,minWidth:36,textAlign:"right"}}>🟡 {t.amarilla}</span>
                <span style={{color:C.red,fontWeight:700,minWidth:36,textAlign:"right"}}>🔴 {t.roja}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {editing&&(
        <Modal title={editIdx!==null?"Editar tarjetas":"Agregar tarjetas"} onClose={()=>setEditing(false)}>
          <Input label="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <Input label="Club" value={form.team} onChange={e=>setForm({...form,team:e.target.value})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            <Input label="🟢 Verdes" type="number" min={0} value={form.verde} onChange={e=>setForm({...form,verde:e.target.value})}/>
            <Input label="🟡 Amarillas" type="number" min={0} value={form.amarilla} onChange={e=>setForm({...form,amarilla:e.target.value})}/>
            <Input label="🔴 Rojas" type="number" min={0} value={form.roja} onChange={e=>setForm({...form,roja:e.target.value})}/>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setEditing(false)}>Cancelar</Btn><Btn onClick={submit}><Icon name="save" size={14}/> Guardar</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RIVAL FORM
// ═══════════════════════════════════════════════════════════════════════════════
function RivalForm({rival,onSave,onCancel,onUpdateScorers}) {
  const emptyA={city:"",colors:"",coach:"",assistant:"",physio:"",goalkeeperCoach:"",goalkeeper:"",captain:"",keyPlayers:"",injuries:"",formation:"",offensiveStructure:"",attackDisposition:"",attackNotes:"",exitType:"",exitKeyPlayer:"",exitSide:"",pressureApplied:"",arrivalZones:"",shooters:"",goalPlays:"",goalsLastMatch:"",pcOffVariants:"",pcOffExecutor:"",pcOffShooter:"",pcOffSecond:"",pressType:"",pressZone:"",pressIntensity:"",pressTriggers:"",blockType:"",defensiveLine:"",zoneStructure:"",vulnerableIn:"",marksSystem:"",whoMarksUs:"",dangerZones:"",transition:"",pcDefSystem:"",pcDefExit:"",pcDefRunner:"",pcDefGK:"",strengths:"",weaknesses:"",planBall:"",planNoBall:"",planPCOff:"",planPCDef:""};
  const [name,setName]=useState(rival?.name||"");
  const [date,setDate]=useState(rival?.date||"");
  const [round,setRound]=useState(rival?.round||"");
  const [tab,setTab]=useState("perfil");
  const [analysis,setAnalysis]=useState(rival?{...emptyA,...rival.analysis}:emptyA);
  const [matches,setMatches]=useState(rival?.matches||[]);
  const [videos,setVideos]=useState(rival?.videos||[]);
  const [newVideo,setNewVideo]=useState({title:"",category:VIDEO_CATEGORIES[0],url:""});
  const [showScan,setShowScan]=useState(false);
  const [toast,setToast]=useState(null);
  const [newMatch,setNewMatch]=useState({date:"",goalsFor:0,goalsAgainst:0,pcFor:0,pcAgainst:0,notes:""});
  const [showManual,setShowManual]=useState(false);
  const upd=k=>e=>setAnalysis(a=>({...a,[k]:e.target.value}));
  function applyPlanilla(data) {
    const culpIsLocal=data.equipoLocal?.toLowerCase().includes("univer")||data.equipoLocal?.toLowerCase().includes("culp");
    const gf=culpIsLocal?data.golesLocal:data.golesVisitante;
    const gc=culpIsLocal?data.golesVisitante:data.golesLocal;
    const match={date:data.fecha||new Date().toISOString().split("T")[0],goalsFor:gf??0,goalsAgainst:gc??0,pcFor:culpIsLocal?data.cornersLocal:data.cornersVisitante,pcAgainst:culpIsLocal?data.cornersVisitante:data.cornersLocal,scorers:data.goleadoras||[],cards:data.tarjetas||[],jugadoras:culpIsLocal?data.jugadorasVisitante:data.jugadorasLocal,notes:data.notas||""};
    setMatches(ms=>[...ms,match]);
    if(!name) setName(culpIsLocal?(data.equipoVisitante||""):(data.equipoLocal||""));
    const rivalScorers=(data.goleadoras||[]).filter(g=>g.equipo===(culpIsLocal?"visitante":"local")).map(g=>g.nombre).filter(Boolean);
    if(rivalScorers.length>0) setAnalysis(a=>({...a,shooters:[...new Set([...(a.shooters?a.shooters.split(", "):[]),...rivalScorers])].join(", ")}));
    if(onUpdateScorers) onUpdateScorers((data.goleadoras||[]).filter(g=>g.equipo===(culpIsLocal?"visitante":"local")),culpIsLocal?data.equipoVisitante:data.equipoLocal);
    setToast(`✅ Partido cargado: CULP ${gf??0}—${gc??0} · ${data.goleadoras?.length||0} goles · ${data.tarjetas?.length||0} tarjetas`);
    setTimeout(()=>setToast(null),5000);
  }
  const tabs=[{id:"perfil",label:"Perfil",icon:"shield"},{id:"conpelota",label:"Con pelota",icon:"target"},{id:"sinpelota",label:"Sin pelota",icon:"flag"},{id:"corners",label:"Corners",icon:"corner"},{id:"partidos",label:`Partidos (${matches.length})`,icon:"chart"},{id:"videos",label:`Videos (${videos.length})`,icon:"image"},{id:"conclusion",label:"Conclusión",icon:"star"}];
  const tabBtn=id=>({padding:"7px 11px",border:"none",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:FF,letterSpacing:0.5,background:tab===id?C.accent:"transparent",color:tab===id?C.bg:C.gray,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"});
  return(
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <button onClick={onCancel} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="back" size={20}/></button>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:20,letterSpacing:1,flex:1,minWidth:0}}>{rival?`EDITAR: ${rival.name.toUpperCase()}`:"NUEVO ANÁLISIS"}</h2>
        <Btn small color={C.purple} onClick={()=>setShowScan(true)}><Icon name="file" size={13}/> Importar planilla</Btn>
      </div>
      {toast&&<div style={{background:C.green+"18",border:`1px solid ${C.green}44`,borderRadius:8,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}><Icon name="check" size={14} color={C.green}/><span style={{color:C.green,fontSize:13}}>{toast}</span></div>}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8,marginBottom:14}}>
        <Input label="Nombre del rival" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej: San Fernando"/>
        <Input label="Próximo partido" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
        <Input label="Ronda" value={round} onChange={e=>setRound(e.target.value)} placeholder="Ej: Fecha 5"/>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:14,background:C.card,padding:6,borderRadius:10,overflowX:"auto"}}>
        {tabs.map(t=><button key={t.id} style={tabBtn(t.id)} onClick={()=>setTab(t.id)}><Icon name={t.icon} size={12}/>{t.label}</button>)}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
        {tab==="perfil"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>DATOS DEL CLUB</p>
              <Input label="Ciudad" value={analysis.city} onChange={upd("city")}/>
              <Input label="Colores" value={analysis.colors} onChange={upd("colors")}/>
              <Input label="DT Principal" value={analysis.coach} onChange={upd("coach")}/>
              <Input label="Asistente" value={analysis.assistant} onChange={upd("assistant")}/>
              <Input label="Prep. Física" value={analysis.physio} onChange={upd("physio")}/>
            </div>
            <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PLANTEL</p>
              <Input label="Arquera titular" value={analysis.goalkeeper} onChange={upd("goalkeeper")}/>
              <Input label="Capitana" value={analysis.captain} onChange={upd("captain")}/>
              <Textarea label="Jugadoras clave" value={analysis.keyPlayers} onChange={upd("keyPlayers")}/>
              <Input label="Bajas / Lesionadas" value={analysis.injuries} onChange={upd("injuries")}/>
            </div>
          </div>
        )}
        {tab==="conpelota"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>SISTEMA / FORMACIÓN</p>
                <Input label="Formación base" value={analysis.formation} onChange={upd("formation")} placeholder="Ej: 4-3-3"/>
                <Input label="Estructura ofensiva" value={analysis.offensiveStructure} onChange={upd("offensiveStructure")}/>
                <Textarea label="Notas generales" value={analysis.attackNotes} onChange={upd("attackNotes")}/>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
                <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>SALIDA DESDE EL FONDO</p>
                <Input label="Tipo de salida" value={analysis.exitType} onChange={upd("exitType")}/>
                <Input label="Jugadora clave" value={analysis.exitKeyPlayer} onChange={upd("exitKeyPlayer")}/>
                <Select label="Lado predominante" value={analysis.exitSide} onChange={upd("exitSide")} options={["","Derecho","Izquierdo","Central","Variable"]}/>
                <Input label="Presión aplicada" value={analysis.pressureApplied} onChange={upd("pressureApplied")}/>
              </div>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>LLEGADAS Y REMATES</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div><Input label="Zonas de llegada" value={analysis.arrivalZones} onChange={upd("arrivalZones")}/><Input label="Rematadoras" value={analysis.shooters} onChange={upd("shooters")}/></div>
                <div><Textarea label="Jugadas de gol frecuentes" value={analysis.goalPlays} onChange={upd("goalPlays")}/><Input label="Goles último partido" type="number" value={analysis.goalsLastMatch} onChange={upd("goalsLastMatch")}/></div>
              </div>
            </div>
          </div>
        )}
        {tab==="sinpelota"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PRESSING</p>
                <Input label="Tipo de presión" value={analysis.pressType} onChange={upd("pressType")}/>
                <Select label="Intensidad" value={analysis.pressIntensity} onChange={upd("pressIntensity")} options={["","Alta","Media","Baja","Variable"]}/>
                <Input label="Zona de inicio" value={analysis.pressZone} onChange={upd("pressZone")}/>
                <Input label="Triggers" value={analysis.pressTriggers} onChange={upd("pressTriggers")}/>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
                <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>BLOQUE DEFENSIVO</p>
                <Select label="Tipo de bloque" value={analysis.blockType} onChange={upd("blockType")} options={["","Bloque alto","Bloque medio","Bloque bajo"]}/>
                <Input label="Línea defensiva" value={analysis.defensiveLine} onChange={upd("defensiveLine")}/>
                <Input label="Vulnerable en" value={analysis.vulnerableIn} onChange={upd("vulnerableIn")}/>
                <Select label="Sistema de marcas" value={analysis.marksSystem} onChange={upd("marksSystem")} options={["","Individual","Zonal","Mixto"]}/>
              </div>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:12,paddingTop:12}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>MARCAS Y TRANSICIONES</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div><Input label="Quién nos marca" value={analysis.whoMarksUs} onChange={upd("whoMarksUs")}/><Input label="Zonas de peligro" value={analysis.dangerZones} onChange={upd("dangerZones")}/></div>
                <div><Textarea label="Transición def→ataque" value={analysis.transition} onChange={upd("transition")}/></div>
              </div>
            </div>
          </div>
        )}
        {tab==="corners"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PC OFENSIVOS (RIVAL)</p>
              <Textarea label="Variantes de PC" value={analysis.pcOffVariants} onChange={upd("pcOffVariants")}/>
              <Input label="Ejecutora" value={analysis.pcOffExecutor} onChange={upd("pcOffExecutor")}/>
              <Input label="Rematadora" value={analysis.pcOffShooter} onChange={upd("pcOffShooter")}/>
              <Input label="Jugadora 2do palo" value={analysis.pcOffSecond} onChange={upd("pcOffSecond")}/>
            </div>
            <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:16}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>NUESTRA DEFENSA DE PC</p>
              <Input label="Formación defensiva" value={analysis.pcDefSystem} onChange={upd("pcDefSystem")}/>
              <Input label="Primera salida" value={analysis.pcDefExit} onChange={upd("pcDefExit")}/>
              <Input label="Runner principal" value={analysis.pcDefRunner} onChange={upd("pcDefRunner")}/>
              <Input label="Posición arquera" value={analysis.pcDefGK} onChange={upd("pcDefGK")}/>
            </div>
          </div>
        )}
        {tab==="partidos"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <p style={{color:C.gray,fontSize:12,margin:0}}>Historial contra este rival</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <Btn small color={C.purple} onClick={()=>setShowScan(true)}><Icon name="file" size={12}/> Importar PDF/Foto</Btn>
                <Btn small outline onClick={()=>setShowManual(true)}><Icon name="plus" size={12}/> Manual</Btn>
              </div>
            </div>
            {matches.length===0&&!showManual&&(
              <div style={{textAlign:"center",padding:"32px 20px"}}>
                <Icon name="image" size={36} color={C.border}/>
                <p style={{color:C.gray,margin:"12px 0 16px"}}>No hay partidos registrados</p>
                <Btn small color={C.purple} onClick={()=>setShowScan(true)}><Icon name="file" size={12}/> Importar planilla</Btn>
              </div>
            )}
            {matches.map((m,i)=>{
              const gf=+m.goalsFor,gc=+m.goalsAgainst;
              const res=gf>gc?"W":gf===gc?"E":"L";const rc=res==="W"?C.green:res==="E"?C.gold:C.red;
              return(
                <div key={i} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:14,marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                        <Badge text={res==="W"?"GANADO":res==="E"?"EMPATE":"PERDIDO"} color={rc}/>
                        <span style={{color:C.gray,fontSize:12}}>{m.date}</span>
                        {m.pcAgainst>0&&<span style={{color:C.gray,fontSize:11}}>PC rival: {m.pcAgainst}</span>}
                      </div>
                      <span style={{color:C.white,fontSize:16,fontWeight:700,fontFamily:FF}}>CULP {gf} — {gc} {name}</span>
                      {m.scorers?.filter(g=>g.equipo==="visitante").length>0&&(
                        <div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:4}}>
                          {m.scorers.filter(g=>g.equipo==="visitante").map((g,j)=><Badge key={j} text={`⚽ ${g.nombre}${g.minuto?` ${g.minuto}'`:""}${g.tipo==="pc"?" (PC)":""}`} color={C.red}/>)}
                        </div>
                      )}
                      {m.cards?.length>0&&(
                        <div style={{marginTop:4,display:"flex",flexWrap:"wrap",gap:4}}>
                          {m.cards.map((t,j)=>{const tc=t.tipo==="verde"?C.green:t.tipo==="amarilla"?C.gold:C.red;return<Badge key={j} text={`${t.tipo==="verde"?"🟢":t.tipo==="amarilla"?"🟡":"🔴"} ${t.nombre}`} color={tc}/>;})}
                        </div>
                      )}
                      {m.notes&&<p style={{color:C.gray,fontSize:12,margin:"6px 0 0"}}>{m.notes}</p>}
                    </div>
                    <button onClick={()=>setMatches(ms=>ms.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Icon name="trash" size={14}/></button>
                  </div>
                </div>
              );
            })}
            {showManual&&(
              <div style={{background:C.card2,border:`1px solid ${C.accent}44`,borderRadius:10,padding:16,marginTop:8}}>
                <p style={{color:C.accent,fontSize:11,margin:"0 0 12px",fontWeight:700,letterSpacing:0.8}}>PARTIDO MANUAL</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
                  <Input label="Fecha" type="date" value={newMatch.date} onChange={e=>setNewMatch(m=>({...m,date:e.target.value}))}/>
                  <Input label="Goles CULP" type="number" min={0} value={newMatch.goalsFor} onChange={e=>setNewMatch(m=>({...m,goalsFor:e.target.value}))}/>
                  <Input label={`Goles ${name||"rival"}`} type="number" min={0} value={newMatch.goalsAgainst} onChange={e=>setNewMatch(m=>({...m,goalsAgainst:e.target.value}))}/>
                  <Input label="PC rival" type="number" min={0} value={newMatch.pcAgainst} onChange={e=>setNewMatch(m=>({...m,pcAgainst:e.target.value}))}/>
                </div>
                <Textarea label="Notas" value={newMatch.notes} onChange={e=>setNewMatch(m=>({...m,notes:e.target.value}))}/>
                <div style={{display:"flex",gap:8}}>
                  <Btn small onClick={()=>{setMatches(ms=>[...ms,{...newMatch,goalsFor:+newMatch.goalsFor,goalsAgainst:+newMatch.goalsAgainst,pcAgainst:+newMatch.pcAgainst,scorers:[],cards:[]}]);setNewMatch({date:"",goalsFor:0,goalsAgainst:0,pcFor:0,pcAgainst:0,notes:""});setShowManual(false);}}><Icon name="check" size={12}/> Guardar</Btn>
                  <Btn small outline onClick={()=>setShowManual(false)}>Cancelar</Btn>
                </div>
              </div>
            )}
            {matches.length>0&&(
              <div style={{marginTop:16,background:C.card2,borderRadius:8,padding:14,display:"flex",flexWrap:"wrap",gap:16}}>
                {[{l:"PJ",v:matches.length,c:C.accent},{l:"G",v:matches.filter(m=>+m.goalsFor>+m.goalsAgainst).length,c:C.green},{l:"E",v:matches.filter(m=>+m.goalsFor===+m.goalsAgainst).length,c:C.gold},{l:"P",v:matches.filter(m=>+m.goalsFor<+m.goalsAgainst).length,c:C.red},{l:"GF",v:matches.reduce((a,m)=>a+(+m.goalsFor),0),c:C.green},{l:"GC",v:matches.reduce((a,m)=>a+(+m.goalsAgainst),0),c:C.red},{l:"PC rival",v:matches.reduce((a,m)=>a+(+m.pcAgainst||0),0),c:C.red}].map(s=>(
                  <div key={s.l} style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:700,color:s.c,fontFamily:FF,lineHeight:1}}>{s.v}</div><div style={{fontSize:10,color:C.gray,letterSpacing:0.5}}>{s.l}</div></div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab==="videos"&&(
          <div>
            <div style={{background:C.card2,border:`1px solid ${C.accent}44`,borderRadius:10,padding:14,marginBottom:14}}>
              <p style={{color:C.accent,fontSize:11,margin:"0 0 10px",fontWeight:700,letterSpacing:0.8}}>AGREGAR VIDEO</p>
              <p style={{color:C.gray,fontSize:11,margin:"0 0 12px"}}>Pegá el link de <span style={{color:C.accent}}>Google Drive</span> (compartido como "Cualquiera con el link puede ver") o de <span style={{color:C.red}}>YouTube</span>. Se convierte automáticamente al formato embebido.</p>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8,marginBottom:8}}>
                <Input label="Título" value={newVideo.title} onChange={e=>setNewVideo(v=>({...v,title:e.target.value}))} placeholder="Ej: CC ofensivo lateral derecho"/>
                <Select label="Categoría" value={newVideo.category} onChange={e=>setNewVideo(v=>({...v,category:e.target.value}))} options={VIDEO_CATEGORIES}/>
              </div>
              <Input label="URL" value={newVideo.url} onChange={e=>setNewVideo(v=>({...v,url:e.target.value}))} placeholder="https://drive.google.com/file/d/... o https://youtu.be/..."/>
              {newVideo.url && (() => {
                const info = videoEmbedInfo(newVideo.url);
                if (!info) return null;
                const kindColor = info.kind==="youtube"?C.red:info.kind==="drive"?C.gold:info.kind==="vimeo"?C.purple:C.gray;
                const kindLabel = {youtube:"YouTube",drive:"Drive",vimeo:"Vimeo",other:"Link directo"}[info.kind];
                return <div style={{margin:"4px 0 10px"}}><Badge text={kindLabel} color={kindColor}/></div>;
              })()}
              <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                <Btn small color={C.green} onClick={()=>{
                  if(!newVideo.title.trim()||!newVideo.url.trim()){setToast("⚠️ Faltan título o URL");setTimeout(()=>setToast(null),3000);return;}
                  const info = videoEmbedInfo(newVideo.url);
                  if(!info){setToast("⚠️ URL no reconocida");setTimeout(()=>setToast(null),3000);return;}
                  setVideos(vs=>[...vs,{id:Date.now()+Math.random(),title:newVideo.title.trim(),category:newVideo.category,url:newVideo.url.trim(),kind:info.kind,addedAt:new Date().toISOString()}]);
                  setNewVideo({title:"",category:newVideo.category,url:""});
                }}><Icon name="plus" size={12}/> Agregar</Btn>
              </div>
            </div>
            {videos.length===0 ? (
              <div style={{textAlign:"center",padding:"32px 20px",color:C.gray,fontSize:13}}>
                <Icon name="image" size={36} color={C.border}/>
                <p style={{margin:"10px 0 0"}}>Sin videos cargados</p>
              </div>
            ) : (
              VIDEO_CATEGORIES.map(cat => {
                const list = videos.filter(v=>v.category===cat);
                if(list.length===0) return null;
                return (
                  <div key={cat} style={{marginBottom:14}}>
                    <p style={{color:C.accent,fontSize:11,margin:"0 0 6px",fontWeight:700,letterSpacing:0.8}}>{cat.toUpperCase()} <span style={{color:C.gray,fontWeight:400}}>· {list.length}</span></p>
                    {list.map(v => {
                      const info = videoEmbedInfo(v.url);
                      const kindColor = info?.kind==="youtube"?C.red:info?.kind==="drive"?C.gold:info?.kind==="vimeo"?C.purple:C.gray;
                      const kindLabel = info?{youtube:"YT",drive:"Drive",vimeo:"Vimeo",other:"Link"}[info.kind]:"?";
                      return (
                        <div key={v.id} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",marginBottom:6,display:"flex",alignItems:"center",gap:8}}>
                          <Badge text={kindLabel} color={kindColor}/>
                          <span style={{color:C.white,fontSize:13,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.title}</span>
                          <a href={info?.watch||v.url} target="_blank" rel="noreferrer" style={{color:C.gray,fontSize:11,textDecoration:"none"}}>abrir ↗</a>
                          <button onClick={()=>setVideos(vs=>vs.filter(x=>x.id!==v.id))} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}} title="Eliminar"><Icon name="trash" size={14}/></button>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        )}
        {tab==="conclusion"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Textarea label="💪 Fortalezas del rival" value={analysis.strengths} onChange={upd("strengths")}/>
              <Textarea label="⚠️ Para explotar" value={analysis.weaknesses} onChange={upd("weaknesses")}/>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12,marginTop:4}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 10px"}}>PLAN DE PARTIDO</p>
              <Textarea label="Con pelota" value={analysis.planBall} onChange={upd("planBall")}/>
              <Textarea label="Sin pelota" value={analysis.planNoBall} onChange={upd("planNoBall")}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <Textarea label="PC ofensivos" value={analysis.planPCOff} onChange={upd("planPCOff")}/>
                <Textarea label="PC defensivos" value={analysis.planPCDef} onChange={upd("planPCDef")}/>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:14}}>
        <Btn outline onClick={onCancel}>Cancelar</Btn>
        <Btn color={C.green} onClick={()=>onSave({id:rival?.id||Date.now(),name,date,round,analysis,matches,videos,updatedAt:new Date().toISOString()})}>
          <Icon name="save" size={14}/> Guardar análisis
        </Btn>
      </div>
      {showScan&&<PlanillaScanner rivalName={name} onApply={applyPlanilla} onClose={()=>setShowScan(false)}/>}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// VIDEOS SECTION (dentro de RivalDetail)
// ═══════════════════════════════════════════════════════════════════════════════
function VideosSection({videos}) {
  const [activeCat, setActiveCat] = useState("__all__");
  const [playing, setPlaying] = useState(null); // {video, info}
  if (!videos || videos.length === 0) return null;
  const cats = VIDEO_CATEGORIES.filter(c => videos.some(v => v.category === c));
  const filtered = activeCat === "__all__" ? videos : videos.filter(v => v.category === activeCat);
  return (
    <SCard title={`Videos · ${videos.length}`} icon="image" color={C.purple}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        <button onClick={()=>setActiveCat("__all__")} style={{padding:"5px 10px",borderRadius:14,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:FF,letterSpacing:0.5,background:activeCat==="__all__"?C.purple:C.card2,color:activeCat==="__all__"?C.white:C.gray}}>TODO · {videos.length}</button>
        {cats.map(c => {
          const n = videos.filter(v=>v.category===c).length;
          const active = activeCat===c;
          return <button key={c} onClick={()=>setActiveCat(c)} style={{padding:"5px 10px",borderRadius:14,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:FF,letterSpacing:0.5,background:active?C.purple:C.card2,color:active?C.white:C.gray}}>{c.toUpperCase()} · {n}</button>;
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",gap:10}}>
        {filtered.map(v => {
          const info = videoEmbedInfo(v.url);
          const kindColor = info?.kind==="youtube"?C.red:info?.kind==="drive"?C.gold:info?.kind==="vimeo"?C.purple:C.gray;
          const kindLabel = info?{youtube:"YouTube",drive:"Drive",vimeo:"Vimeo",other:"Link"}[info.kind]:"?";
          return (
            <button key={v.id} onClick={()=>setPlaying({video:v, info})} style={{textAlign:"left",cursor:"pointer",background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:10,display:"flex",flexDirection:"column",gap:6}}>
              <div style={{aspectRatio:"16/9",background:"#000",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontSize:28,opacity:0.8}}>▶</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <Badge text={kindLabel} color={kindColor}/>
                <span style={{color:C.gray,fontSize:10,letterSpacing:0.5}}>{v.category}</span>
              </div>
              <span style={{color:C.white,fontSize:13,fontWeight:600,lineHeight:1.3}}>{v.title}</span>
            </button>
          );
        })}
      </div>
      {playing && (
        <Modal title={playing.video.title} onClose={()=>setPlaying(null)} wide>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <Badge text={playing.video.category} color={C.purple}/>
            <a href={playing.info?.watch||playing.video.url} target="_blank" rel="noreferrer" style={{marginLeft:"auto",color:C.gray,fontSize:11,textDecoration:"none"}}>abrir en nueva pestaña ↗</a>
          </div>
          <div style={{position:"relative",width:"100%",paddingTop:"56.25%",background:"#000",borderRadius:8,overflow:"hidden"}}>
            <iframe src={playing.info?.embed||playing.video.url} title={playing.video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen frameBorder="0" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:0}}/>
          </div>
        </Modal>
      )}
    </SCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RIVAL DETAIL
// ═══════════════════════════════════════════════════════════════════════════════
function RivalDetail({rival,onEdit,onBack}) {
  const isAdmin = useIsAdmin();
  const a=rival.analysis||{};
  const has=(...keys)=>keys.some(k=>a[k]&&String(a[k]).trim());
  const Row=({l,v})=>v?<div style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}><span style={{color:C.gray,fontSize:12,minWidth:140,flexShrink:0}}>{l}:</span><span style={{color:C.white,fontSize:13,whiteSpace:"pre-wrap",wordBreak:"break-word",flex:1}}>{v}</span></div>:null;
  const Para=({l,v,accent=C.accent})=>v?<div style={{marginBottom:12}}><p style={{color:accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 5px"}}>{l.toUpperCase()}</p><p style={{color:C.white,fontSize:13,margin:0,whiteSpace:"pre-wrap",wordBreak:"break-word",lineHeight:1.55}}>{v}</p></div>:null;
  const wins=rival.matches?.filter(m=>+m.goalsFor>+m.goalsAgainst).length||0;
  const draws=rival.matches?.filter(m=>+m.goalsFor===+m.goalsAgainst).length||0;
  const losses=rival.matches?.filter(m=>+m.goalsFor<+m.goalsAgainst).length||0;

  const buildShareText=()=>{
    const L=[];
    L.push(`📋 ANÁLISIS: ${rival.name.toUpperCase()}`);
    if(rival.date||rival.round) L.push(`📅 ${rival.date||""}${rival.round?` · ${rival.round}`:""}`);
    L.push("");
    if(a.formation) L.push(`Formación: ${a.formation}`);
    if(a.coach) L.push(`DT: ${a.coach}`);
    if(a.captain) L.push(`Capitana: ${a.captain}`);
    if(a.goalkeeper) L.push(`Arquera: ${a.goalkeeper}`);
    if(a.keyPlayers) L.push(`Jugadoras clave: ${a.keyPlayers}`);
    if(a.shooters) L.push(`Rematadoras: ${a.shooters}`);
    if(a.strengths){L.push("");L.push(`💪 FORTALEZAS:`);L.push(a.strengths);}
    if(a.weaknesses){L.push("");L.push(`⚠️ PARA EXPLOTAR:`);L.push(a.weaknesses);}
    if(a.planBall||a.planNoBall||a.planPCOff||a.planPCDef){
      L.push("");L.push("🎯 PLAN DE PARTIDO");
      if(a.planBall) L.push(`• Con pelota: ${a.planBall}`);
      if(a.planNoBall) L.push(`• Sin pelota: ${a.planNoBall}`);
      if(a.planPCOff) L.push(`• PC ofensivos: ${a.planPCOff}`);
      if(a.planPCDef) L.push(`• PC defensivos: ${a.planPCDef}`);
    }
    return L.join("\n");
  };
  const handlePrint=()=>window.print();
  const handleShare=async()=>{
    const text=buildShareText();
    if(navigator.share){
      try{await navigator.share({title:`Análisis ${rival.name}`,text});}catch(e){}
    }else if(navigator.clipboard){
      try{await navigator.clipboard.writeText(text);alert("✅ Resumen copiado al portapapeles");}catch(e){alert("No se pudo copiar al portapapeles");}
    }else{alert("Tu navegador no soporta compartir/copiar");}
  };

  return(
    <div className="rival-detail">
      <style>{`@media print{body{background:#fff!important;}.rival-detail,.rival-detail *{background:#fff!important;color:#000!important;border-color:#bbb!important;box-shadow:none!important;}.rival-no-print{display:none!important;}.rival-detail h2,.rival-detail h3,.rival-detail span,.rival-detail p,.rival-detail div{color:#000!important;}}`}</style>
      <div className="rival-no-print" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,gap:8,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:C.gray,cursor:"pointer"}}><Icon name="back" size={20}/></button>
          <div style={{minWidth:0}}><h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1,wordBreak:"break-word"}}>{rival.name.toUpperCase()}</h2><span style={{color:C.gray,fontSize:12}}>{rival.date}{rival.round?` · ${rival.round}`:""}</span></div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <Btn small outline onClick={handleShare}><Icon name="share" size={12}/> Compartir</Btn>
          <Btn small outline onClick={handlePrint}><Icon name="print" size={12}/> Imprimir</Btn>
          {isAdmin && <Btn small onClick={onEdit}><Icon name="edit" size={13}/> Editar</Btn>}
        </div>
      </div>

      {rival.matches?.length>0&&(
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {[{l:"Partidos",v:rival.matches.length,c:C.accent},{l:"Ganados",v:wins,c:C.green},{l:"Empatados",v:draws,c:C.gold},{l:"Perdidos",v:losses,c:C.red}].map(s=>(
            <div key={s.l} style={{flex:"1 1 90px",background:C.card,border:`1px solid ${s.c}33`,borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:s.c,fontFamily:FF}}>{s.v}</div>
              <div style={{fontSize:10,color:C.gray}}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}

      {has("planBall","planNoBall","planPCOff","planPCDef")&&(
        <div style={{background:C.gold+"10",border:`1.5px solid ${C.gold}66`,borderRadius:12,padding:18,marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <Icon name="star" size={16} color={C.gold}/>
            <span style={{color:C.gold,fontSize:13,fontWeight:700,fontFamily:FF,letterSpacing:1.5}}>PLAN DE PARTIDO</span>
          </div>
          <Para l="Con pelota" v={a.planBall} accent={C.green}/>
          <Para l="Sin pelota" v={a.planNoBall} accent={C.red}/>
          {(a.planPCOff||a.planPCDef)&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
              <Para l="PC ofensivos" v={a.planPCOff} accent={C.purple}/>
              <Para l="PC defensivos" v={a.planPCDef} accent={C.purple}/>
            </div>
          )}
        </div>
      )}

      {(a.strengths||a.weaknesses)&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12}}>
          {a.strengths&&<SCard title="💪 Fortalezas del rival" color={C.red}><p style={{color:"#ddd",fontSize:13,margin:0,whiteSpace:"pre-wrap",lineHeight:1.55}}>{a.strengths}</p></SCard>}
          {a.weaknesses&&<SCard title="⚠️ Para explotar" color={C.green}><p style={{color:"#ddd",fontSize:13,margin:0,whiteSpace:"pre-wrap",lineHeight:1.55}}>{a.weaknesses}</p></SCard>}
        </div>
      )}

      <VideosSection videos={rival.videos}/>

      {(has("city","colors","coach","assistant","physio")||has("goalkeeper","captain","keyPlayers","injuries"))&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:12}}>
          {has("city","colors","coach","assistant","physio")&&(
            <SCard title="Datos del Club" icon="shield" color={C.accent}>
              <Row l="Ciudad" v={a.city}/>
              <Row l="Colores" v={a.colors}/>
              <Row l="DT Principal" v={a.coach}/>
              <Row l="Asistente" v={a.assistant}/>
              <Row l="Prep. Física" v={a.physio}/>
            </SCard>
          )}
          {has("goalkeeper","captain","keyPlayers","injuries")&&(
            <SCard title="Plantel" icon="shield" color={C.purple}>
              <Row l="Arquera titular" v={a.goalkeeper}/>
              <Row l="Capitana" v={a.captain}/>
              <Row l="Jugadoras clave" v={a.keyPlayers}/>
              <Row l="Bajas / Lesionadas" v={a.injuries}/>
            </SCard>
          )}
        </div>
      )}

      {has("formation","offensiveStructure","attackNotes","exitType","exitKeyPlayer","exitSide","pressureApplied","arrivalZones","shooters","goalPlays","goalsLastMatch")&&(
        <SCard title="Con pelota" icon="target" color={C.accent}>
          {has("formation","offensiveStructure","attackNotes")&&(
            <div>
              <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 8px"}}>SISTEMA / FORMACIÓN</p>
              <Row l="Formación base" v={a.formation}/>
              <Row l="Estructura ofensiva" v={a.offensiveStructure}/>
              <Row l="Notas generales" v={a.attackNotes}/>
            </div>
          )}
          {has("exitType","exitKeyPlayer","exitSide","pressureApplied")&&(
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:10}}>
              <p style={{color:C.accent,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 8px"}}>SALIDA DESDE EL FONDO</p>
              <Row l="Tipo de salida" v={a.exitType}/>
              <Row l="Jugadora clave" v={a.exitKeyPlayer}/>
              <Row l="Lado predominante" v={a.exitSide}/>
              <Row l="Presión aplicada" v={a.pressureApplied}/>
            </div>
          )}
          {has("arrivalZones","shooters","goalPlays","goalsLastMatch")&&(
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:10}}>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 8px"}}>LLEGADAS Y REMATES</p>
              <Row l="Zonas de llegada" v={a.arrivalZones}/>
              <Row l="Rematadoras" v={a.shooters}/>
              <Row l="Jugadas de gol" v={a.goalPlays}/>
              <Row l="Goles último partido" v={a.goalsLastMatch}/>
            </div>
          )}
        </SCard>
      )}

      {has("pressType","pressIntensity","pressZone","pressTriggers","blockType","defensiveLine","vulnerableIn","marksSystem","whoMarksUs","dangerZones","transition")&&(
        <SCard title="Sin pelota" icon="flag" color={C.red}>
          {has("pressType","pressIntensity","pressZone","pressTriggers")&&(
            <div>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 8px"}}>PRESSING</p>
              <Row l="Tipo de presión" v={a.pressType}/>
              <Row l="Intensidad" v={a.pressIntensity}/>
              <Row l="Zona de inicio" v={a.pressZone}/>
              <Row l="Triggers" v={a.pressTriggers}/>
            </div>
          )}
          {has("blockType","defensiveLine","vulnerableIn","marksSystem")&&(
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:10}}>
              <p style={{color:C.red,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 8px"}}>BLOQUE DEFENSIVO</p>
              <Row l="Tipo de bloque" v={a.blockType}/>
              <Row l="Línea defensiva" v={a.defensiveLine}/>
              <Row l="Vulnerable en" v={a.vulnerableIn}/>
              <Row l="Sistema de marcas" v={a.marksSystem}/>
            </div>
          )}
          {has("whoMarksUs","dangerZones","transition")&&(
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,marginTop:10}}>
              <p style={{color:C.purple,fontSize:10,letterSpacing:1,fontWeight:700,margin:"0 0 8px"}}>MARCAS Y TRANSICIONES</p>
              <Row l="Quién nos marca" v={a.whoMarksUs}/>
              <Row l="Zonas de peligro" v={a.dangerZones}/>
              <Row l="Transición def→ataque" v={a.transition}/>
            </div>
          )}
        </SCard>
      )}

      {has("pcOffVariants","pcOffExecutor","pcOffShooter","pcOffSecond","pcDefSystem","pcDefExit","pcDefRunner","pcDefGK")&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12}}>
          {has("pcOffVariants","pcOffExecutor","pcOffShooter","pcOffSecond")&&(
            <SCard title="PC Ofensivos (rival)" icon="corner" color={C.red}>
              <Row l="Variantes" v={a.pcOffVariants}/>
              <Row l="Ejecutora" v={a.pcOffExecutor}/>
              <Row l="Rematadora" v={a.pcOffShooter}/>
              <Row l="Jugadora 2do palo" v={a.pcOffSecond}/>
            </SCard>
          )}
          {has("pcDefSystem","pcDefExit","pcDefRunner","pcDefGK")&&(
            <SCard title="Nuestra defensa de PC" icon="corner" color={C.purple}>
              <Row l="Formación defensiva" v={a.pcDefSystem}/>
              <Row l="Primera salida" v={a.pcDefExit}/>
              <Row l="Runner principal" v={a.pcDefRunner}/>
              <Row l="Posición arquera" v={a.pcDefGK}/>
            </SCard>
          )}
        </div>
      )}

      {rival.matches?.length>0&&(
        <SCard title="Últimos partidos" icon="chart" color={C.accent}>
          {[...rival.matches].reverse().slice(0,5).map((m,i,arr)=>{
            const gf=+m.goalsFor,gc=+m.goalsAgainst;const res=gf>gc?"W":gf===gc?"E":"L";const rc=res==="W"?C.green:res==="E"?C.gold:C.red;
            return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",flexWrap:"wrap"}}>
              <Badge text={res} color={rc}/><span style={{color:C.white,fontWeight:700}}>CULP {gf} — {gc} {rival.name}</span>
              {m.scorers?.filter(g=>g.equipo==="visitante").map((g,j)=><Badge key={j} text={`⚽ ${g.nombre}`} color={C.red}/>)}
              <span style={{color:C.gray,fontSize:12,marginLeft:"auto"}}>{m.date}</span>
            </div>);
          })}
        </SCard>
      )}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// RIVALS LIST
// ═══════════════════════════════════════════════════════════════════════════════
function RivalsView({rivals,onNew,onView,onEdit,onDelete}) {
  const isAdmin = useIsAdmin();
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>ANÁLISIS DE RIVALES</h2>
        {isAdmin && <Btn onClick={onNew}><Icon name="plus" size={14}/> Nuevo análisis</Btn>}
      </div>
      {rivals.length===0&&<div style={{textAlign:"center",padding:"60px 20px"}}><Icon name="shield" size={48} color={C.border}/><p style={{color:C.gray,margin:"12px 0 20px"}}>No hay análisis cargados aún</p>{isAdmin && <Btn onClick={onNew}><Icon name="plus" size={14}/> Crear primer análisis</Btn>}</div>}
      <div style={{display:"grid",gap:10}}>
        {rivals.map(r=>{
          const wins=r.matches?.filter(m=>+m.goalsFor>+m.goalsAgainst).length||0;
          const losses=r.matches?.filter(m=>+m.goalsFor<+m.goalsAgainst).length||0;
          const total=r.matches?.length||0;
          return(
            <div key={r.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                  <h3 style={{margin:0,color:C.white,fontFamily:FF,fontSize:17}}>{r.name}</h3>
                  {r.analysis?.formation&&<Badge text={r.analysis.formation} color={C.accent}/>}
                </div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  {r.date&&<span style={{color:C.gray,fontSize:12}}>📅 {r.date}</span>}
                  {r.round&&<span style={{color:C.gray,fontSize:12}}>{r.round}</span>}
                  {total>0&&<span style={{color:C.gray,fontSize:12}}>{total} partidos · <span style={{color:C.green}}>{wins}G</span> · <span style={{color:C.red}}>{losses}P</span></span>}
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <Btn small outline onClick={()=>onView(r)}><Icon name="eye" size={12}/></Btn>
                {isAdmin && <Btn small outline onClick={()=>onEdit(r)}><Icon name="edit" size={12}/></Btn>}
                {isAdmin && <button onClick={()=>onDelete(r.id)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",padding:6}}><Icon name="trash" size={14}/></button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// CULP EVOLUTION CHART (SVG puro, sin dependencias)
// ═══════════════════════════════════════════════════════════════════════════════
function CulpEvolutionChart({fixture, totalTeams=14}) {
  const data = getCulpPositionEvolution(fixture||[]);
  if (data.length < 2) {
    return (
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20,textAlign:"center",color:C.gray,fontSize:12}}>
        Aún no hay datos suficientes para el gráfico (se necesitan al menos 2 fechas jugadas).
      </div>
    );
  }
  const W = 600, H = 200, padL = 32, padR = 16, padT = 14, padB = 32;
  const maxPos = Math.max(totalTeams, ...data.map(d=>d.pos));
  const minPos = 1;
  const xStep = (W - padL - padR) / Math.max(1, data.length - 1);
  const yFor = pos => padT + ((pos - minPos) / (maxPos - minPos)) * (H - padT - padB);
  const xFor = i => padL + i * xStep;
  const path = data.map((d,i)=> (i===0?"M":"L") + xFor(i).toFixed(1) + " " + yFor(d.pos).toFixed(1)).join(" ");
  const last = data[data.length-1];
  const best = data.reduce((m,d)=>d.pos<m.pos?d:m, data[0]);
  // Marcas del eje Y: 1, mediana, último
  const yTicks = [1, Math.ceil((1+maxPos)/2), maxPos];
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 10px 8px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"0 6px 8px"}}>
        <span style={{color:C.gray,fontSize:10,letterSpacing:0.8}}>EVOLUCIÓN EN LA TABLA</span>
        <span style={{color:C.gold,fontSize:10,fontWeight:700,fontFamily:FF,letterSpacing:0.5}}>MEJOR: #{best.pos} ({best.label})</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",display:"block"}} preserveAspectRatio="xMidYMid meet">
        {/* Grid horizontal */}
        {yTicks.map((p,i)=>(
          <g key={i}>
            <line x1={padL} x2={W-padR} y1={yFor(p)} y2={yFor(p)} stroke={C.border} strokeWidth="1" strokeDasharray="3,3"/>
            <text x={padL-6} y={yFor(p)+3} textAnchor="end" fill={C.gray} fontSize="10" fontFamily="sans-serif">#{p}</text>
          </g>
        ))}
        {/* Línea */}
        <path d={path} stroke={C.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Puntos */}
        {data.map((d,i)=>(
          <g key={i}>
            <circle cx={xFor(i)} cy={yFor(d.pos)} r={i===data.length-1?5:3.5} fill={i===data.length-1?C.gold:C.accent} stroke={C.bg} strokeWidth="1.5"/>
            <text x={xFor(i)} y={H-padB+14} textAnchor="middle" fill={C.gray} fontSize="9" fontFamily="sans-serif">{d.label}</text>
          </g>
        ))}
        {/* Etiqueta último punto */}
        <text x={xFor(data.length-1)} y={yFor(last.pos)-10} textAnchor="middle" fill={C.gold} fontSize="11" fontWeight="700" fontFamily="sans-serif">#{last.pos}</text>
      </svg>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// RIVAL DOSSIER (Modal de scouting del próximo rival)
// ═══════════════════════════════════════════════════════════════════════════════
function RivalDossier({fixture, standings, scorers, cards, rivals, onClose}) {
  const next = getNextCulpMatch(fixture||[]);
  if (!next) {
    return (
      <Modal title="Dossier — sin próximo rival" onClose={onClose}>
        <p style={{color:C.gray,fontSize:13,margin:"4px 0 16px"}}>No hay próximos partidos de CULP cargados en el fixture.</p>
        <div style={{display:"flex",justifyContent:"flex-end"}}><Btn outline onClick={onClose}>Cerrar</Btn></div>
      </Modal>
    );
  }
  const opp = next.opp;
  const oppRow = (standings||[]).find(t => t.name === opp);
  const culpRow = (standings||[]).find(t => t.isUs);
  const last5Opp = getLastNResults(fixture||[], opp, 5);
  const last5Culp = getLastNResults(fixture||[], "U. LA PLATA", 5);
  const h2hFixture = getH2H(fixture||[], "U. LA PLATA", opp);
  const rivalProfile = (rivals||[]).find(r => r.name?.toLowerCase() === opp.toLowerCase());
  const oppScorers = (scorers||[]).filter(s => s.team === opp).slice(0, 6);
  const oppCards = (cards||[]).filter(c => c.team === opp).sort((a,b)=> ((b.roja||0)*3+(b.amarilla||0)*2+(b.verde||0)) - ((a.roja||0)*3+(a.amarilla||0)*2+(a.verde||0))).slice(0, 6);

  const Streak = ({results}) => results.length===0 ? <span style={{color:C.gray,fontSize:11}}>—</span> : (
    <div style={{display:"inline-flex",gap:3}}>
      {results.map((r,i)=>{
        const bg = r.result==="G"?C.green:r.result==="P"?C.red:C.gold;
        return <span key={i} title={`${r.fecha} · ${r.isHome?"vs":"@"} ${r.opp} ${r.gf}-${r.ga}`} style={{display:"inline-block",width:18,height:18,borderRadius:4,background:bg,color:"#000",fontSize:11,fontWeight:800,lineHeight:"18px",textAlign:"center",fontFamily:FF}}>{r.result}</span>;
      })}
    </div>
  );

  const StatRow = ({label, culp, rival}) => (
    <div style={{display:"grid",gridTemplateColumns:"1fr 90px 1fr",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
      <div style={{textAlign:"right",color:C.accent,fontWeight:700,fontFamily:FF,fontSize:15}}>{culp ?? "—"}</div>
      <div style={{textAlign:"center",color:C.gray,fontSize:10,letterSpacing:0.8}}>{label}</div>
      <div style={{color:C.red,fontWeight:700,fontFamily:FF,fontSize:15}}>{rival ?? "—"}</div>
    </div>
  );

  return (
    <Modal title={`DOSSIER · vs ${opp}`} onClose={onClose} wide>
      {/* Header partido */}
      <div style={{background:`linear-gradient(135deg,${C.gold}22,${C.accent}11)`,border:`1px solid ${C.gold}44`,borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{color:C.gold,fontSize:10,letterSpacing:1,fontFamily:FF}}>PRÓXIMO PARTIDO</div>
            <div style={{color:C.white,fontSize:18,fontWeight:700,fontFamily:FF,marginTop:4}}>
              {next.isHome ? "🔵 CULP" : `🔴 ${opp}`} <span style={{color:C.gray,fontSize:14,margin:"0 6px"}}>vs</span> {next.isHome ? `🔴 ${opp}` : "🔵 CULP"}
            </div>
            <div style={{color:C.gray,fontSize:12,marginTop:4}}>{next.fecha} {next.match.date && `· ${next.match.date}`}</div>
          </div>
          <Badge text={next.isHome ? "LOCAL" : "VISITANTE"} color={next.isHome ? C.accent : C.purple}/>
        </div>
      </div>

      {/* Stats lado a lado */}
      <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 6px"}}>COMPARATIVA EN EL TORNEO</p>
      <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 14px",marginBottom:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 90px 1fr",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
          <div style={{textAlign:"right",color:C.accent,fontWeight:700,fontFamily:FF,fontSize:13}}>🔵 CULP</div>
          <div></div>
          <div style={{color:C.red,fontWeight:700,fontFamily:FF,fontSize:13}}>🔴 {opp}</div>
        </div>
        <StatRow label="POS" culp={culpRow?`#${standings.findIndex(t=>t.isUs)+1}`:"—"} rival={oppRow?`#${standings.findIndex(t=>t.name===opp)+1}`:"—"}/>
        <StatRow label="PUNTOS" culp={culpRow?.pts} rival={oppRow?.pts}/>
        <StatRow label="PJ" culp={culpRow?.pj} rival={oppRow?.pj}/>
        <StatRow label="G - E - P" culp={culpRow?`${culpRow.pg}-${culpRow.pe}-${culpRow.pp}`:"—"} rival={oppRow?`${oppRow.pg}-${oppRow.pe}-${oppRow.pp}`:"—"}/>
        <StatRow label="GF" culp={culpRow?.gf} rival={oppRow?.gf}/>
        <StatRow label="GC" culp={culpRow?.gc} rival={oppRow?.gc}/>
        <StatRow label="DIF" culp={culpRow?(culpRow.dif>0?"+":"")+culpRow.dif:"—"} rival={oppRow?(oppRow.dif>0?"+":"")+oppRow.dif:"—"}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 90px 1fr",alignItems:"center",padding:"10px 0"}}>
          <div style={{textAlign:"right"}}><Streak results={last5Culp}/></div>
          <div style={{textAlign:"center",color:C.gray,fontSize:10,letterSpacing:0.8}}>ÚLT. 5</div>
          <div><Streak results={last5Opp}/></div>
        </div>
      </div>

      {/* Head to head en el fixture */}
      {h2hFixture.length > 0 && (
        <div style={{marginBottom:14}}>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 6px"}}>HISTORIAL ENTRE AMBOS — TORNEO ACTUAL</p>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
            {h2hFixture.map((r,i)=>{
              const culpIsHome = r.home === "U. LA PLATA";
              const culpGoals = culpIsHome ? r.gl : r.gv;
              const oppGoals = culpIsHome ? r.gv : r.gl;
              const win = culpGoals > oppGoals ? "G" : culpGoals < oppGoals ? "P" : "E";
              const winColor = win==="G"?C.green:win==="P"?C.red:C.gold;
              return (
                <div key={i} style={{display:"grid",gridTemplateColumns:"60px 1fr 80px 1fr 22px",alignItems:"center",padding:"9px 12px",gap:8,borderBottom:i<h2hFixture.length-1?`1px solid ${C.border}`:"none"}}>
                  <span style={{color:C.gray,fontSize:11}}>{r.fecha}</span>
                  <span style={{textAlign:"right",color:r.home==="U. LA PLATA"?C.accent:C.white,fontSize:13,fontWeight:r.home==="U. LA PLATA"?700:400}}>{r.home}</span>
                  <span style={{textAlign:"center",color:C.white,fontWeight:700,fontFamily:FF,fontSize:15}}>{r.gl} - {r.gv}</span>
                  <span style={{color:r.away==="U. LA PLATA"?C.accent:C.white,fontSize:13,fontWeight:r.away==="U. LA PLATA"?700:400}}>{r.away}</span>
                  <span style={{display:"inline-block",width:18,height:18,borderRadius:4,background:winColor,color:"#000",fontSize:11,fontWeight:800,lineHeight:"18px",textAlign:"center",fontFamily:FF}}>{win}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Goleadoras y tarjetas en columnas */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <div>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 6px"}}>GOLEADORAS DEL RIVAL</p>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",minHeight:60}}>
            {oppScorers.length === 0 && <div style={{padding:14,color:C.gray,fontSize:12,textAlign:"center"}}>Sin datos</div>}
            {oppScorers.map((s,i)=>{
              const prom = s.pj && s.pj>0 ? (s.goals/s.pj).toFixed(2) : "—";
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderBottom:i<oppScorers.length-1?`1px solid ${C.border}`:"none"}}>
                  <span style={{color:C.gray,fontSize:11,minWidth:14}}>{i+1}</span>
                  <span style={{flex:1,color:C.white,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</span>
                  <span style={{color:C.accent,fontWeight:700,fontFamily:FF,fontSize:14}}>{s.goals}</span>
                  <span style={{color:C.green,fontSize:10,minWidth:32,textAlign:"right"}}>{prom}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 6px"}}>TARJETAS DEL RIVAL</p>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",minHeight:60}}>
            {oppCards.length === 0 && <div style={{padding:14,color:C.gray,fontSize:12,textAlign:"center"}}>Sin datos</div>}
            {oppCards.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 10px",borderBottom:i<oppCards.length-1?`1px solid ${C.border}`:"none"}}>
                <span style={{flex:1,color:C.white,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span>
                {(c.verde||0)>0 && <span style={{color:C.green,fontSize:11,fontWeight:700}}>🟢{c.verde}</span>}
                {(c.amarilla||0)>0 && <span style={{color:C.gold,fontSize:11,fontWeight:700}}>🟡{c.amarilla}</span>}
                {(c.roja||0)>0 && <span style={{color:C.red,fontSize:11,fontWeight:700}}>🔴{c.roja}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notas del análisis manual del rival si existen */}
      {rivalProfile && (
        <div style={{marginBottom:14}}>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 6px"}}>FICHA DE SCOUTING (cargada en Rivales)</p>
          <div style={{background:C.purple+"11",border:`1px solid ${C.purple}33`,borderRadius:10,padding:12,fontSize:12,color:C.white,lineHeight:1.5}}>
            {rivalProfile.style && <div><b style={{color:C.purple}}>Estilo:</b> {rivalProfile.style}</div>}
            {rivalProfile.shooters && <div style={{marginTop:4}}><b style={{color:C.purple}}>Tiradoras:</b> {rivalProfile.shooters}</div>}
            {rivalProfile.notes && <div style={{marginTop:4}}><b style={{color:C.purple}}>Notas:</b> {rivalProfile.notes}</div>}
            {!rivalProfile.style && !rivalProfile.shooters && !rivalProfile.notes && <span style={{color:C.gray}}>Ficha sin observaciones cargadas todavía.</span>}
          </div>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={onClose}>Cerrar</Btn></div>
    </Modal>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function Dashboard({rivals,standings,scorers,fixture,cards,setView}) {
  const [showDossier, setShowDossier] = useState(false);
  const totalWins=rivals.reduce((a,r)=>a+(r.matches?.filter(m=>+m.goalsFor>+m.goalsAgainst).length||0),0);
  const usPos=standings.findIndex(t=>t.isUs);
  const culpScorers=scorers.filter(s=>s.team==="U. LA PLATA");
  const next = getNextCulpMatch(fixture||[]);
  const stats=[{l:"Rivales analizados",v:rivals.length,c:C.accent,icon:"shield"},{l:"Partidos registrados",v:rivals.reduce((a,r)=>a+(r.matches?.length||0),0),c:C.purple,icon:"chart"},{l:"Victorias",v:totalWins,c:C.green,icon:"trophy"},{l:"Posición actual",v:usPos>=0?`#${usPos+1}`:"—",c:C.gold,icon:"star"}];
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div style={{width:40,height:40,background:C.accent+"22",border:`2px solid ${C.accent}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏑</div>
        <div><h2 style={{margin:0,color:C.white,fontFamily:FF,fontSize:22,letterSpacing:1}}>CULP HOCKEY</h2><p style={{margin:0,color:C.gray,fontSize:10,letterSpacing:0.5}}>PRIMERA DAMAS · ANÁLISIS DE RIVALES</p></div>
      </div>
      {/* Próximo partido + dossier */}
      {next && (
        <div onClick={()=>setShowDossier(true)} style={{background:`linear-gradient(135deg,${C.gold}22,${C.accent}11)`,border:`1px solid ${C.gold}55`,borderRadius:12,padding:16,marginBottom:16,cursor:"pointer",transition:"transform 0.15s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div>
              <div style={{color:C.gold,fontSize:10,letterSpacing:1,fontFamily:FF,fontWeight:700}}>PRÓXIMO PARTIDO · {next.fecha}</div>
              <div style={{color:C.white,fontSize:18,fontWeight:700,fontFamily:FF,marginTop:6}}>
                {next.isHome ? "🔵 CULP" : `🔴 ${next.opp}`} <span style={{color:C.gray,fontSize:14,margin:"0 6px"}}>vs</span> {next.isHome ? `🔴 ${next.opp}` : "🔵 CULP"}
              </div>
              {next.match.date && <div style={{color:C.gray,fontSize:11,marginTop:4}}>{next.match.date} · {next.isHome ? "Local" : "Visitante"}</div>}
            </div>
            <Btn small color={C.gold} onClick={(e)=>{e.stopPropagation();setShowDossier(true);}}><Icon name="eye" size={12}/> Ver dossier</Btn>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:C.card,border:`1px solid ${s.c}22`,borderRadius:12,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:26,fontWeight:700,color:s.c,fontFamily:FF,lineHeight:1}}>{s.v}</div><div style={{fontSize:10,color:C.gray,marginTop:3,letterSpacing:0.5}}>{s.l.toUpperCase()}</div></div>
            <Icon name={s.icon} size={20} color={s.c+"55"}/>
          </div>
        ))}
      </div>
      {/* Gráfico de evolución de CULP */}
      {fixture && fixture.length > 0 && (
        <div style={{marginBottom:16}}>
          <CulpEvolutionChart fixture={fixture} totalTeams={Math.max(14, standings.length)}/>
        </div>
      )}
      {/* CTA importar */}
      <div style={{background:`linear-gradient(135deg,${C.purple}33,${C.accent}22)`,border:`1px solid ${C.accent}33`,borderRadius:12,padding:16,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <div><p style={{margin:0,color:C.white,fontWeight:700,fontSize:13,fontFamily:FF,letterSpacing:0.5}}>📄 ¿TENÉS UNA PLANILLA NUEVA?</p><p style={{margin:"4px 0 0",color:C.gray,fontSize:12}}>Subí el PDF oficial o una foto y Claude carga todos los datos</p></div>
        <Btn small color={C.purple} onClick={()=>setView("rivals")}>Ir a rivales</Btn>
      </div>
      {showDossier && <RivalDossier fixture={fixture} standings={standings} scorers={scorers} cards={cards} rivals={rivals} onClose={()=>setShowDossier(false)}/>}
      {/* Goleadoras CULP */}
      {culpScorers.length>0&&(
        <div style={{marginBottom:16}}>
          <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>GOLEADORAS DE CULP — TORNEO</p>
          <div style={{background:C.card,border:`1px solid ${C.accent}22`,borderRadius:10,overflow:"hidden"}}>
            {culpScorers.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:i<culpScorers.length-1?`1px solid ${C.border}`:"none"}}>
                <span style={{color:i===0?"#FFD700":C.gray,fontWeight:700,minWidth:18,textAlign:"center",fontSize:12}}>{i===0?"🥇":i+1}</span>
                <span style={{flex:1,color:C.accent,fontSize:13}}>{s.name}</span>
                <span style={{color:C.accent,fontWeight:700,fontFamily:FF,fontSize:15}}>{s.goals}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {rivals.length>0&&<div style={{marginBottom:16}}>
        <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>ÚLTIMOS ANÁLISIS</p>
        {[...rivals].slice(-3).reverse().map(r=>(
          <div key={r.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:C.white,fontWeight:600}}>{r.name}</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {r.date&&<span style={{color:C.gray,fontSize:12}}>{r.date}</span>}
              {r.matches?.length>0&&<Badge text={`${r.matches.length} partidos`} color={C.accent}/>}
            </div>
          </div>
        ))}
      </div>}
      {standings.length>0&&<div>
        <p style={{color:C.gray,fontSize:10,letterSpacing:0.8,margin:"0 0 8px"}}>TOP 5 TABLA</p>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
          {standings.slice(0,5).map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:i<4?`1px solid ${C.border}`:"none",background:t.isUs?C.purple+"11":"transparent"}}>
              <span style={{color:C.gray,fontWeight:700,minWidth:18,textAlign:"center",fontSize:13}}>{i+1}</span>
              <span style={{flex:1,color:t.isUs?C.purple:C.white,fontWeight:t.isUs?700:400}}>{t.isUs&&"🔵 "}{t.name}</span>
              <span style={{color:C.accent,fontWeight:700,fontFamily:FF,fontSize:15}}>{t.pts} pts</span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function LoginModal({onClose, onSuccess}) {
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  function submitPwd() {
    if (pwd === ADMIN_PASSWORD) {
      try { localStorage.setItem(ADMIN_AUTH_KEY, "1"); } catch {}
      onSuccess();
    } else {
      setErr("Contraseña incorrecta");
      setPwd("");
    }
  }
  return (
    <Modal title="Ingresar" onClose={onClose}>
      <p style={{color:C.gray,fontSize:12,marginBottom:14,lineHeight:1.5}}>
        Ingresá con tu cuenta de Google para ver los análisis. La sesión queda guardada en este dispositivo.
      </p>
      <button onClick={loginWithGoogle} style={{width:"100%",background:C.white,color:"#1a1a1a",border:"none",borderRadius:10,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontSize:14,fontWeight:600,fontFamily:"'Barlow',sans-serif",marginBottom:12}}>
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.5 39.6 16.1 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
        Iniciar sesión con Google
      </button>
      {!showPwd ? (
        <button onClick={()=>setShowPwd(true)} style={{background:"none",border:"none",color:C.gray,fontSize:11,cursor:"pointer",textDecoration:"underline",display:"block",margin:"4px auto 0"}}>
          Soy staff sin Google · usar contraseña
        </button>
      ) : (
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginTop:8}}>
          <p style={{color:C.gray,fontSize:11,marginBottom:10}}>Acceso de staff por contraseña (fallback).</p>
          <Input
            label="Contraseña"
            type="password"
            value={pwd}
            onChange={e=>{setPwd(e.target.value); setErr("");}}
            onKeyDown={e=>{if(e.key==="Enter") submitPwd();}}
            autoFocus
            placeholder="••••••••"
          />
          {err && <p style={{color:C.red,fontSize:11,marginTop:-6,marginBottom:10}}>{err}</p>}
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:6}}>
            <Btn outline onClick={()=>{setShowPwd(false);setPwd("");setErr("");}}>Volver</Btn>
            <Btn color={C.green} onClick={submitPwd} disabled={!pwd}><Icon name="check" size={14}/> Ingresar</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// SAVE INDICATOR (esquina superior derecha)
// ═══════════════════════════════════════════════════════════════════════════════
function SaveIndicator() {
  const [status, setStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  const timerRef = useRef(null);
  useEffect(() => {
    return subscribeSaveStatus((s) => {
      setStatus(s);
      clearTimeout(timerRef.current);
      if (s === "saved") timerRef.current = setTimeout(() => setStatus(null), 1800);
      if (s === "error") timerRef.current = setTimeout(() => setStatus(null), 6000);
    });
  }, []);
  if (!status) return null;
  const cfg = {
    saving: { bg: C.gray, txt: "Guardando…", icon: "⟳" },
    saved:  { bg: C.green, txt: "Guardado", icon: "✓" },
    error:  { bg: C.red, txt: "Sin conexión · guardado local", icon: "⚠" }
  }[status];
  return (
    <div style={{position:"fixed",top:10,right:10,zIndex:9999,background:cfg.bg,color:C.white,padding:"6px 12px",borderRadius:20,fontSize:11,fontWeight:700,fontFamily:FF,letterSpacing:0.8,boxShadow:"0 4px 12px rgba(0,0,0,0.35)",display:"flex",alignItems:"center",gap:6,transition:"all 0.2s"}}>
      <span style={{display:"inline-block",animation:status==="saving"?"spin 1s linear infinite":"none"}}>{cfg.icon}</span> {cfg.txt}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MIGRACIONES DE FIXTURE (aplican una vez sobre datos ya guardados en Supabase)
// ═══════════════════════════════════════════════════════════════════════════════
const FIXTURE_MIGRATION_KEY = "culp:fixtureMigration_v3";
const FIXTURE_RESULT_UPDATES = [
  // Fecha 9
  {fecha:"Fecha 9", home:"PUERTO NIZUC", away:"M. MORENO", gl:1, gv:0},
  {fecha:"Fecha 9", home:"HINDU CLUB", away:"C.I.S.S.A.B.", gl:1, gv:2},
  {fecha:"Fecha 9", home:"M. GRANDE", away:"BANFIELD", gl:3, gv:2},
  {fecha:"Fecha 9", home:"B. HIPOTECARIO", away:"BANCO CIUDAD", gl:3, gv:2},
  {fecha:"Fecha 9", home:"MACABI", away:"U. LA PLATA", gl:1, gv:1},
  {fecha:"Fecha 9", home:"PUCARA", away:"CIUDAD B", gl:2, gv:2},
  {fecha:"Fecha 9", home:"C.A.S.I.", away:"LANUS", gl:1, gv:1},
  // Fecha 10
  {fecha:"Fecha 10", home:"C.A.S.I.", away:"PUERTO NIZUC", gl:2, gv:1},
  {fecha:"Fecha 10", home:"LANUS", away:"PUCARA", gl:1, gv:4},
  {fecha:"Fecha 10", home:"CIUDAD B", away:"MACABI", gl:0, gv:2},
  {fecha:"Fecha 10", home:"U. LA PLATA", away:"B. HIPOTECARIO", gl:3, gv:1},
  {fecha:"Fecha 10", home:"BANCO CIUDAD", away:"M. GRANDE", gl:2, gv:1},
  {fecha:"Fecha 10", home:"BANFIELD", away:"HINDU CLUB", gl:1, gv:2},
  {fecha:"Fecha 10", home:"C.I.S.S.A.B.", away:"M. MORENO", gl:2, gv:2},
];
const FIXTURE_DATE_UPDATES = [
  // Fecha 25 cambió de día (era 17 oct, va 10 oct)
  {fecha:"Fecha 25", date:"sáb 10 oct 16:00", applyToAll:true},
  // Fecha 10: LANUS vs PUCARA se jugó a las 10:30
  {fecha:"Fecha 10", home:"LANUS", away:"PUCARA", date:"sáb 16 may 10:30"},
];
function applyFixtureMigration(currentFx) {
  const fx = JSON.parse(JSON.stringify(currentFx || []));
  let changed = false;
  // 1) Cargar resultados (sólo si no fueron cargados manualmente ya)
  for (const upd of FIXTURE_RESULT_UPDATES) {
    const fecha = fx.find(f => f.label === upd.fecha);
    if (!fecha) continue;
    const m = fecha.matches.find(mm => mm.home === upd.home && mm.away === upd.away);
    if (!m || m.played) continue;
    m.played = true;
    m.golesLocal = upd.gl;
    m.golesVisitante = upd.gv;
    m.applied = { golesLocal: upd.gl, golesVisitante: upd.gv, scorers: [], cards: [] };
    changed = true;
  }
  // 2) Corregir fechas
  for (const upd of FIXTURE_DATE_UPDATES) {
    const fecha = fx.find(f => f.label === upd.fecha);
    if (!fecha) continue;
    if (upd.applyToAll) {
      if (fecha.date !== upd.date) { fecha.date = upd.date; changed = true; }
      fecha.matches.forEach(m => { if (m.date !== upd.date) { m.date = upd.date; changed = true; } });
    } else {
      const m = fecha.matches.find(mm => mm.home === upd.home && mm.away === upd.away);
      if (m && m.date !== upd.date) { m.date = upd.date; changed = true; }
    }
  }
  return {fx, changed};
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [rivals,setRivals]=useState([]);
  const [standings,setStandings]=useState([]);
  const [scorers,setScorers]=useState([]);
  const [fixture,setFixture]=useState([]);
  const [cards,setCards]=useState([]);
  const [loaded,setLoaded]=useState(false);
  const [view,setView]=useState("home");
  const [subview,setSubview]=useState(null);
  const [selected,setSelected]=useState(null);
  const [passwordAdmin,setPasswordAdmin]=useState(false);
  const [googleUser,setGoogleUser]=useState(null); // {id, email, name, avatar, rol}
  const isAdmin = passwordAdmin || googleUser?.rol === "staff";
  const [showLogin,setShowLogin]=useState(false);
  useEffect(()=>{
    try { if(localStorage.getItem(ADMIN_AUTH_KEY)==="1") setPasswordAdmin(true); } catch {}
  },[]);
  // Auth Google: detectar callback, refrescar token y traer perfil
  useEffect(()=>{
    let cancelled = false;
    (async () => {
      consumeOAuthRedirect(); // si volvemos de Google, guarda los tokens
      const token = await getValidAccessToken();
      if (!token) return;
      const uid = _userIdFromToken(token);
      if (!uid) return;
      const profile = await fetchSupabaseProfile(token, uid);
      if (cancelled) return;
      if (profile) {
        setGoogleUser({
          id: uid,
          email: profile.email,
          name: profile.full_name || profile.email,
          avatar: profile.avatar_url,
          rol: profile.rol || "jugadora"
        });
      } else {
        // El perfil aún no existe (el trigger handle_new_user tarda un instante). Reintento corto.
        setTimeout(async () => {
          const p2 = await fetchSupabaseProfile(token, uid);
          if (!cancelled && p2) {
            setGoogleUser({ id: uid, email: p2.email, name: p2.full_name||p2.email, avatar: p2.avatar_url, rol: p2.rol||"jugadora" });
          }
        }, 1500);
      }
    })();
    // Refresh proactivo cada 30 min
    const refreshInterval = setInterval(()=>{ getValidAccessToken().catch(()=>{}); }, 30*60*1000);
    return ()=>{ cancelled = true; clearInterval(refreshInterval); };
  },[]);
  async function logout(){
    if(!confirm(googleUser ? "¿Cerrar sesión?" : "¿Cerrar sesión de staff?")) return;
    if (passwordAdmin) { try { localStorage.removeItem(ADMIN_AUTH_KEY); } catch {} setPasswordAdmin(false); }
    if (googleUser)    { await logoutSupabase(); setGoogleUser(null); }
    if(subview==="new"||subview==="edit"){ setSubview(null); setSelected(null); }
  }
  useEffect(()=>{
    Promise.all([load(KEYS.rivals),load(KEYS.standings),load(KEYS.scorers),load(KEYS.seeded),load(KEYS.fixture),load(KEYS.cards),load(KEYS.fixtureSeeded),load(FIXTURE_MIGRATION_KEY)]).then(async([r,s,sc,seeded,fx,cd,fxSeeded,migrationDone])=>{
      if(r) setRivals(r);
      if(cd) setCards(cd);
      // Sólo reseembrar si NO hay fixture (Supabase ni local). Esto evita pisar datos del usuario.
      let workingFx = fx;
      let workingStandings = s;
      if(!workingFx || workingFx.length===0){
        workingFx = buildInitialFixture();
        workingStandings = computeStandingsFromFixture(workingFx);
        await save(KEYS.fixture, workingFx);
        await save(KEYS.standings, workingStandings);
        await save(KEYS.fixtureSeeded, true);
      }
      // Migración: aplicar resultados nuevos (Fechas 9-10) y correcciones de fecha si nunca corrió
      if(!migrationDone && workingFx && workingFx.length>0){
        const {fx: migratedFx, changed} = applyFixtureMigration(workingFx);
        if(changed){
          workingFx = migratedFx;
          workingStandings = computeStandingsFromFixture(workingFx);
          await save(KEYS.fixture, workingFx);
          await save(KEYS.standings, workingStandings);
        }
        await save(FIXTURE_MIGRATION_KEY, true);
      }
      setFixture(workingFx);
      if(workingStandings) setStandings(workingStandings);
      // Si no hay goleadoras guardadas O nunca se sembró, cargar datos iniciales
      if(!seeded || !sc || sc.length===0) {
        setScorers(INITIAL_SCORERS);
        await save(KEYS.scorers, INITIAL_SCORERS);
        await save(KEYS.seeded, true);
      } else {
        setScorers(sc);
      }
      setLoaded(true);
    });
  },[]);
  function saveRival(r){
    const updated=rivals.find(x=>x.id===r.id)?rivals.map(x=>x.id===r.id?r:x):[...rivals,r];
    setRivals(updated);save(KEYS.rivals,updated);setSubview(null);setSelected(null);
  }
  function deleteRival(id){
    if(!confirm("¿Eliminar este análisis?"))return;
    const updated=rivals.filter(r=>r.id!==id);setRivals(updated);save(KEYS.rivals,updated);
  }
  function updateScorersFromPlanilla(goleadoras,rivalTeam){
    setScorers(prev=>{
      const updated=[...prev];
      goleadoras.forEach(g=>{
        if(!g.nombre)return;
        const idx=updated.findIndex(s=>s.name.toLowerCase()===g.nombre.toLowerCase());
        if(idx>=0){updated[idx]={...updated[idx],goals:updated[idx].goals+1,pj:updated[idx].pj||0,pc:(updated[idx].pc||0)+(g.tipo==="pc"?1:0)};}
        else{updated.push({name:g.nombre,team:rivalTeam||"",goals:1,pj:0,pc:g.tipo==="pc"?1:0});}
      });
      const sorted=[...updated].sort((a,b)=>b.goals-a.goals);save(KEYS.scorers,sorted);return sorted;
    });
  }
  const nav=[{id:"home",label:"Inicio",icon:"home"},{id:"rivals",label:"Rivales",icon:"shield"},{id:"fixture",label:"Fixture",icon:"calendar"},{id:"standings",label:"Tabla",icon:"chart"},{id:"scorers",label:"Goles",icon:"trophy"},{id:"cards",label:"Tarjetas",icon:"flag"}];
  const navBtn=id=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 2px",background:"none",border:"none",cursor:"pointer",color:view===id?C.accent:C.gray,fontSize:9,fontWeight:700,fontFamily:FF,letterSpacing:0.4,borderTop:`2px solid ${view===id?C.accent:"transparent"}`,transition:"color 0.15s"});
  if(!loaded)return(
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{width:48,height:48,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.accent}`,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{color:C.gray,fontFamily:FF,letterSpacing:2,fontSize:14}}>CARGANDO...</p>
    </div>
  );
  return(
    <AdminContext.Provider value={isAdmin}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"/>
      <SaveIndicator/>
      <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Barlow',sans-serif",color:C.white,maxWidth:800,margin:"0 auto",display:"flex",flexDirection:"column"}}>
        {/* Header */}
        <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"12px 18px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:100}}>
          <div style={{width:30,height:30,background:C.accent+"22",border:`2px solid ${C.accent}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🏑</div>
          <div><div style={{fontSize:14,fontWeight:700,color:C.white,fontFamily:FF,letterSpacing:1,lineHeight:1.1}}>CULP HOCKEY</div><div style={{fontSize:9,color:C.gray,letterSpacing:0.8}}>ANÁLISIS DE RIVALES · PRIMERA DAMAS</div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
            {googleUser ? (
              <button
                onClick={logout}
                title={`${googleUser.email} · ${isAdmin?"Staff":"Jugadora"} · click para cerrar sesión`}
                style={{background:isAdmin?C.green+"22":C.card2,border:`1px solid ${isAdmin?C.green+"66":C.border}`,borderRadius:20,padding:"3px 10px 3px 3px",cursor:"pointer",color:C.white,display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:600}}
              >
                {googleUser.avatar
                  ? <img src={googleUser.avatar} alt="" style={{width:24,height:24,borderRadius:"50%",objectFit:"cover"}} referrerPolicy="no-referrer"/>
                  : <div style={{width:24,height:24,borderRadius:"50%",background:C.accent+"33",border:`1px solid ${C.accent}66`,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,fontSize:11,fontWeight:700}}>{(googleUser.name||googleUser.email||"?").slice(0,1).toUpperCase()}</div>}
                <span style={{maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{(googleUser.name||googleUser.email).split(" ")[0]}</span>
                {isAdmin && <Icon name="check" size={11} color={C.green}/>}
              </button>
            ) : passwordAdmin ? (
              <button
                onClick={logout}
                title="Staff por contraseña · cerrar sesión"
                style={{background:C.green+"22",border:`1px solid ${C.green}66`,borderRadius:8,padding:"5px 8px",cursor:"pointer",color:C.green,display:"flex",alignItems:"center",gap:4,fontSize:10,fontWeight:700,fontFamily:FF,letterSpacing:0.5}}
              >
                <Icon name="check" size={12}/> STAFF
              </button>
            ) : (
              <button
                onClick={()=>setShowLogin(true)}
                title="Iniciar sesión"
                style={{background:C.accent+"22",border:`1px solid ${C.accent}66`,borderRadius:8,padding:"5px 10px",cursor:"pointer",color:C.accent,display:"flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,fontFamily:FF,letterSpacing:0.5}}
              >
                <Icon name="shield" size={12}/> INGRESAR
              </button>
            )}
          </div>
        </div>
        {/* Content */}
        <div style={{flex:1,padding:"18px 14px 80px",overflowY:"auto"}}>
          {view==="home"&&<Dashboard rivals={rivals} standings={standings} scorers={scorers} fixture={fixture} cards={cards} setView={setView}/>}
          {view==="rivals"&&!subview&&<RivalsView rivals={rivals} onNew={()=>{setSelected(null);setSubview("new");}} onView={r=>{setSelected(r);setSubview("detail");}} onEdit={r=>{setSelected(r);setSubview("edit");}} onDelete={deleteRival}/>}
          {view==="rivals"&&subview==="new"&&<RivalForm rival={null} onSave={saveRival} onCancel={()=>setSubview(null)} onUpdateScorers={updateScorersFromPlanilla}/>}
          {view==="rivals"&&subview==="edit"&&<RivalForm rival={selected} onSave={saveRival} onCancel={()=>{setSubview(null);setSelected(null);}} onUpdateScorers={updateScorersFromPlanilla}/>}
          {view==="rivals"&&subview==="detail"&&<RivalDetail rival={selected} onEdit={()=>setSubview("edit")} onBack={()=>{setSubview(null);setSelected(null);}}/>}
          {view==="standings"&&<StandingsView standings={standings} setStandings={setStandings} fixture={fixture}/>}
          {view==="scorers"&&<ScorersView scorers={scorers} setScorers={setScorers} rivals={rivals}/>}
          {view==="fixture"&&<FixtureView fixture={fixture} setFixture={setFixture} standings={standings} setStandings={setStandings} scorers={scorers} setScorers={setScorers} cards={cards} setCards={setCards} rivals={rivals} setRivals={setRivals}/>}
          {view==="cards"&&<CardsView cards={cards} setCards={setCards}/>}
        </div>
        {/* Bottom nav */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:800,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
          {nav.map(n=><button key={n.id} style={navBtn(n.id)} onClick={()=>{setView(n.id);setSubview(null);setSelected(null);}}><Icon name={n.icon} size={18}/>{n.label.toUpperCase()}</button>)}
        </div>
      </div>
      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onSuccess={()=>{setPasswordAdmin(true);setShowLogin(false);}}/>}
    </AdminContext.Provider>
  );
}
