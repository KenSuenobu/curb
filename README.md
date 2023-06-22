# curb

The **C**ar **U**niversal **R**ental **B**usiness.

(I reserve the right to rename this sucker if the acronym doesn't stick!)

## What is it?

Curb is a NextJS/NestJS application that allows Turo hosts to easily
track their cars, providing record keeping for each car they host.

## Roadmap

Phase 1:
- Database
  - Car Make
    - Name
  - Car Model
    - Car Make ID
    - Name
  - Car Year
    - Car Model ID
    - Year
  - Car Trim
    - Car Year ID
    - Name
  - Car Trim Info
    - Car Trim ID
    - Data (JSONB)
  - Fleet
    - Name
  - Fleet Car
    - Car Fleet ID
    - Car Trim ID
    - Data (JSONB)
- User Interface:
  - Car make
  - Car model
  - Car year
  - Car trim
  - Car trim info
  - Fleet car info

[//]: # (  - Address database)

[//]: # (    - First street address)

[//]: # (    - Second street address)

[//]: # (    - City)

[//]: # (    - State/Province)

[//]: # (    - Zipcode)

[//]: # (    - Country)

[//]: # (  - Phone database)

[//]: # (    - Phone number)

[//]: # (    - Country of number)

[//]: # (    - Phone number type:)

[//]: # (      - Physical)

[//]: # (      - Cell Phone)

[//]: # (      - Fax)

[//]: # (  - Contact database)

[//]: # (    - First name)

[//]: # (    - Middle name)

[//]: # (    - Last name)

[//]: # (    - Address)

[//]: # (    - Phone)

[//]: # (  - Users database)

[//]: # (    - Username)

[//]: # (    - Password)

[//]: # (    - Contact ID)

[//]: # (    - E-Mail Address)

[//]: # (  - Insurance Carrier database)

[//]: # (    - Name)

[//]: # (    - Phone ID)

[//]: # (    - Address ID)

[//]: # (  - Insurance database)

[//]: # (    - Insurance Carrier ID)

[//]: # (    - Insurance Identifier)

[//]: # (    - Origination Date)

[//]: # (    - Expiration Date)

[//]: # (  - Car Registration database)

[//]: # (    - Number)

[//]: # (    - Expire Date)

[//]: # (    - Registration State/Province)

[//]: # (    - Registered Contact)

[//]: # (  - Cars database)

[//]: # (    - URL to car listing on Turo or hosted site)

[//]: # (    - Nickname)

[//]: # (    - Car year)

[//]: # (    - Car make)

[//]: # (    - Car model)

[//]: # (  - Car Owners database)

[//]: # (    - Car ID)

[//]: # (    - Contact ID)

[//]: # (    - Percentage)

[//]: # (  - Car Storage database)

[//]: # (    - Storage location physical location)

[//]: # (    - Storage location mailing address)

[//]: # (    - Storage description)

[//]: # (    - Phone number)

[//]: # (    - Contact name)

[//]: # (  - Note database)

[//]: # (    - Note description)

[//]: # (    - Cost and Date)

[//]: # (  - Infractions database)

[//]: # (    - Infraction type:)

[//]: # (      - Normal Wear and Tear)

[//]: # (      - Excessive Wear and Tear)

[//]: # (      - Intentional Damage/Vandalism)

[//]: # (      - Smoking/Vaping)

[//]: # (      - Speeding/Vehicle Misuse)

[//]: # (      - Minor Accident)

[//]: # (      - Major Accident)

[//]: # (      - Total Loss)

[//]: # (    - Car note)

[//]: # (  - Photos database)

[//]: # (    - Photo types:)

[//]: # (      - Car Interior)

[//]: # (      - Car Exterior)

[//]: # (      - Car Before)

[//]: # (      - Car After)

[//]: # (      - Car Claim)

[//]: # (      - Car Initial Interior)

[//]: # (      - Car Initial Exterior)

[//]: # (      - Renter DL)

[//]: # (      - Renter Selfie and DL)

[//]: # (      - Renter Selfie and Car)

[//]: # (    - Photo store location URL)

[//]: # (  - Car Photos database)

[//]: # (    - Car ID)

[//]: # (    - Photo ID)

[//]: # (    - Date of Photo)

[//]: # (  - Incidentals database)

[//]: # (    - Car ID)

[//]: # (    - Photo ID)

[//]: # (    - Note ID)

[//]: # (  - Car Registration History database)

[//]: # (    - Car ID)

[//]: # (    - Registration ID)

[//]: # (  - Drivers License database)

[//]: # (    - License number)

[//]: # (    - Issuing state/province)

[//]: # (    - Issuing country)

[//]: # (    - Registered address)

[//]: # (    - Registered contact)

[//]: # (    - Issue Date)

[//]: # (    - Expiration Date)

[//]: # (    - Photo)

[//]: # (  - Renters database)

[//]: # (    - Renter name)

[//]: # (    - Renter birth date)

[//]: # (    - Drivers License record)

[//]: # (    - Photo record)

[//]: # (    - URL to user info on rental site)

[//]: # (  - Trip database)

[//]: # (    - Car ID)

[//]: # (    - Start time of rent)

[//]: # (    - End time of rent)

[//]: # (    - Total Mileage)

[//]: # (    - Total payout)

[//]: # (  - Trip Photos database)

[//]: # (    - Trip ID)

[//]: # (    - Photo ID)

[//]: # (    - Date)

[//]: # (  - Trip Renter database)

[//]: # (    - Trip ID)

[//]: # (    - Renter ID)

[//]: # (    - Renter Type &#40;primary, authorized&#41;)

[//]: # (  - Trip Infractions database)

[//]: # (    - Trip Renter ID)

[//]: # (    - Infraction ID)

[//]: # (  - Car Condition database)

[//]: # (    - Car ID)

[//]: # (    - Photo ID)

[//]: # (    - Note ID)

[//]: # (  - Car Investment database)

[//]: # (    - Car ID)

[//]: # (    - Investor Contact ID)

[//]: # (    - Percentage)

[//]: # (    - Amount Invested)

[//]: # (  - Toll Transponders database)

[//]: # (    - ID of the transponder)

[//]: # (    - Car ID)

[//]: # (    - Login for transponder database)

[//]: # (  - Trip Toll database)

[//]: # (    - Toll transponder ID)

[//]: # (    - Trip ID)

[//]: # (    - Note ID)

[//]: # (    - Renter associated with toll)

[//]: # (Phase 1: &#40;Unanswered&#41;)

[//]: # (- Company database)

[//]: # (  - Company name)

[//]: # (  - Contact ID)

[//]: # (  - Mailing Address ID)

[//]: # (  - Physical Address ID)

[//]: # (- Fleet database)

[//]: # (  - Fleet Name)

[//]: # (  - Company ID)

[//]: # (- Fleet Car database)

[//]: # (  - Car ID)

[//]: # (  - Fleet ID)

[//]: # (- Car Depreciation database)

[//]: # (  - Car ID)

[//]: # (  - Purchase Price)

[//]: # (  - Purchase Date)

[//]: # (  - Depreciation per month &#40;Float&#41; - 20% of purchase price amortized over 12 months)

[//]: # (  - Depreciation termination date &#40;60 month after purchase date&#41;)

Phase 2:
- OpenAPI Definitions

Phase 3:
- Application screen layout
  - Login screen
  - Register Insurance information
  - Car information
    - Car price
    - Depreciation schedule
    - Insurance
    - Registration

