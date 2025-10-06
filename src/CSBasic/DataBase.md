---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 数据库
tag:
  - default
---

# 数据库
## 数据库概述
**定义**：数据库是用于存储、管理和组织大量数据的系统，它允许数据的高效存储、访问和操作。

种类：关系型数据库和非关系型数据库（不是SQL的数据库就是NoSQL数据库）

**特点**：
- **持久性**：数据库的数据被长期存储在磁盘上，即使系统重启也不会丢失。
- **共享性**：支持多个用户或应用同时访问和操作数据，实现数据共享。
- **完整性**：通过约束和规则，保证数据的正确性和一致性。
- **安全性**：提供用户权限控制，防止未经授权的访问和操作。
- **冗余低**：通过表结构优化和设计，减少数据重复和存储空间浪费。
- **独立性**：数据的逻辑结构和物理结构分离，便于数据的迁移和扩展。

## 关系型数据库（SQL）
数据存储在表格中，以行和列的形式组织数据。支持SQL查询，适合处理结构化数据和复杂关系。
常用的关系型数据库：MySQL、PostgreSQL、Oracle等


**表**：数据库中存储数据的基本单元，类似于一个数据文件，每个表包含特定类型的数据集合（如员工信息表、订单表等）。
**行**：表中的每一行代表一条记录，也称为“元组”。每行的数据是一个完整的实体实例，如员工信息表中的某一位员工的数据。
**列**：列定义了数据的类型和属性，表中的每一列代表一个字段，也称为“属性”，如姓名、年龄、职位等。
**主键**：用于确保表中每条记录都是独一无二的，具有唯一性和非空性，如员工ID。。一个表只能有一个主键字段或主键组合。
**外键**：外键是一个表中的字段，指向另一表的主键，用于在两个表之间建立关联，保证数据的参照完整性。例如，员工表中的部门ID作为外键，关联部门表中的主键部门ID，确保员工只能属于有效的部门。



**关系范式**
- **含义**：设计关系型数据库的准则，范式（Normal Form）
- **目的**：减少数据冗余和提高数据一致性
- **第一范式（1NF）**：确保每列的值是不可再分解的，如每个字段存储单一值（如，手机号字段不包含多个号码）。
- **第二范式（2NF）**：在满足1NF的基础上，要求每个非主属性都**完全依赖主键**，避免部分依赖（如，复合主键中，非主属性依赖于其中部分主键）。
- **第三范式（3NF）**：在满足2NF的基础上，要求非主属性**只依赖于主键**，消除传递依赖（如，某属性通过其他非主属性间接依赖主键）。
- **BCNF（Boyce-Codd范式）**：在满足3NF的基础上，要求每个**候选键**（唯一确定一条记录的字段或字段组合）不被其他非主属性依赖，以进一步避免依赖异常。

## 非关系型数据库（NoSQL）
**SQL的问题**：
- 固定表结构，每条记录必须是一样的字段
- 不支持嵌套对象，想存对象/数组必须拆分成子表或字符串存
- 复杂数据结构必须多表 JOIN 才能还原结构
- schema 变更难，改字段、加字段要 ALTER 表，代价大

**介绍**：不是SQL的数据库就是NoSQL数据库，不是关系型数据库即不采用表格结构，适合处理非结构化或半结构化数据。NoSQL数据库不使用固定的表格结构，因此数据更灵活，尤其适合大数据和实时应用场景。

**特点**：
- **高扩展性**：天然支持分布式扩展，容易水平扩展（加机器 → 加性能），分片存储、无中心架构，天生适合大数据量存储，适合分布式系统。
- **灵活性**：不需要预定义表结构（不需要“建表”），无需固定的表结构，允许不同记录拥有不同字段。可以存储 JSON、嵌套对象、数组等复杂结构
- **高性能**：高写入吞吐，适合大规模实时数据写入，如日志、传感器、轨迹数据等，多数支持内存写缓存 + 异步落盘，高并发性能优，通常支持快速读写，满足实时应用需求。
- **弱一致性**：大部分NoSQL数据库支持最终一致性模型，适合数据量大但一致性要求不高的场景。 最终一致性而非强事务，提供高可用、高容错，但不会像 SQL 一样强制事务一致性（适合对事务要求不高的业务）

