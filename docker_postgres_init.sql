CREATE TABLE reservation(
  id SERIAL PRIMARY KEY NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  party_size int NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL
);

CREATE TABLE inventory(
  id SERIAL PRIMARY KEY NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  parties int NOT NULL
);

INSERT INTO reservation(name, email, party_size, date, time) VALUES
  ('Anthony', 'anthony@email.com', 4, '2020-09-16', '02:15 PM'),
  ('Dan', 'dan@email.com', 2, '2020-09-16', '02:30 PM'),
  ('Laura', 'laura@email.com', 3, '2020-09-16', '03:00 PM'),
  ('Josh', 'josh@email.com', 6, '2020-09-17', '02:00 PM'),
  ('Cindy', 'cindy@email.com', 4, '2020-09-17', '03:15 PM'),
  ('Cali', 'cali@email.com', 3, '2020-09-17', '03:15 PM');

INSERT INTO inventory(date, time, parties) VALUES
  ('2020-09-16', '2:00 PM', 3),
  ('2020-09-16', '2:15 PM', 3),
  ('2020-09-16', '2:30 PM', 3),
  ('2020-09-16', '2:45 PM', 3),
  ('2020-09-16', '3:00 PM', 3),
  ('2020-09-16', '3:15 PM', 3),
  ('2020-09-16', '3:30 PM', 3),
  ('2020-09-16', '3:45 PM', 3),
  ('2020-09-17', '2:00 PM', 3),
  ('2020-09-17', '2:15 PM', 3),
  ('2020-09-17', '2:30 PM', 3),
  ('2020-09-17', '2:45 PM', 3),
  ('2020-09-17', '3:00 PM', 3),
  ('2020-09-17', '3:15 PM', 3),
  ('2020-09-17', '3:30 PM', 3),
  ('2020-09-17', '3:45 PM', 3);