CREATE TABLE general_user
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    displayname VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL
);

#Create a recipe table
CREATE TABLE recipe
(
    id SERIAL PRIMARY KEY NOT NULL,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_description TEXT NOT NULL,
    ingrediants TEXT[],
    directions TEXT NOT NULL,
    cookbook_id INT REFERENCES cookbook(id)
);

CREATE TABLE cookbook
(
    id SERIAL PRIMARY KEY NOT NULL,
    cookbook_name VARCHAR(100) NOT NULL,
    cookbook_description TEXT NOT NULL,
    cookbook_admin INT REFERENCES general_user(id)
);

INSERT INTO recipe(recipe_name, recipe_description, ingrediants, directions, cookbook_id)
VALUES('yummy food', 'its really yummy I promise', '{"good stuff", "better stuff", "unhealthy stuff"}', 
'Put it in the oven and hope it works', 1);

INSERT INTO recipe(recipe_name, recipe_description, ingrediants, directions, cookbook_id)
VALUES('healthy food', 'its really healthy', '{"healthy stuff", "vegetables", "sadness"}', 
'Dont eat it. Youl probably be sad', 2);

INSERT INTO general_user(username, displayname, password) VALUES('testuser', 'thelilchef', '123abc');

INSERT INTO cookbook(cookbook_name, cookbook_description, cookbook_admin) 
VALUES('Comfort Food Delights', 'The best and most unhealthy food a man could ever hope for', 1);

INSERT INTO cookbook(cookbook_name, cookbook_description, cookbook_admin) 
VALUES('Tasty Diets', 'Who said being healthy cant also be yummy? This book is here to prove you wrong', 1);

SELECT recipe_name, recipe_description FROM recipe;

CREATE user lilchefuser WITH PASSWORD 'masterchef';
GRANT SELECT, INSERT, UPDATE ON general_user TO lilchefuser;
GRANT USAGE, SELECT ON SEQUENCE general_user_id_seq TO lilchefuser;