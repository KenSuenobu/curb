DROP SCHEMA IF EXISTS curb CASCADE;
CREATE SCHEMA curb;

---

DROP TABLE IF EXISTS curb.user;
DROP INDEX IF EXISTS idx_unique_user;

CREATE TABLE curb.user (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id VARCHAR(80) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    password VARCHAR(80) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    data JSON
);

CREATE UNIQUE INDEX idx_unique_user ON curb.user(email_address);

INSERT INTO curb.user (user_id, email_address, password, verified)
     VALUES ('1c59e125-9b29-4566-bc96-e64056c50cb4', 'admin@suenobu.llc', 'admin123', true);

---

DROP TABLE IF EXISTS curb.car_make CASCADE;
DROP INDEX IF EXISTS idx_car_make_unique;

CREATE TABLE curb.car_make (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_make_unique ON curb.car_make(name);

INSERT INTO curb.car_make (name)
     VALUES ('Abarth'),
            ('Acura'),
            ('Alfa Romeo'),
            ('Alpine'),
            ('Audi'),
            ('BMW'),
            ('Bentley'),
            ('Buick'),
            ('Cadillac'),
            ('Chevrolet'),
            ('Chrysler'),
            ('Citroen'),
            ('Cupra'),
            ('Dacia'),
            ('Delorean'),
            ('Dodge'),
            ('DS'),
            ('Ferrari'),
            ('Fiat'),
            ('Fisker'),
            ('Ford'),
            ('Genesis'),
            ('GMC'),
            ('Holden'),
            ('Honda'),
            ('Hummer'),
            ('Hyundai'),
            ('Infiniti'),
            ('Isuzu'),
            ('Jaguar'),
            ('Jeep'),
            ('Karma'),
            ('Kia'),
            ('Lamborghini'),
            ('Land Rover'),
            ('Lexus'),
            ('Lincoln'),
            ('Lotus'),
            ('Lucid'),
            ('Mazda'),
            ('Mercedes-Benz'),
            ('MG'),
            ('Maserati'),
            ('Mclaren'),
            ('MINI'),
            ('Mitsubishi'),
            ('Nissan'),
            ('Peugeot'),
            ('Porsche'),
            ('Ram'),
            ('Renault'),
            ('Rivian'),
            ('Rolls-Royce'),
            ('SEAT'),
            ('Skoda'),
            ('Smart'),
            ('Ssangyong'),
            ('Subaru'),
            ('Suzuki'),
            ('Tesla'),
            ('Toyota'),
            ('Vauxhall'),
            ('Vinfast'),
            ('Volkswagen'),
            ('Volvo');

---

DROP TABLE IF EXISTS curb.car_model CASCADE;
DROP INDEX IF EXISTS idx_car_model_unique;

CREATE TABLE curb.car_model (
    id SERIAL NOT NULL PRIMARY KEY,
    make_id INT NOT NULL REFERENCES curb.car_make(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_model_unique ON curb.car_model(make_id, name);

-- Car models were researched using https://www.autoevolution.com/search.php

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Abarth'), 'F595'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '595'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '695 Biposto'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '500'),
            ((SELECT id FROM curb.car_make WHERE name='Abarth'), '124');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Acura'), 'Integra'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'MDX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'RDX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'TLX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'ILX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'RLX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'NSX'),
            ((SELECT id FROM curb.car_make WHERE name='Acura'), 'TL');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Tonale'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulia'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Stelvio'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'Giulietta'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), '4C'),
            ((SELECT id FROM curb.car_make WHERE name='Alfa Romeo'), 'MiTo');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Alpine'), 'A110');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS6'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'R8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'e-tron'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A8'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q2'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ2'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'TTS'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'TT'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S6'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'SQ7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A1'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'RS4'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A5'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A6'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'Q5L'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'A7'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S3'),
            ((SELECT id FROM curb.car_make WHERE name='Audi'), 'S1');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Bentley'), 'Batur'),
            ((SELECT id FROM curb.car_make WHERE name='Bentley'), 'Continental'),
            ((SELECT id FROM curb.car_make WHERE name='Bentley'), 'Bentayga'),
            ((SELECT id FROM curb.car_make WHERE name='Bentley'), 'Mulliner Bacalar'),
            ((SELECT id FROM curb.car_make WHERE name='Bentley'), 'Mulsanne');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='BMW'), 'M3'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'X5'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'X6'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '5 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'i5'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'iX M60'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '8 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'M8'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '7 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '3 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'iX1'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'X1'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'M2'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'M4'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'i7'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'XM'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'M5'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'X3'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), 'X4'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '2 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '4 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '6 Series'),
            ((SELECT id FROM curb.car_make WHERE name='BMW'), '1 Series');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Buick'), 'Encore'),
            ((SELECT id FROM curb.car_make WHERE name='Buick'), 'Envista'),
            ((SELECT id FROM curb.car_make WHERE name='Buick'), 'Envision'),
            ((SELECT id FROM curb.car_make WHERE name='Buick'), 'Enclave'),
            ((SELECT id FROM curb.car_make WHERE name='Buick'), 'Regal');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'XT4'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'Escalade'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'Lyriq'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'CV4'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'CT5'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'XT6'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'XT5'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'CT4'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'XTS'),
            ((SELECT id FROM curb.car_make WHERE name='Cadillac'), 'ATS');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Silverado'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Corvette'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Trailblazer'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Colorado'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Equinox'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Blazer'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Trax'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Bolt'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Tahoe'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Camaro'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Cruze'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Malibu'),
            ((SELECT id FROM curb.car_make WHERE name='Chevrolet'), 'Spark');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Chrysler'), '300C'),
            ((SELECT id FROM curb.car_make WHERE name='Chrysler'), '300'),
            ((SELECT id FROM curb.car_make WHERE name='Chrysler'), '200'),
            ((SELECT id FROM curb.car_make WHERE name='Chrysler'), 'Pacifica');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'C3'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'C4'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'C5'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'AMI'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'E-Mehari'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'Berlingo'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'C1'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'DS4'),
            ((SELECT id FROM curb.car_make WHERE name='Citroen'), 'C-Zero');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Cupra'), 'Tavascan'),
            ((SELECT id FROM curb.car_make WHERE name='Cupra'), 'Born'),
            ((SELECT id FROM curb.car_make WHERE name='Cupra'), 'Leon'),
            ((SELECT id FROM curb.car_make WHERE name='Cupra'), 'Formentor'),
            ((SELECT id FROM curb.car_make WHERE name='Cupra'), 'Ateca');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Dacia'), 'Jogger'),
            ((SELECT id FROM curb.car_make WHERE name='Dacia'), 'Spring'),
            ((SELECT id FROM curb.car_make WHERE name='Dacia'), 'Duster'),
            ((SELECT id FROM curb.car_make WHERE name='Dacia'), 'Logan'),
            ((SELECT id FROM curb.car_make WHERE name='Dacia'), 'Lodgy'),
            ((SELECT id FROM curb.car_make WHERE name='Dacia'), 'Dokker');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Delorean'), 'DMC-12');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Dodge'), 'Challenger'),
            ((SELECT id FROM curb.car_make WHERE name='Dodge'), 'Hornet'),
            ((SELECT id FROM curb.car_make WHERE name='Dodge'), 'Durango'),
            ((SELECT id FROM curb.car_make WHERE name='Dodge'), 'Charger'),
            ((SELECT id FROM curb.car_make WHERE name='Dodge'), 'Journey');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='DS'), 'DS 3'),
            ((SELECT id FROM curb.car_make WHERE name='DS'), 'DS 4'),
            ((SELECT id FROM curb.car_make WHERE name='DS'), 'DS 7'),
            ((SELECT id FROM curb.car_make WHERE name='DS'), 'DS 9');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'Roma'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'SF90'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), '296'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'Purosangue'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'Daytona'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'Portofino'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'F8'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), '812'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), '488 Pista'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'SP1'),
            ((SELECT id FROM curb.car_make WHERE name='Ferrari'), 'SP2');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Fiat'), 'Topolino'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), '600e'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), '500e'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), 'F595'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), '500 3+1'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), 'Tipo'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), '124'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), 'Panda City'),
            ((SELECT id FROM curb.car_make WHERE name='Fiat'), '500L');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Fisker'), 'Ocean');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Mustang'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Explorer'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Ranger'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'E-Tourneo'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Bronco'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Escape'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'F-150'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Everest'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Lariat'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Fiesta'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Maverick'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Expedition'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Focus'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Puma'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Bullitt'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Kuga'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'S-Max'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Galaxy'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Transit'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Mondeo'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Edge'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Ka+'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Territory'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'EcoSport'),
            ((SELECT id FROM curb.car_make WHERE name='Ford'), 'Fusion');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Genesis'), 'G90'),
            ((SELECT id FROM curb.car_make WHERE name='Genesis'), 'SV60'),
            ((SELECT id FROM curb.car_make WHERE name='Genesis'), 'G70'),
            ((SELECT id FROM curb.car_make WHERE name='Genesis'), 'GV80'),
            ((SELECT id FROM curb.car_make WHERE name='Genesis'), 'G80'),
            ((SELECT id FROM curb.car_make WHERE name='Genesis'), 'GV70');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='GMC'), 'Sierra'),
            ((SELECT id FROM curb.car_make WHERE name='GMC'), 'Hummer'),
            ((SELECT id FROM curb.car_make WHERE name='GMC'), 'Terrain'),
            ((SELECT id FROM curb.car_make WHERE name='GMC'), 'Yukon'),
            ((SELECT id FROM curb.car_make WHERE name='GMC'), 'Canyon'),
            ((SELECT id FROM curb.car_make WHERE name='GMC'), 'Savana');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Holden'), 'Commodore'),
            ((SELECT id FROM curb.car_make WHERE name='Holden'), 'Trax'),
            ((SELECT id FROM curb.car_make WHERE name='Holden'), 'Barina'),
            ((SELECT id FROM curb.car_make WHERE name='Holden'), 'Malibu'),
            ((SELECT id FROM curb.car_make WHERE name='Holden'), 'Caprice'),
            ((SELECT id FROM curb.car_make WHERE name='Holden'), 'Cruz');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Honda'), 'e:Ny1'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'CR-V'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'ZR-V'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'HR-V'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Pilot'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Accord'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Civic'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Ridgeline'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'e'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Fit / Jazz'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Odyssey'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Insight'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'NSX'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'S660'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Legend'),
            ((SELECT id FROM curb.car_make WHERE name='Honda'), 'Crosstour');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Hummer'), 'Hummer');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'i10'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Kona'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Sonata'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'i20'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Palisade'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Ioniq'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Grandeur'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Tucson'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Bayon'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Staria'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Santa Cruz'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Elantra'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'i30'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Venue'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'NEXO'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Veloster'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'i40'),
            ((SELECT id FROM curb.car_make WHERE name='Hyundai'), 'Accent');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'QX55'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'QX60'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'QX80'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'QX70'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'QX30'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'Q60'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'Q50'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'Q30'),
            ((SELECT id FROM curb.car_make WHERE name='Infiniti'), 'Q40');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Isuzu'), 'D-Max');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Jaguar'), 'F-Type'),
            ((SELECT id FROM curb.car_make WHERE name='Jaguar'), 'F-Pace'),
            ((SELECT id FROM curb.car_make WHERE name='Jaguar'), 'XF'),
            ((SELECT id FROM curb.car_make WHERE name='Jaguar'), 'XE'),
            ((SELECT id FROM curb.car_make WHERE name='Jaguar'), 'I-Pace'),
            ((SELECT id FROM curb.car_make WHERE name='Jaguar'), 'XJR575');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Jeep'), 'Wrangler'),
            ((SELECT id FROM curb.car_make WHERE name='Jeep'), 'Avenger'),
            ((SELECT id FROM curb.car_make WHERE name='Jeep'), 'Wagoneer'),
            ((SELECT id FROM curb.car_make WHERE name='Jeep'), 'Compass'),
            ((SELECT id FROM curb.car_make WHERE name='Jeep'), 'Gladiator'),
            ((SELECT id FROM curb.car_make WHERE name='Jeep'), 'Renegade');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Karma'), 'Revero');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Kia'), 'EV9'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Picanto'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Telluride'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Soul'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'XCeed'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Sportage'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Seltos'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Carnival'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Rio'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'K5'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Stonic'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Niro'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Forte'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Ceed'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Optima'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'K9'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Sorento'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Proceed'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'e-Niro'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'Rondo'),
            ((SELECT id FROM curb.car_make WHERE name='Kia'), 'K7 / Cadenza');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Revuelto'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'LP780-4'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Urus'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Huracan'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Sian'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Aventador'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Veneno'),
            ((SELECT id FROM curb.car_make WHERE name='Lamborghini'), 'Centenario');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Land Rover'), 'Range Rover'),
            ((SELECT id FROM curb.car_make WHERE name='Land Rover'), 'Defender'),
            ((SELECT id FROM curb.car_make WHERE name='Land Rover'), 'Discovery');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'LM'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'LBX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'GX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'TX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'RZ'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'RX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'LC'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'ES'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'NX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'LX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'IS'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'UX'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'RC'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'LS'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'CT'),
            ((SELECT id FROM curb.car_make WHERE name='Lexus'), 'GS');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'Nautilus'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'Corsair'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'Zephyr'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'Aviator'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'MKC'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'Navigator'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'MKZ'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'Continental'),
            ((SELECT id FROM curb.car_make WHERE name='Lincoln'), 'MKT');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Lotus'), 'Eletre'),
            ((SELECT id FROM curb.car_make WHERE name='Lotus'), 'Sport'),
            ((SELECT id FROM curb.car_make WHERE name='Lotus'), 'Emira'),
            ((SELECT id FROM curb.car_make WHERE name='Lotus'), 'Evija'),
            ((SELECT id FROM curb.car_make WHERE name='Lotus'), '3'),
            ((SELECT id FROM curb.car_make WHERE name='Lotus'), 'Elise'),
            ((SELECT id FROM curb.car_make WHERE name='Lotus'), 'Evora');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Lucid'), 'Air');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Grecale'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'MC20'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Modena'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Trofeo'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Folgore'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Ghibli'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Levante'),
            ((SELECT id FROM curb.car_make WHERE name='Maserati'), 'Quattroporte');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'MX-30'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-90'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-60'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-50'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-30'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), '2'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), '6 / Atenza'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-3'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), '3 / Axela'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-8'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'MX-5 / Miata'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-9'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'CX-5'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'Flair'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), '5 / Premacy'),
            ((SELECT id FROM curb.car_make WHERE name='Mazda'), 'Biante');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '750S'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), 'Artura'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), 'Elva'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '765LT'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), 'GT'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '620R'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), 'Senna'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '600LT'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), 'Speedtail'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '720S'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '570S'),
            ((SELECT id FROM curb.car_make WHERE name='Mclaren'), '540C');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'CLA'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'GLE'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'Maybach'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'GLC'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'GLB'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'GLA'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'GLS'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'E-Class'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'EQT'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'CLE'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'EQS'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'T-Class'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'B-Class'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'A-Class'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'EQE'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'EQB'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'Citan'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'C-Class'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'Vito'),
            ((SELECT id FROM curb.car_make WHERE name='Mercedes-Benz'), 'S-Class');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='MG'), '4 EV'),
            ((SELECT id FROM curb.car_make WHERE name='MG'), 'Marvel'),
            ((SELECT id FROM curb.car_make WHERE name='MG'), 'ZS'),
            ((SELECT id FROM curb.car_make WHERE name='MG'), '5'),
            ((SELECT id FROM curb.car_make WHERE name='MG'), 'HS'),
            ((SELECT id FROM curb.car_make WHERE name='MG'), 'GS');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='MINI'), 'Cooper'),
            ((SELECT id FROM curb.car_make WHERE name='MINI'), 'Convertible'),
            ((SELECT id FROM curb.car_make WHERE name='MINI'), 'Countryman'),
            ((SELECT id FROM curb.car_make WHERE name='MINI'), 'Clubman'),
            ((SELECT id FROM curb.car_make WHERE name='MINI'), 'John Cooper Works'),
            ((SELECT id FROM curb.car_make WHERE name='MINI'), 'Clubvan');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'ASX'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Colt'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Eclipse Cross'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Outlander'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Mirage'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Lancer'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'L200'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Attrage'),
            ((SELECT id FROM curb.car_make WHERE name='Mitsubishi'), 'Space Star');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'GT-R'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Sentra'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Leaf'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Sakura'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Altima'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'X-Trail'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Versa'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Frontier'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Pathfinder'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Qashqai'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Z'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Rogue'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Ariya'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Micra'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Armada'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Kicks'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Versa / Tiida'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Juke'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Maxima'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Murano'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Titan'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Serena'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Navara'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Pulsar'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), '370Z'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Patrol'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Note'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Quest'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Sunny'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'NV200'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Cube'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Teana'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Skyline'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Primera'),
            ((SELECT id FROM curb.car_make WHERE name='Nissan'), 'Grand Livina');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '508'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '2008'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), 'e-208'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '408'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '308'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), 'Landtrek'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '3008'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '5008'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), 'RIFTER'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '301'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), 'Pick Up'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), 'Traveller'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '208'),
            ((SELECT id FROM curb.car_make WHERE name='Peugeot'), '108');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Porsche'), 'Cayenne'),
            ((SELECT id FROM curb.car_make WHERE name='Porsche'), '718'),
            ((SELECT id FROM curb.car_make WHERE name='Porsche'), 'Macan'),
            ((SELECT id FROM curb.car_make WHERE name='Porsche'), '911'),
            ((SELECT id FROM curb.car_make WHERE name='Porsche'), 'Taycan'),
            ((SELECT id FROM curb.car_make WHERE name='Porsche'), 'GTS'),
            ((SELECT id FROM curb.car_make WHERE name='Porsche'), 'Panamera');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Ram'), '1500'),
            ((SELECT id FROM curb.car_make WHERE name='Ram'), '2500'),
            ((SELECT id FROM curb.car_make WHERE name='Ram'), '3500');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Espace'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Clio'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Rafale'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Arkana'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Austral'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Kiger'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Megane'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Kangoo'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Twingo'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Koleos'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'City'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'ZOE'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Triber'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Talisman'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Captur'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Scenic'),
            ((SELECT id FROM curb.car_make WHERE name='Renault'), 'Alaskan');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Rivian'), 'R1T'),
            ((SELECT id FROM curb.car_make WHERE name='Rivian'), 'R1S');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Rolls-Royce'), 'Spectre'),
            ((SELECT id FROM curb.car_make WHERE name='Rolls-Royce'), 'Ghost'),
            ((SELECT id FROM curb.car_make WHERE name='Rolls-Royce'), 'Cullinan'),
            ((SELECT id FROM curb.car_make WHERE name='Rolls-Royce'), 'Phantom'),
            ((SELECT id FROM curb.car_make WHERE name='Rolls-Royce'), 'Dawn'),
            ((SELECT id FROM curb.car_make WHERE name='Rolls-Royce'), 'Wraith');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Ibiza'),
            ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Arona'),
            ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Leon'),
            ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Ateca'),
            ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Mii'),
            ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Tarraco'),
            ((SELECT id FROM curb.car_make WHERE name='SEAT'), 'Alhambra');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Enyaq'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Kushaq'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Kodiaq'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Fabia'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Slavia'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Karoq'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Octavia'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Superb'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Citigo'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Kamiq'),
            ((SELECT id FROM curb.car_make WHERE name='Skoda'), 'Scala');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Smart'), '1'),
            ((SELECT id FROM curb.car_make WHERE name='Smart'), 'EQ'),
            ((SELECT id FROM curb.car_make WHERE name='Smart'), 'fortwo');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Ssangyong'), 'Rexton'),
            ((SELECT id FROM curb.car_make WHERE name='Ssangyong'), 'Korando'),
            ((SELECT id FROM curb.car_make WHERE name='Ssangyong'), 'Tivoli'),
            ((SELECT id FROM curb.car_make WHERE name='Ssangyong'), 'Musso');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Crosstrek'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Outback'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Legacy'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Ascent'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Impreza'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'BRZ'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'WRX'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Solterra'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Forester'),
            ((SELECT id FROM curb.car_make WHERE name='Subaru'), 'Levorg');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'Jimny'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'S-Cross'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'Swift'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'Swace'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'Across'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'Ignis'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'Vitara'),
            ((SELECT id FROM curb.car_make WHERE name='Suzuki'), 'SX4');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Tesla'), 'Cybertruck'),
            ((SELECT id FROM curb.car_make WHERE name='Tesla'), 'Model X'),
            ((SELECT id FROM curb.car_make WHERE name='Tesla'), 'Model Y'),
            ((SELECT id FROM curb.car_make WHERE name='Tesla'), 'Roadster'),
            ((SELECT id FROM curb.car_make WHERE name='Tesla'), 'Model 3'),
            ((SELECT id FROM curb.car_make WHERE name='Tesla'), 'Model S');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Grand Highlander'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Corolla'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Tacoma'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'C-HR'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Sequoia'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Crown'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Camry'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Supra'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Prius'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Mirai'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Aqua'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'GR 86'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'bZ4X'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Aygo X'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Tundra'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Yaris'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Sienna'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Venza'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Hilux'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Land Cruiser'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'TRD'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Avenis'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Vios'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Agya'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Etios Liva'),
            ((SELECT id FROM curb.car_make WHERE name='Toyota'), 'Fortuner');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Vauxhall'), 'Grandland'),
            ((SELECT id FROM curb.car_make WHERE name='Vauxhall'), 'Astra'),
            ((SELECT id FROM curb.car_make WHERE name='Vauxhall'), 'Corsa'),
            ((SELECT id FROM curb.car_make WHERE name='Vauxhall'), 'VXR8'),
            ((SELECT id FROM curb.car_make WHERE name='Vauxhall'), 'Insignia');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Vinfast'), 'VF 8'),
            ((SELECT id FROM curb.car_make WHERE name='Vinfast'), 'VF 9');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.Buzz'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Atlas'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.3'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.7'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'id.4'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Touareg'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'T-Cross'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Arteon'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Amarok'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Golf'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Polo'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Tiguan'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Taigo'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Jetta'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'T-Roc'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Multivan'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Caddy'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Nivus'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Passat'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Beetle'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Scirocco'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Gol'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'CrossTouran'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'CrossGolf'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Vento'),
            ((SELECT id FROM curb.car_make WHERE name='Volkswagen'), 'Bora');

