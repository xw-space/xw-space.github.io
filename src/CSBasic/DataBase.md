---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 数据库
tag:
  - default
---
- 数据库就是存储数据的一个库
- 分为关系型数据库和非关系型数据
- 关系型数据库就是那种表结构的数据库
- 非关系数据库就是除了关系型数据库之外的数据库即为关系型数据库，比如使用类似json格式储存数据的mongodb

<!-- more -->
# 数据库
## 数据库概述
**定义**：数据库是用于高效存储和管理大量数据的系统

种类：关系型数据库（SQL）和非关系型数据库（NoSQL）
（只要不是关系型的数据库就是非关系型数据库）

**特点**：
- **持久性**：数据库的数据被长期存储在磁盘上，即使系统重启也不会丢失。
- **共享性**：支持多个用户或应用同时访问和操作数据
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

## 设计关系型数据库
### 数据库关系范式
- **含义**：设计关系型数据库的准则，范式（Normal Form）
- **目的**：减少数据冗余和提高数据一致性
- **第一范式（1NF）**：确保每列的值是原子性的（不可再分解的），如，手机号字段不包含多个号码

- **第二范式（2NF）**：在满足1NF的基础上，要求每个非主属性都**完全依赖主键**，避免部分依赖（如，复合主键中，非主属性依赖于其中部分主键）。

- **第三范式（3NF）**：在满足2NF的基础上，要求非主属性**只依赖于主键**，消除传递依赖（如，某属性通过其他非主属性间接依赖主键）。
- **BCNF（Boyce-Codd范式）**：在满足3NF的基础上，要求每个**候选键**（唯一确定一条记录的字段或字段组合）不被其他非主属性依赖，以进一步避免依赖异常。


**根据具体实例讲解数据库范式如何使用**

1. 第一范式（1NF）

**要求**：每个表格中的字段都应该是（即不可分割的），也就是说，每一列中的数据必须是单一的。

示例：

假设有一个学生表，包含学生的姓名、电话和所选课程：

| 学生ID | 姓名 | 电话                     | 课程     |
| ---- | -- | ---------------------- | ------ |
| 1    | 张三 | 1234567890, 0987654321 | 数学, 英语 |
| 2    | 李四 | 1122334455             | 物理     |

这个表格违反了 **第一范式**，因为在电话和课程字段中存储了多个值。

解决方法：

将表拆分，使每个字段保持原子性。例如：

| 学生ID | 姓名 | 电话         | 课程 |
| ---- | -- | ---------- | -- |
| 1    | 张三 | 1234567890 | 数学 |
| 1    | 张三 | 0987654321 | 英语 |
| 2    | 李四 | 1122334455 | 物理 |

这样每个字段都只包含一个值，符合 **第一范式**。

2. 第二范式（2NF）

**要求**：在符合第一范式的基础上，表中的每个非主属性必须完全依赖于主键，而不能是部分依赖。

示例：

继续使用上面的学生课程表，假设表中有以下数据：

| 学生ID | 姓名 | 电话         | 课程 |
| ---- | -- | ---------- | -- |
| 1    | 张三 | 1234567890 | 数学 |
| 1    | 张三 | 0987654321 | 英语 |
| 2    | 李四 | 1122334455 | 物理 |

假设学生的姓名和电话是与学生ID相关的，而课程是与学生ID和课程相关的。

这个表格违反了 **第二范式**，因为 `姓名` 和 `电话` 仅依赖于 `学生ID`，而不是组合主键（`学生ID + 课程`）。这样产生了部分依赖。

解决方法：

将表拆分，确保每个非主属性完全依赖于主键：

1. 学生表：

| 学生ID | 姓名 | 电话         |
| ---- | -- | ---------- |
| 1    | 张三 | 1234567890 |
| 2    | 李四 | 1122334455 |

2. 课程表：

| 学生ID | 课程 |
| ---- | -- |
| 1    | 数学 |
| 1    | 英语 |
| 2    | 物理 |

这样，`姓名` 和 `电话` 只依赖于 `学生ID`，而 `课程` 只依赖于 `学生ID` 和 `课程`，符合 **第二范式**。

3. 第三范式（3NF）

**要求**：在符合第二范式的基础上，表中的非主属性必须直接依赖于主键，而不能依赖于其他非主属性。

示例：
假设有一个员工信息表 Employees，包含以下字段：

字段名 含义
员工编号    唯一标识员工
部门编号    员工所在部门的编号
部门名称    员工所在部门的名称
员工姓名    员工的姓名

在这个表中，候选码是 “员工编号”，“员工姓名” 直接依赖于 “员工编号”，但 “部门名称” 依赖于 “部门编号”，而 “部门编号” 又依赖于 “员工编号”，即 “部门名称” 通过 “部门编号” 传递依赖于 “员工编号”，所以该表不满足第三范式。
这种设计会带来一些问题：

数据冗余：如果一个部门有多个员工，那么该部门的名称会在每个员工记录中重复出现。
插入异常：如果要新增一个部门，但还没有员工分配到该部门，由于候选码是 “员工编号”，就无法插入该部门信息。
删除异常：如果删除某个部门的所有员工记录，那么该部门的信息也会被删除。
更新异常：如果部门名称发生变化，需要更新所有属于该部门的员工记录中的 “部门名称”，容易出现更新不一致的情况。
符合第三范式的设计
将上述表拆分成两个表：

员工表 Employees：

| 字段名 | 含义 |
| --- | --- |
| 员工编号 | 唯一标识员工 |
| 部门编号 | 员工所在部门的编号 |
| 员工姓名 | 员工的姓名 |
在这个表中，候选码是 “员工编号”，非主属性 “部门编号” 和 “员工姓名” 都直接依赖于 “员工编号”。

部门表 Departments：

| 字段名 | 含义 |
| --- | --- |
| 部门编号 | 唯一标识部门 |
| 部门名称 | 部门的名称 |
在这个表中，候选码是 “部门编号”，非主属性 “部门名称” 直接依赖于 “部门编号”。

通过这样的拆分，消除了传递依赖，满足了第三范式，减少了数据冗余，也避免了插入、删除和更新异常。

优缺点
优点
减少数据冗余：消除传递依赖后，避免了数据的重复存储，节省了存储空间。
提高数据一致性：由于数据冗余减少，更新数据时只需在一处进行修改，降低了数据不一致的风险。
增强数据库可维护性：表结构更加清晰，每个表的职责更加明确，便于数据库的维护和扩展。
缺点
增加表连接操作：为了满足第三范式，将原本可能在一个表中的数据拆分到多个表中，在进行查询时可能需要进行更多的表连接操作，从而增加了查询的复杂度和时间成本。

4. 博茨-科得范式（BCNF）

**要求**：在符合第三范式的基础上，表中的每个决定因素必须是候选键。也就是说，任何依赖关系的左边都必须是超键。

示例：

假设有一个表记录了学生和他们选修的课程及课程的教室信息：

| 学生ID | 课程 | 教室   |
| ---- | -- | ---- |
| 1    | 数学 | A101 |
| 1    | 英语 | B102 |
| 2    | 物理 | A101 |

假设课程和教室是唯一的（即，每门课程只能在一个特定的教室上），但 `课程` 依赖于 `教室`，而 `学生ID` 并不是候选键。

解决方法：

如果 `课程` 是唯一的标识符，我们需要将表重新设计为：

1. 课程表：

| 课程 | 教室   |
| -- | ---- |
| 数学 | A101 |
| 英语 | B102 |
| 物理 | A101 |

2. 学生课程表：

| 学生ID | 课程 |
| ---- | -- |
| 1    | 数学 |
| 1    | 英语 |
| 2    | 物理 |

这样，表符合 **BCNF**，因为所有的依赖都直接由候选键决定。




### SQL语法基础

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




### SQL练习

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
### 概念与特性
5分钟精通数据库事务-ACID和三大问题 https://www.bilibili.com/video/BV1JG4y1Q7BX

**概念**：事务是一组数据库操作的集合，这些操作要么全部成功执行，要么全部回滚，以保证数据的一致性。
例如，在一个银行转账的业务中，从一个账户扣款和向另一个账户存款这两个操作必须作为一个事务来处理，要么都成功，要么都不执行，以确保总金额不会出现错误。
事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。


**定义**：
- 事务是数据库中的一个逻辑操作单元，是包含一组要么全部执行、要么全部回滚的SQL语句。
- 事务的目的是保证数据的完整性和一致性，尤其在多个操作需一起成功时使用。


**事务的四大特性（ACID）**
原子性、一致性、隔离性、持久性
- **原子性（Atomicity）**：事务是不可分割的最小操作单元，一个事务对应一个完整的业务。事务中的所有操作要么全部完成，要么全部取消，不存在部分执行。比如“A给B转账500块”，作为一个事务提交，A账户要扣除500，B账户要增加500块，完成“A给B转账500块”这个事务需要做这两件事，这两件事要么都成功，要么都失败
- **一致性（Consistency）**：事务执行前后，必须使所有的数据都保持一致状态。比如a与b账户共有1000块，两人之间转账之后无论成功还是失败，它们的账户总和还是1000。
- **隔离性（Isolation）**：并发事务之间相互隔离，不会互相干扰，保持各自的操作完整性。
- **持久性（Durability）**：一旦事务提交，那么对数据库中的数据所做的更改永久生效，即使系统崩溃也能保持。 




### 事务问题与隔离
并发事务带来哪些问题？怎么解决这些问题呢？MySQL的默认隔离级别是？
并发事务问题：脏读、不可重复读、幻读
隔离级别：读未提交、读已提交、可重复读、串行化

**并发事务的问题**：
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



**事务的隔离级别**
**简介**：
- 用于解决并发事务的问题，确保数据一致性。
- 事务隔离级别越高，一致性越强，数据越安全，但并发性能会随之下降。

**四种事务隔离级别**：
- **读未提交（Read Uncommitted）**：
	- 一个事务还没提交时，它做的变更就能被别的事务看到（读取到）。
	- 可能会导致**脏读**（读取到其他事务未提交的数据变更）。
	- 适合性能要求高且一致性要求较低的场景。
- **读已提交（Read Committed）**：
	- 事务只能读取到其他事务已提交的数据，
	- 避免了脏读，但可能会出现**不可重复读**（同一事务多次读取同一数据，值却不同）。
	- 这是大多数数据库的默认级别。
- **可重复读（Repeatable Read）**：
	- 一个事务执行过程中，多次读取同一数据的结果是一致的，
	- 避免了脏读和不可重复读，但可能会出现**幻读**（事务期间新增或删除数据行导致数据变化）。
	- 这是MySQL InnoDB的默认隔离级别。
- **串行化（Serializable）**：
	- 最高隔离级别，事务完全串行执行，
	- 避免所有并发问题（脏读、不可重复读、幻读），
	- 保证最高的一致性，但性能较低。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120210.png)


## 完整性

数据库完整性（Database Integrity）是指在数据库系统中，数据的准确性、一致性和可靠性。它确保数据在整个生命周期内遵循规则和约束条件，从而维持数据库的一致性和可靠性。数据库完整性可以通过多种手段进行保障，主要分为以下几类：

**实体完整性（Entity Integrity）**

实体完整性确保每一行（记录）在表中都是唯一的。这意味着每个记录都必须有一个唯一的标识符，通常是主键（Primary Key）。主键不能为 `NULL`，因为 `NULL` 无法区分不同的记录。

* **例子**：在一个学生表中，`学号` 字段是主键，每个学生都必须有一个唯一的学号，且学号不能为空。

**参照完整性（Referential Integrity）**

参照完整性确保表与表之间的关系正确无误，尤其是外键（Foreign Key）约束。外键用于建立两个表之间的联系。参照完整性要求外键值必须对应于另一个表中的主键值，或者外键值可以为 `NULL`。

* **例子**：在一个订单表中，每个订单必须关联到一个存在的客户。在这种情况下，`客户ID` 是外键，且它必须在客户表中存在。否则，如果试图插入一个没有有效客户ID的订单，就会违反参照完整性。

**域完整性（Domain Integrity）**

域完整性指的是表中的每一列必须符合预定的数据类型、范围和格式。例如，某个字段只能包含特定类型的数据（如整数、日期、字符串等），且值应该在预定范围内。

* **例子**：在员工表中的 `年龄` 字段，年龄必须是一个整数并且必须在合理范围内（如18到65岁之间）。

**用户定义完整性（User-defined Integrity）**

用户定义完整性是由数据库用户或管理员根据具体业务需求设置的规则和约束。它通常是指在数据输入、更新或删除时，应用特定的逻辑规则来保证数据的准确性。
* **例子**：在电商系统中，用户只能购买当前有库存的商品。这个规则可以通过触发器（Trigger）或者存储过程（Stored Procedure）来实现，确保库存数量满足用户订单的需求。

**完整性约束（Integrity Constraints）**

