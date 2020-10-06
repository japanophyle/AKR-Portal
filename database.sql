
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL UNIQUE,
	"auth_level" integer
);
CREATE TABLE "region" (
	"id" serial PRIMARY KEY,
	"region_name" varchar(255)
);
CREATE TABLE "dojo" (
	"id" serial PRIMARY KEY,
	"dojo_name" varchar(255) NOT NULL,
	"region_id" int references "region" ON DELETE CASCADE,
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
	"phone_number" integer NOT NULL,
	"dojo_id" INT REFERENCES "dojo" ON DELETE CASCADE,
	"fname_japanese" varchar(255),
	"lname_japanese" varchar(255),
	"student_rank" varchar(20) DEFAULT 'Shodan',
	"date_student_rank" DATE,
	"teaching_rank" varchar(20),
	"date_teaching_rank" DATE,
	"ikyf" integer,
	"age" integer,
	"years_practice" integer,
	"address_1" varchar(255) NOT NULL,
	"address_2" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"zipcode" integer NOT NULL,
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
	"usa_archery_id" integer,
	"include_for_akr" BOOLEAN
);