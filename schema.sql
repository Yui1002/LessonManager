drop table if exists users;
create table users 
(
    id integer not null primary key auto_increment,
    username varchar(100),
    password varchar(100)
);

drop table if exists students;
create table students 
(
    id integer not null primary key auto_increment,
    first_name varchar(50),
    last_name varchar(50),
    country varchar(50),
    phone_number varchar(20),
    email varchar(255),
    profile_photo varchar(255),
    lesson_hours integer
);

drop table if exists schedules;
create table schedules
(
	id integer not null auto_increment primary key,
    student_id integer not null,
    name varchar(100),
    start_date datetime,
    end_date datetime,
    description varchar(255),
    foreign key (student_id) references students (id)
);