完整性约束是数据库表设计中用于保证数据完整性的规则。常见的完整性约束包括：

* **主键约束（Primary Key Constraint）**：确保每一行数据唯一，且不能为空。
* **外键约束（Foreign Key Constraint）**：确保表与表之间的引用关系正确。
* **唯一约束（Unique Constraint）**：确保某一列的所有值都是唯一的。
* **检查约束（Check Constraint）**：确保列的值符合特定条件。
* **非空约束（Not Null Constraint）**：确保列的值不能为空。

**事务完整性（Transaction Integrity）**

事务完整性涉及数据库操作的原子性、一致性、隔离性和持久性（即ACID特性）。确保在事务执行过程中，如果出现任何问题，数据库的状态能够回滚到之前的安全状态，保持数据一致性。

* **例子**：如果银行转账的事务中，扣款操作成功但存款操作失败，事务会回滚，确保资金不丢失。



## 举例说明数据不一致的问题
扣减优惠券、课程报名订单生成并写入数据库、推送报名成功消息

## 锁
### 悲观锁和乐观锁
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


## 索引
了解过索引吗？（什么是索引）
索引（index）是帮助MySQL高效获取数据的数据结构(有序)。在数据之外，数据库系统还维护着满足特定查找算法的数据结构（B+树），这些数据结构以某种方式引用（指向）数据， 这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。

索引（index）是帮助MySQL高效获取数据的数据结构(有序)
提高数据检索的效率，降低数据库的IO成本（不需要全表扫描）
通过索引列对数据进行排序，降低数据排序的成本，降低了CPU的消耗




![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102822.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102831.png)

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



### 聚簇索引
**什么是聚簇索引什么是非聚簇索引** ?
什么是聚集索引，什么是二级索引（非聚集索引）
什么是回表？


什么是聚簇索引什么是非聚簇索引 ?
聚簇索引（聚集索引）：数据与索引放到一块，B+树的叶子节点保存了整行数据，有且只有一个
非聚簇索引（二级索引）：数据与索引分开存储，B+树的叶子节点保存对应的主键，可以有多个


分类，含义，特点
- 聚集索引(Clustered Index)，将数据存储与索引放到了一块，索引结构的叶子节点保存了行数据 必须有,而且只有一个
- 二级索引(Secondary Index)，将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键 可以存在多个

聚集索引选取规则:
- 如果存在主键，主键索引就是聚集索引。
- 如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引。
- 如果表没有主键，或没有合适的唯一索引，则InnoDB会自动生成一个rowid作为隐藏的聚集索引。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103104.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103129.png)






知道什么是回表查询嘛 ?
通过二级索引找到对应的主键值，到聚集索引中查找整行数据，这个过程就是回表

回表查询
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103152.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103229.png)

### 覆盖索引
覆盖索引是指查询使用了索引，返回的列，必须在索引中全部能够找到 
- 使用id查询，直接走聚集索引查询，一次索引扫描，直接返回数据，性能高。
- 如果返回的列中没有创建索引，有可能会触发回表查询，尽量避免使用select *


覆盖索引是指查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到 。
- id为主键，默认是主键索引
- name字段为普通索引

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103328.png)
```sql
# 覆盖索引
select * from tb_user where id = 1 
# 覆盖索引
select id，name from tb_user where name = ‘Arm’ 
# 非覆盖索引(需要回表查询)
select id，name，gender from tb_user where name = ‘Arm’ 
```
覆盖索引是指 查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到 。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103505.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103555.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103702.png)

覆盖索引是指查询使用了索引，返回的列，必须在索引中全部能够找到 
- 使用id查询，直接走聚集索引查询，一次索引扫描，直接返回数据，性能高。
- 如果返回的列中没有创建索引，有可能会触发回表查询，尽量避免使用select *
知道什么叫覆盖索引嘛 ? 


## MySQL

### MySQL和MongoDB有哪些区别

- **数据结构**：
	- **MongoDB**：是一个文档型数据库，使用JSON类似的BSON格式存储数据，支持嵌套和灵活的数据结构。
	- **MySQL**：是关系型数据库，使用表格结构存储数据，数据模式固定，每行数据需符合表结构。
- **查询语言**：
	- **MongoDB**：使用查询语法，类似JSON格式的语法，支持多样的查询方式，如聚合管道和地理空间查询。
	- **MySQL**：使用SQL查询语言，支持复杂的查询、连接、事务、分组等操作，适合结构化数据。

- **事务处理**：
	- **MongoDB**：支持基本的事务功能，4.0版本后支持多文档事务，适合简单的事务需求。
	- **MySQL**：提供完整的事务支持，保证ACID特性，适合金融、订单等强一致性要求的业务。

- **扩展性**：
	- **MongoDB**：支持水平扩展，天然支持分片，适合大数据量和高并发场景。
	- **MySQL**：一般通过主从复制和分库分表实现扩展，扩展性相对受限。

- **数据关系**：
	- **MongoDB**：没有表关系，数据通常通过嵌套存储，适合文档型和无固定关系的数据。
	- **MySQL**：有严格的表关系，通过外键建立表之间的关联，适合处理复杂的关系数据。

- **使用场景**：
	- **MongoDB**：MongoDB灵活性强，适合快速迭代和变化较大的数据结构；适合文档存储、内容管理、物联网、大数据等非结构化数据场景。
	- **MySQL**：MySQL则适合结构化和高一致性需求的场景。适合电商、金融、社交网络等关系结构复杂且数据一致性要求高的场景。 



### MySQL体系结构
- 连接层
- 服务层
- 引擎层
- 存储层


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102452.png)




### 索引底层数据结构
**索引的底层数据结构了解过嘛** ? 
MySQL的InnoDB引擎采用的B+树的数据结构来存储索引
- 阶数更多，路径更短
- 磁盘读写代价B+树更低，非叶子节点只存储指针，叶子阶段存储数据
- B+树便于扫库和区间查询，叶子节点是一个双向链表



B+树
二叉树
红黑树
B树

数据结构对比
MySQL默认使用的索引底层数据结构是B+树。再聊B+树之前，我们先聊聊二叉树和B树
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102907.png)

B-Tree，B树是一种多叉路衡查找树，相对于二叉树，B树每个节点可以有多个分支，即多叉。
以一颗最大度数（max-degree）为5(5阶)的b-tree为例，那这个B树每个节点最多存储4个key

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102928.png)

B+Tree是在BTree基础上的一种优化，使其更适合实现外存储索引结构，InnoDB存储引擎就是用B+Tree实现其索引结构
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102941.png)
B树与B+树对比:
①：磁盘读写代价B+树更低；②：查询效率B+树更加稳定；③：B+树便于扫库和区间查询


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103005.png)

### B树

“B树”不是“二叉树（Binary Tree）”的简称，它是一种**多路搜索树**。
它的核心设计目标是**为磁盘等辅助存储设备设计一种高效的平衡树**：
- **多路**：一个节点可以拥有多个子节点（即阶数 $m$），不像二叉树只能有两个。
- **扁平**：通过增加每个节点的关键字数量，极大地降低了树的高度。
- **减少 IO**：树越矮，读取磁盘的次数就越少。

**原作者从未正式定义过“B”的具体含义**。
B树（B-tree）是由 **Rudolf Bayer** 和 **Edward M. McCreight** 在 1970 年提出的。关于 B 的来源，业界有几种主流的推测：
- **Bayer**：取自作者 Rudolf Bayer 姓氏的首字母。
- **Boeing**：因为两位作者当时都在**波音（Boeing）**科学研究实验室工作。
- **Balanced**：意指 B 树是一种**平衡**树，它始终保持着完美的对数级查找性能。
McCreight 后来曾开玩笑说：“B 越是被神秘化，人们就越记得它。”
在中文语境下，很多人会把 **B-tree** 误读为“B减树”。
- **纠正**：中间的连字符是横杠，不是减号。B-tree 就是 **B树**。
- **演进**：MySQL 索引使用的是它的变体 **B+树 (B+tree)**，它们之间有巨大的区别。

### B+树索引

B+树是一种平衡的树结构，每个节点可以存储多个关键字，并且所有叶子节点在树的最底层，以链表形式相连。这种结构使得B+树非常适合高效地存储和检索数据。


**为什么MySQL使用B+树作为索引**：B+树在大规模数据存储和查询方面表现优异，适合数据库的特性和需求。
- **顺序访问和范围查询高效**：B+树的叶子节点通过链表相连，是有序的，所以对于范围查询，只要找到开头，沿着链表一直往下找就行，所以支持高效的顺序和范围查询。相比之下，B树在进行范围查询时可能需要回溯树的不同部分，效率较低。
- **高磁盘IO效率**：非叶子节点只存储索引，每个节点可以包含更多的索引值，减小了树的高度，减少了磁盘访问次数。会大大提高数据库的效率
- **数据访问稳定**：B+树是一种自平衡树，这意味着每次插入和删除操作后，B+树都会自动调整结构以保持平衡。这样可以确保无论进行多少次插入和删除操作，数据的访问路径长度始终保持在一个稳定的范围内。
- **数据操作高效**：自平衡结构保证了访问、插入和删除的高效性。B+树的结构使得它能够在 \(O(\log n)\) 的时间复杂度内完成插入和删除操作，有利于数据库更好应对高并发环境。

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


索引在项目中的使用方式
- 一是验证你的项目场景的真实性，二是为了作为深入发问的切入点
- 缓存
- 分布式锁
- 消息队列、延迟队列
- … …

索引创建原则有哪些？
- 先陈述自己在实际的工作中是怎么用的
- 主键索引
- 唯一索引
- 根据业务创建的索引(复合索引)



索引创建原则有哪些？
1). 针对于数据量较大，且查询比较频繁的表建立索引。 单表超过10万数据（增加用户体验）
2). 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。
3). 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。
4). 如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。
5). 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率。
6). 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改的效率。
7). 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询。


1). 数据量较大，且查询比较频繁的表 重要
2). 常作为查询条件、排序、分组的字段 重要
3). 字段内容区分度高
4). 内容较长，使用前缀索引
5). 尽量联合索引 重要
6). 要控制索引的数量 重要
7). 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115259.png)


### 索引失效



### 索引失效的常见原因
如范围查询、多列索引未按顺序使用

索引在某些情况下会失效，从而无法提高查询性能。常见的索引失效场景包括：
- **使用`LIKE`查询时前置通配符**：`LIKE '%value'`会导致索引失效，因为无法从开头匹配到数据位置。
- **`OR`条件未使用索引字段**：在`OR`条件中，如果有一个字段未使用索引，则整体索引会失效。
- **计算或函数操作**：对索引字段进行计算或使用函数（如`DATE(column)`）会导致索引失效。
- **类型不匹配**：查询时数据类型与字段类型不一致（如字符串和数字），索引可能会失效。
- **不符合组合索引的最左前缀**：组合索引必须遵循最左前缀原则，按索引的字段顺序依次查询，否则可能失效。
- **`!=`和`<>`操作符**：不等操作符通常不走索引，因为无法确定数据的连续范围。
- **使用`IS NULL`或`IS NOT NULL`**：某些数据库在使用这些条件时可能不走索引（取决于数据库实现）。
了解这些情况有助于优化查询，避免索引失效，提高查询性能。

索引失效的情况有很多，可以说一些自己遇到过的，不要张口就得得得说一堆背诵好的面试题
（适当的思考一下，回想一下，更真实）
给tb_seller创建联合索引，字段顺序：name，status，address
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115624.png)
那快读判断索引是否失效了呢？
执行计划explain



![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115639.png)

1). 违反最左前缀法则
如果索引了多列，要遵守最左前缀法则。指的是查询从索引的最左前列开始，并且不跳过索引中的列。匹配最左前缀法则，走索引：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115642.png)
违法最左前缀法则 ， 索引失效：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115654.png)

如果符合最左法则，但是出现跳跃某一列，只有最左列索引生效：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115657.png)

2). 范围查询右边的列，不能使用索引 。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115703.png)
根据前面的两个字段 name ， status 查询是走索引的， 但是最后一个条件address 没有用到索引。

3). 不要在索引列上进行运算操作， 索引将失效。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115715.png)
4). 字符串不加单引号，造成索引失效。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115721.png)

由于，在查询是，没有对字符串加单引号， MySQL的查询优化器，会自动的进行类型转换，造成索引失效。
5).以%开头的Like模糊查询，索引失效。如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115737.png)



什么情况下索引会失效 ?
- 违反最左前缀法则
- 范围查询右边的列，不能使用索引
- 不要在索引列上进行运算操作， 索引将失效
- 字符串不加单引号，造成索引失效。(类型转换)
- 以%开头的Like模糊查询，索引失效

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115742.png)















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
- **MyISAM**： 不支持事务，也不支持行级锁和外键约束。
- **InnoDB**： 提供了对事务ACID的支持，还提供了行级锁和外键的约束。
- **Memery**： 就是将数据放在内存中，数据处理速度很快，但是安全性不高。

