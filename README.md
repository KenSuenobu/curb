# curb

The **C**ar **U**niversal **R**ecord **B**roker.

## What is it?

Curb is a NextJS/NestJS application that allows Turo hosts to easily
track their cars, providing record keeping for each car they host.

## Roadmap

Phase 1:
- Layout of main page:
  - Users
  - Cars
  - Toll Transponders
- Database
  - Users database
    - Username
    - Password
    - Name of the user
    - Access type:
      - User
      - Administrator
  - Cars database
    - URL to car listing on Turo or hosted site
    - Car make
    - Car model
    - Car initial photos at time of creation
      - Interior Photos
      - Exterior Photos
  - Car Note
      - Note description
      - Cost and Date
  - Infractions database
    - Infraction type:
      - Normal Wear and Tear
      - Excessive Wear and Tear
      - Intentional Damage/Vandalism
      - Smoking/Vaping
      - Accident
    - Car note
  - Renters database
    - Renter name
    - Renter birth date
    - Renter comments
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