**分为以下几类**：
- **键值数据库（Key-Value Store）**：数据以键值对形式存储，类似于字典，适合快速查找和缓存，如Redis、DynamoDB。
- **文档数据库（Document Store）**：以文档（如JSON、BSON）格式存储数据，支持层次结构和嵌套，每个文档具有自定义的结构，适合存储复杂层次数据、半结构化数据，如MongoDB、CouchDB。
- **列族数据库（Column-Family Store）**：数据按列存储，每列族包含相关的列，支持高效的列访问和大数据量的查询，适合存储海量数据、分析和查询特定字段的场景，常用于数据分析和日志系统，如Cassandra、HBase。
- **图数据库（Graph Database）**：以节点和边表示数据关系，适合存储和查询复杂关系，如社交网络、推荐系统等需要存储和查询复杂关系的应用，如Neo4j、JanusGraph。
## SQL语法基础

- 单行注释：`--`，多行注释：`/* */`
- 数据类型：char字符串、varchar可变长字符串、integer整数、date日期
- 常用约束：not null非空值约束、default默认值约束、primary key主键约束
- SQL 大小写不敏感，但**表名/字段名在某些系统中区分大小写**
-  **分号 (;)** 结尾
- 推荐使用 **别名 (AS)** 提高可读性
- 查询中推荐显式列名，而非 `SELECT *`
- 注意 **WHERE 条件** 不要漏写，否则会影响全表数据
- 视图是保存的select，节省空间，不改变原表：
	- 创建视图：`create view <视图名>(列名1，列名2，...) as select语句`
	- 删除视图：`drop view ;`
	- 注意：不能用order by语句定义视图


**DDL**（Data Definition Language）：定义/修改数据库结构，常见语句：`CREATE`、`ALTER`、`DROP`、`TRUNCATE`
```sql
-- 创建数据库
CREATE DATABASE mydb;

-- 创建表
CREATE TABLE table_name (
column1 datatype,
column2 datatype,
...
);
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 修改表（添加列）
ALTER TABLE table_name ADD column_name datatype;
ALTER TABLE users ADD email VARCHAR(100);

-- 删除表
DROP TABLE table_name;
DROP TABLE users;

-- 清空表数据（比 DELETE 快，不产生日志）
TRUNCATE TABLE users;

```

**DML**（Data Manipulation Language）：对数据进行增删改查，常见语句：`INSERT`、`UPDATE`、`DELETE`
```sql
-- 插入数据
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
INSERT INTO users (name, age) VALUES ('Alice', 25);

-- 更新数据
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
UPDATE users SET age = 26 WHERE id = 1;

-- 删除数据
DELETE FROM table_name WHERE condition;
DELETE FROM users WHERE id = 1;

```


