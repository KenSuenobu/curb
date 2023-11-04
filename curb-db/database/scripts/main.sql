DROP SCHEMA IF EXISTS curb CASCADE;
CREATE SCHEMA curb;

---

DROP TABLE IF EXISTS curb.user;
DROP INDEX IF EXISTS idx_unique_user;

CREATE TABLE curb.user (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id VARCHAR(80) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    password VARCHAR(80) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    data JSON
);

CREATE UNIQUE INDEX idx_unique_user ON curb.user(email_address);

INSERT INTO curb.user (user_id, email_address, password, verified)
     VALUES ('1c59e125-9b29-4566-bc96-e64056c50cb4', 'admin@suenobu.llc', '$2b$10$hfeeu08E6nnwVrZ40s7N8..6aTwdw.yFw7hNgKwr6hELxUatnAb3G', true);

---

DROP TABLE IF EXISTS curb.car_make CASCADE;
DROP INDEX IF EXISTS idx_car_make_unique;

CREATE TABLE curb.car_make (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_make_unique ON curb.car_make(name);

-- ---
--
-- DROP TABLE IF EXISTS curb.car_year CASCADE;
-- DROP INDEX IF EXISTS idx_car_year_unique;
--
-- CREATE TABLE curb.car_year (
--     id SERIAL NOT NULL PRIMARY KEY,
--     model_id INT NOT NULL REFERENCES curb.car_model(id),
--     year INT NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_car_year_unique ON curb.car_year(model_id, year);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_trim CASCADE;
-- DROP INDEX IF EXISTS idx_car_trim_unique;
--
-- CREATE TABLE curb.car_trim (
--     id SERIAL NOT NULL PRIMARY KEY,
--     year_id INT NOT NULL REFERENCES curb.car_year(id),
--     name VARCHAR(80) NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_car_trim_unique ON curb.car_trim(year_id, name);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_trim_info CASCADE;
-- DROP INDEX IF EXISTS idx_car_trim_info_unique;
--
-- CREATE TABLE curb.car_trim_info (
--     id SERIAL NOT NULL PRIMARY KEY,
--     trim_id INT NOT NULL REFERENCES curb.car_trim(id),
--     data JSONB
-- );
--
-- CREATE UNIQUE INDEX idx_car_trim_info_unique ON curb.car_trim_info(trim_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.fleet CASCADE;
-- DROP INDEX IF EXISTS idx_fleet_unique;
--
-- CREATE TABLE curb.fleet (
--     id SERIAL NOT NULL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL
-- );
--
-- CREATE UNIQUE INDEX idx_fleet_unique ON curb.fleet(name);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.fleet_car CASCADE;
--
-- CREATE TABLE curb.fleet_car (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_id INT NOT NULL REFERENCES curb.fleet(id),
--     owner_id INT NOT NULL REFERENCES curb.user(id),
--     car_trim_id INT NOT NULL REFERENCES curb.car_trim(id),
--     data JSONB
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.car_fleet_loan;
-- DROP INDEX IF EXISTS idx_car_fleet_loan_unique;
--
-- CREATE TABLE curb.fleet_car_loan (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
--     data JSONB
-- );
--
-- --- Cars cannot technically have more than one loan ... ?
-- CREATE UNIQUE INDEX idx_car_fleet_loan_unique ON curb.fleet_car_loan(fleet_car_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.loan_payment;
--
-- CREATE TABLE curb.loan_payment (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_car_loan_id INT NOT NULL REFERENCES curb.fleet_car_loan(id),
--     payment_date DATE NOT NULL DEFAULT NOW(),
--     principal_amount FLOAT NOT NULL,
--     interest_amount FLOAT NOT NULL,
--     total_amount FLOAT NOT NULL
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.fleet_membership;
-- DROP INDEX IF EXISTS idx_fleet_membership_unique;
--
-- CREATE TABLE curb.fleet_membership (
--     id SERIAL NOT NULL PRIMARY KEY,
--     user_id INT NOT NULL REFERENCES curb.user(id) ON DELETE CASCADE,
--     fleet_id INT NOT NULL REFERENCES curb.fleet(id) ON DELETE CASCADE
-- );
--
-- CREATE UNIQUE INDEX idx_fleet_membership_unique ON curb.fleet_membership(user_id, fleet_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.guest;
-- DROP INDEX IF EXISTS idx_curb_guest_name_dl;
--
-- CREATE TABLE curb.guest (
--     id SERIAL NOT NULL PRIMARY KEY,
--     guest_id VARCHAR(200) NOT NULL,
--     guest_id_source VARCHAR(80) NOT NULL,
--     blacklisted BOOLEAN NOT NULL DEFAULT false,
--     first_name VARCHAR(80) NOT NULL,
--     middle_name VARCHAR(80),
--     last_name VARCHAR(80) NOT NULL,
--     data JSON
-- );
--
-- CREATE UNIQUE INDEX idx_curb_guest_name_dl ON curb.guest(guest_id, first_name, last_name);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.delivery_address CASCADE;
-- DROP INDEX IF EXISTS idx_delivery_address_name CASCADE;
--
-- CREATE TABLE curb.delivery_address (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_id INT NOT NULL REFERENCES curb.fleet(id),
--     name VARCHAR(255) NOT NULL,
--     data JSON
-- );
--
-- CREATE UNIQUE INDEX idx_delivery_address_name ON curb.delivery_address(name, fleet_id);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.trip;
--
-- CREATE TABLE curb.trip (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
--     guest_id INT NOT NULL REFERENCES curb.guest(id),
--     delivery_address_id INT NOT NULL REFERENCES curb.delivery_address(id),
--     trip_id VARCHAR(80) NOT NULL,
--     trip_url VARCHAR(255) NOT NULL,
--     start_time TIMESTAMP WITH TIME ZONE NOT NULL,
--     end_time TIMESTAMP WITH TIME ZONE NOT NULL,
--     mileage INT NOT NULL DEFAULT 0,
--     earnings FLOAT NOT NULL DEFAULT 0
-- );
--
-- ---
--
-- DROP TABLE IF EXISTS curb.toll;
-- DROP INDEX IF EXISTS idx_toll_trip_time;
--
-- CREATE TABLE curb.toll (
--     id SERIAL NOT NULL PRIMARY KEY,
--     trip_id INT NOT NULL REFERENCES curb.trip(id),
--     toll_time TIMESTAMP WITH TIME ZONE NOT NULL,
--     toll_location TEXT NOT NULL,
--     toll_amount FLOAT NOT NULL DEFAULT 0.00
-- );
--
-- CREATE UNIQUE INDEX idx_toll_trip_time ON curb.toll(trip_id, toll_time);
--
-- ---
--
-- DROP TABLE IF EXISTS curb.fleet_car_maintenance;
--
-- CREATE TABLE curb.fleet_car_maintenance (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
--     maintenance_time TIMESTAMP WITH TIME ZONE NOT NULL,
--     maintenance_type VARCHAR(20) NOT NULL,
--     note TEXT NOT NULL,
--     cost FLOAT NOT NULL DEFAULT 0.00
-- );
--
