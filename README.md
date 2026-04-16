## Contact

Feel free to reach out if you have any questions or feedback — I'm always happy to hear.

You can also check out my [GitHub](https://github.com/OmriTurgeman100) to see other projects I've built at a much larger scale than this one (production projects)

# How to run

I provided a docker compose yaml file, all what is needed to run is just to do compose up.

It will run the sql script I wrote, create tables, and also will create the initial person creation
as required here: 

"
Persons (it is not necessary to perform operations with the person table ) , create the table to map the relationship with the account and send creation script of at least one person.
"

the docker compose starts the backend.

# Postman Collection

You can test all the routes using the Postman collection file I exported

# Routes

All routes are prefixed with `http://localhost:3000/api/v1`

---

## Accounts

### Create Account
**POST** `/accounts/create`

Links a person to a new bank account. You must provide a valid `person_id` to associate with the account.

The SQL script creates an initial person on startup. Since the `personId` column uses `GENERATED ALWAYS AS IDENTITY` and the database starts fresh on `compose up`, that person is always assigned `id = 1`. You can safely use `1` as the `person_id`.

**Request body:**
```json
{
    "person_id": 1
}
```

**Response:** Returns the newly created account, including the `account_id`.

> **Important:** Save the `account_id` from the response — you will need it for all other operations (deposits, withdrawals, balance checks, viewing transactions, and blocking the account).

---

### Get Account Balance
**GET** `/accounts/balance/:account_id`

Returns the current balance of the specified account.

**Example:** `GET /accounts/balance/1`

---

### Block / Unblock Account
**PATCH** `/accounts/block/:account_id`

Blocks or unblocks an account.

**Example:** `PATCH /accounts/block/1`

**Request body:**
```json
{
    "block": true
}
```

Set `block` to `true` to block the account, or `false` to unblock it.

---

## Transactions

### Deposit
**POST** `/transactions/deposit/:account_id`

Deposits money into the specified account.

**Example:** `POST /transactions/deposit/1`

**Request body:**
```json
{
    "amount": 500
}
```

`amount` must be a positive number.

---

### Withdraw
**PATCH** `/transactions/withdraw/:account_id`

Withdraws money from the specified account.

**Example:** `PATCH /transactions/withdraw/1`

**Request body:**
```json
{
    "amount": 200
}
```

`amount` must be a positive number.

---

### View Transactions
**GET** `/transactions/view/:account_id`

Returns all transactions for the specified account.

**Example:** `GET /transactions/view/1`

You can optionally filter by date range using query parameters:

**Example with date filter:** `GET /transactions/view/1?startDate=2024-01-01&endDate=2024-12-31`

Each transaction record includes the account ID, person name, transaction date, type, and value.

---