**DQL**（Data Query Language）：查询数据（从表中读取），常见语句：`SELECT`
```sql
-- 基本查询，可查询单列、多列，也可以用 `*` 来查询所有列。
SELECT name, age FROM users;

-- 别名：可以使用 `AS` 为查询结果中的列重新命名，便于理解或处理。
SELECT 列1 AS 别名1, 列2 AS 别名2 FROM 表名;

-- 带条件的查询，使用 `WHERE` 子句指定查询条件，以筛选满足条件的行。常见的条件操作符有 `=`、`<>` (不等于)、`>`、`<`、`>=`、`<=` 等，逻辑操作符有 `AND`、`OR`、`NOT`。
-- `LIKE` 是 SQL 中用于模糊匹配的操作符，使用通配符来进行匹配。`%`：代表零个或多个字符、`_`：代表一个单个字符。
SELECT * FROM users WHERE age >= 18 AND name LIKE 'A%';

-- 排序，使用 `ORDER BY` 对结果按指定列排序，默认升序，可以指定 `DESC` 实现降序，null在末尾（asc升序，null在开头）
SELECT * FROM users ORDER BY age DESC;

-- **限制返回结果 (LIMIT)**  ：使用 `LIMIT` 控制返回的行数，通常用于分页。例如，返回前5条记录：
SELECT 列1, 列2 FROM 表名 LIMIT 5;

-- 分页
SELECT * FROM users LIMIT 10 OFFSET 20;

-- 聚合函数，用于计算列的汇总信息，包括：COUNT、SUM、AVG、MAX、MIN
SELECT COUNT(*) AS total_users, AVG(age) AS avg_age FROM users;

-- 分组：`GROUP BY` 用于将具有相同值的行分成组，常用于配合聚合函数：null也会程伟一行
SELECT 列名, COUNT(*) FROM 表名 GROUP BY 列名;
SELECT age, COUNT(*) FROM users GROUP BY age HAVING COUNT(*) > 1;

-- 多表连接查询 (JOIN)：通过 `JOIN` 连接多张表，实现多表数据的联合查询，主要有：`INNER JOIN`（返回两表中匹配的记录、`LEFT JOIN`（返回左表的所有记录及匹配的右表记录、`RIGHT JOIN`（返回右表的所有记录及匹配的左表记录、`FULL JOIN`（返回两表的所有记录，未匹配的部分为NULL
SELECT a.列1, b.列2 FROM 表A AS a INNER JOIN 表B AS b ON a.主键 = b.外键;
SELECT u.name, o.order_no
FROM users u
JOIN orders o ON u.id = o.user_id;

-- **条件筛选分组 (HAVING)**  ：与 WHERE 类似，但用于分组后的数据筛选
SELECT 列名, COUNT(*) FROM 表名 GROUP BY 列名 HAVING COUNT(*) > 1;


```

**DCL**（Data Control Language）：控制访问权限，常见语句：`GRANT`、`REVOKE`
```sql
-- 授权
GRANT SELECT, INSERT ON mydb.* TO 'user1'@'localhost';

-- 回收权限
REVOKE INSERT ON mydb.* FROM 'user1'@'localhost';

```

**TCL**（Transaction Control Language）：控制事务（事务提交/回滚），常见语句：`COMMIT`、`ROLLBACK`、`SAVEPOINT`
```sql
-- 开启事务
START TRANSACTION;

-- 更新数据
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- 提交
COMMIT;

-- 回滚
ROLLBACK;

-- 保存点
SAVEPOINT sp1; -- 设置保存点
ROLLBACK TO sp1; -- 回滚到保存点

```




## SQL练习

- **查询员工表 `employees` 中所有工资大于 5000 的员工姓名和工资**
```sql
SELECT name, salary
FROM employees
WHERE salary > 5000;
过滤条件直接筛选即可。
```


- **从 `orders` 表中查询 2023 年下单的订单数量**
```sql
SELECT COUNT(*) AS cnt
FROM orders
WHERE order_date >= '2023-01-01' AND order_date < '2024-01-01';
使用半开区间避免函数导致索引失效。
```


- **查询 `students` 表中所有不同的专业**
```sql
SELECT DISTINCT major
FROM students;
`DISTINCT` 去重列值。
```



- **在 `products` 表中找出价格最高的产品及其价格**
```sql
SELECT p.*
FROM products p
WHERE p.price = (SELECT MAX(price) FROM products);
子查询找最大值；若并列最高会返回多行。
```



- **统计 `employees` 表中每个部门的人数**
```sql
SELECT dept_id, COUNT(*) AS emp_cnt
FROM employees
GROUP BY dept_id;
按部门分组聚合。
```



- **查询每个部门工资最高的员工信息**
```sql
SELECT e.*
FROM employees e
JOIN (
  SELECT dept_id, MAX(salary) AS max_salary
  FROM employees
  GROUP BY dept_id
) m ON e.dept_id = m.dept_id AND e.salary = m.max_salary;
分组求最大值后回连原表取完整行。
```



- **查询至少有 5 个员工的部门**
```sql
SELECT dept_id, COUNT(*) AS emp_cnt
FROM employees
GROUP BY dept_id
HAVING COUNT(*) >= 5;
用 `HAVING` 对聚合结果过滤。
```



