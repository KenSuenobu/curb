DROP SCHEMA IF EXISTS curb CASCADE;
CREATE SCHEMA curb;

---

DROP TABLE IF EXISTS curb.user;
DROP INDEX IF EXISTS idx_unique_user;

CREATE TABLE curb.user (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id VARCHAR(80) NOT NULL,
    username VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    email_address VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX idx_unique_user ON curb.user(username);

---

DROP TABLE IF EXISTS curb.group;
DROP INDEX IF EXISTS idx_unique_group;

CREATE TABLE curb.group (
    id SERIAL NOT NULL PRIMARY KEY,
    group_name VARCHAR(255)
);

CREATE UNIQUE INDEX idx_unique_group ON curb.group(group_name);

---

DROP TABLE IF EXISTS curb.group_user;
DROP INDEX IF EXISTS idx_unique_group_user;

CREATE TABLE curb.group_user (
    group_id INT NOT NULL REFERENCES curb.group(id),
    user_id INT NOT NULL REFERENCES curb.user(id)
);

CREATE UNIQUE INDEX idx_unique_group_user ON curb.group_user(group_id, user_id);


---

DROP TABLE IF EXISTS curb.car_make CASCADE;
DROP INDEX IF EXISTS idx_car_make_unique;

CREATE TABLE curb.car_make (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_make_unique ON curb.car_make(name);

INSERT INTO curb.car_make (name)
     VALUES ('Abarth'),
            ('Acura'),
            ('Alfa Romeo'),
            ('Alpine'),
            ('Audi'),
            ('BMW'),
            ('Bentley'),
            ('Buick'),
            ('Byd'),
            ('Cadillac'),
            ('Can-Am'),
            ('Chevrolet'),
            ('Chrysler'),
            ('Citroen'),
            ('Cupra'),
            ('DS'),
            ('Dacia'),
            ('Delorean'),
            ('Dodge'),
            ('Ferrari'),
            ('Fiat'),
            ('Fisker'),
            ('Ford'),
            ('Freightliner'),
            ('Genesis'),
            ('GMC'),
            ('Gwm'),
            ('Haval'),
            ('Holden'),
            ('Honda'),
            ('Hummer'),
            ('Hyundai'),
            ('Infiniti'),
            ('Isuzu'),
            ('Jaguar'),
            ('Jeep'),
            ('Karma'),
            ('Kia'),
            ('Lamborghini'),
            ('Land Rover'),
            ('Ldv'),
            ('Lexus'),
            ('Lincoln'),
            ('Lotus'),
            ('Lucid'),
            ('Mazda'),
            ('Mercedes-Benz'),
            ('MG'),
            ('Maserati'),
            ('Mclaren'),
            ('MINI'),
            ('Mitsubishi'),
            ('Nissan'),
            ('Oldsmobile'),
            ('Peugeot'),
            ('Plymouth'),
            ('Polaris'),
            ('Pontiac'),
            ('Porsche'),
            ('Ram'),
            ('Renault'),
            ('Rivian'),
            ('Rolls-Royce'),
            ('Saab'),
            ('Saturn'),
            ('Scion'),
            ('SEAT'),
            ('Skoda'),
            ('Smart'),
            ('Ssangyong'),
            ('Subaru'),
            ('Suzuki'),
            ('Tesla'),
            ('Toyota'),
            ('Vanderhall'),
            ('Vauxhall'),
            ('Vinfast'),
            ('Volkswagen'),
            ('Volvo'),
            ('Zap');

---

DROP TABLE IF EXISTS curb.car_model CASCADE;
DROP INDEX IF EXISTS idx_car_model_unique;

CREATE TABLE curb.car_model (
    id SERIAL NOT NULL PRIMARY KEY,
    make_id INT NOT NULL REFERENCES curb.car_make(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_model_unique ON curb.car_model(make_id, name);

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Abarth'), 'F595'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '595'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '595C'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '695 Biposto'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '500C'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '500C esseesse'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '500 esseesse'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '500 695 Tributo Ferrari'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '124 GT'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '124 Spider');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Acura'), 'Integra Type S'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'Integra'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'MDX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'RDX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'TLX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'MDX A-Spec'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'ILX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'RLX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'NSX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'TL');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Tonale'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulia'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Stelvio'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulia GTA'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Stelvio Quadrofoglio'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulia Quadrofoglio'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'MiTo Veloce'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulietta'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulia Veloce'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'MiTo'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), '4C Spider'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), '4C'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'MiTo Quadrifoglio Verde'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulietta Quadrifoglio Verde');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Alpine'), 'A110 R'),
            ((SELECT id FROM curb.car_make WHERE name='Alpine'), 'A110'),
            ((SELECT id FROM curb.car_make WHERE name='Alpine'), 'A110 S');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS6'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'R8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'e-tron'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS 3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q2'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ2'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'TTS'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'TT'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S6'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A1'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A6'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q5L'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S1');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Honda'), 'e:Ny1'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'CR-V'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'ZR-V'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'HR-V'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Pilot'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Accord'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Civic'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Civic Type-R'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Civic e:HEV'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Ridgeline'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'e'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Fit / Jazz'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Odyssey'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Insight'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'NSX'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'S660'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Legend'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Crosstour');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'GT-R'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Sentra'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Leaf'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Sakura'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Altima'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'X-Trail'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Versa'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Frontier'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Pathfinder'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Qashqai'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Z'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Rogue'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Ariya'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Micra'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Armada'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Kicks'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Versa / Tiida'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Juke'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Maxima'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Murano'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Titan'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Serena'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Navara'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Pulsar'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), '370Z'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Patrol'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Note'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Quest'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Sunny'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'NV200'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Cube'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Teana'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Skyline'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Primera'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Grand Livina');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Grand Highlander'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Corolla'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Tacoma'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'C-HR'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Sequoia'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Crown'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Camry'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Supra'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Prius'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Mirai'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Aqua'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'GR 86'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'bZ4X'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Aygo X'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Tundra'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Yaris'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Sienna'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Venza'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Hilux'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Land Cruiser'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'TRD'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Avenis'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Vios'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Agya'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Etios Liva'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Fortuner');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.Buzz'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Atlas'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.3'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.7'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.4'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Touareg'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'T-Cross'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Arteon'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Amarok'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Golf'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Polo'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Tiguan'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Taigo'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Jetta'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'T-Roc'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Multivan'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Caddy'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Nivus'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Passat'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Beetle'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Scirocco'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Gol'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'CrossTouran'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'CrossGolf'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Vento'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Bora');