InnoDB
- 介绍
	- InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在 MySQL 5.5 之后，InnoDB是默认的 MySQL 存储引擎。
- 特点
	 - DML操作遵循ACID模型，支持事务
	- 行级锁，提高并发访问性能
	 - 支持 外键FOREIGN KEY约束，保证数据的完整性和正确性
- 文件
	- xxx.ibd：xxx代表的是表名，innoDB引擎的每张表都会对应这样一个表空间文件，存储该表的表结构（frm、sdi）、数据和索引。
	 - xxx.frm 存储表结构（MySQL8.0时，合并在表名.ibd中）
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102534.png)

在mysql中提供了很多的存储引擎，比较常见有InnoDB、MyISAM、Memory
- InnoDB存储引擎是mysql5.5之后是默认的引擎，它支持事务、外键、表级锁和行级锁
- MyISAM是早期的引擎，它不支持事务、只有表级锁、也没有外键，用的不多
- Memory主要把数据存储在内存，支持表级锁，没有外键和事务，用的也不多

存储引擎在mysql的体系结构哪一层，主要特点是什么
- MySQL体系结构
- InnoDB存储的特点



### MySQL日志

- 二进制日志、归档日志（binlog）：是Server层生成的日志，主要用于数据备份和主从复制。
- 错误日志（error log）
- 慢查询日志（slow query log）
- undo log 是 Innodb 存储引擎层生成的日志，实现了事务中的原子性，主要用于事务回滚和MVCC。
- redo log 是物理日志，记录了某个数据页做了什么么中的圆者多条物理日志。
- relay log 中继日志，用于主从复制场景下，slave通过io线程拷贝master的bin log 后本地生成的日志

undo log和redo log的区别
- 缓冲池（buffer pool）:主内存中的一个区域，里面可以缓存磁盘上经常操作的真实数据，在执行增删改查操作时，先操作缓冲池中的数据（若缓冲池没有数据，则从磁盘加载并缓存），以一定频率刷新到磁盘，从而减少磁盘IO，加快处理速度
- 数据页（page）:是InnoDB 存储引擎磁盘管理的最小单元，每个页的大小默认为 16KB。页中存储的是行数据
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120235.png)
redo log

重做日志，记录的是事务提交时数据页的物理修改，是用来实现事务的持久性。
该日志文件由两部分组成：重做日志缓冲（redo log buffer）以及重做日志文件（redo log file）,前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中, 用于在刷新脏页到磁盘,发生错误时, 进行数据恢复使用。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120303.png)

undo log

回滚日志，用于记录数据被修改前的信息 , 作用包含两个 : 提供回滚 和 MVCC(多版本并发控制) 。undo log和redo log记录物理日志不一样，它是逻辑日志。
- 可以认为当delete一条记录时，undo log中会记录一条对应的insert记录，反之亦然，
- 当update一条记录时，它记录一条对应相反的update记录。当执行rollback时，就可以从undo log中的逻辑记录读取到相应的内容并进行回滚。

undo log可以实现事务的一致性和原子性

undo log和redo log的区别

redo log: 记录的是数据页的物理变化，服务宕机可用来同步数据
undo log ：记录的是逻辑日志，当事务回滚时，通过逆操作恢复原来的数据
redo log保证了事务的持久性，undo log保证了事务的原子性和一致性

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120339.png)


事务中的隔离性是如何保证的呢？
- 锁：排他锁（如一个事务获取了一个数据行的排他锁，其他事务就不能再获取该行的其他锁）
- mvcc : 多版本并发控制
- 你解释一下MVCC?


### SQL优化

**分析SQL语句的执行过程**
可以直接在select语句之前使用explain 或者 desc 命令获取 MySQL 如何执行 SELECT 语句的信息
例如：
![PixPin_2025-10-07_16-41-49.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/PixPin_2025-10-07_16-41-49.png)

![Pasted image 20250604111130.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/Pasted%20image%2020250604111130.png)


possible_key：当前sql可能会使用到的索引
key：当前sql实际命中的索引
key_len：索引占用的大小
Extra：额外的优化建议

**慢查询**：是指在数据库中执行时间较长的SQL查询，会造成接口响应时间长，页面加载慢
**慢查询的定位**：
- 使用开源工具分析程序的运行
	- Arthas：调试工具
	- Prometheus：运维工具
	- Skywalking：运维工具，可以在展示的报表中看到哪个接口比较慢，可以分析接口哪部分比较慢，可以看到SQL的具体执行时间）
- MySQL自带慢日志：慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志，慢查询文件位置：/var/lib/mysql/localhost-slow.log
![Pasted image 20250604110607.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/Pasted%20image%2020250604110607.png)

- 开启慢查询日志，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息，配置完毕之后，通过以下指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息：
```cnf
## 开启MySQL慢日志查询开关
slow_query_log=1
## 设置慢日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
long_query_time=2
```


**一般导致慢查询的原因**：
- 缺乏索引：未为查询条件设置合适的索引，导致全表扫描。
- 索引失效：在查询中使用了会导致索引失效的操作（如函数计算、前置通配符等）。
- 查询不优化：SQL语句写法不佳，如未合理使用JOIN或GROUP BY。
- 数据量大：表的数据量过大时，查询效率降低。
- 硬件瓶颈：服务器硬件资源不足，导致查询性能受限。


**优化方法**：
- 使用索引：为常用的查询条件、排序和连接字段添加合适的索引。
- 优化SQL语句：重写复杂查询，避免不必要的查询和多表JOIN，简化查询条件。
- 分库或分表：对大表进行分库或分表，减少单表数据量。
- 使用缓存：对重复查询的结果进行缓存，减少数据库负担。
- 定期清理数据：删除无用或过期数据，减少数据量，提高查询效率。

谈一谈你对sql的优化的经验
- 表的设计优化
- 索引优化 参考优化创建原则和索引失效
- SQL语句优化
- 主从复制、读写分离
- 分库分表  后面有专门章节介绍


谈谈你对sql的优化的经验
表的设计优化（参考阿里开发手册《嵩山版》）
- 比如设置合适的数值（tinyint   int   bigint），要根据实际情况选择
- 比如设置合适的字符串类型（char和varchar）char定长效率高，varchar可变长度，效率稍低
- 
SQL语句优化
- SELECT语句务必指明字段名称（避免直接使用select * ）
- SQL语句要避免造成索引失效的写法
- 尽量用union all代替union   union会多一次过滤，效率低
- 避免在where子句中对字段进行表达式操作
- Join优化 能用innerjoin 就不用left join right join，如必须使用 一定要以小表为驱动，内连接会对两个表进行优化，优先把小表放到外边，把大表放到里边。left join 或 right join，不会重新调整顺序






主从复制、读写分离
如果数据库的使用场景读的操作比较多的时候，为了避免写的操作所造成的性能影响 可以采用读写分离的架构。
读写分离解决的是，数据库的写入，影响了查询的效率。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115953.png)



谈一谈你对sql的优化的经验
- 表的设计优化，数据类型的选择
- 索引优化，索引创建原则
- sql语句优化，避免索引失效，避免使用select *  ….
- 主从复制、读写分离，不让数据的写入，影响读操作
- 分库分表 

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115933.png)

### 慢查询定位
聚合查询
多表查询
表数据量过大查询
深度分页查询

表象：页面加载过慢、接口压测响应时间过长（超过1s）

方案一：开源工具
调试工具：Arthas 
运维工具：Prometheus 、Skywalking

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102008.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102010.png)
方案二：MySQL自带慢日志
慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志
如果要开启慢查询日志，需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息：
```sql
# 开启MySQL慢日志查询开关
slow_query_log=1
# 设置慢日志的时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
long_query_time=2

```

配置完毕之后，通过以下指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息 /var/lib/mysql/localhost-slow.log。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102045.png)



**如何定位慢查询**?
- 介绍一下当时产生问题的场景（我们当时的一个接口测试的时候非常的慢，压测的结果大概5秒钟）
- 我们系统中当时采用了运维工具（ Skywalking ），可以监测出哪个接口，最终因为是sql的问题
- 在mysql中开启了慢日志查询，我们设置的值就是2秒，一旦sql执行超过2秒就会记录到日志中（调试阶段）

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102053.png)

### SQL执行慢分析
那这个SQL语句执行很慢, 如何分析呢？
- SQL执行计划（找到慢的原因）
	- 聚合查询
	- 多表查询
	- 表数据量过大查询
- 深度分页查询


一个SQL语句执行很慢, 如何分析
可以采用EXPLAIN 或者 DESC命令获取 MySQL 如何执行 SELECT 语句的信息
语法：
```sql
- 直接在select语句之前加上关键字 explain / desc
EXPLAIN   SELECT   字段列表   FROM   表名   WHERE  条件 ;

```
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102309.png)

- possible_key  当前sql可能会使用到的索引
- 通过它们两个查看是否可能会命中索引
	- key 当前sql实际命中的索引
	- key_len 索引占用的大小
- Extra 额外的优化建议

Extra，含义
Using where; Using Index，查找使用了索引，需要的数据都在索引列中能找到，不需要回表查询数据
Using index condition，查找使用了索引，但是需要回表查询数据


type 这条sql的连接的类型，性能由好到差为NULL、system、const、eq_ref、ref、range、 index、all 
- system：查询系统中的表
- const：根据主键查询
- eq_ref：主键索引查询或唯一索引查询
- ref：索引查询
- range：范围查询
- index：索引树扫描
- all：全盘扫描

那这个SQL语句执行很慢, 如何分析呢？
可以采用MySQL自带的分析工具 EXPLAIN
- 通过key和key_len检查是否命中了索引（索引本身存在是否有失效的情况）
- 通过type字段查看sql是否有进一步的优化空间，是否存在全索引扫描或全盘扫描
- 通过extra建议判断，是否出现了回表的情况，如果出现了，可以尝试添加索引或修改返回字段来修复

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102423.png)

存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式 。存储引擎是基于表的，而不是基于库的，所以存储引擎也可被称为表类型。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224102441.png)
- MySQL体系结构
- InnoDB存储的特点

### 事务隔离

### MySQL的锁
按粒度分类
- 表级锁，全局锁：用于数据备份，让整个数据库处于只读状态
- 页级锁
- 行级锁

按用途分
- **共享锁（S锁，读锁）**：允许多个事务同时读取数据。用于读操作，允许多个事务同时对同一行加S锁，可以并发读取，保证数据读取的一致性，但其他事务不能写入。
- **排它锁（X锁，写锁）**：允许事务独占访问资源。用于写操作，事务加X锁后独占该行，其他事务不能读或写。主要用于`UPDATE`、`DELETE`等写操作，确保修改期间数据的一致性。
- **意向锁（Intent Lock）**：是一种逻辑锁，用于表级锁和行级锁的协调。意向锁分为意向共享锁（IS）和意向排它锁（IX），在对某行加S锁或X锁前，先在表级别加意向锁，确保锁操作的兼容性。普通的 select 是不会加行级锁的，普通的 select语句是利用 MVCC实现一致性读，是无锁的。
- 间隙锁：只存在于可重复读隔离级别，目的是为了解决可重复读隔离级别下级。间隙锁之间是兼容的，两个事务可以同时持有包含共同间隙范围的间隙锁，并不存在互斥关系。
- 插入意向锁：一个事务在插入一条记录的时候，需要判断插入位置是否已被其他事务加了间隙锁（next-key lock 也包含间隙锁）。如果有的话，插入操作就会发生阻塞，直到拥有间隙锁的那个事务提交为止，在此期间会生成一个插入意向锁，表明有事务想在某个区间插入新记录，但是现在处于等待状态。

其它锁：
- 元数据锁（MDL）：防止其它线程修改，实现事务的锁
- 自增锁（AUTO-INC LOCK）：保证键自增的锁
- 下一键锁（Next-Key Lock）：Next-Key Lock临键锁，是 Record Lock + Gap Lock 的组合，锁定一个范围，并且锁定记录本身。next-key lock 即能保护该记录，又能阻止其他事务将新纪录插入到被保护记录前面的间隙中。



### MVCC机制

全称 Multi-Version Concurrency Control，多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突
MVCC的具体实现，主要依赖于数据库记录中的隐式字段、undo log日志、readView。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120413.png)


记录中的隐藏字段
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120501.png)

隐藏字段，含义
DB_TRX_ID，最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID。
DB_ROLL_PTR，回滚指针，指向这条记录的上一个版本，用于配合undo log，指向上一个版本。
DB_ROW_ID，隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段。

undo log
- 回滚日志，在insert、update、delete的时候产生的便于数据回滚的日志。
- 当insert的时候，产生的undo log日志只在回滚时需要，在事务提交后，可被立即删除。
- 而update、delete的时候，产生的undo log日志不仅在回滚时需要，mvcc版本访问也需要，不会立即被删除。

