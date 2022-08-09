CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
	likes integer default 0 
);

insert into blogs (author, url, title) values ('Alexander', 'www.example.com','Relational databases rule the world');
insert into blogs (author, url, title) values ('Alexander', 'www.example.com','SQL > NoSQL');