---

DROP TABLE IF EXISTS curb.car_year CASCADE;
DROP INDEX IF EXISTS idx_car_year_unique;

CREATE TABLE curb.car_year (
    id SERIAL NOT NULL PRIMARY KEY,
    model_id INT NOT NULL REFERENCES curb.car_model(id),
    year INT NOT NULL
);

CREATE UNIQUE INDEX idx_car_year_unique ON curb.car_year(model_id, year);

---

DROP TABLE IF EXISTS curb.car_trim CASCADE;
DROP INDEX IF EXISTS idx_car_trim_unique;

CREATE TABLE curb.car_trim (
    id SERIAL NOT NULL PRIMARY KEY,
    year_id INT NOT NULL REFERENCES curb.car_year(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_trim_unique ON curb.car_trim(year_id, name);

---

DROP TABLE IF EXISTS curb.car_trim_info CASCADE;
DROP INDEX IF EXISTS idx_car_trim_info_unique;

CREATE TABLE curb.car_trim_info (
    id SERIAL NOT NULL PRIMARY KEY,
    trim_id INT NOT NULL REFERENCES curb.car_trim(id),
    data JSONB
);

CREATE UNIQUE INDEX idx_car_trim_info_unique ON curb.car_trim_info(trim_id);

---

DROP TABLE IF EXISTS curb.fleet CASCADE;
DROP INDEX IF EXISTS idx_fleet_unique;

CREATE TABLE curb.fleet (
    id SERIAL NOT NULL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES curb.group(id),
    name VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX idx_fleet_unique ON curb.fleet(name);

---

DROP TABLE IF EXISTS curb.fleet_car CASCADE;

CREATE TABLE curb.fleet_car (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_id INT NOT NULL REFERENCES curb.fleet(id),
    car_trim_id INT NOT NULL REFERENCES curb.car_trim(id),
    data JSONB
);

---

DROP TABLE IF EXISTS curb.car_fleet_loan;
DROP INDEX IF EXISTS idx_car_fleet_loan_unique;

CREATE TABLE curb.fleet_car_loan (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
    data JSONB
);

--- Cars cannot technically have more than one loan ... ?
CREATE UNIQUE INDEX idx_car_fleet_loan_unique ON curb.fleet_car_loan(fleet_car_id);

---

DROP TABLE IF EXISTS curb.loan_payment;

CREATE TABLE curb.loan_payment (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_car_loan_id INT NOT NULL REFERENCES curb.fleet_car_loan(id),
    payment_date DATE NOT NULL DEFAULT NOW(),
    principal_amount FLOAT NOT NULL,
    interest_amount FLOAT NOT NULL,
    total_amount FLOAT NOT NULL
);


-- DROP TABLE IF EXISTS curb.address CASCADE;
--
-- CREATE TABLE curb.address (
--     id SERIAL NOT NULL PRIMARY KEY,
--     address_1 VARCHAR(255) NOT NULL,
--     address_2 VARCHAR(255) NOT NULL,
--     city VARCHAR(255) NOT NULL,
--     state_province VARCHAR(255) NOT NULL,
--     zipcode VARCHAR(40) NOT NULL,
--     country VARCHAR(100) NOT NULL
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.phone CASCADE;
-- DROP TYPE IF EXISTS phone_type;
--
-- CREATE TYPE phone_type AS ENUM ('physical', 'cell_phone', 'fax');
--
-- CREATE TABLE curb.phone (
--     id SERIAL NOT NULL PRIMARY KEY,
--     phone_number VARCHAR(200) NOT NULL,
--     country VARCHAR(100) NOT NULL,
--     phone_type phone_type NOT NULL DEFAULT 'cell_phone'
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.contact CASCADE;
-- DROP INDEX IF EXISTS idx_contact_unique;
--
-- CREATE TABLE curb.contact (
--     id SERIAL NOT NULL PRIMARY KEY,
--     first_name VARCHAR(200) NOT NULL,
--     middle_name VARCHAR(200),
--     last_name VARCHAR(200) NOT NULL,
--     other_name VARCHAR(200) NOT NULL,
--     address_id INT NOT NULL REFERENCES curb.address(id),
--     phone_id INT NOT NULL REFERENCES curb.phone(id)
-- );
--
-- CREATE UNIQUE INDEX idx_contact_unique ON curb.contact(UPPER(first_name), UPPER(last_name), address_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.user CASCADE;
-- DROP INDEX IF EXISTS idx_curb_unique_user;
--
-- CREATE TABLE curb.user (
--     id SERIAL NOT NULL PRIMARY KEY,
--     username VARCHAR(40) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     email_address VARCHAR(1024) NOT NULL,
--     contact_id INT NOT NULL REFERENCES curb.contact(id)
-- );
--
-- CREATE UNIQUE INDEX idx_curb_unique_user ON curb.user(UPPER(username));
--
-- ---
--
-- DROP TABLE IF EXISTS curb.insurance_carrier CASCADE;
-- DROP INDEX IF EXISTS idx_insurance_carrier_name_unique;
--
-- CREATE TABLE curb.insurance_carrier (
--     id SERIAL NOT NULL PRIMARY KEY,
--     name VARCHAR(200) NOT NULL,
--     phone_id INT NOT NULL REFERENCES curb.phone(id),
--     address_id INT NOT NULL REFERENCES curb.address(id)
-- );
--
-- CREATE UNIQUE INDEX idx_insurance_carrier_name_unique ON curb.insurance_carrier(UPPER(name));
--
-- ---
--
-- DROP TABLE IF EXISTS curb.insurance;
-- DROP INDEX IF EXISTS idx_insurance_unique;
--
-- CREATE TABLE curb.insurance (
--     id SERIAL NOT NULL PRIMARY KEY,
--     insurance_carrier_id INT NOT NULL REFERENCES curb.insurance_carrier(id),
--     insurance_id VARCHAR(100) NOT NULL,
--     origination_date DATE NOT NULL,
--     expiration_date DATE NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_insurance_unique ON curb.insurance(insurance_carrier_id, insurance_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.registration;
-- DROP INDEX IF EXISTS idx_registration_unique;
--
-- CREATE TABLE curb.registration (
--     id SERIAL NOT NULL PRIMARY KEY,
--     registration_number VARCHAR(200) NOT NULL,
--     expire_date DATE NOT NULL,
--     registration_state_province VARCHAR(200) NOT NULL,
--     contact_id INT NOT NULL REFERENCES curb.contact(id)
-- );
--
-- CREATE UNIQUE INDEX idx_registration_unique ON curb.registration(registration_number, registration_state_province, contact_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car;
-- DROP INDEX IF EXISTS idx_car_unique;
--
-- CREATE TABLE curb.car (
--     id SERIAL NOT NULL PRIMARY KEY,
--     nickname VARCHAR(200) NOT NULL,
--     car_remote_url VARCHAR(200) NOT NULL,
--     car_year INT NOT NULL,
--     car_make VARCHAR(200) NOT NULL,
--     car_model VARCHAR(200) NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_car_unique ON curb.car(nickname, car_remote_url);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_owner;
-- DROP INDEX IF EXISTS idx_car_owner_unique;
--
-- CREATE TABLE curb.car_owner (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     owner_id INT NOT NULL REFERENCES curb.contact(id),
--     percentage FLOAT NOT NULL DEFAULT 100.0
-- );
--
-- CREATE UNIQUE INDEX idx_car_owner_unique ON curb.car_owner(car_id, owner_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_storage;
-- DROP INDEX IF EXISTS idx_car_storage;
--
-- CREATE TABLE curb.car_storage (
--     id SERIAL NOT NULL PRIMARY KEY,
--     phone_id INT NOT NULL REFERENCES curb.phone(id),
--     contact_id INT NOT NULL REFERENCES curb.contact(id),
--     address_id INT NOT NULL REFERENCES curb.address(id),
--     physical_address_id INT NOT NULL REFERENCES curb.address(id),
--     location_description VARCHAR(4096) NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_car_storage ON curb.car_storage(physical_address_id, UPPER(location_description));
--
-- ---
--
-- DROP TABLE IF EXISTS curb.note;
--
-- CREATE TABLE curb.note (
--     id SERIAL NOT NULL PRIMARY KEY,
--     description TEXT NOT NULL,
--     note_cost FLOAT,
--     note_date TIMESTAMP NOT NULL
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.infraction;
-- DROP TYPE IF EXISTS infraction_type;
--
-- CREATE TYPE infraction_type AS ENUM (
--     'normal_wear_and_tear',
--     'excessive_wear_and_tear',
--     'intentional_damage_vandalism',
--     'smoking_vaping',
--     'speeding_vehicle_misuse',
--     'minor_accident',
--     'major_accident',
--     'total_loss',
--     'exception'
-- );
--
-- CREATE TABLE curb.infraction (
--     id SERIAL NOT NULL PRIMARY KEY,
--     infraction_type infraction_type NOT NULL,
--     note_id INT NOT NULL REFERENCES curb.note(id)
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.photo;
-- DROP TYPE IF EXISTS photo_type;
--
-- CREATE TYPE photo_type AS ENUM (
--     'car_interior',
--     'car_exterior',
--     'car_before',
--     'car_after',
--     'car_claim',
--     'car_initial_interior',
--     'car_initial_exterior',
--     'renter_dl',
--     'renter_selfie_and_dl',
--     'renter_selfie_and_car'
-- );
--
-- CREATE TABLE curb.photo (
--     id SERIAL NOT NULL PRIMARY KEY,
--     photo_type photo_type NOT NULL,
--     photo_url VARCHAR(1024) NOT NULL
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_photo;
-- DROP INDEX IF EXISTS idx_car_photo_unique;
--
-- CREATE TABLE curb.car_photo (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     photo_id INT NOT NULL REFERENCES curb.photo(id),
--     photo_time TIMESTAMP NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_car_photo_unique ON curb.car_photo(car_id, photo_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.incidental;
-- DROP INDEX IF EXISTS idx_incidental_unique;
--
-- CREATE TABLE curb.incidental (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     photo_id INT NOT NULL REFERENCES curb.photo(id),
--     note_id INT NOT NULL REFERENCES curb.note(id)
-- );
--
-- CREATE UNIQUE INDEX idx_incidental_unique ON curb.incidental(car_id, photo_id, note_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_registration;
-- DROP INDEX IF EXISTS idx_car_registration_unique;
--
-- CREATE TABLE curb.car_registration (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     registration_id INT NOT NULL REFERENCES curb.registration(id)
-- );
--
-- CREATE UNIQUE INDEX idx_car_registration_unique ON curb.car_registration(car_id, registration_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.drivers_license;
-- DROP INDEX IF EXISTS idx_drivers_license_unique;
--
-- CREATE TABLE curb.drivers_license (
--     id SERIAL NOT NULL PRIMARY KEY,
--     contact_id INT NOT NULL REFERENCES curb.contact(id),
--     photo_id INT NOT NULL REFERENCES curb.photo(id),
--     license_number VARCHAR(200) NOT NULL,
--     issuing_state_province VARCHAR(200) NOT NULL,
--     issuing_country VARCHAR(200) NOT NULL,
--     birth_date DATE NOT NULL,
--     expiration_date DATE NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_drivers_license_unique ON curb.drivers_license(contact_id, license_number);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.renter;
-- DROP INDEX IF EXISTS idx_renter_unique;
--
-- CREATE TABLE curb.renter (
--     id SERIAL NOT NULL PRIMARY KEY,
--     contact_id INT NOT NULL REFERENCES curb.contact(id),
--     drivers_license_id INT NOT NULL REFERENCES curb.drivers_license(id),
--     photo_id INT NOT NULL REFERENCES curb.photo(id),
--     birth_date DATE NOT NULL,
--     renter_url VARCHAR(1024) NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_renter_unique ON curb.renter(drivers_license_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.trip;
--
-- CREATE TABLE curb.trip (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     start_time TIMESTAMP NOT NULL,
--     end_time TIMESTAMP NOT NULL,
--     payout FLOAT NOT NULL DEFAULT 0.00
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.trip_photo;
-- DROP INDEX IF EXISTS idx_trip_photo_unique;
--
-- CREATE TABLE curb.trip_photo (
--     id SERIAL NOT NULL PRIMARY KEY,
--     trip_id INT NOT NULL REFERENCES curb.trip(id),
--     photo_id INT NOT NULL REFERENCES curb.photo(id),
--     photo_date DATE NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_trip_photo_unique ON curb.trip_photo(trip_id, photo_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.trip_renter;
-- DROP INDEX IF EXISTS idx_trip_renter_unique;
-- DROP TYPE IF EXISTS trip_renter_type;
--
-- CREATE TYPE trip_renter_type AS ENUM (
--     'primary',
--     'authorized'
-- );
--
-- CREATE TABLE curb.trip_renter (
--     id SERIAL NOT NULL PRIMARY KEY,
--     trip_id INT NOT NULL REFERENCES curb.trip(id),
--     renter_id INT NOT NULL REFERENCES curb.renter(id)
-- );
--
-- CREATE UNIQUE INDEX idx_trip_renter_unique ON curb.trip_renter(trip_id, renter_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.trip_infraction;
-- DROP INDEX IF EXISTS idx_trip_infraction_unique;
--
-- CREATE TABLE curb.trip_infraction (
--     id SERIAL NOT NULL PRIMARY KEY,
--     trip_renter_id INT NOT NULL REFERENCES curb.trip_renter(id),
--     infraction_id INT NOT NULL REFERENCES curb.infraction(id)
-- );
--
-- CREATE UNIQUE INDEX idx_trip_infraction_unique ON curb.trip_infraction(trip_renter_id, infraction_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.renter_note;
-- DROP INDEX IF EXISTS idx_renter_note_unique;
--
-- CREATE TABLE curb.renter_note (
--     id SERIAL NOT NULL PRIMARY KEY,
--     renter_id INT NOT NULL REFERENCES curb.renter(id),
--     note_id INT NOT NULL REFERENCES curb.note(id)
-- );
--
-- CREATE UNIQUE INDEX idx_renter_note_unique ON curb.renter_note(renter_id, note_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_condition_photo;
--
-- CREATE TABLE curb.car_condition_photo (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     photo_id INT NOT NULL REFERENCES curb.photo(id),
--     note_id INT NOT NULL REFERENCES curb.note(id)
-- );
--
-- CREATE UNIQUE INDEX idx_car_condition_photo_unique ON curb.car_condition_photo(car_id, photo_id, note_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_insurance;
-- DROP INDEX IF EXISTS idx_car_insurance_unique;
--
-- CREATE TABLE curb.car_insurance (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     insurance_id INT NOT NULL REFERENCES curb.insurance(id)
-- );
--
-- CREATE UNIQUE INDEX idx_car_insurance_unique ON curb.car_insurance(car_id, insurance_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_investment;
--
-- CREATE TABLE curb.car_investment (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     contact_id INT NOT NULL REFERENCES curb.contact(id),
--     percentage FLOAT NOT NULL DEFAULT 100.0,
--     investment_amount FLOAT NOT NULL DEFAULT 0.00
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.toll_transponder;
--
-- CREATE TABLE curb.toll_transponder (
--     id SERIAL NOT NULL PRIMARY KEY,
--     car_id INT NOT NULL REFERENCES curb.car(id),
--     transponder_id VARCHAR(80) NOT NULL,
--     transponder_login VARCHAR(1024) NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_toll_transponder_unique ON curb.toll_transponder(car_id, UPPER(transponder_id));
--
-- ---
--
-- DROP TABLE IF EXISTS curb.trip_toll;
--
-- CREATE TABLE curb.trip_toll (
--     id SERIAL NOT NULL PRIMARY KEY,
--     transponder_id INT NOT NULL REFERENCES curb.toll_transponder(id),
--     trip_id INT NOT NULL REFERENCES curb.trip(id),
--     note_id INT NOT NULL REFERENCES curb.note(id)
-- );
--
