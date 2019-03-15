CREATE TABLE general_user
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    displayname VARCHAR(20) NOT NULL
);

#Create a recipe table
CREATE TABLE recipe
(
    id SERIAL PRIMARY KEY NOT NULL,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_description TEXT NOT NULL,
    ingrediants TEXT[],
    directions TEXT NOT NULL
);

INSERT INTO recipe(recipe_name, recipe_description, ingrediants, directions)
VALUES('yummy food', 'its really yummy I promise', '{"good stuff", "better stuff", "unhealthy stuff"}', 
'Put it in the oven and hope it works');

INSERT INTO recipe(recipe_name, recipe_description, ingrediants, directions)
VALUES('healthy food', 'its really healthy', '{"healthy stuff", "vegetables", "sadness"}', 
'Dont eat it. Youl probably be sad');

INSERT INTO general_user(username) VALUES('iambrad');

SELECT recipe_name, recipe_description FROM recipe;

CREATE user lilchefuser WITH PASSWORD 'masterchef';
GRANT SELECT, INSERT, UPDATE ON general_user TO lilchefuser;
GRANT USAGE, SELECT ON SEQUENCE general_user_id_seq TO lilchefuser;