- **查询平均工资高于 8000 的部门编号和平均工资**
聚合后筛选平均值。
```sql
SELECT dept_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 8000;
```



- **查询订单表金额最高的前 3 个订单**
```sql
SELECT order_id, amount
FROM orders
ORDER BY amount DESC
LIMIT 3;
排序 + `LIMIT`。
```



- **查询没有下过订单的客户（`customers` 与 `orders`）**
```sql
SELECT c.*
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.customer_id IS NULL;
反连接模式找“孤儿”。
```



- **查询连续三个月都有下单的客户**
```sql
WITH m AS (
  SELECT customer_id,
		 DATE_FORMAT(order_date, '%Y-%m-01') AS ym
  FROM orders
  GROUP BY customer_id, ym
),
t AS (
  SELECT customer_id,
		 ym,
		 DATE_SUB(ym, INTERVAL ROW_NUMBER() OVER (
		   PARTITION BY customer_id ORDER BY ym
		 ) MONTH) AS grp
  FROM m
)
SELECT DISTINCT customer_id
FROM (
  SELECT customer_id, grp, COUNT(*) AS run_len
  FROM t
  GROUP BY customer_id, grp
) x
WHERE run_len >= 3;
按月去重后用“日期减去行号”法识别连续段。
```



- **查询每个月的销售额，并找出销售额最高的月份**

```sql
-- 每月销售额
SELECT DATE_FORMAT(order_date, '%Y-%m') AS ym, SUM(amount) AS monthly_sales
FROM orders
GROUP BY ym;

-- 销售额最高的月份
SELECT ym, monthly_sales
FROM (
  SELECT DATE_FORMAT(order_date, '%Y-%m') AS ym, SUM(amount) AS monthly_sales
  FROM orders
  GROUP BY ym
) s
ORDER BY monthly_sales DESC
LIMIT 1;
先聚合再取 Top1。
```


- **查询 `employees` 表中工资排名第 2 的员工（不允许 `LIMIT 1 OFFSET 1`）**

```sql
SELECT e.*
FROM employees e
WHERE salary = (
  SELECT MAX(salary) FROM employees
  WHERE salary < (SELECT MAX(salary) FROM employees)
);
“次高值”=小于全局最大值的最大值；可返回并列。
```


- **查询和 “张三” 在同一个部门的所有员工**

```sql
SELECT e.*
FROM employees e
JOIN (
  SELECT dept_id FROM employees WHERE name = '张三' LIMIT 1
) z ON e.dept_id = z.dept_id;
先取张三部门再连接。
```


- **查询 `orders` 表中每个用户的最新一笔订单**

```sql
SELECT o.*
FROM orders o
JOIN (
  SELECT customer_id, MAX(order_date) AS max_dt
  FROM orders
  GROUP BY customer_id
) t ON t.customer_id = o.customer_id AND t.max_dt = o.order_date;
分组取最大时间并回连原表。
```


- **`logs` 表（user_id, login_time），查询每天活跃用户数（DAU）**

```sql
SELECT DATE(login_time) AS d, COUNT(DISTINCT user_id) AS dau
FROM logs
GROUP BY d
ORDER BY d;
按天聚合并对用户去重。
```


- **查询每个部门工资前 2 名的员工信息（窗口函数）**

```sql
SELECT *
FROM (
  SELECT e.*,
		 DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rk
  FROM employees e
) x
WHERE rk <= 2;
`DENSE_RANK` 处理并列名次。
```


- **`students` 表（id, name, score），查询分数大于班级平均分的学生**

```sql
SELECT s.*
FROM students s
JOIN (
  SELECT AVG(score) AS avg_score FROM students
) a
WHERE s.score > a.avg_score;
全表平均分对比；若还有班级字段则 `PARTITION BY`。
```


- **查询 `orders` 表中出现次数最多的商品（top1）**

```sql
SELECT product_id, COUNT(*) AS cnt
FROM orders
GROUP BY product_id
ORDER BY cnt DESC
LIMIT 1;
统计频次取最高；若要含并列可用子查询比较 `MAX(cnt)`。
```


- **查询用户表 `users` 中生日在 2 月份的用户**

