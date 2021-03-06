-- 将以下代码复制到 mysql> 下运行 创建books表

create table books(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    openId varchar(50) not null,
    title varchar(100) not null,
    image varchar(100),
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    price varchar(100),
    rate float,
    tags varchar(100),
    author varchar(1000)
) charset utf8 collate utf8_general_ci;