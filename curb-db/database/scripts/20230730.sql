-- Supplemental SQL

DROP TABLE IF EXISTS curb.toll;
DROP INDEX IF EXISTS idx_toll_trip_time;

CREATE TABLE curb.toll (
    id SERIAL NOT NULL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES curb.trip(id),
    toll_time TIMESTAMP WITH TIME ZONE NOT NULL,
    toll_location TEXT NOT NULL,
    toll_amount FLOAT NOT NULL DEFAULT 0.00
);

CREATE UNIQUE INDEX idx_toll_trip_time ON curb.toll(trip_id, toll_time);