```sql
SELECT *
FROM users
WHERE MONTH(birth_date) = 2;
如需走索引可改为范围：`birth_date` 的月份边界按年份逐年匹配。
```




## 事务
5分钟精通数据库事务-ACID和三大问题 https://www.bilibili.com/video/BV1JG4y1Q7BX

**概念**：事务是一组数据库操作的集合，这些操作要么全部成功执行，要么全部回滚，以保证数据的一致性。
例如，在一个银行转账的业务中，从一个账户扣款和向另一个账户存款这两个操作必须作为一个事务来处理，要么都成功，要么都不执行，以确保总金额不会出现错误。

**定义**：
- 事务是数据库中的一个逻辑操作单元，是包含一组要么全部执行、要么全部回滚的SQL语句。
- 事务的目的是保证数据的完整性和一致性，尤其在多个操作需一起成功时使用。

**事务的四大特性（ACID）**
- **原子性（Atomicity）**：事务是不可分割的最小工作单元，一个事务对应一个完整的业务。事务中的所有操作要么全部完成，要么全部取消，不存在部分执行。
- **一致性（Consistency）**：事务执行前后，数据库始终保持一致状态。比如a与b账户共有1000块，两人之间转账之后无论成功还是失败，它们的账户总和还是1000。
- **隔离性（Isolation）**：并发事务之间相互隔离，不会互相干扰，保持各自的操作完整性。
- **持久性（Durability）**：一旦事务提交，那么对数据库中的数据所做的更改永久生效，即使系统崩溃也能保持。 

**事务相关问题**
以下是并发事务访问数据时可能出现的问题：
- 脏读（dirty read）：
	- 一个事务读取了另一个未提交事务所修改的数据。如果修改的事务随后回滚，这会导致读取的事务获取到无效数据。
	- 例如，事务A更新了一条记录，事务B读取到此更新的数据，但事务A随后回滚，B读取到的数据就成了无效数据。
	- 解决方案：设置隔离级别为“读已提交”或更高。
- 不可重复读（non-repeatable read）：
	- 在一个事务中多次读取同一数据时，数据值因其他事务的修改而不一致。
	- 例如，事务A在两次读取之间，事务B对数据进行了修改或删除，导致事务A的两次读取结果不同。**
	- 解决方案**：设置隔离级别为“可重复读”或更高。
- 幻读（phantom read）：
	- 一个事务在读取符合条件的记录集合时，另一个事务插入或删除了符合相同条件的新记录，导致前者在前后读取时，结果集的行数不一致。
	- 通常发生在范围查询时。
	- 解决方案：设置隔离级别为“序列化”解决。


事务的隔离级别
**简介**：
- 用于控制并发事务间的影响，确保数据一致性。
- 隔离级别越高，一致性越强，但并发性能下降。

**四种事务隔离级别**：
- 读未提交（Read Uncommitted）：事务可以读取其他未提交事务的数据，可能会导致**脏读**（读取到其他事务未提交的数据变更）。适合性能要求高且一致性要求较低的场景。

- **读已提交（Read Committed）**：事务只能读取到其他事务已提交的数据，避免了脏读，但可能会出现**不可重复读**（同一事务多次读取同一数据，值却不同）。这是大多数数据库的默认级别。

- **可重复读（Repeatable Read）**：在事务内多次读取同一数据结果一致，避免了脏读和不可重复读，但可能会出现**幻读**（事务期间新增或删除数据行导致数据变化）。这是MySQL InnoDB的默认隔离级别。

- **序列化（Serializable）**：最高隔离级别，事务完全串行执行，避免所有并发问题（脏读、不可重复读、幻读），保证最高的一致性，但性能较低。



读未提交是指，一个事务还没提交时，它做的变更就能被别的事务看到。
读提交是指，一个事务提交之后，它做的变更才会被其他事务看到。
可重复读是指，一个事务执行过程中看到的数据，总是跟这个事务在启动时看到的数据是一致的。当然在可重复读隔离级别下，未提交变更对其他事务也是不可见的。
串行化，顾名思义是对于同一行记录，“写”会加“写锁”，“读”会加“读锁”。当出现读写锁冲突的时候，后访问的事务必须等前一个事务执行完成，才能继续执行。




