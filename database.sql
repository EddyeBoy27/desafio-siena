create type status_enum as enum ('Inserted', 'Consumed');

create table if not exists status_tb (
	id serial primary key not null,
	status status_enum
);

insert into status_tb (status) values
	('Inserted'),
	('Consumed');

create table if not EXISTS workflow (
	id serial primary key,
	uuid varchar (50) unique,
	constraint status foreign key(id) references status_tb(id),
	json_data text,
	array_data text
);