DROP SCHEMA IF EXISTS curb CASCADE;
CREATE SCHEMA curb;

---

DROP TABLE IF EXISTS curb.address CASCADE;

CREATE TABLE curb.address (
    id SERIAL NOT NULL PRIMARY KEY,
    address_1 VARCHAR(255) NOT NULL,
    address_2 VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state_province VARCHAR(255) NOT NULL,
    zipcode VARCHAR(40) NOT NULL,
    country VARCHAR(100) NOT NULL
);

---

DROP TABLE IF EXISTS curb.phone CASCADE;

CREATE TYPE phone_type AS ENUM ('physical', 'cell_phone', 'fax');

CREATE TABLE curb.phone (
    id SERIAL NOT NULL PRIMARY KEY,
    phone_number VARCHAR(200) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone_type phone_type NOT NULL DEFAULT 'cell_phone'
);

---

DROP TABLE IF EXISTS curb.contact CASCADE;
DROP INDEX IF EXISTS idx_contact_unique;

CREATE TABLE curb.contact (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    middle_name VARCHAR(200),
    last_name VARCHAR(200) NOT NULL,
    address_id INT NOT NULL REFERENCES curb.address(id),
    phone_id INT NOT NULL REFERENCES curb.phone(id)
);

CREATE UNIQUE INDEX idx_contact_unique ON curb.contact(UPPER(first_name), UPPER(last_name), address_id);

---

DROP TABLE IF EXISTS curb.user CASCADE;
DROP INDEX IF EXISTS idx_curb_unique_user;

CREATE TABLE curb.user (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_address VARCHAR(1024) NOT NULL,
    contact_id INT NOT NULL REFERENCES curb.contact(id)
);

CREATE UNIQUE INDEX idx_curb_unique_user ON curb.user(UPPER(username));

---

DROP TABLE IF EXISTS curb.insurance_carrier CASCADE;
DROP INDEX IF EXISTS idx_insurance_carrier_name_unique;

CREATE TABLE curb.insurance_carrier (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone_id INT NOT NULL REFERENCES curb.phone(id),
    address_id INT NOT NULL REFERENCES curb.address(id)
);

CREATE UNIQUE INDEX idx_insurance_carrier_name_unique ON curb.insurance_carrier(UPPER(name));

---

DROP TABLE IF EXISTS curb.insurance;
DROP INDEX IF EXISTS idx_insurance_unique;

CREATE TABLE curb.insurance (
    id SERIAL NOT NULL PRIMARY KEY,
    insurance_carrier_id INT NOT NULL REFERENCES curb.insurance_carrier(id),
    insurance_id VARCHAR(100) NOT NULL,
    origination_date DATE NOT NULL,
    expiration_date DATE NOT NULL
);

CREATE UNIQUE INDEX idx_insurance_unique ON curb.insurance(insurance_carrier_id, insurance_id);

---

DROP TABLE IF EXISTS curb.registration;
DROP INDEX IF EXISTS idx_registration_unique;

CREATE TABLE curb.registration (
    id SERIAL NOT NULL PRIMARY KEY,
    registration_number VARCHAR(200) NOT NULL,
    expire_date DATE NOT NULL,
    registration_state_province VARCHAR(200) NOT NULL,
    contact_id INT NOT NULL REFERENCES curb.contact(id)
);

CREATE UNIQUE INDEX idx_registration_unique ON curb.registration(registration_number, registration_state_province, contact_id);

---

DROP TABLE IF EXISTS curb.car;
DROP INDEX IF EXISTS idx_car_unique;

CREATE TABLE curb.car (
    id SERIAL NOT NULL PRIMARY KEY,
    nickname VARCHAR(200) NOT NULL,
    car_remote_url VARCHAR(200) NOT NULL,
    car_year INT NOT NULL,
    car_make VARCHAR(200) NOT NULL,
    car_model VARCHAR(200) NOT NULL
);

CREATE UNIQUE INDEX idx_car_unique ON curb.car(nickname, car_remote_url);

---

DROP TABLE IF EXISTS curb.car_owner;
DROP INDEX IF EXISTS idx_car_owner_unique;

CREATE TABLE curb.car_owner (
    id SERIAL NOT NULL PRIMARY KEY,
    car_id INT NOT NULL REFERENCES curb.car(id),
    owner_id INT NOT NULL REFERENCES curb.contact(id),
    percentage FLOAT NOT NULL DEFAULT 100.0
);

CREATE UNIQUE INDEX idx_car_owner_unique ON curb.car_owner(car_id, owner_id);