## MVCC机制

多版本并发控制（MVCC）是一种事务管理机制，主要用于提升数据库在并发操作下的性能和一致性。MVCC通过为数据维护多个版本，使多个事务可以同时读取和写入数据而不相互阻塞，从而实现高效的并发控制。

**工作原理**

- **版本快照**：每个事务在开始时获取数据的“快照”，即数据在该事务启动时的一个版本。这样，读操作可以直接读取快照中的数据，而不会受到其他事务的影响。
  
- **隐藏删除和修改**：当一个事务修改或删除一行数据时，数据库不会立即覆盖原始数据，而是创建一个新版本，保留原数据供其他事务访问。这些版本会带有时间戳或事务ID，用于区分版本。

- **可见性规则**：每个事务只能看到在它启动之前提交的数据版本，不会看到其他未提交的事务的更改，确保读操作的一致性。

**优势**

- **减少锁竞争**：通过版本快照实现读写分离，避免了读操作和写操作之间的锁竞争，提升了系统性能。
  
- **实现读一致性**：每个事务读取的数据始终保持一致，不受其他事务并发修改的影响。

**适用场景**：MVCC在MySQL的InnoDB、PostgreSQL等支持高并发的数据库中广泛应用，特别适合需要大量读操作且需要一致性的场景。

MVCC（Multi-Version Concurrency Control）多版本并发控制，用于管理多个事务同时访问和修改数据库的数据，而不会导致数据不一致或冲突。MVCC的核心思想是每个事务在数据库中看到的数据版本是事务开始时的一个快照，而不是实际的最新版本。这使得多个事务可以并发执行，而不会互相干扰。
能较为差的情况下使用，提高效率。
MySQL的事务有ACID四大特性，其中的隔离性可以通过锁和MVCC来实现，MVCC适合在一些锁性如何实现：
每一个UndoLog 日志中都有一个roll_pointer（回滚指针）用于指向上一个版本的Undo Lo g。这样对于每一条记录就会构成一个版本链，用于记录所有的修改，每一次进行新的修改后，新的 Undo Log 会放在版本链的头部。
在我们进行查询的时候应该查询哪个版本呢？这时候就可以通过 ReadView 来实现。
在事务SELECT查询数据时，就会构造一个 ReadView，它包含了版本链的统计信息m-ids 当前活跃的所有事务id（所有未提交的事务）
min_trx_id 版本链尾的id max_trx_id 下一个将要分配的事务id（版本链头事务id+1）
该版本是否为当前事务创建（读取自己修改的数据），如果是就返回，否则进入下一个判断建球
creator-trx-id 创建这个ReadView的事务的id查询规则：该版本的事务id是否小于min-trx-id（在ReadView创建之前，数据已经提交），可以直接访问该版本的事务id是否大于max_trx_id（在ReadView创建后，该版本才开启），不能被访问该版本事务id在[min_trx_id，max_trx_id]之间，则判断当前版本事务id是否在m_ids中，如果不在，说明事务已经提交可以访问，否则不能访问。


【数据库中的MVCC到底是个啥？】 https://www.bilibili.com/video/BV16VVRzuEvL/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef



## 悲观锁和乐观锁
- 悲观锁：对资源上锁以防止冲突
- 乐观锁：通过版本号机制解决并发问题

**悲观锁**和**乐观锁**是数据库中的两种并发控制机制，分别基于不同的假设来控制对数据的并发访问。它们的原理和使用场景如下：

- **悲观锁**：
  - **原理**：假设数据会频繁被修改，因此在操作数据前先上锁，防止其他事务同时修改。悲观锁通常使用数据库的行级锁（如排它锁）实现，操作完成后释放锁。
  - **使用场景**：适用于高并发、频繁修改的场景，如银行转账等涉及资金流转的操作，确保数据在事务中的强一致性，避免并发修改带来的数据冲突。
  - **缺点**：会导致锁竞争，降低系统并发性，适合对一致性要求极高的业务。

