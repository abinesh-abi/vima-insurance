# Vima Insurance Premiums Challenge

## Overview

This project consists of a client-side application built with React and a server-side application built with Express. The client interacts with the server to fetch and display insurance premium data.

## Hosted Links

- **Client Application**: [link](https://vima-insurance.onrender.com)
- **Server API**: [link](https://vima-insurance-server.onrender.com)

## Folder Structure

    client - React client application
    server - Express server application

## Client Setup

### Prerequisites

- Node.js

### Start Client

    cd client
    npm install
    npm start

The application will be available at http://localhost:3000

## Server Setup

### Prerequisites

- Node.js

### Start Server

    cd server
    npm install
    npm start

The server will be available at http://localhost:5000

## API Endpoints

### `GET /premium/list`

This endpoint retrieves a list of insurance premiums. You can filter and sort the results using query parameters.

#### Query Parameters

- `name` (optional): Search for premiums by name.
- `min-pre` (optional): Filter premiums with a minimum price.
- `max-pre` (optional): Filter premiums with a maximum price.
- `min-cov` (optional): Filter premiums with a minimum coverage amount.
- `type` (optional): Filter premiums by type.
- `sort` (optional): Sort the results by:
  - `name`
  - `coverage`
  - `premium`

#### Example Request

```http
GET /premium/list?name=health&min-pre=100&max-pre=500&min-cov=1000&type=life&sort=name
```
