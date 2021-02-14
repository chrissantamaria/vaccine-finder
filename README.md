# Vaccine Finder

A tiny Node.js app to help automate the search for a COVID-19 vaccine

## Context

COVID-19 vaccines are (understandably) in high demand. Many distributors offer web portals to check for availability, those these are frustrating to use and require frequent manual checking.

This app automtates the process by running in the background and polling [H-E-B Pharmacy](https://vaccine.heb.com) every 20 seconds to check for appointment availabilities. If one is found, the travel time + distance is calculated with the [Google Maps API](https://developers.google.com/maps/documentation/distance-matrix/overview) and a SMS alert is sent with [Twilio](https://www.twilio.com/sms).

Some additional features:

- Availabilities are cached to prevent sending duplicate alerts
- Multiple SMS recipients are supported (see [environment variable](#sms_recipients))

## Setup

You will need [Node.js](https://nodejs.org/en) 13+ and [Yarn](https://yarnpkg.com).

Install dependencies:

```bash
yarn
```

Copy `.env.example` to a new file `.env` and complete with valid [environment variable values](#environment-variables).

Start the app:

```bash
yarn start
```

## Dev Usage

Start the app in development mode (will need to create `.env.development`):

```bash
yarn dev
```

Lint with ESLint:

```bash
yarn lint
```

Format with Prettier:

```bash
yarn format
```

## Environment Variables

### GOOGLE_API_KEY

An [API key](https://cloud.google.com/docs/authentication/api-keys) for a Google Cloud project with the [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) enabled

### TWILIO_ACCOUNT_SID

The SID for your Twilio account. This should be available on your [dashboard](https://www.twilio.com/console).

### TWILIO_AUTH_TOKEN

The [auth token](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them) for your Twilio account (see above).

### TWILIO_NUMBER

The Twilio number which SMS alerts will be sent from. This must be owned by your Twilio account (see [manage numbers](https://www.twilio.com/console/phone-numbers/incoming)) and in [E.164 format](https://www.twilio.com/docs/glossary/what-e164).

### SMS_RECIPIENTS

Phone number(s) for the receipients of SMS alerts. These must be in E.164 format and comma separated.

### START_LOCATION

Location used as the origin for any travel time calculations. Must in a [valid Google Maps API format](https://developers.google.com/maps/documentation/distance-matrix/overview#required-parameters).

## Todo

- Proper error handling! The current implementation is very scrappy and will likely throw an error if an unexpected API response is received
- Maximum travel time threshold for sending alerts
