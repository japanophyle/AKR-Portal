INSERT INTO user (id, auth_level, username, password) 
VALUES
  (100001, 0, 'lpotter', '$2a$10$DJ257GzOQnwggy4uLLBXZ.Vwttiy3Kq.YeMws9y9a14NvNNIeP1Ae'),
  (100002, 0, 'jpotter', '$2a$10$3StRDfd9n45SVwoItShAgedZfS29uLyLTA9KYEd1PbuA8Zw/CZghC'),
  (100003, 5, 'hpotter', '$2a$10$06M4YX4zPB.g04vVPxTIm.jEZnxo6w20SY4K/fLmMufHxzh5vFWHW'),
  (100004, 10, 'dojo_admin', '$2a$10$sioeYcWDHn.vQoWhuFM2DeocyxF2kqnkJhf7X/g1Rd0dkhTH63SEy'),
  (100005, 5, 'rweasley', '$2a$10$fbZHvFkIBL9eTCMVuqX/8ec/YZP6zfveGqM2wQLPgsAL609cUWJJa'),  
  (100006, 5, 'hgranger', '$2a$10$5uyblg/mrrPS4RqBrCkv0.rvI1wZhMX3avyLK4DpYJly9kbKzEgfy'),  
  (100007, 20, 'site_admin', '$2a$10$9ehV6BTpT4DMYzeURsIv.OqQKRFmYhj.zlsmIWFmc0ZPWeEvXUCeO');  

INSERT INTO dojo (id, dojo_name, region_name)
VALUES ('200001', 'Test Dojo', 'Test Region');

INSERT INTO user_data (user_id, fname, lname, email, phone_number,
    dojo_id, student_rank, date_student_rank,
    address_1, city, state, country, zipcode,
    date_of_birth, citizenship )
VALUES 
('100001', 'Lilly', 'Potter', 'lilpot@hogwarts.edu', '221-332-4433', 
    '200001', 'Mudan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
    STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA'),
('100002', 'James', 'Potter', 'prongs@hogwarts.edu', '221-332-4433', 
    '200001', 'Mudan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
    STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA'),
('100003', 'Harry', 'Potter', 'thelasthorcrux@hogwarts.edu', '221-332-4433', 
    '200001', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
    STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA'),
('100004', 'Sirius', 'Black', 'padfoot@hogwarts.edu', '221-332-4433', 
    '200001', 'Yondan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
    STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA'),
('100005', 'Ron', 'Weasley', 'captainchaser@hogwarts.edu', '221-332-4433', 
    '200001', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
    STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA'),
('100006', 'Hermoine', 'Granger', 'ilovebooks@hogwarts.edu', '221-332-4433', 
    '200001', 'Nidan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
      STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA'),
('100007', 'Albus', 'Dumbledore', 'dumbledore@hogwarts.edu', '221-332-4433', 
    '200001', 'Rokudan', STR_TO_DATE('01-07-2005', '%d-%m-%Y'),
    '123 Godricks ln', 'Godricks Hollow', 'MN', 'United States', '55444', 
      STR_TO_DATE('20-01-1975', '%d-%m-%Y'), 'USA');