- **乐观锁**：
  - **原理**：假设数据冲突少，不加锁，而是通过版本号或时间戳来实现并发控制。每次更新前检查当前版本号或时间戳是否与原始读取时一致，若不一致则拒绝更新。
  - **使用场景**：适用于读多写少、并发冲突少的场景，如用户个人信息修改。可以在更新前通过版本号或时间戳校验来保证数据的一致性。
  - **优点**：避免了锁开销，提升系统并发性，但适用于冲突概率低的场景。

在选择使用悲观锁还是乐观锁时，需要根据业务的并发性和数据一致性要求来权衡。


## SQLite

**特点**：
- 轻量级、嵌入式数据库
- 适用场景（移动设备、嵌入式系统）.

**使用**：
Downloads - DB Browser for SQLite： https://sqlitebrowser.org/dl/


## H2内存数据库
**介绍**：H2 是一个纯 Java 实现的轻量级数据库，支持内存运行、嵌入式部署和兼容 SQL 标准。

**H2有三种常用运行模式**：

|模式|含义|是否持久化|用途|
|---|---|---|---|
|**内存模式** (`jdbc:h2:mem:xxx`)|数据只存在内存中，程序结束即消失|❌ 否|单元测试、演示|
|**嵌入模式** (`jdbc:h2:~/test`)|数据文件存到硬盘上的项目文件中|✅ 是|本地开发用轻量数据库|
|**服务器模式** (`jdbc:h2:tcp://...`)|启动 H2 服务端，客户端远程连接|✅ 是|模拟真正的数据库部署|

**使用**，`application.yml` 中这样配置：：
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;MODE=MySQL;DB_CLOSE_DELAY=-1
    driver-class-name: org.h2.Driver
    username: sa
    password:
  h2:
    console:
      enabled: true
      path: /h2-console
  sql:
    init:
      mode: always
```
- 可以通过`http://localhost:8080/h2-console`访问，登录名：sa，密码留空
- 代码解释：

| 配置项                       | 说明                             |
| ------------------------- | ------------------------------ |
| `jdbc:h2:mem:testdb`      | 使用内存数据库，名字叫 testdb             |
| `MODE=MySQL`              | 让 SQL 语法兼容 MySQL（如 `LIMIT`）    |
| `DB_CLOSE_DELAY=-1`       | 避免连接断开后数据库立即销毁                 |
| `h2.console.enabled=true` | 开启 Web 管理控制台                   |
| `sql.init.mode=always`    | 自动执行 `schema.sql` 和 `data.sql` |
## PostgreSQL
## MySQL的使用
MySQL 安装 | 菜鸟教程： https://www.runoob.com/mysql/mysql-install.html
(29条消息) You must reset your password using ALTER USER statement before executing this statement.解决方法_BigZong的博客-CSDN博客： https://blog.csdn.net/zbq_tt5/article/details/105958041
MySQL Sakila样本数据库，一个可以练习数据库的例子 - VNX - 博客园： https://www.cnblogs.com/chinas/p/6547366.html

**mysql**:
```
安装目录：
D:\Program Files\mysql-5.7.31-winx64\bin
启动mysql
mysql -u root -p 123456
```




## MySQL
### SQL查询语句的执行过程
- SQL解析、优化、执行
- SELECT 语句的执行细节

史上最完整的MySql运行原理 https://www.bilibili.com/video/BV1iv4y1S7nj

SQL查询语句的执行流程通常包括以下几个步骤：
- **客户端连接**：客户端通过连接池或直接连接的方式向数据库发送`SELECT`语句，请求访问数据库。
- **解析与预处理**：数据库接收到SQL语句后，首先进行**词法分析**和**语法分析**，检查语句的正确性。接着进行预处理，将字段名、表名解析为实际的数据库对象。
- **查询缓存**：MySQL拿到一个查询请求后，会先到查询缓存看看，之前是不是执行过这条语句。之前执行过的语句及其结果可能会以key-value对的形式，被直接缓存在内存中。
- **查询优化**：解析后的语句进入优化器，优化器会选择合适的索引、优化JOIN顺序（一个语句有多表关联join的时候，决定各个表的连接顺序）等，生成多个执行方案，并选择最优的执行计划。
- **执行计划生成**：优化器根据最优执行路径生成执行计划，将`SELECT`语句分解为可执行的操作步骤，包括读取表数据、访问索引等。
- **存储引擎执行查询**：执行引擎根据生成的执行计划逐步执行查询，调用存储引擎（如InnoDB）进行数据访问，包括访问表数据、调用索引等，读取符合条件的数据。若使用索引，存储引擎会直接使用索引定位数据，否则会进行全表扫描。
- **返回结果**：执行完成后，执行引擎将查询结果返回给客户端。


