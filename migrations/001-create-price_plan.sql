create table price_plan (
    id integer primary key AUTOINCREMENT,
    plan_name text,
    sms_price real,
    call_price real
);

/* UPDATE price_plan
set sms_price = 9
where plan_name= "sms 101" */

/* drop table price_plan */