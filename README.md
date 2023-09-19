# DummifyTech
create table if not exists users(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
username VARCHAR(30) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
role ENUM('admin', 'moderator', 'normal') default 'normal',
avatar VARCHAR(255),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);


create table if not exists categories(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) UNIQUE NOT NULL,
description VARCHAR(255) NOT NULL,
image VARCHAR(255),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);


create table if not exists subcategories(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) UNIQUE NOT NULL,
description VARCHAR(255) NOT NULL,
image VARCHAR(255),
id_category INT UNSIGNED NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(id_category) REFERENCES categories(id)
);

create table if not exists posts(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(100) NOT NULL,
post VARCHAR(255) NOT NULL,
image VARCHAR(255),
report BOOLEAN default 0,
id_category INT unsigned,
id_subcategory INT unsigned,
id_user INT unsigned,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(id_category) REFERENCES categories(id),
FOREIGN KEY(id_subcategory) REFERENCES subcategories(id),
FOREIGN KEY(id_user) REFERENCES users(id)
);

create table if not exists comments(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
comment VARCHAR(255) NOT NULL,
id_user INT unsigned,
id_post INT unsigned,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(id_user) REFERENCES users(id),
FOREIGN KEY(id_post) REFERENCES posts(id)
);


create table if not exists likes(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
id_user INT unsigned,
id_post INT unsigned,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(id_user) REFERENCES users(id),
FOREIGN KEY(id_post) REFERENCES posts(id)
);