INSERT INTO curb.car_model (make_id, name)
     VALUES ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'EX30'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'XC40'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'C40'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'EX90'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'S90'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'V90'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'XC90'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'XC60'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'V60'),
            ((SELECT id FROM curb.car_make WHERE name='Volvo'), 'S60');

---

DROP TABLE IF EXISTS curb.car_year CASCADE;
DROP INDEX IF EXISTS idx_car_year_unique;

CREATE TABLE curb.car_year (
    id SERIAL NOT NULL PRIMARY KEY,
    model_id INT NOT NULL REFERENCES curb.car_model(id),
    year INT NOT NULL
);

CREATE UNIQUE INDEX idx_car_year_unique ON curb.car_year(model_id, year);

---

DROP TABLE IF EXISTS curb.car_trim CASCADE;
DROP INDEX IF EXISTS idx_car_trim_unique;

CREATE TABLE curb.car_trim (
    id SERIAL NOT NULL PRIMARY KEY,
    year_id INT NOT NULL REFERENCES curb.car_year(id),
    name VARCHAR(80) NOT NULL
);

CREATE UNIQUE INDEX idx_car_trim_unique ON curb.car_trim(year_id, name);

---

DROP TABLE IF EXISTS curb.car_trim_info CASCADE;
DROP INDEX IF EXISTS idx_car_trim_info_unique;

CREATE TABLE curb.car_trim_info (
    id SERIAL NOT NULL PRIMARY KEY,
    trim_id INT NOT NULL REFERENCES curb.car_trim(id),
    data JSONB
);

CREATE UNIQUE INDEX idx_car_trim_info_unique ON curb.car_trim_info(trim_id);

---

DROP TABLE IF EXISTS curb.fleet CASCADE;
DROP INDEX IF EXISTS idx_fleet_unique;

CREATE TABLE curb.fleet (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX idx_fleet_unique ON curb.fleet(name);

---

DROP TABLE IF EXISTS curb.fleet_car CASCADE;

CREATE TABLE curb.fleet_car (
    id SERIAL NOT NULL PRIMARY KEY,
    fleet_id INT NOT NULL REFERENCES curb.fleet(id),
    owner_id INT NOT NULL REFERENCES curb.user(id),
    car_trim_id INT NOT NULL REFERENCES curb.car_trim(id),
    data JSONB
);

---

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
