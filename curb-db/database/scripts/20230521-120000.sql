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
DROP TYPE IF EXISTS phone_type;

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
    other_name VARCHAR(200) NOT NULL,
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

---

DROP TABLE IF EXISTS curb.car_storage;
DROP INDEX IF EXISTS idx_car_storage;

CREATE TABLE curb.car_storage (
    id SERIAL NOT NULL PRIMARY KEY,
    phone_id INT NOT NULL REFERENCES curb.phone(id),
    contact_id INT NOT NULL REFERENCES curb.contact(id),
    address_id INT NOT NULL REFERENCES curb.address(id),
    physical_address_id INT NOT NULL REFERENCES curb.address(id),
    location_description VARCHAR(4096) NOT NULL
);

CREATE UNIQUE INDEX idx_car_storage ON curb.car_storage(physical_address_id, UPPER(location_description));

---

DROP TABLE IF EXISTS curb.note;

CREATE TABLE curb.note (
    id SERIAL NOT NULL PRIMARY KEY,
    description TEXT NOT NULL,
    note_cost FLOAT,
    note_date TIMESTAMP NOT NULL
);

---

DROP TABLE IF EXISTS curb.infraction;
DROP TYPE IF EXISTS infraction_type;

CREATE TYPE infraction_type AS ENUM (
    'normal_wear_and_tear',
    'excessive_wear_and_tear',
    'intentional_damage_vandalism',
    'smoking_vaping',
    'speeding_vehicle_misuse',
    'minor_accident',
    'major_accident',
    'total_loss',
    'exception'
);

CREATE TABLE curb.infraction (
    id SERIAL NOT NULL PRIMARY KEY,
    infraction_type infraction_type NOT NULL,
    note_id INT NOT NULL REFERENCES curb.note(id)
);

---

DROP TABLE IF EXISTS curb.photo;
DROP TYPE IF EXISTS photo_type;

CREATE TYPE photo_type AS ENUM (
    'car_interior',
    'car_exterior',
    'car_before',
    'car_after',
    'car_claim',
    'car_initial_interior',
    'car_initial_exterior',
    'renter_dl',
    'renter_selfie_and_dl',
    'renter_selfie_and_car'
);

CREATE TABLE curb.photo (
    id SERIAL NOT NULL PRIMARY KEY,
    photo_type photo_type NOT NULL,
    photo_url VARCHAR(1024) NOT NULL
);

---

DROP TABLE IF EXISTS curb.car_photo;
DROP INDEX IF EXISTS idx_car_photo_unique;

CREATE TABLE curb.car_photo (
    id SERIAL NOT NULL PRIMARY KEY,
    car_id INT NOT NULL REFERENCES curb.car(id),
    photo_id INT NOT NULL REFERENCES curb.photo(id),
    photo_time TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX idx_car_photo_unique ON curb.car_photo(car_id, photo_id);

---

DROP TABLE IF EXISTS curb.incidental;
DROP INDEX IF EXISTS idx_incidental_unique;

CREATE TABLE curb.incidental (
    id SERIAL NOT NULL PRIMARY KEY,
    car_id INT NOT NULL REFERENCES curb.car(id),
    photo_id INT NOT NULL REFERENCES curb.photo(id),
    note_id INT NOT NULL REFERENCES curb.note(id)
);

CREATE UNIQUE INDEX idx_incidental_unique ON curb.incidental(car_id, photo_id, note_id);

---

DROP TABLE IF EXISTS curb.car_registration;
DROP INDEX IF EXISTS idx_car_registration_unique;

CREATE TABLE curb.car_registration (
    id SERIAL NOT NULL PRIMARY KEY,
    car_id INT NOT NULL REFERENCES curb.car(id),
    registration_id INT NOT NULL REFERENCES curb.registration(id)
);

CREATE UNIQUE INDEX idx_car_registration_unique ON curb.car_registration(car_id, registration_id);

---

DROP TABLE IF EXISTS curb.drivers_license;
DROP INDEX IF EXISTS idx_drivers_license_unique;

CREATE TABLE curb.drivers_license (
    id SERIAL NOT NULL PRIMARY KEY,
    contact_id INT NOT NULL REFERENCES curb.contact(id),
    photo_id INT NOT NULL REFERENCES curb.photo(id),
    license_number VARCHAR(200) NOT NULL,
    issuing_state_province VARCHAR(200) NOT NULL,
    issuing_country VARCHAR(200) NOT NULL,
    birth_date DATE NOT NULL,
    expiration_date DATE NOT NULL
);

CREATE UNIQUE INDEX idx_drivers_license_unique ON curb.drivers_license(contact_id, license_number);

---

DROP TABLE IF EXISTS curb.renter;
DROP INDEX IF EXISTS idx_renter_unique;

CREATE TABLE curb.renter (
    id SERIAL NOT NULL PRIMARY KEY,
    contact_id INT NOT NULL REFERENCES curb.contact(id),
    drivers_license_id INT NOT NULL REFERENCES curb.drivers_license(id),
    photo_id INT NOT NULL REFERENCES curb.photo(id),
    birth_date DATE NOT NULL,
    renter_url VARCHAR(1024) NOT NULL
);

CREATE UNIQUE INDEX idx_renter_unique ON curb.renter(drivers_license_id);

---

