-- Supplemental SQL

DROP TABLE IF EXISTS curb.fleet_membership;
DROP INDEX IF EXISTS idx_fleet_membership_unique;

CREATE TABLE curb.fleet_membership (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES curb.user(id) ON DELETE CASCADE,
    fleet_id INT NOT NULL REFERENCES curb.fleet(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_fleet_membership_unique ON curb.fleet_membership(user_id, fleet_id);
