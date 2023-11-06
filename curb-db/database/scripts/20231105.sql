---

DROP TABLE IF EXISTS curb.fleet CASCADE;
DROP INDEX IF EXISTS idx_fleet_unique;

CREATE TABLE curb.fleet (
    id SERIAL NOT NULL PRIMARY KEY,
    creator_id INT NOT NULL REFERENCES curb.user(id),
    name VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX idx_fleet_unique ON curb.fleet(name);

---

DROP TABLE IF EXISTS curb.fleet_membership;
DROP INDEX IF EXISTS idx_fleet_membership_unique;

CREATE TABLE curb.fleet_membership (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES curb.user(id) ON DELETE CASCADE,
    fleet_id INT NOT NULL REFERENCES curb.fleet(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_fleet_membership_unique ON curb.fleet_membership(user_id, fleet_id);

