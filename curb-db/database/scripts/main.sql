DROP SCHEMA IF EXISTS curb CASCADE;
CREATE SCHEMA curb;

---

DROP TABLE IF EXISTS curb.user;
DROP INDEX IF EXISTS idx_unique_user;

CREATE TABLE curb.user (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id VARCHAR(80) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    data JSON
);

CREATE UNIQUE INDEX idx_unique_user ON curb.user(email_address);

INSERT INTO curb.user (user_id, email_address, password, verified)
     VALUES ('1c59e125-9b29-4566-bc96-e64056c50cb4', 'admin@suenobu.llc', '$6$RJ6hSgrYa7HIjNrg$Z6naZkq.hVCkgUGAfRQt0HYcmOawBHqXVCS1b4fq1rhi4rpV.gB2Vkg.S6stKXS0kFTpytI0P2rhTWdve05Nh.', true);

---

DROP TABLE IF EXISTS curb.car_make CASCADE;
DROP INDEX IF EXISTS idx_car_make_unique;

CREATE TABLE curb.car_make (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_make_unique ON curb.car_make(name);

---

DROP TABLE IF EXISTS curb.car_model CASCADE;
DROP INDEX IF EXISTS idx_car_model_unique;

CREATE TABLE curb.car_model (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    car_make_id INT NOT NULL REFERENCES curb.car_make(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_model_unique ON curb.car_model(car_make_id, name);

---

DROP TABLE IF EXISTS curb.car_year CASCADE;
DROP INDEX IF EXISTS idx_car_year_unique;

CREATE TABLE curb.car_year (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    car_model_id INT NOT NULL REFERENCES curb.car_model(id),
    year INT NOT NULL
);

CREATE UNIQUE INDEX idx_car_year_unique ON curb.car_year(car_model_id, year);

---

DROP TABLE IF EXISTS curb.car_trim CASCADE;
DROP INDEX IF EXISTS idx_car_trim_unique;

CREATE TABLE curb.car_trim (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    car_year_id INT NOT NULL REFERENCES curb.car_year(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_trim_unique ON curb.car_trim(car_year_id, name);

---

DROP TABLE IF EXISTS curb.car_trim_info CASCADE;
DROP INDEX IF EXISTS idx_car_trim_info_unique;

CREATE TABLE curb.car_trim_info (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    car_trim_id INT NOT NULL REFERENCES curb.car_trim(id),
    data JSONB
);

CREATE UNIQUE INDEX idx_car_trim_info_unique ON curb.car_trim_info(car_trim_id);

---

DROP TABLE IF EXISTS curb.signup;
DROP INDEX IF EXISTS idx_signup_unique;

CREATE TABLE curb.signup (
    id SERIAL NOT NULL PRIMARY KEY,
    signup_date TIMESTAMP NOT NULL DEFAULT NOW(),
    email_address VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255) NOT NULL,
    source VARCHAR(80) NOT NULL,
    note TEXT
);

CREATE UNIQUE INDEX idx_signup_unique ON curb.signup(email_address);

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
