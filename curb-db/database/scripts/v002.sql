---

DROP TABLE IF EXISTS curb.guest;
DROP INDEX IF EXISTS idx_curb_guest_name_dl;

CREATE TABLE curb.guest (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_id INT NOT NULL REFERENCES curb.fleet(id),
    creator_id INT NOT NULL REFERENCES curb.user(id),
    guest_id_source VARCHAR(80) NOT NULL,
    guest_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    middle_name VARCHAR(80),
    last_name VARCHAR(80) NOT NULL,
    blacklisted BOOLEAN NOT NULL DEFAULT false,
    data JSON
);

CREATE UNIQUE INDEX idx_curb_guest_name_dl ON curb.guest(guest_id_source, guest_id, first_name, last_name);

