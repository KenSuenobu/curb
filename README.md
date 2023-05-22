# curb

The **C**ar **U**niversal **R**ecord **B**roker.

## What is it?

Curb is a NextJS/NestJS application that allows Turo hosts to easily
track their cars, providing record keeping for each car they host.

## Roadmap

Phase 1:
- Database
  - Users database
    - Username
    - Password
    - Name of the user
    - E-Mail Address
  - Cars database
    - URL to car listing on Turo or hosted site
    - Car make
    - Car model
    - Car initial photos at time of creation
      - Interior Photos
      - Exterior Photos
  - Address database
    - First street address
    - Second street address
    - City
    - State/Province
    - Zipcode
    - Country
  - Phone database
    - Phone number
    - Country of number
    - Phone number type:
      - Physical
      - Cell Phone
      - Fax
  - Contact database
    - First name
    - Middle name
    - Last name
    - Address
    - Phone
  - Car Storage database
    - Storage location physical location
    - Storage location mailing address
    - Phone numbers
    - Contact name
  - Note database
    - Note description
    - Cost and Date
  - Infractions database
    - Infraction type:
      - Normal Wear and Tear
      - Excessive Wear and Tear
      - Intentional Damage/Vandalism
      - Smoking/Vaping
      - Speeding/Vehicle Misuse
      - Minor Accident
      - Major Accident
      - Total Loss
    - Car note
  - Photos database
    - Photo types:
      - Car Interior
      - Car Exterior
      - Car Before
      - Car After
      - Car Claim
      - Renter DL
      - Renter Selfie and DL
      - Renter Selfie and Car
    - Photo store
  - Drivers License database
    - License number
    - License state/province
    - License country
    - Registered address
    - Issue Date
    - Expiration Date
    - Photo
  - Renters database
    - Renter name
    - Renter birth date
    - Renter comments
    - Drivers License record
    - Photo record
    - Renter notes
  - Car Condition database
    - Car ID
    - Condition before rental
    - Condition after rental
    - Photos of conditional issues
    - Car notes including cost and dates
  - Toll Transponders database
    - ID of the transponder
    - Car
    - Login for transponder database
  - Toll records database
    - Toll transponder ID
    - Toll date
    - Toll cost
    - Renter associated with toll
  - Trip database
    - Car condition before and after
    - Car photos before and after
    - Renter
    - Start time of rent
    - End time of rent
    - Total Mileage
    - Infractions
    - Tolls
    - Total payout
