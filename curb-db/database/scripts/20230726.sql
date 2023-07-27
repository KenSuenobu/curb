-- Supplemental SQL

DROP TABLE IF EXISTS curb.delivery_address CASCADE;
DROP INDEX IF EXISTS idx_delivery_address_name CASCADE;

CREATE TABLE curb.delivery_address (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    data JSON
);

CREATE UNIQUE INDEX idx_delivery_address_name ON curb.delivery_address(name);

-- DROP TABLE IF EXISTS curb.trip;
--
-- CREATE TABLE curb.trip (
--     id SERIAL NOT NULL PRIMARY KEY,
--     fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
--     guest_id INT NOT NULL REFERENCES curb.guest(id),
--     delivery_address_id INT NOT NULL REFERENCES curb.delivery_address(id),
--     trip_id VARCHAR(80) NOT NULL,
--     trip_url VARCHAR(255) NOT NULL,
--     start_time TIMESTAMP NOT NULL,
--     end_time TIMESTAMP NOT NULL,
--     mileage INT NOT NULL DEFAULT 0,
--     earnings FLOAT NOT NULL DEFAULT 0
-- );
