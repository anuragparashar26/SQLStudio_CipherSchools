-- CipherSQLStudio — PostgreSQL Sandbox Seed

-- Create tables
CREATE TABLE IF NOT EXISTS students (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  age   INT,
  score INT
);

CREATE TABLE IF NOT EXISTS courses (
  id          SERIAL PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  instructor  VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS enrollments (
  id         SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id  INT REFERENCES courses(id),
  grade      CHAR(1)
);

-- Insert sample data: students
INSERT INTO students (name, age, score) VALUES
  ('Alice', 21, 95),
  ('Bob', 22, 72),
  ('Charlie', 20, 88),
  ('Diana', 23, 65),
  ('Eve', 21, 91),
  ('Frank', 24, 55),
  ('Grace', 22, 78),
  ('Hank', 20, 82),
  ('Ivy', 23, 69),
  ('Jack', 21, 94);

-- Insert sample data: courses
INSERT INTO courses (course_name, instructor) VALUES
  ('Database Systems', 'Dr. Smith'),
  ('Web Development', 'Prof. Johnson'),
  ('Data Structures', 'Dr. Williams'),
  ('Machine Learning', 'Prof. Brown');

-- Insert sample data: enrollments
INSERT INTO enrollments (student_id, course_id, grade) VALUES
  (1, 1, 'A'),
  (1, 2, 'A'),
  (2, 1, 'B'),
  (2, 3, 'C'),
  (3, 2, 'A'),
  (3, 4, 'B'),
  (4, 1, 'C'),
  (4, 3, 'D'),
  (5, 2, 'A'),
  (5, 4, 'A'),
  (6, 1, 'D'),
  (6, 3, 'C'),
  (7, 2, 'B'),
  (7, 4, 'B'),
  (8, 1, 'A'),
  (8, 3, 'A'),
  (9, 2, 'C'),
  (9, 4, 'B'),
  (10, 1, 'A'),
  (10, 2, 'A');