不同事务或相同事务对同一条记录进行修改，会导致该记录的undolog生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120544.png)

readview
ReadView（读视图）是 快照读 SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交的）id。
当前读
读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如：select ... lock in share mode(共享锁)，select ... for update、update、insert、delete(排他锁)都是一种当前读。
快照读
简单的select（不加锁）就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。
- Read Committed：每次select，都生成一个快照读。
- Repeatable Read：开启事务后第一个select语句才是快照读的地方。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224120817.png)

readview

ReadView中包含了四个核心字段：
字段，含义
m_ids，当前活跃的事务ID集合
min_trx_id，最小活跃事务ID
max_trx_id，预分配事务ID，当前最大事务ID+1（因为事务ID是自增的）
creator_trx_id，ReadView创建者的事务ID

版本链数据访问规则
trx_id：代表是当前事务ID。 
①. trx_id  == creator_trx_id ? 可以访问该版本.成立，说明数据是当前这个事务更改的。
②. trx_id < min_trx_id ? 可以访问该版本。成立，说明数据已经提交了。
③. trx_id > max_trx_id ?  不可以访问该版本。成立，说明该事务是在ReadView生成后才开启。
④. min_trx_id <= trx_id <= max_trx_id ?  如果trx_id不在m_ids中是可以访问该版本的。成立，说明数据已经提交。

不同的隔离级别，生成ReadView的时机不同：
- READ COMMITTED ：在事务中每一次执行快照读时生成ReadView。
- REPEATABLE READ：仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。

RC隔离级别下，在事务中每一次执行快照读时生成ReadView。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121019.png)

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121036.png)

RR隔离级别下，仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView。
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121059.png)

好的，事务中的隔离性是如何保证的呢？(你解释一下MVCC)
MySQL中的多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突
- 隐藏字段：
	- trx_id(事务id)，记录每一次操作的事务id，是自增的
	- roll_pointer(回滚指针)，指向上一个版本的事务版本记录地址
- undo log：
	- 回滚日志，存储老版本数据
	- 版本链：多个事务并行操作某一行记录，记录不同事务修改数据的版本，通过roll_pointer指针形成一个链表
- readView解决的是一个事务查询选择版本的问题
	- 根据readView的匹配规则和当前的一些事务id判断该访问那个版本的数据
	- 不同的隔离级别快照读是不一样的，最终的访问的结果不一样
	    - RC ：每一次执行快照读时生成ReadView
	    - RR：仅在事务中第一次执行快照读时生成ReadView，后续复用

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121137.png)

### 超大分页
MYSQL超大分页怎么处理 ?
可以使用覆盖索引解决
问题：在数据量比较大时，limit分页查询，需要对数据进行排序，效率低
解决方案：覆盖索引+子查询



在数据量比较大时，如果进行limit分页查询，在查询时，越往后，分页查询效率越低。

我们一起来看看执行limit分页查询耗时对比：
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224103746.png)


因为，当在进行分页查询时，如果执行 limit 9000000,10 ，此时需要MySQL排序前9000010 记录，仅仅返回 9000000 - 9000010 的记录，其他记录丢弃，查询排序的代价非常大 。

优化思路: 一般分页查询时，通过创建 覆盖索引 能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化
```sql
select *
from tb_sku t,
     (select id from tb_sku order by id limit 9000000,10) a
where t.id = a.id;

```


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224115043.png)





























### 分库分表
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121217.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121315.png)

分库分表的时机：
1，前提，项目业务数据逐渐增多，或业务发展比较迅速
2，优化已解决不了性能问题（主从读写分离、查询索引…）
3，IO瓶颈（磁盘IO、网络IO）、CPU瓶颈（聚合查询、连接数太多）

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121327.png)
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121345.png)

垂直分库：以表为依据，根据业务将不同表拆分到不同库中。
特点：
- 按业务对数据分级管理、维护、监控、扩展
- 在高并发下，提高磁盘IO和数据量连接数


**垂直分表**

拆分规则：
把不常用的字段单独放在一张表
把text，blob等大字段拆分出来放在附表中
垂直分表：以字段为依据，根据字段属性将不同字段拆分到不同表中。

特点：
1，冷热数据分离
2，减少IO过渡争抢，两表互不影响

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121410.png)

水平分库
水平分库：将一个库的数据拆分到多个库中。
特点：
- 解决了单库大数量，高并发的性能瓶颈问题
- 提高了系统的稳定性和可用性

路由规则
- 根据id节点取模
- 按id也就是范围路由，节点1(1-100万 ),节点2(100万-200万)
- …


![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121433.png)
水平分表
水平分表：将一个表的数据拆分到多个表中(可以在同一个库内)。
特点：
- 优化单一表数据量过大而产生的性能问题;
- 避免IO争抢并减少锁表的几率;
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121516.png)

新的问题和新的技术
分库之后的问题：
分布式事务一致性问题
跨节点关联查询
跨节点分页、排序函数
主键避重

分库分表中间件：
sharding-sphere
mycat



你们项目用过分库分表吗
业务介绍
1，根据自己简历上的项目，想一个数据量较大业务（请求数多或业务累积大）
2，达到了什么样的量级（单表1000万或超过20G）
具体拆分策略
1，水平分库，将一个库的数据拆分到多个库中，解决海量数据存储和高并发的问题，sharding-sphere、mycat
2，水平分表，解决单表存储和性能的问题，sharding-sphere、mycat
3，垂直分库，根据业务进行拆分，高并发下提高磁盘IO和网络连接数
4，垂直分表，冷热数据分离，多表互不影响










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
【面试官：说说MVCC？ 事务隔离级别实现原理是什么？】 https://www.bilibili.com/video/BV1Hr421p7EK/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef



### MySQL主从同步原理 
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121217.png)
MySQL主从复制的核心就是二进制日志
二进制日志（BINLOG）记录了所有的 DDL（数据定义语言）语句和 DML（数据操纵语言）语句，但不包括数据查询（SELECT、SHOW）语句。

复制分成三步：
- Master 主库在事务提交时，会把数据变更记录在二进制日志文件 Binlog 中。
- 从库读取主库的二进制日志文件 Binlog ，写入到从库的中继日志 Relay Log 。
- slave重做中继日志中的事件，将改变反映它自己的数据。

![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121240.png)

