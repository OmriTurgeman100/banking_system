/*
* The sql schema, In this file I deliberately document the database changes
* along with providing explanations towards the database design decisions.

* The comments are written by me.
*/

-- create database banking_system;

create table persons (
    personId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null check (trim(name) != ''), -- ! the database is the last layer of defense, I always declare constraints first at the db level.
    document text unique not null check(trim(document) != '' and length(document) > 8), 
    birthDate DATE not null
); -- * I assume document column is some sort of a goverment id, I enforced it to be unique, and added safety constraints.


insert into persons (name, document, birthDate) -- * initial mock person creation
values ('John Doe', 'ABC123456', '1990-05-15');

create table accounts (
    accountId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    personId BIGINT not null unique references persons(personId), 
    balance NUMERIC(15, 2) not null default 0.00 check (balance >= 0), 
    dailyWithdrawalLimit NUMERIC(15,2) NOT NULL DEFAULT 200.00 check (dailyWithdrawalLimit >= 0),
    blockedflag boolean not null default false, 
    accountType text not null CHECK (accountType IN ('CHECKING', 'SAVINGS', 'BUSINESS', 'STUDENT')) default 'CHECKING',
    createDate Date not null default CURRENT_DATE 
);

create table transactions (
    transactionId BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    accountId BIGINT not null references accounts(accountId),
    value NUMERIC(15,2) not null,
    transactionDate Date not null default CURRENT_DATE 
);

alter table transactions
add column type text not null check (type in ('withdraw', 'deposit')); -- * decided to add the type column to the transaction for better details.