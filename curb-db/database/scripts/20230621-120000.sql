DROP TABLE IF EXISTS curb.car_fleet_loan;
DROP INDEX IF EXISTS idx_car_fleet_loan_unique;

CREATE TABLE curb.fleet_car_loan (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_car_id INT NOT NULL REFERENCES curb.fleet_car(id),
    data JSONB
);

--- Cars cannot technically have more than one loan ... ?
CREATE UNIQUE INDEX idx_car_fleet_loan_unique ON curb.fleet_car_loan(fleet_car_id);

---

DROP TABLE IF EXISTS curb.loan_payment;

CREATE TABLE curb.loan_payment (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_car_loan_id INT NOT NULL REFERENCES curb.fleet_car_loan(id),
    payment_date DATE NOT NULL DEFAULT NOW(),
    principal_amount FLOAT NOT NULL,
    interest_amount FLOAT NOT NULL,
    total_amount FLOAT NOT NULL
);