主从同步原理 
MySQL主从复制的核心就是二进制日志binlog(DDL（数据定义语言）语句和 DML（数据操纵语言）语句)
主库在事务提交时，会把数据变更记录在二进制日志文件 Binlog 中。
从库读取主库的二进制日志文件 Binlog ，写入到从库的中继日志 Relay Log 。
从库重做中继日志中的事件，将改变反映它自己的数据
![image.png](https://markdown-1300868533.cos.ap-guangzhou.myqcloud.com/20251224121250.png)

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


## Redis

### 整体介绍
首先学了Redis是什么，有哪些特点、用途，和MySQL的对比
然后学Redis作为一个缓存数据库常遇见的三个问题：缓存穿透、缓存击穿、缓存雪崩
，然后是缓存和数据库的双写一致性问题
然后学习Redis的另一个用途：分布式锁，如何实现、实现的锁如何控制有效时长
Redis的数据过期策略、数据淘汰策略







### Redis的特性
**简介**：Redis（Remote Dictionary Server）是一个开源的内存键值数据库。

**特点**：
- 数据结构丰富，适用于多种业务场景
- 高性能，存储在内存中，读写速度极快，通常可处理每秒数十万次请求
- 支持事务操作，提供`MULTI`、`EXEC`、`WATCH`等指令，但不保证完全的事务隔离
- 提供RDB（定时快照）和AOF（追加写日志）两种持久化方式，支持数据断电恢复
- 支持主从复制（Master-Slave）、哨兵（Sentinel）和集群（Cluster）模式

**用途**：
- 用过期策略防止内存溢出（不懂）
- 缓存热点数据，基于内存，速度快，避免频繁查数据库
- 计数器：比如网站访问量、点赞数
- 排行榜：比如游戏排行
- 会话数据存储：比如登录用户的 Token 信息
- 分布式锁：比如多个服务协调操作某个资源
- 实时统计
- 消息队列

### Redis与MySQL的区别是什么
使用场景的不同（缓存 vs. 持久存储）

Redis和MySQL是两种不同类型的数据库，主要区别如下：

- **数据存储方式**：
  - **Redis**：基于**内存**存储，数据主要保存在内存中，读写速度极快，适合缓存和实时数据处理。
  - **MySQL**：基于**磁盘**存储，数据持久存储在磁盘中，适合需要持久化存储的大数据量应用。

- **数据结构支持**：
  - **Redis**：支持丰富的数据结构，如字符串、列表、集合、有序集合、哈希等，适合多种数据场景。
  - **MySQL**：以**表格**的形式存储数据，支持SQL关系型结构，适合结构化数据。

- **操作复杂度**：
  - **Redis**：不支持复杂的SQL查询，不支持多表关联，数据操作简单，主要用于数据缓存、计数、排行榜等场景。
  - **MySQL**：支持复杂的SQL查询、事务、关系运算和多表关联，适合复杂的数据管理和查询需求。

- **数据一致性**：
  - **Redis**：支持基本的事务操作，但不保证完全的ACID特性，适用于最终一致性模型。
  - **MySQL**：支持严格的ACID事务，保证数据的一致性和完整性，适合金融等对数据一致性要求高的场景。

- **使用场景**：
  - **Redis**：主要用于缓存、会话存储、分布式锁、实时统计等需要快速访问的场景。
  - **MySQL**：适合复杂查询、关系数据管理、持久化存储等场景，如电商、社交网络等系统的数据存储。

Redis与MySQL各自擅长不同的领域，常在应用中组合使用，通过Redis缓存提高MySQL的查询性能。


### Redis数据结构/类型 
- **字符串（String）**：
	- 最基础的类型，可以存储简单字符串、整数或浮点数，最大容量为512MB。
	- 底层：简单动态字符串（SDS）
	- 常用于简单的数据缓存、计数器和会话数据存储，例如：缓存对象信息、用户会话数据、计数器（如浏览量、点赞数）、分布式锁（SETNX和EX实现锁）。
- **哈希（Hash）**：
	- 存储键值对的集合，每个哈希可以包含多个字段，支持单独修改字段，节省内存
	- 底层：字典（哈希表）
	- 适合存储对象数据，例如：用户信息存储（如用户ID为key，哈希字段为用户属性），电商购物车（商品ID和数量作为字段存储）。
- **列表（List）**：
	- 按顺序存储字符串的链表，支持从头部和尾部插入或弹出元素，
	- 底层：双向链表
	- 适合实现，例如：消息队列（生产者从左插入、消费者从右弹出），社交平台时间线（按时间插入），任务队列。
- **集合（Set）**：
	- 无序、唯一元素集合，支持交集、并集、差集等操作，
	- 底层：整数集合（IntSet）和哈希表，当集合元素为整数且数量较少时，使用IntSet存储；当元素较多时，转为哈希表以提高性能。
	- 适用于去重、标签管理和集合运算等场景，例如：共同好友计算（交集），标签管理（用户标签集合），抽奖系统（随机获取集合中的中奖用户）。
- **有序集合（Sorted Set）**：
	- 类似集合，但每个元素关联一个分数，按分数排序。
	- 底层：跳表（Skip List）和压缩列表（Ziplist），跳表适用于大数据量的有序存储，支持高效的范围查询；压缩列表用于小数据量场景，以节省内存。
	- 适用于排行榜和带权重的优先级队列，例如：排行榜（按分数排序，显示Top N），延时任务（分数为时间戳），商品按评分排序。
	- 为什么不使⽤红⿊树？：
		- 跳表通过链表链接节点，支持在不同层级跳跃查找，能够实现高效的范围查询。对有序集合进行范围查询时，跳表可以方便地从起始位置遍历到终止位置。红黑树虽然查找单个元素较快，但不适合顺序遍历和范围查询。
		- 跳表结构简单，易于实现，且支持高效的插入、删除、查找操作，复杂度为 \(O(\log n)\)，接近红黑树，但编程复杂度和维护成本更低。
		- 跳表在Redis中可以灵活调整内存使用，通过层级减少节点的指针数量，节省内存，尤其适合在内存受限的环境中运行。
		- 跳表通过随机方式在不同层级插入节点，实现了结构上的平衡性，能够避免退化为线性结构。


### Redis持久化

RDB (Redis Database)
**快照模式**。在指定的时间间隔内，将内存中的全量数据生成二进制文件（`dump.rdb`）保存到磁盘。
* **优点：** 恢复大数据集速度快；文件紧凑，适合备份。
* **缺点：** 容易丢失两次快照之间的数据；`fork` 子进程时可能导致瞬时卡顿。

AOF (Append Only File)
**日志模式**。将每一条写命令追加到日志文件（`appendonly.aof`）中。
* **策略：** `always`（同步刷盘）、`everysec`（每秒刷盘，推荐）、`no`（由操作系统控制）。
* **优点：** 数据安全性高，最多只丢 1 秒数据。
* **缺点：** 文件比 RDB 大；恢复速度慢；磁盘压力大。


混合持久化 (RDB + AOF)
**Redis 4.0 引入的默认方式**。
* **原理：** 在 AOF 重写时，将当前的内存数据以 RDB 格式写入 AOF 文件开头，后续的新命令再以 AOF 格式追加。
* **优点：** 结合了 RDB 的**快速恢复**和 AOF 的**数据完整性**。
AOF默认是关闭的，需要修改redis.conf配置文件来开启AOF：
AOF的命令记录的频率也可以通过redis.conf文件来配：
Redis也会在触发阈值时自动去重写AOF文件。阈值也可以在redis.conf中配置：


```conf
# 是否开启AOF功能，默认是no
appendonly yes
# AOF文件的名称
appendfilename "appendonly.aof"
# 表示每执行一次写命令，立即记录到AOF文件
appendfsync always 
# 写命令执行完先放入AOF缓冲区，然后表示每隔1秒将缓冲区数据写到AOF文件，是默认方案
appendfsync everysec 

# 写命令执行完先放入AOF缓冲区，由操作系统决定何时将缓冲区内容写回磁盘
appendfsync no
# AOF文件比上次文件 增长超过多少百分比则触发重写auto-aof-rewrite-percentage 100# AOF文件体积最小多大以上才触发重写 auto-aof-rewrite-min-size 64mb 

```


配置项,刷盘时机,优点,缺点
Always,同步刷盘,可靠性高，几乎不丢数据,性能影响大
everysec,每秒刷盘,性能适中,最多丢失1秒数据
no,操作系统控制,性能最好,可靠性较差，可能丢失大量数据



### Redis事务

Redis 事务的基本概念
Redis 事务是一组命令的集合，它将多个命令序列化后，按顺序、串行化执行。在执行过程中，不会被其他客户端发送来的命令请求所打断。
**核心特点：**
1. **原子性（有限）**：命令会按顺序执行，但如果其中某条命令执行失败，**后续命令依然会继续执行**，不会回滚。
2. **隔离性**：执行期间不被干扰。
3. **无回滚**：这是最常考的面试点。

事务的核心命令
Redis 事务主要通过以下 5 个命令来操作：
1. **`MULTI`**：标记事务块的开始（类似 `begin`）。
2. **`EXEC`**：提交事务，执行所有入队的命令。
3. **`DISCARD`**：取消事务，放弃执行队列中的所有命令。
4. **`WATCH`**：**乐观锁**。监控一个或多个 Key，如果在执行 `EXEC` 之前这些 Key 被其他客户端修改了，整个事务将失败。
5. **`UNWATCH`**：取消对所有 Key 的监控。


执行流程
* 第一步：执行 `MULTI`。
* 第二步：输入具体命令（此时命令不会立即执行，而是进入一个队列，返回 `QUEUED`）。
* 第三步：执行 `EXEC`（触发执行队列）。

为什么生产环境少用？
1. **不支持回滚**：如果业务逻辑出错，数据会出现不一致，需要程序员手动修复。
2. **Lua 脚本替代**：现代开发中，**Lua 脚本**完全取代了 Redis 事务。
	* Lua 脚本具有**真正的原子性**（脚本执行期间 Redis 停下所有操作）。
	* Lua 脚本逻辑更强大（可以写 `if-else`）。
	* Lua 脚本减少了网络 IO。


### Lua事务
Redis 通过单线程模型确保 Lua 脚本在执行期间不会被其他请求打断。相比事务，它能将‘查询、判断、写入’等复杂逻辑封装在一起原子化执行，不仅保证了一致性，还减少了网络往返次数。

Lua 脚本在 Redis 中实现原子性的核心在于：**Redis 将整个 Lua 脚本作为一个不可分割的整体（Atomic Unit）来执行。**


**串行执行机制**：Redis 官方保证，在执行一个 Lua 脚本时，不会有其他命令被插入执行。
	* **独占性**：当一个脚本在运行时，所有其他客户端发送的命令都会被阻塞，直到该脚本执行完毕。
	* **类似于事务**：这相当于将脚本内的所有操作打包成了一个“超级命令”。

为什么比 `MULTI/EXEC` 更强？：虽然 Redis 事务（MULTI/EXEC）也能保证一组命令连续执行，但 Lua 脚本有以下绝对优势：
* **逻辑控制**：脚本中可以编写 `if-else`、循环等逻辑。你可以先查询（GET）一个值，根据这个值的结果决定下一步做什么（SET），整个“查-改”过程是原子的。
* **减少网络开销**：原本需要多次往返（RTT）的操作，现在只需发送一次脚本。


注意事项（原子性的局限）
尽管 Lua 脚本是原子执行的，但仍需注意：
* **语法错误 vs 运行时错误**：
	* 如果脚本有语法错误，根本不会开始执行。
	* 如果脚本在运行中途报错（例如对一个 String 类型做 HSET），**已经执行过的命令不会回滚**。这与 Redis 事务的特性一致。

* **阻塞风险**：由于执行期间会阻塞其他所有请求，因此 Lua 脚本必须保持**短小精悍**。严禁在脚本中执行耗时长的循环（如 `KEYS *`），否则会导致整个 Redis 实例卡死。

经典应用场景：分布式锁释放
这是面试最常举的例子。为了防止误删他人的锁，必须先判断（GET）再删除（DEL），这两个动作必须是原子的：
```lua
-- KEYS[1] 是锁的key，ARGV[1] 是当前线程持有的唯一标识
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```




### 数据过期策略

**定期删除 (Periodic Delete)：**
* **原理**：Redis 默认每隔 100ms **随机抽取**一部分设置了过期时间的 key，检查并删除其中已过期的。
* **优点**：通过限制删除操作的时长和频率，减少对 CPU 的性能影响。
* **缺点**：会有漏网之鱼，导致过期 key 堆积内存。


**惰性删除 (Lazy Delete)：**
* **原理**：key 过期后不立刻删除。只有当**客户端访问**该 key 时，Redis 才会检查它是否过期，过期则删除并返回空。
* **优点**：对 CPU 极度友好，只在必要时操作。
* **缺点**：如果过期 key 一直不被访问，会造成**内存泄漏**。


**定时删除 (Scheduled Delete)：**
* **原理**：在设置 key 过期的同时，创建一个定时器，到时立即执行删除。
* **现状**：Redis **不使用**此策略。因为创建大量定时器会消耗极高 CPU，影响吞吐量。

Redis 实际采用的是 **“定期删除 + 惰性删除”** 的配合方案：
1. 平时靠 **定期删除** 随机清理过期 key。
2. 查询时靠 **惰性删除** 查漏补缺。

兜底方案：内存淘汰机制 (Eviction)，如果上述两种策略都没能及时清理，导致内存满了（达到 `maxmemory`），Redis 会根据配置的策略强制清理数据。
* **LRU (Least Recently Used)**：淘汰最长时间未被使用的。
* **LFU (Least Frequently Used)**：淘汰使用频率最低的（Redis 4.0+）。
* **Random**：随机淘汰。



### 数据淘汰策略
当 Redis 内存使用达到 `maxmemory` 限制时，会根据配置的 **8 种淘汰策略**来决定清理哪些数据。
可以将这 8 种策略分为三大类：


**不淘汰**策略 (1种)
* **noeviction** (默认)：内存满后，写命令（如 `SET`）直接报错，读命令正常。
* 适用场景：作为持久化数据库使用，绝对不能丢失数据。


**对“设置了过期时间”的数据**进行淘汰 (4种)：这些策略只在设置了 `TTL` 的 Key 中寻找牺牲者：
* **volatile-lru**：淘汰**最久未被使用**的 Key（Least Recently Used）。
* **volatile-lfu**：淘汰**使用频率最低**的 Key（Least Frequently Used，4.0版本引入）。
* **volatile-random**：**随机**淘汰设置了过期的 Key。
* **volatile-ttl**：淘汰**剩余存活时间最短**的 Key。


对“**所有数据**”进行淘汰 (3种)：无论是否设置过期时间，在所有 Key 中进行扫描：
* **allkeys-lru**：在全体数据中淘汰**最久未被使用**的。
* **allkeys-lfu**：在全体数据中淘汰**使用频率最低**的。
* **allkeys-random**：在全体数据中**随机**淘汰。


生产环境如何选？
- **通常推荐**：`allkeys-lru`。适合大部分缓存场景（热点数据明显）。
- **如果热点数据不仅看“新旧”还看“频率”**：选 `allkeys-lfu`。
- **如果同时作为缓存和持久化存储**：选 `volatile-lru`，保护那些没有设过期的关键数据。
- 优先使用 allkeys-lru 策略。充分利用 LRU 算法的优势，把最近最常访问的数据留在缓存中。如果业务有明显的冷热数据区分，建议使用。
- 如果业务中数据访问频率差别不大，没有明显冷热数据区分，建议使用 allkeys-random，随机选择淘汰。
- 如果业务中有置顶的需求，可以使用 volatile-lru 策略，同时置顶数据不设置过期时间，这些数据就一直不被删除，会淘汰其他设置过期时间的数据。
- 如果业务中有短时高频访问的数据，可以使用 allkeys-lfu 或 volatile-lfu 策略。


数据库有1000万数据 ,Redis只能缓存20w数据, 如何保证Redis中的数据都是热点数据 ? 
使用allkeys-lru(挑选最近最少使用的数据淘汰)淘汰策略，留下来的都是经常访问的热点数据


Redis的内存用完了会发生什么？
主要看数据淘汰策略是什么？如果是默认的配置（ noeviction ），会直接报错







### 数据库和缓存的双写⼀致性问题

双写一致性：当修改了数据库的数据也要同时更新缓存的数据，缓存和数据库的数据要保持一致

删缓存还是改缓存？
* **不推荐“更新缓存”**：频繁修改会导致大量无效计算（如果该数据少读多写），且并发更新时易产生脏数据。
* **推荐“删除缓存”**：数据变化时直接删掉缓存，下次查询时自然触发“回源”加载最新数据。


- **先更新数据库，再删除缓存**：当数据发生变化时，先更新数据库，再删除缓存中的旧数据。这种方式可以防止缓存中存在过期数据，确保读取到最新的数据。
- **问题**：如果数据库更新成功，但缓存删除失败，会导致缓存中仍是旧数据。
* **解决**：配合 **消息队列重试机制** 或 **订阅 Binlog（如使用 Canal）** 异步删除缓存。
 
 **延时双删策略**：
* **问题**：在高并发下，线程 A 删了缓存，线程 B 查到旧数据并写入缓存，随后线程 A 更新了数据库。结果：**缓存里全是旧值（脏数据）**。
- 在更新数据库后，执行两次缓存删除操作：第一次是立即删除，第二次是在一定延时（如500毫秒）后再次删除。延时双删可以避免并发读写导致缓存不一致的问题。

强一致性的，采用Redisson提供的读写锁
共享锁：读锁readLock，加锁之后，其他线程可以共享读操作      
排他锁：独占锁writeLock也叫，加锁之后，阻塞其他线程读写操作

允许延时一致的业务，采用异步通知
使用MQ中间中间件，更新数据之后，通知缓存删除
利用canal中间件，不需要修改业务代码，伪装为mysql的一个从节点，canal通过读取binlog数据更新缓存
- **使用消息队列发送更新缓存通知**：当数据库更新后，将缓存更新请求异步发送到消息队列，由队列中的消费者更新缓存。这种方式适合并发场景，但增加了消息队列的复杂性。

- **设置合理的缓存过期时间**：通过设置较短的过期时间来减少数据不一致的时间窗口，即使出现不一致问题，缓存会很快失效，读请求自然会读取数据库更新的数据。

- **读前删缓存**：在重要的读请求前主动删除缓存，确保每次读操作都读取到最新数据，但这种方式会带来额外的缓存删除开销。

常问：**“为什么不先删缓存？”** 
**回答核心：** 因为先删缓存会导致“读请求”在“写请求”完成前将旧数据刷回缓存，造成持续性的脏数据。


### 缓存穿透

**定义**：查询的数据在缓存和数据库中都不存在，导致请求每次都绕过缓存，直接打到数据库上，从而造成数据库压力过大。

**解决方案**：
- 对于数据库中不存在的结果，缓存空值，但缓存空值也会消耗内存，并且可能发生不一致问题，比如后来数据库有了这个空值的数据
- 使用布隆过滤器，但相对来说实现复杂，并且会误判
- 参数校验：对请求的参数进行校验，过滤掉非法或明显无效的请求，减少无效查询。

**什么是布隆过滤器**：
bitmap（位图）：相当于是一个以（bit）位为单位的数组，数组中每个单元只能存储二进制数0或1
通过多个hash函数获取hash值，根据hash计算数组对应位置改为1
使用相同hash函数获取hash值，判断对应位置是否都为1





### 缓存击穿

**定义**：某个热点Key突然失效，大量请求集中访问数据库，导致数据库负载剧增。


**解决方案**：
- 逻辑过期,将热点数据的缓存时间设为永久有效，或不断延长热点数据的有效期，确保缓存数据一直存在，高可用性，性能优
- 在请求缓存前加互斥锁，让第一个请求数据库的线程将数据重新加载到缓存中，其他线程等待缓存重建完成，避免同时打到数据库。强一致性，但性能差



### 缓存雪崩

**定义**：大量缓存数据在同一时间失效或者Redis服务宕机，导致大量请求直接涌向数据库，给数据库带来巨大压力。


**解决方案**：
- 给过期时间加随机值：避免所有缓存同时失效。比如，设置`TTL = base_time + random(0, delta)`。
- 添加降级限流策略，通过设置ngxin、spring cloud gateway
- 使用Redis集群的哨兵模式、集群模式提高服务的可用性
- 给业务添加多级缓存，使用Guava或Caffeine



### 实现分布式锁



**基础实现（SETNX）**
**设置锁**：使用命令：`SET lock_key unique_value NX PX 30000`
* **NX**：只有 key 不存在时才设置成功（互斥）。
* **PX 30000**：30秒后自动过期（防止因进程崩溃导致的死锁）。
* **unique_value**：由客户端生成的唯一标识（用于解锁时校验）。

Redis实现分布式锁主要利用Redis的setnx命令
setnx是SET if not exists(如果不存在，则 SET)的简写。
```shell
# 添加锁，NX是互斥、EX是设置超时时间
SET lock value NX EX 10
# 释放锁，删除即可
DEL key

```






**释放锁**（Lua 脚本）：解锁时不能直接 `DEL`，必须先判断锁是不是自己的，防止**误删他人的锁**。
* **逻辑**：解锁时判断当前锁的 Value 是否还是自己当初设置的唯一标识（UUID）。
* **意义**：防止当前线程因执行过慢导致锁过期后，误删了其他线程刚刚获取的新锁。
```lua
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end

```

进阶方案：Redisson。在生产环境下，通常直接使用 **Redisson** 框架，它解决了以下痛点：
* **看门狗机制 (Watch Dog)**：自动为快到期的锁续期，解决“业务没执行完，锁就过期了”的问题。
* **可重入性**：利用 Redis 的 `Hash` 结构记录线程 ID 和加锁次数。

高可用挑战：Redlock (红锁)
* **背景**：在 Redis 主从架构下，如果主节点宕机但锁还没同步到从节点，会导致多个客户端同时持锁。
* **原理**：客户端向 5 个独立的 Redis 节点发起加锁请求，只有 **超过半数（3个）** 成功且在有效时间内，才算加锁成功。
* **争议**：Redlock 对系统时钟漂移敏感，维护成本高，中小型项目较少使用。

可以重入，多个锁重入需要判断是否是当前线程，在redis中进行存储的时候使用的hash结构，来存储线程信息和重入的次数

主从一致性
RedLock(红锁)：不能只在一个redis实例上创建锁，应该是在多个redis实例上创建锁(n / 2 + 1)，避免在一个redis实例上加锁。

### 分布式锁如何合理的控制锁的有效时长

估算经验值 + 容错，手动设置 `PX`（毫秒）过期时间。
* **设置方法**：过期时间 = 业务平均耗时 * N（通常 3-5 倍） + 网络抖动补偿。
* **缺点**：若遇到 GC 停顿或第三方接口超时，依然存在锁失效风险。


自动续期机制（看门狗 - Watch Dog）
* **原理**：在获取锁成功后，开启一个后台守护线程。每隔一段时间（通常是过期时间的 1/3）检查业务是否完成，若未完成则重置过期时间。
* **代表实现**：**Redisson**。它默认设置锁过期时间为 30s，每 10s 检查一次。
* **优点**：无需预估业务耗时，防止业务长耗时导致的锁提前释放。

建议：
* **细粒度化**：尽量只在必须互斥的代码块加锁，缩短持锁时间。
* **监控告警**：对经常触发续期或执行时间接近过期阀值的业务进行监控，及时优化代码性能。





### 集群方案
主从（1主1从）+哨兵就可以了。单节点不超过10G内存，如果Redis内存不足则可以给不同服务分配独立的Redis主从节点


主从复制 (Replication)：**单写多读**。一个 Master 节点负责写，多个 Slave 节点负责读并同步 Master 数据。
* **优点**：实现读写分离，提高读性能。
* **缺点**：**不具备自动故障转移能力**。Master 挂了，系统就瘫痪，需要人工介入。

哨兵模式 (Sentinel)：**自动化的主从架构**。在主从基础上增加“哨兵”节点，监控集群状态。
* **核心功能**：监控、自动故障转移（Master 挂了，哨兵自动选出一个 Slave 升级为 Master）。
* **优点**：高可用。
* **缺点**：**依然是单机写**，无法支撑海量数据的并发写入。


Redis Cluster (分片集群)：**分布式存储**。Redis 3.0 后的官方推荐方案，采用 **虚拟槽（Hash Slot）** 机制。
* **原理**：内置 16384 个槽位，每个节点负责一部分槽。数据通过 $CRC16(key) \pmod{16384}$  决定存在哪个节点。
* **优点**：
	* **无中心化**：节点间通过 Gossip 协议通信。
	* **可水平扩展**：支持动态增删节点，解决单机内存上限问题。
	* **自带高可用**：每个 Master 节点可配置 Slave，支持自动故障切换。

### 主从同步
单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，就需要搭建主从集群，实现读写分离。
一般都是一主多从，主节点负责写数据，从节点负责读数据



**Master（主节点）负责写，Slave（从节点）自动同步数据并负责读。**

**Redis 主从同步**是实现高可用和读写分离的基础

同步过程主要分为两个场景：**全量复制**和**增量复制**。



**全量复制** (Full Resync)
通常发生在从节点**第一次连接**主节点时。
* **第一阶段（建立连接）**：从节点发送 `psync` 命令给主节点。
* **第二阶段（生成快照）**：主节点执行 `bgsave` 生成 **RDB 文件**，并将此后的写命令记录到 **复制积压缓冲区（repl_backlog_buffer）**。
* **第三阶段（发送 RDB）**：主节点将 RDB 文件发给从节点，从节点清空旧数据并加载新 RDB。
* **第四阶段（命令回放）**：主节点将缓冲区里的增量写命令发给从节点执行。

Replication Id：简称replid，是数据集的标记，id一致则说明是同一数据集。每一个master都有唯一的replid，slave则会继承master节点的replid
offset：偏移量，随着记录在repl_baklog中的数据增多而逐渐增大。slave完成同步时也会记录当前同步的offset。如果slave的offset小于master的offset，说明slave数据落后于master，需要更新。
- 从节点请求主节点同步数据（replication id、 offset ）
- 主节点判断是否是第一次请求，是第一次就与从节点同步版本信息（replication id和offset）
- 主节点执行bgsave，生成rdb文件后，发送给从节点去执行
- 在rdb生成执行期间，主节点会以命令的方式记录到缓冲区（一个日志文件）
- 把生成之后的命令日志文件发送给从节点进行同步


**命令传播** (Command Propagation)
在正常运行期间，主从同步是**异步**的。
* 主节点处理完写命令后，立即返回给客户端成功，然后异步将命令发给从节点。
* **风险**：由于是异步同步，如果主节点宕机，可能会导致少量已写成功但未同步的数据丢失。

**增量复制** (Partial Resync)
通常发生在**网络闪断后重连**。
* **原理**：主从双方维护一个 **复制偏移量（offset）**。
* **过程**：重连后，从节点上报自己的 offset，主节点对比发现缺失的数据仍在 `repl_backlog_buffer` 中，则仅同步缺失的那段命令，不需要重新传全量 RDB。

- 从节点请求主节点同步数据，主节点判断不是第一次请求，不是第一次就获取从节点的offset值
- 主节点从命令日志中获取offset值之后的数据，发送给从节点进行数据同步



- **“如果 `repl_backlog_buffer` 溢出了怎么办？”** —— 会被迫退化为全量同步。
- **“如何实现无盘复制？”** —— 配置 `repl-diskless-sync yes`，直接通过 Socket 发送 RDB，不落盘。





### 哨兵机制
**哨兵机制**是一种实现自动故障转移的机制
确保当Redis的主节点故障时能自动切换到新的主节点
用于维持服务的连续性和高可用性。

哨兵的作用
- 监控：Sentinel 会不断检查您的master和slave是否按预期工作
- 自动故障恢复：如果master故障，Sentinel会将一个slave提升为master。当故障实例恢复后也以新的master为主
- 通知：Sentinel充当Redis客户端的服务发现来源，当集群发生故障转移时，会将最新信息推送给Redis的客户端

Sentinel基于心跳机制监测服务状态，每隔1秒向集群的每个实例发送ping命令：
- 主观下线：如果某sentinel节点发现某实例未在规定时间响应，则认为该实例主观下线。
- 客观下线：若超过指定数量（quorum）的sentinel都认为该实例主观下线，则该实例客观下线。quorum值最好超过Sentinel实例数量的一半。

哨兵选主规则
- 首先判断主与从节点断开时间长短，如超过指定值就排该从节点
- 然后判断从节点的slave-priority值，越小优先级越高
- 如果slave-prority一样，则判断slave节点的offset值，越大优先级越高
- 最后是判断slave节点的运行id大小，越小优先级越高。

redis中有两个配置参数：
- min-replicas-to-write 1   表示最少的salve节点为1个
- min-replicas-max-lag 5  表示数据复制和同步的延迟不能超过5秒



**哨兵机制的过程**：
- **监控**：哨兵通过定期发送`PING`命令一直监控主从节点的运行状态，如果主节点在一定时间内未响应，哨兵会认为主节点可能已下线，当未响应的数量达到设定的阈值，哨兵认定主节点故障。
- **故障转移**：当哨兵检测到主节点确实故障后，从从节点中选出一个提升为主节点，并通知其他从节点指向新主节点。
- **通知**：哨兵会将节点的变化和状态通知给客户端，客户端可通过哨兵获取当前的主节点信息，以便更新连接。
- **配置自动更新**：哨兵会更新其他哨兵和从节点的配置，确保在主节点切换后，各节点能正确地与新主节点同步。

### 性能保证



通过 **Redis Cluster** 实现水平扩展来支撑高并发写，
通过**主从读写分离**支持高并发读；
同时利用 **哨兵机制或 Cluster 选举** 实现故障自动切换，
结合 **AOF+RDB 混合持久化** 保证数据不丢失，
从而实现整体的高并发高可用。

1. 保证高并发 (High Concurrency)
高并发的核心在于“**分流**”与“**性能挖掘**”：
* **读写分离**：通过**主从架构**，让 Master 负责写，多个 Slave 负责读。由于互联网场景通常“读多写少”，增加 Slave 节点即可线性提升读并发能力。
* **水平扩容 (Sharding)**：使用 **Redis Cluster**。将数据分布到多个 Master 节点，突破单机 CPU 和内存瓶颈，支撑海量数据的并发写入。
* **IO 多路复用**：Redis 核心是单线程（基于 `epoll`），避免了上下文切换，配合 6.0 引入的 **Multi-threaded IO** 处理网络读写，进一步榨干单机性能。
* **合理数据结构**：避免 BigKey，使用 `O(1)` 或 `O(logN)` 的操作，确保单次请求极速响应。

2. 保证高可用 (High Availability)
高可用的核心在于**“故障自动恢复”**与**“数据持久化”**：
* **自动故障转移**：
	* **哨兵 (Sentinel)**：监控主从节点，Master 宕机后自动选举 Slave 上位。
	* **Cluster 自愈**：集群节点间通过 Gossip 协议感知状态，Master 挂掉后，其 Slave 会自动接管，无需第三方组件。
* **持久化保障**：开启 **RDB + AOF (混合持久化)**，确保节点重启或宕机后能快速找回数据，减少“冷启动”对后端数据库的冲击。
* **集群脑裂防护**：配置 `min-slaves-to-write`，防止网络分区导致的双写和数据丢失。

扩展：不仅是 Redis 自身
在高并发场景下，还需注意：
* **客户端优化**：使用连接池（JedisPool/Lettuce），避免频繁创建连接。
* **多级缓存**：在应用层增加本地缓存（Guava/Caffeine），减轻 Redis 的压力。

### 分片集群
性能保证

主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：
海量数据存储问题
高并发写的问题
使用分片集群可以解决上述问题，分片集群特征：
集群中有多个master，每个master保存不同数据
每个master都可以有多个slave节点
master之间通过ping监测彼此健康状态
客户端请求可以访问集群任意节点，最终都会被转发到正确节点


集群中有多个master，每个master保存不同数据
每个master都可以有多个slave节点
master之间通过ping监测彼此健康状态
客户端请求可以访问集群任意节点，最终都会被转发到正确节点


Redis 分片集群引入了哈希槽的概念，Redis 集群有 16384 个哈希槽，每个 key通过 CRC16 校验后对 16384 取模来决定放置哪个槽，集群的每个节点负责一部分 hash 槽。


### 集群选择
在面试中回答这个问题，不要只说一种，要体现出你对**不同业务场景下选型方案**的理解。通常我们会根据**数据规模**和**可用性要求**来回答。

**生产环境推荐方案**：在正规的生产项目中，我们通常不会使用“单点”（会有单点故障风险），而是根据需求选择以下两种集群之一：
* **数据量小、追求高可用：使用【哨兵模式 (Sentinel)】**
	* **架构：** 1 主 + 2 从 + 3 哨兵。
	* **理由：** 这种方案配置简单，能实现自动故障转移。如果你的数据量在几 GB 到几十 GB 之间，单台机器内存完全能撑住，哨兵模式是性价比最高的方案。
	* **痛点：** 无法水平扩容。所有写操作都在 Master 上，存在性能瓶颈。

* **海量数据、高并发写：使用【分片集群 (Redis Cluster)】**
	* **架构：** 至少 3 主 + 3 从。
	* **理由：** 生产环境最主流。它通过 16384 个哈希槽（Slot）将数据分布在多台机器上。
	* **优势：** 支持动态扩容，能支撑 TB 级数据和百万级并发写入。


**单点（Standalone）**
* **含义：** 只有一个节点。
* **适用场景：** 本地开发、测试环境，或者对数据丢失完全不敏感的临时缓存。
* **面试禁忌：** 除非是极小的微型项目，否则千万不要说生产环境用的是单机版，这会被认为缺乏架构高可用意识。


总结性回答建议（面试话术）
- “在我们的项目中，为了保证高可用，我们没有使用**单点**。
- 对于**核心业务缓存**，数据量较大且并发请求极高，我们使用的是 **Redis Cluster（分片集群）**，目前是 3 主 3 从的配置，利用它的槽位机制实现了水平扩容。
- 至于一些**辅助性的配置信息或小规模数据存储**，我们会采用 **哨兵模式**，通过 3 个哨兵节点监控 1 主 2 从，来保证自动化的故障切换。”


### 集群数据存取
Redis 分片集群引入了哈希槽的概念，Redis 集群有 16384 个哈希槽
将16384个插槽分配到不同的实例
读写数据：根据key的有效部分计算哈希值，对16384取余（有效部分，如果key前面有大括号，大括号的内容就是有效部分，如果没有，则以key本身做为有效部分）余数做为插槽，寻找插槽所在的实例




存储靠 **CRC16 算法 + 16384 个哈希槽**，读取靠 **节点路由 + 客户端重定向**。

在 Redis Cluster 中，数据的存储和读取完全围绕 **“哈希槽（Hash Slot）”** 这一核心概念展开。

Redis 集群将整个数据库划分为 **16384** 个槽位。
* **分配**：每个 Master 节点负责处理一部分槽位（例如：节点 A 负责 0-5000，节点 B 负责 5001-10000...）。
* **映射算法**：当你要存入一个 Key 时，Redis 会进行如下计算：
$$Slot = CRC16(key) \pmod{16384}$$

* **定位**：计算出的结果即为该 Key 所属的槽位，数据最终会被存储在负责该槽位的物理节点上。


数据读取的“重定向”机制
Redis 节点之间是**无中心化**的。当你向集群中任意一个节点发送读写请求时：
- **直接命中**：如果该 Key 计算出的槽位正好由当前连接的节点负责，直接处理并返回。
- **MOVED 重定向**：如果槽位不在当前节点，节点会返回一个 `-MOVED` 错误，告诉客户端该槽位在哪个 IP 和端口。客户端需要自动重连到目标节点重新发起请求。
- **ASK 重定向**：发生在**数据迁移**过程中。如果某个槽位正在从节点 A 迁移到节点 B，Key 可能在 A 也可能在 B。此时节点可能返回 `-ASK`，指示客户端临时去另一个节点尝试。
> **注意：** 现代 Java 客户端（如 Jedis, Lettuce）会自动处理重定向，并本地缓存槽位与节点的映射关系，因此开发者通常感知不到重定向过程。


一个特殊技巧：哈希标签 (Hash Tag)

默认情况下，Key 只要不同，就会散落在不同节点，导致无法执行 **MSET** 等多 Key 原子操作。

* **解决方案**：在 Key 中使用 `{}`。
* **规则**：如果 Key 包含 `{}`，Redis 只会对花括号内的内容进行哈希。
* **示例**：`user:{1001}:order` 和 `user:{1001}:profile`。由于它们共用 `{1001}`，会被强制分配到同一个槽位、同一个节点。

### 槽位数量问题
为什么是 16384 个槽位而不是 65536 个？

这是一个非常经典的 Redis 原理面试题。
虽然 $CRC16$ 算法产生的哈希值有 16 位，理论上可以支持 $2^{16} = 65536$ 个槽位，但 Redis 最终选择了 $16384$ ($2^{14}$)，主要出于以下三个原因：

1. 心跳包的大小问题（主要原因）
Redis Cluster 节点间需要定期发送**心跳包（Ping/Pong）**来交换状态信息。
* 心跳包中会包含该节点负责的**槽位信息位图（bitmap）**。
* 如果是 **16384** 个槽，位图占用  字节（**2KB**）。
* 如果是 **65536** 个槽，位图占用  字节（**8KB**）。
对于高频的心跳交换来说，8KB 的数据包过大，会造成明显的带宽浪费。

2. 集群规模的限制
Redis 作者认为，Redis Cluster 的规模不太可能超过 **1000 个主节点**。
* 在 1000 个节点以内， 个槽位已经足够让数据均匀分布（平均每个节点负责 16 个左右的槽位）。
* 槽位再多，虽然数据分布更精细，但在节点数量不多的情况下，带来的收益远抵不上带宽消耗。

3. 位图压缩率的影响
Redis 节点在传输位图时会进行压缩。
* 槽位数量越多，位图越稀疏，压缩率虽然可能提高，但在槽位总数巨大的情况下，压缩后的绝对体积依然会比小槽位方案大。

这个问题考察的是你在**性能优化**和**协议设计**上的权衡意识。
**回答模版：**
> “主要原因是为了节省网络带宽。虽然  算法支持 65536 个槽，但心跳包中包含的槽位位图会随着槽数增加而变大。16384 个槽位产生的 2KB 位图在传输频率和压缩效率上达到了平衡，且能支撑 1000 个节点以内的集群规模，完全够用了。”



### 集群脑裂

集群脑裂是由于主节点和从节点和sentinel处于不同的网络分区，使得sentinel没有能够心跳感知到主节点，所以通过选举的方式提升了一个从节点为主，这样就存在了两个master，就像大脑分裂了一样，这样会导致客户端还在老的主节点那里写入数据，新节点无法同步数据，当网络恢复后，sentinel会将老的主节点降为从节点，这时再从新master同步数据，就会导致数据丢失
解决：我们可以修改redis的配置，可以设置最少的从节点数量以及缩短主从数据同步的延迟时间，达不到要求就拒绝请求，就可以避免大量的数据丢失

**Redis 脑裂（Split-Brain）**是指在集群（通常是哨兵模式）中，由于**网络分区**导致主节点（Master）与从节点（Slave）以及哨兵（Sentinel）失去联系，导致集群中同时出现两个“主节点”的现象。
脑裂发生的场景
1. **网络异常**：Master 节点与 Sentinel 及 Slave 之间的网络断开，但 Master 与客户端（Client）之间的网络正常。
2. **新主选出**：Sentinel 监测不到 Master，认为其挂了，通过选举将一个 Slave 提升为新 Master。
3. **双主共存**：此时，旧 Master 仍在接收客户端的写请求，而新 Master 也在工作。

带来的后果：数据丢失
当网络恢复后，旧 Master 会被降级为 Slave，并从新 Master **全量同步**数据。
* **代价**：旧 Master 在脑裂期间接收的所有写数据，都会因为同步新 Master 的 RDB 而被彻底清空。


解决方案（核心配置）
Redis 通过限制 Master 的“写入条件”来规避此问题，主要依靠以下两个配置：
* **`min-slaves-to-write 1`**：Master 必须至少有 1 个从节点连接，才允许写入。
* **`min-slaves-max-lag 10`**：主从复制的延迟（ack）不能超过 10 秒。
**生效逻辑：**
当发生脑裂时，旧 Master 发现自己连接的 Slave 数量为 0（或者延迟过高），它会**自动拒绝客户端的写请求**。这样虽然牺牲了短暂的可用性，但保证了数据的一致性，防止了网络恢复后的数据丢失。



### Redis的单线程

**为什么Redis是单线程**
**单线程的redis如何支持高并发**

- **内存操作极快**：Redis将数据存储在内存中，基于内存操作，访问速度快，单线程足以支持每秒数十万次的请求。

绝大部分请求在内存中完成
Redis 是**纯内存数据库**。
* 内存的访问速度（纳秒级）远高于磁盘（毫秒级）。
* 没有磁盘 I/O 的物理限制，这是“快”的根本。


- **避免多线程的复杂性**：Redis的单线程避免了多线程会引入锁机制和上下文切换开销
单线程模型避免了开销
很多人认为多线程快，但在处理“极短、极快”的内存操作时，单线程反而有优势：
* **没有上下文切换**：避免了线程间切换带来的 CPU 时间片消耗。
* **没有锁限制**：不需要为了线程安全去竞争分布式锁、互斥锁，彻底告警了**死锁**和**加锁造成的性能损耗**。

- **高效的I/O多路复用**：Redis使用I/O多路复用（如`epoll`）机制，能够同时监听并处理多个客户端请求，通过并发提高性能。
- Redis是纯内存操作，执行速度非常快，它的性能瓶颈是网络延迟而不是执行速度， I/O多路复用模型主要就是实现了高效的网络请求
I/O 多路复用机制（核心点）
这是 Redis 处理海量连接的关键。
* Redis 使用了 `epoll` 技术。它让一个线程可以同时监控成千上万个连接（Socket）。
* **形象比喻**：就像一个高效的餐厅服务员，不再是一对一死等客人点菜，而是谁写好菜单（产生 I/O 事件）就去处理谁。


- **高效的数据结构和操作高效**：Redis设计了高效的的数据结构和算法。
高效的数据结构
Redis 的每种数据类型都经过极致优化。
* **简单动态字符串 (SDS)**：获取长度只需 。
* **跳表 (SkipList)**：让有序集合（ZSet）的查询效率媲美平衡树，但实现更简单。
* **压缩列表 (ZipList)/整数集合 (IntSet)**：在数据量小时极大节省空间并提升 CPU 缓存命中率。


### Redis的多线程
Redis 在6.0及以后的版本中引入了多线程，主要用于优化网络I/O处理，而非核心的数据读写逻辑。
- 通过多线程将网络I/O任务分摊到多个线程，加快请求的处理速度。

“Redis 6.0 引入了**多线程处理网络 I/O**。但请注意，**执行命令的核心逻辑依然是单线程**。多线程只负责网络数据的读取和协议解析，这进一步消除了网络吞吐量的瓶颈。”

核心矛盾：核心太快，网卡太慢
在 Redis 6.0 之前，Redis 的读写虽然在内存中极快，但**网络 IO 的处理**（读取 Socket 缓冲区数据、解析协议、回写响应数据）是由主线程单线程完成的。
* 随着硬件发展，网络带宽从 1Gb 提升到 10Gb 甚至更高，主线程在处理网络读写上的耗时，逐渐成了限制 Redis 吞吐量的**头号杀手**。

解决了什么问题？
1. **分担网络 IO 压力**：将网络读写（Read/Write）交给多个辅助线程并行处理。
2. **榨干多核 CPU 性能**：单线程无法利用现代服务器的多核优势，引入多线程后，在处理海量小数据包时，吞吐量提升可达 1 倍以上。

三个“没变” (面试必答)
为了保持 Redis 的简洁和高可靠，有些核心设计是绝对没变的：
* **执行命令依然是单线程**：IO 线程只负责“读数据/解析协议”和“写结果”，**真正执行业务命令（如 SET/GET）的过程依然在主线程中串行完成**。因此不需要担心线程安全和锁的问题。
* **默认不开启**：需要手动配置 `io-threads` 数量（通常建议设置为 CPU 核心数的一半）。
* **只负责网络读写**：它并不改变数据存储的逻辑，也不解决大 Key 导致的耗时操作问题。

工作流程图解
1. **主线程**接收连接，分发给 **IO 线程池**。
2. **IO 线程**并行读取并解析协议（Read/Parse）。
3. **主线程**批量执行解析好的命令（Exec）。
4. **IO 线程**并行将结果回写给客户端（Write）。


**面试官可能会问：** “为什么不干脆把执行命令也做成多线程？”
**回答核心：** 因为 Redis 的瓶颈不在 CPU 计算，而在内存和网络。如果执行命令也多线程，就需要引入复杂的锁机制，反而会大幅降低性能并增加系统复杂性。

### 网络模型


就是使用I/O多路复用结合事件的处理器来应对多个Socket请求
连接应答处理器
命令回复处理器，在Redis6.0之后，为了提升更好的性能，使用了多线程来处理回复事件
命令请求处理器，在Redis6.0之后，将命令的转换使用了多线程，增加命令转换速度，在命令执行的时候，依然是单线程


## Redis的使用
### windows安装
- 直接去官方的github的releases，下载编译好的压缩包并解压，获得现成的可执行文件
- 安装redis的docker
- 使用 WSL 安装 Redis（最推荐 ✅）
如果你使用的是 Windows 10/11，可以通过 **WSL（Windows Subsystem for Linux）** 安装真正的 Linux 版本 Redis，稳定可靠。
1. 打开 PowerShell（管理员），安装 Ubuntu 子系统（如果未安装）：
```bash
wsl --install -d Ubuntu
```
2. 启动 Ubuntu，安装 Redis：
```bash
sudo apt update
sudo apt install redis
```
3. 启动 Redis 服务：
```bash
sudo service redis-server start
```
4. 测试是否成功：
```bash
redis-cli ping
```
输出 `PONG` 表示 Redis 已正常运行。

### Redis GUI 工具
- **RedisInsight**：官方图形界面，查看 key/value 很方便
- **Another Redis Desktop Manager（RDM）**：社区常用工具

### Redis CLI
```bash
SET user:1:name "Alice"     ## 设置 key 为 user:1:name 的值为 "Alice"
GET user:1:name             ## 获取 key 的值
INCR page:views             ## 页面访问数自增
LPUSH mylist "a" "b"        ## 向列表左侧插入元素
LRANGE mylist 0 -1          ## 获取整个列表
SADD tags "java" "redis"    ## 向集合添加元素
SMEMBERS tags               ## 获取集合所有元素
DEL user:1:name             ## 删除键
```





### 命令**速览**

| 数据类型       | 方法                 |
| ---------- | ------------------ |
| String     | `GET`、`SET`        |
| List       | `LPUSH`、`RPOP`     |
| Set        | `SADD`、`SISMEMBER` |
| Hash       | `HSET`、`HGET`      |
| Sorted Set | `ZADD`、`ZRANGE`    |

### String
最常用

存一个 叫`name`的 key，它的值是字符串 `"Alice"`。 
```bash
SET name "Alice"
GET name
```
Redis 里变成：
```
name → "Alice"
```
 字符串还可以是数字，执行 `INCR` 自动 +1：
```bash
INCR count
```
结果：
```
count → "1"
```
再执行一次：
```
count → "2"
```


### List
可作为队列

- 从左插入是 `LPUSH`
- 从右插入是 `RPUSH`
- 取出用 `LRANGE`
- 也能 `LPOP`、`RPOP` 出队
✅ 命令：
```bash
LPUSH mylist "a" 
LPUSH mylist "b"
RPUSH mylist "c"
LRANGE mylist 0 -1
```

📦 Redis 里变成：
```
mylist → ["b", "a", "c"]
```

### Hash
类似 JSON，适合存结构化数据，比如存储对象或字典

下面这是一个“用户1”的信息字典。
命令：
```bash
HSET user:1 name "Alice"
HSET user:1 age "24"
HGETALL user:1
```
Redis 里变成：
```
user:1 → {
  name: "Alice",
  age: "24"
}
```

### Set
无序集合，自动去重
✅ 命令：
```bash
SADD tags "java"
SADD tags "redis"
SADD tags "java"
SMEMBERS tags
```

📦 Redis 里变成：
```
tags → {"java", "redis"}
```

### Sorted Set
有序集合，有分数

✅ 命令：
```bash
ZADD ranking 100 "Alice"
ZADD ranking 200 "Bob"
ZRANGE ranking 0 -1 WITHSCORES
```

📦 Redis 里变成：
```
ranking → {
  "Alice": 100,
  "Bob": 200
}
```

## MongoDB

**简介**：
MongoDB 是一个文档型 NoSQL 数据库，具有高写入能力，适合 “不断写入 + 查询历史 + 数据结构灵活” 的业务场景：

**优点**：
- 实时高频高并发写入能力
- 支持嵌套结构，支持动态拓展字段
- 无需 schema，数据结构灵活（所以其是NoSQL），不要求字段统一，每条数据的结构可以不同，因为同一种信息有个字段可能有，有的字段可能没有
- 支持写入分片（sharding），可以分布式横向扩展，水平扩展（多节点分布式），易扩容
- 天然无事务写入：性能比 MySQL 更高效（适用于不需要强事务的场景），弱事务（适合高性能）
- 支持高效的索引（orderId、timestamp、地理位置等）
- 支持范围查询、排序、聚合管道，以字段为单位，查询语法支持“路径式查询”，可以直接查 `.a.b.c` 结构，查询举例：`db.tracks.find({ "location.coordinates": [116.40, 39.91] })`
- 非常适合做时间序列数据的查询（虽然不是 TSDB，但灵活）

**缺点**：
- 事务支持弱：MongoDB 在 4.0 之前不支持多文档（表）事务，现在虽支持，但性能不如关系型数据库，例如金融系统涉及账户余额+日志+ 扣款流水等的多表一致写入，写入高并发时难保证强一致性。
- 强一致性较弱：默认是最终一致性，副本同步存在延迟，主从切换时可能读到旧数据（除非使用 majority 读写策略）。
- 过度灵活带来数据混乱：不强制 schema，可能导致数据结构不一致、难维护，初期方便，后期有人乱加字段，查询一地鸡毛。
- 索引机制有限：不支持复杂联合索引（如 `A or B and C` 这类复杂查询），优化能力不如 MySQL，写多读少场景还行，分析型查询不如关系型。
- 大文档性能差：BSON 单个文档最大 16MB，嵌套太深或字段过多会拖慢查询，比如保存聊天记录、日志流水要注意文档大小。
- 资源占用高：WiredTiger 存储引擎需要大量内存支撑热数据，数据越多内存压力越大，如果内存不足会导致性能抖动。
- 聚合分析能力不足：聚合功能不如 SQL 灵活，跨集合聚合很难，不适合 OLAP 场景，常需配合 Spark/Hive 做分析。
- 权限与安全机制偏弱：内建权限机制简单，不如关系型数据库成熟，多租户或精细化权限控制往往需要额外封装。
- 写冲突不可控：默认并发写入无行锁，容易出现“最后写覆盖”，多个客户端同时写同一字段可能互相覆盖，适合补偿式事务。
- 生态和兼容性一般：Mongo 查询语法独立，不支持标准 SQL，工具链不统一，很多 BI 工具或数据中台天然支持 MySQL，但对 Mongo 支持较弱。
- 面对长期大量数据表现不加，比如存储巨量日志，每天几十亿条，虽然 MongoDB 可以承受高写入，但历史数据归档麻烦、单表太大后索引性能下降、分片配置复杂、维护难度大
- 

**适合场景**：
- 灵活存储，适合结构变化频繁的数据
 - 写入性能强，适合海量实时数据
- 天生适合 JSON/BSON 结构，如轨迹、日志、用户行为
- 不适合的场景：强依赖事务、多表一致、数据结构变化不多且规则严谨的数据、需要复杂统计/JOIN/子查询、数据量超大（亿级）且结构固定的存储


**结构**：
- 每个 **集合** 类似于关系型数据库中的一张表，每个集合里的文档（Document）就是 JSON/BSON 结构，MongoDB 的设计哲学：文档即数据
```scss
数据库(db) →
    集合(collection) →
        文档(document) →
            BSON → 存入数据页 → 磁盘文件
```

- BSON（Binary JSON） —— 是一种专为机器优化的、类似 JSON 的二进制格式。可以把 MongoDB 想象成是“存储 JSON 的数据库”，只不过它用的是一种叫 BSON 的二进制格式，更高效。一条 MongoDB 记录可以长这样：
```json
{
  "userId": "u123",
  "orderId": "o567",
  "location": {
    "type": "Point",
    "coordinates": [116.397, 39.918]
  },
  "timestamp": "2025-04-25T10:45:00Z"
}
```

- MongoDB 是通过**存储引擎**（默认是 **WiredTiger**）将 BSON 文档写入磁盘。MongoDB 数据文件通常是 `.wt` 文件（WiredTiger 的压缩二进制文件），例如：
```cpp
dbpath/
  ├── collection-1--123456789.wt   // 存储一个集合的所有 BSON 文档
  ├── index-3--987654321.wt        // 索引文件
  └── WiredTiger.wt                // 全局元数据
```


**使用**：
命令行命令：
```bash
show dbs
db.version() #当前db版本
db.getMongo() #查看当前db的链接机器地址
db.help() #帮助
quit() #退出命令行
```

java中操作使用：
- pom.xml引入依赖：
```xml
<dependency>
  <groupId>org.mongodb</groupId>
  <artifactId>mongodb-driver-sync</artifactId>
  <version>4.11.1</version> <!-- 版本可根据需要调整 -->
</dependency>
```

```java
package com.example.mongo_demo;

import com.mongodb.client.*;
import org.bson.Document;

public class MongoDemo {
    public static void main(String[] args) {
        // 1. 创建连接（默认 localhost:27017）
        try (MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            // 2. 获取数据库（没有则自动创建）
            MongoDatabase database = mongoClient.getDatabase("testdb");

            // 3. 获取集合（没有则自动创建）
            MongoCollection<Document> collection = database.getCollection("users");

            // 4. 插入文档
            Document user = new Document("name", "Alice")
                    .append("age", 25)
                    .append("email", "alice@example.com");
            collection.insertOne(user);
            System.out.println("插入完成: " + user.toJson());

            // 5. 查询文档
            Document query = new Document("name", "Alice");
            FindIterable<Document> results = collection.find(query);
            for (Document doc : results) {
                System.out.println("查询结果: " + doc.toJson());
            }

            // 6. 更新文档
            Document update = new Document("$set", new Document("age", 26));
            collection.updateOne(query, update);
            System.out.println("更新完成");

            // 7. 删除文档
            collection.deleteOne(query);
            System.out.println("删除完成");
        }
    }
}
```
输出：
```text
插入完成: { "_id": { "$oid": "64f...." }, "name": "Alice", "age": 25, "email": "alice@example.com" }
查询结果: { "_id": { "$oid": "64f...." }, "name": "Alice", "age": 25, "email": "alice@example.com" }
更新完成
删除完成
```


## Neo4j


## SQLite

**特点**：
- 轻量级、嵌入式数据库
- 适用场景（移动设备、嵌入式系统）.

**使用**：
Downloads - DB Browser for SQLite： https://sqlitebrowser.org/dl/


## PostgreSQL


介绍各种功能：【养活国内大半自研数据库团队？PostgreSQL是什么？架构是怎么样的？】 https://www.bilibili.com/video/BV1CkCQBoEyp/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef


快速介绍了下如何各种功能如何使用：【PostgreSQL能存万物！这还是你认识的数据库吗？】 https://www.bilibili.com/video/BV1FUYQz7E4H/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
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


## 其它
### 数据分片

**定义**：将数据集按照某种规则（如 ID、时间等）分割成若干个小的数据块。

**特点**：每个分片存储一部分数据，分片之间互相独立，存储在不同的数据库节点或服务器上。

**常见的分片方式**：
- 水平分片（Horizontal Sharding）：根据数据的行进行分割。例如，用户表根据用户 ID 的范围进行分片，ID 1-10000 存储在分片 1，ID 10001-20000 存储在分片 2，以此类推。
- 垂直分片（Vertical Sharding）：根据数据的列进行分割。例如，将用户表的基本信息存储在一个数据库，将用户的订单信息存储在另一个数据库。

**优点**：
- 提高性能：分散负载到不同的服务器上，避免单点瓶颈。
- 扩展性强：当数据量增加时，可以通过增加更多的分片来扩展系统。


## 学习资料
Redis篇 - 飞书云文档 https://heuqqdmbyk.feishu.cn/wiki/V45ewmbN6i8nm8kNl01c7qClnTc
数据库（系统）分类简介 - 墨天轮： https://www.modb.pro/db/50043
数据库类型有哪些-常见问题-PHP中文网：
https://www.php.cn/faq/470582.html
《数据库系统概论》第五版 +学习笔记总目录-CSDN博客：
https://blog.csdn.net/weixin_43914604/article/details/106527797?spm=1001.2014.3001.5506



## END