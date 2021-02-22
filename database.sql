
CREATE TABLE user (
	id serial PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL UNIQUE,
	auth_level integer(255)
);

CREATE TABLE dojo (
	id serial PRIMARY KEY,
	dojo_name VARCHAR(255) NOT NULL,
	region_name VARCHAR(255) NOT NULL,
	image VARCHAR(1000),
	description TEXT
);

CREATE TABLE ranks (
	id SERIAL PRIMARY KEY,
	rank_name VARCHAR(30),
	date_rank_made DATE,
	user_id INT REFERENCES user ON DELETE CASCADE
);

CREATE TABLE user_data (
	id serial PRIMARY KEY,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	user_id INT NOT NULL REFERENCES user ON DELETE CASCADE,
	email VARCHAR(255),
	phone_number VARCHAR(255) NOT NULL,
	dojo_id INT REFERENCES dojo ON DELETE SET NULL,
	fname_japanese VARCHAR(255),
	lname_japanese VARCHAR(255),
	student_rank VARCHAR(20) DEFAULT 'Mudan',
	date_student_rank DATE,
	teaching_rank VARCHAR(20),
	date_teaching_rank DATE,
	ikyf VARCHAR(255),
	age VARCHAR(255),
	years_practice VARCHAR(255),
	address_1 VARCHAR(255) NOT NULL,
	address_2 VARCHAR(255),
	city VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL,
	country VARCHAR(255) NOT NULL,
	zipcode VARCHAR(255) NOT NULL,
	gender VARCHAR(255),
	date_of_birth DATE NOT NULL,
	date_began_kyudo DATE,
	citizenship VARCHAR(255),
	equipment_checkout TEXT,
	notes TEXT,
	is_current_member BOOLEAN DEFAULT false,
	dues_amount DECIMAL(19,4),
	dues_date DATE,
	dues_method VARCHAR(255),
	amount_paid DECIMAL(19,4),
	usa_archery_id VARCHAR(255),
	include_for_akr BOOLEAN
);

INSERT INTO dojo (dojo_name, region_name)
VALUES ('Buenos Aires Kyudo', 'Argentina'), ('Arizona Kyudo Kai', 'Arizona'), ('Kyūdō Kai', 'Brasil'), ('Cristián Ferrada Tuset', 'Chile'), ('Reimyo Kyudojo', 'Florida'), ('Ichiya Kyudojo', 'Florida'), ('Tampa Kyudo Dojo', 'Florida'), ('Kashimon Dojo', 'Florida'), ('Bi Toku Kyudo Kai', 'Georgia'), ('Shingetsu Kyudo Kai', 'Georgia'), ('Fuji Kyudojo', 'Georgia'), ('Indiana Kyudo Renmei', 'Indiana'), ('Iowa Kyudo Kai', 'Iowa'), ('Mystique Kyudo Dokokai', 'Maine'), ('Mushin Kyudo Kai', 'Mexico'), ('Zendo Teotihuacan', 'Mexico'), ('Kyudo en la UNAM', 'Mexico'), ('Kyudo Kai Mexico', 'Mexico'), ('Minnesota Kyudo Renmei', 'Minnesota'), ('Nevada Kyudo Kai', 'Nevada'), ('New York/ New Jersey Kyudo Kai', 'New York/ New Jersey'), ('North Carolina Kyudo Renmei', 'North Carolina'), ('Shiseikan Dojo', 'Northern California'), ('Seishinkan Dojo', 'Northern California'), ('Renseikan Dojo', 'Northern California'), ('Redwood Kyudojo', 'Northern California'), ('Kyudo Kai PA', 'Panama'), ('Kyudokai Asuncion ', 'Paraguay'), ('South Carolina Kyudo Renmei', 'South Carolina'), ('Shin Kan Dojo', 'Southern California'), ('San Deigo Kyudo', 'Southern California'), ('Austin Kyudo', 'Texas'), ('Uruguay Kyudo Kai', 'Uruguay'), ('Virginia Kyudo Renmei', 'Virginia'), ('Washington Kyudo Club: Greater Seattle Area', 'Washington'), ('Milwaukee Kyudo Kai', 'Wisconsion');

INSERT INTO user_data (
fname,
lname,
user_id,
email,
phone_number,
dojo_id,
student_rank,
date_student_rank,
address_1,
city,
state,
country,
zipcode,
date_of_birth,
citizenship )
VALUES 
('Lilly', 'Potter', '23', 'lilpot@hogwarts.edu', '221-332-4433', '19', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
'123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 
 'USA'),
('James', 'Potter', '19', 'prongs@hogwarts.edu', '221-332-4433', '19', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
'123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 
 'USA'),
('Harry', 'Potter', '18', 'thelasthorcrux@hogwarts.edu', '221-332-4433', '19', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
'123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 
 'USA'),
('Sirius', 'Black', '22', 'padfoot@hogwarts.edu', '221-332-4433', '19', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
'123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 
 'USA'),
('Ron', 'Weasley', '21', 'captainchaser@hogwarts.edu', '221-332-4433', '19', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
'123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 
 'USA'),
('Hermoine', 'Granger', '20', 'ilovebooks@hogwarts.edu', '221-332-4433', '19', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
'123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 
 'USA');
