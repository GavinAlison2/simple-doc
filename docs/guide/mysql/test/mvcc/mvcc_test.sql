create DATABASE IF NOT EXISTS mvcc_test;
use mvcc_test;

CREATE TABLE user (
    id int auto_increment primary key,
    name varchar(50) not null,
    age int not null,
    version int not null
)engine=innodb default charset=utf8mb4;

INSERT INTO user (name, age, version) VALUES ('Alice', 25, 1);
INSERT INTO user (name, age, version) VALUES ('Bob', 30, 1);
INSERT INTO user (name, age, version) VALUES ('Charlie', 35, 1);

-- create index on version column
CREATE INDEX idx_version ON user (version);

-- view table user all index
SHOW INDEX FROM user;