### MySQL的执⾏引擎
- **InnoDB**： 提供了对事务ACID的支持，还提供了行级锁和外键的约束。
- **MyISAM**： 不支持事务，也不支持行级锁和外键约束。
- **Memery**： 就是将数据放在内存中，数据处理速度很快，但是安全性不高。

### 索引种类
一般索引种类
- **主键索引**：由主键创建，具有唯一性，每个表只能有一个主键索引，确保每条记录唯一。不允许有空值。
- **唯一索引**：确保列中的值唯一，可以有多个唯一索引，允许一个空值，空值也唯一。
- **普通索引**：最基本的索引类型，没有唯一性要求，，允许空值和重复值联合索引。多个字段创建的索引，使用时遵循最左前缀原则，主要用于提高查询效率。
- **全文索引**：用于全文检索，适合查找大段文本内容，如MySQL的`FULLTEXT`索引。
- **组合索引**：基于多个列创建的索引，用于优化组合查询，但查询时顺序需匹配索引的列顺序。
- 覆盖索引：索引中包含了查询所需的所有列。
- 空间索引：MySQL5.7之后支持空间索引，在空间索引这方面遵循OpenGIS几何数据模型规则。


**是否聚集索引**：
- **聚集索引**：数据存储的顺序和索引顺序一致，叶子节点会存储一整行记录，找到索引也就找到了数据。因为索引就是存储顺序，也不能是其它的，所以一个表只能有一个聚集索引。InnoDB的主键索引是聚集索引。
- **非聚集索引**：数据存储与索引分开存放，叶子节点存储的是数据地址。相对聚集索引的优点有：
	- 不像聚集索引唯一，可以根据需要的查询模式和查询条件创建更多更复杂的索引（比如为多个列简历索引、覆盖索引、组合索引），让查询更灵活
	- 不是直接操作数据，所以插入更新操作更快
	- 减少锁的争用，因为不是锁的数据，只是锁的索引页
	- 节省空间，因为只是存的地址

从数据结构维度进行分类：
- B+树索引：所有数据存储在叶子节点，复杂度为O（logn），适合范围查询。
- 哈希索引：适合等值查询，检索效率高，一次到位
- 全文索引：MyISAM和InnoDB 中都支持使用全文索引，一般在文本类型char，text，varchar类型上创建



### 是否创建索引

**创建索引的场景**通常包括以下情况：
- **频繁查询的字段**：对于常用的查询条件字段（如`WHERE`、`ORDER BY`、`GROUP BY`中的字段），创建索引可以加速查询。
- **数据量较大的表**：数据量大的表查询速度会下降，创建索引可以提升数据检索效率。
- **唯一性约束**：创建唯一索引确保字段值的唯一性，如用户ID、邮箱等字段，避免重复数据。
- 加速一些操作：
	- **排序查询**：在`ORDER BY`操作频繁的字段上创建索引可加速排序，提高查询性能。
	- **连接操作中的键**：对于经常在`JOIN`操作中使用的字段（如主外键关系），创建索引可提升连接速度。

**不适合创建索引的场景**：
- **小表**：数据量较小的表创建索引意义不大，因其查询效率较高。
- **频繁操作的字段**：索引会增加写操作的开销，不适合在操作频繁的字段上创建索引。
- **重复值较多的字段**：高重复率字段（如性别、状态）创建索引作用不大，因为检索效率不会显著提高。
- 很少被查询的列：如果某列很少被用于查询条件，那么为它创建索引可能没有明显的性能提升。





## END