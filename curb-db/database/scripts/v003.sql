---

DROP TABLE IF EXISTS curb.delivery_address CASCADE;
DROP INDEX IF EXISTS idx_delivery_address_name CASCADE;

CREATE TABLE curb.delivery_address (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    fleet_id INT NOT NULL REFERENCES curb.fleet(id),
    public BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    data JSON
);

CREATE UNIQUE INDEX idx_delivery_address_name ON curb.delivery_address(name, fleet_id);

