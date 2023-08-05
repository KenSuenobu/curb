---

DROP TABLE IF EXISTS curb.fleet_car_maintenance;

CREATE TABLE curb.fleet_car_maintenance (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
    maintenance_time TIMESTAMP WITH TIME ZONE NOT NULL,
    maintenance_type VARCHAR(20) NOT NULL,
    note TEXT NOT NULL,
    cost FLOAT NOT NULL DEFAULT 0.00
);

