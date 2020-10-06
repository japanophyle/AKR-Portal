
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL UNIQUE,
	"auth_level" varchar(255)
);

CREATE TABLE "dojo" (
	"id" serial PRIMARY KEY,
	"dojo_name" varchar(255) NOT NULL,
	"region_name" varchar(255) NOT NULL,
	"image" varchar(1000),
	"description" TEXT
);

CREATE TABLE "ranks" (
	"id" SERIAL PRIMARY KEY,
	"rank_name" VARCHAR(30),
	"date_rank_made" DATE,
	"user_id" INT REFERENCES "user_data" ON DELETE CASCADE
);

CREATE TABLE "user_data" (
	"id" serial PRIMARY KEY,
	"fname" varchar(255) NOT NULL,
	"lname" varchar(255) NOT NULL,
	"user_id" INT REFERENCES "user" ON DELETE CASCADE NOT NULL,
	"email" varchar(255),
	"phone_number" bigint NOT NULL,
	"dojo_id" INT REFERENCES "dojo" ON DELETE CASCADE,
	"fname_japanese" varchar(255),
	"lname_japanese" varchar(255),
	"student_rank" varchar(20) DEFAULT 'Shodan',
	"date_student_rank" DATE,
	"teaching_rank" varchar(20),
	"date_teaching_rank" DATE,
	"ikyf" varchar(255),
	"age" varchar(255),
	"years_practice" varchar(255),
	"address_1" varchar(255) NOT NULL,
	"address_2" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"zipcode" varchar(255) NOT NULL,
	"gender" varchar(255),
	"date_of_birth" DATE NOT NULL,
	"date_began_kyudo" DATE,
	"citizenship" varchar(255),
	"equipment_checkout" TEXT,
	"notes" TEXT,
	"is_current_member" BOOLEAN,
	"dues_amount" MONEY,
	"dues_date" DATE,
	"dues_method" varchar(255),
	"amount_paid" MONEY,
	"usa_archery_id" varchar(255),
	"include_for_akr" BOOLEAN
);

INSERT INTO "dojo" ("dojo_name", "region_name")
VALUES ('Buenos Aires Kyudo', 'Argentina'), ('Arizona Kyudo Kai', 'Arizona'), ('Kyūdō Kai', 'Brasil'), ('Cristián Ferrada Tuset', 'Chile'), ('Reimyo Kyudojo', 'Florida'), ('Ichiya Kyudojo', 'Florida'), ('Tampa Kyudo Dojo', 'Florida'), ('Kashimon Dojo', 'Florida'), ('Bi Toku Kyudo Kai', 'Georgia'), ('Shingetsu Kyudo Kai', 'Georgia'), ('Fuji Kyudojo', 'Georgia'), ('Indiana Kyudo Renmei', 'Indiana'), ('Iowa Kyudo Kai', 'Iowa'), ('Mystique Kyudo Dokokai', 'Maine'), ('Mushin Kyudo Kai', 'Mexico'), ('Zendo Teotihuacan', 'Mexico'), ('Kyudo en la UNAM', 'Mexico'), ('Kyudo Kai Mexico', 'Mexico'), ('Minnesota Kyudo Renmei', 'Minnesota'), ('Nevada Kyudo Kai', 'Nevada'), ('New York/ New Jersey Kyudo Kai', 'New York/ New Jersey'), ('North Carolina Kyudo Renmei', 'North Carolina'), ('Shiseikan Dojo', 'Northern California'), ('Seishinkan Dojo', 'Northern California'), ('Renseikan Dojo', 'Northern California'), ('Redwood Kyudojo', 'Northern California'), ('Kyudo Kai PA', 'Panama'), ('Kyudokai Asuncion ', 'Paraguay'), ('South Carolina Kyudo Renmei', 'South Carolina'), ('Shin Kan Dojo', 'Southern California'), ('San Deigo Kyudo', 'Southern California'), ('Austin Kyudo', 'Texas'), ('Uruguay Kyudo Kai', 'Uruguay'), ('Virginia Kyudo Renmei', 'Virginia'), ('Washington Kyudo Club: Greater Seattle Area', 'Washington'), ('Milwaukee Kyudo Kai', 'Wisconsion');


