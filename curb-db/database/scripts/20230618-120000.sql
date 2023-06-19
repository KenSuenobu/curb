DROP TABLE IF EXISTS curb.fleet CASCADE;
DROP INDEX IF EXISTS idx_fleet_unique;

CREATE TABLE curb.fleet (
    id SERIAL NOT NULL PRIMARY KEY,
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
