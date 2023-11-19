---

DROP TABLE IF EXISTS curb.trip;

CREATE TABLE curb.trip (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
    guest_id INT NOT NULL REFERENCES curb.guest(id),
    delivery_address_id INT NOT NULL REFERENCES curb.delivery_address(id),
    trip_id VARCHAR(255) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    mileage INT NOT NULL DEFAULT 0,
    earnings FLOAT NOT NULL DEFAULT 0,
    airline_iana VARCHAR(20),
    flight_number VARCHAR(10),
    arrival TIMESTAMP WITH TIME ZONE NOT NULL
);

