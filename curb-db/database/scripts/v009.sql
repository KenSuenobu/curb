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

