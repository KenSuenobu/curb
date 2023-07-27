-- Trip tables

DROP TABLE IF EXISTS curb.guest;
DROP INDEX IF EXISTS idx_curb_guest_name_dl;

CREATE TABLE curb.guest (
    id SERIAL NOT NULL PRIMARY KEY,
    guest_id VARCHAR(200) NOT NULL,
    guest_id_source VARCHAR(80) NOT NULL,
    blacklisted BOOLEAN NOT NULL DEFAULT false,
    first_name VARCHAR(80) NOT NULL,
    middle_name VARCHAR(80),
    last_name VARCHAR(80) NOT NULL,
    data JSON
);

CREATE UNIQUE INDEX idx_curb_guest_name_dl ON curb.guest(guest_id, first_name, last_name);
