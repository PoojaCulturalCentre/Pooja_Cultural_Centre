-- Pooja Cultural Centre - admin panel schema
-- Run against a MySQL database named `pooja_cc`:
--   mysql -u root -p pooja_cc < db/schema.sql

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  batch VARCHAR(100) NOT NULL,
  joined DATE NOT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  schedule VARCHAR(150) NOT NULL,
  students INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  url VARCHAR(500) NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  url VARCHAR(500) NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- Seed admin user: username "vikram", password "qwerty"
INSERT INTO admin_users (username, password_hash, name)
SELECT 'vikram', '$2b$10$RmCrp4lj.bJgT0NrPm47yedV/GvTCB1Suyhx1DjZJYFxFe9AfBC2W', 'Pooja'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'vikram');

-- Seed data (only if tables are empty)
INSERT INTO students (name, batch, joined, status)
SELECT * FROM (SELECT 'Ananya Krishnan', 'Beginners', '2025-01-12', 'Active' UNION ALL
  SELECT 'Meera Suresh', 'Advanced', '2024-08-03', 'Active' UNION ALL
  SELECT 'Divya Raman', 'Arangetram Prep', '2023-11-20', 'Active' UNION ALL
  SELECT 'Sharanya Iyer', 'Online', '2025-03-05', 'Inactive' UNION ALL
  SELECT 'Kavya Nair', 'Beginners', '2025-06-18', 'Active' UNION ALL
  SELECT 'Lakshmi Priya', 'Advanced', '2024-02-11', 'Active' UNION ALL
  SELECT 'Ritika Nambiar', 'Online', '2025-04-22', 'Active' UNION ALL
  SELECT 'Swathi Menon', 'Beginners', '2025-07-09', 'Inactive' UNION ALL
  SELECT 'Deepa Varma', 'Arangetram Prep', '2023-05-30', 'Active' UNION ALL
  SELECT 'Nithya Balan', 'Advanced', '2024-09-14', 'Active' UNION ALL
  SELECT 'Anjali Pillai', 'Beginners', '2025-08-01', 'Active' UNION ALL
  SELECT 'Gayatri Nair', 'Online', '2024-12-19', 'Inactive') AS seed(name, batch, joined, status)
WHERE NOT EXISTS (SELECT 1 FROM students);

INSERT INTO classes (name, schedule, students)
SELECT * FROM (SELECT 'Beginners Batch A', 'Mon, Wed - 5:00 PM', 18 UNION ALL
  SELECT 'Advanced Batch', 'Tue, Thu - 6:30 PM', 12 UNION ALL
  SELECT 'Arangetram Prep', 'Sat - 10:00 AM', 6 UNION ALL
  SELECT 'Online Batch', 'Fri - 7:00 PM', 22 UNION ALL
  SELECT 'Beginners Batch B', 'Tue, Thu - 5:00 PM', 16 UNION ALL
  SELECT 'Kids Batch', 'Sat - 11:30 AM', 14 UNION ALL
  SELECT 'Weekend Intensive', 'Sun - 9:00 AM', 10) AS seed(name, schedule, students)
WHERE NOT EXISTS (SELECT 1 FROM classes);

INSERT INTO messages (sender_name, email, subject, body, is_read)
SELECT * FROM (SELECT 'Radha Menon', 'radha.menon@example.com', 'Enrollment for beginners batch', 'Hi, I would like to enroll my daughter in the beginners batch. Please share the timings.', 1 UNION ALL
  SELECT 'Vikram S', 'vikram.s@example.com', 'Arangetram date confirmation', 'Can you confirm the arangetram date for this year?', 1 UNION ALL
  SELECT 'Priya Das', 'priya.das@example.com', 'Fee payment query', 'I have a question about the fee payment schedule.', 1 UNION ALL
  SELECT 'Suresh Kumar', 'suresh.kumar@example.com', 'Costume measurements', 'When should we submit costume measurements?', 1 UNION ALL
  SELECT 'Anitha Rajan', 'anitha.rajan@example.com', 'Class timing change request', 'Could the Tuesday class be moved to a later time?', 1 UNION ALL
  SELECT 'Kiran Baby', 'kiran.baby@example.com', 'Online batch access issue', 'I am unable to access the online batch link.', 1) AS seed(sender_name, email, subject, body, is_read)
WHERE NOT EXISTS (SELECT 1 FROM messages);

INSERT INTO videos (title, duration, active)
SELECT * FROM (SELECT 'Arangetram Performance 2025', '12:30', 1 UNION ALL
  SELECT 'Beginners Batch Showcase', '5:45', 1 UNION ALL
  SELECT 'Guru Interview', '8:20', 0 UNION ALL
  SELECT 'Annual Day Highlights', '15:10', 1 UNION ALL
  SELECT 'Thillana Recital', '6:05', 0) AS seed(title, duration, active)
WHERE NOT EXISTS (SELECT 1 FROM videos);

INSERT INTO images (title, category, active)
SELECT * FROM (SELECT 'Arangetram Ceremony', 'Events', 1 UNION ALL
  SELECT 'Classroom Practice', 'Classes', 1 UNION ALL
  SELECT 'Guru with Students', 'Guru', 1 UNION ALL
  SELECT 'Costume Details', 'Gallery', 0 UNION ALL
  SELECT 'Stage Performance', 'Events', 1 UNION ALL
  SELECT 'Ghungroo Close-up', 'Gallery', 1) AS seed(title, category, active)
WHERE NOT EXISTS (SELECT 1 FROM images);
