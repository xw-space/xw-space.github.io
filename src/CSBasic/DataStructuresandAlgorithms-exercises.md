---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---

一些做过的题的经验
<!-- more -->

# 算法-题


## POJ
### [2456.Aggressive cows](http://poj.org/problem?id=2456)
Description
Farmer John has built a new long barn, with N (2 <= N <= 100,000) stalls. The stalls are located along a straight line at positions x1,...,xN (0 <= xi <= 1,000,000,000).
His C (2 <= C <= N) cows don't like this barn layout and become aggressive towards each other once put into a stall. To prevent the cows from hurting each other, FJ want to assign the cows to the stalls, such that the minimum distance between any two of them is as large as possible. What is the largest minimum distance?
Input
* Line 1: Two space-separated integers: N and C
* Lines 2..N+1: Line i+1 contains an integer stall location, xi
Output
* Line 1: One integer: the largest minimum distance
Sample Input
5 3
1
2
8
4
9
Sample Output
3
Hint
OUTPUT DETAILS:
FJ can put his 3 cows in the stalls at positions 1, 4 and 8, resulting in a minimum distance of 3.
Huge input data,scanf is recommended.

```C++
#include<cstdio>
#include<cmath>
#include<iostream>
#include<cstdlib>
#include<algorithm>
#include<cstring>
#include<map>

using namespace std;
const int maxn = 1e7 + 5;
int a[maxn];
int n, m;

bool check(int mid){
	int cnt = 1, pre = a[1];
	for(int i = 2;i <= n; i++){
		if(a[i] - pre >= mid){
			cnt++;
			pre = a[i];
		}
	}
	if(cnt >= m) return 1;
	return 0;
}

int main(){
	while(~scanf("%d %d", &n, &m)){
		for(int i = 1;i <= n; i++) scanf("%d", &a[i]);
		sort(a+1, a+1+n);
		int l = 1e9,r = a[n] - a[1], ans;;
		for(int i = 2;i <= n;i++) l = min(l, a[i]-a[i-1]);
		while(l <= r){
			int mid = (l + r) / 2;
			if(check(mid)) ans = mid, l = mid + 1;
			else r = mid - 1;
		}
		printf("%d\n", ans);
	}
	return 0;
}
```
使用二分查找最小距离


### 3414-Pots

You are given two pots, having the volume of A and B liters respectively. The following operations can be performed:

1. FILL(i) fill the pot i (1 ≤ i ≤ 2) from the tap;
2. DROP(i)      empty the pot i to the drain;
3. POUR(i,j)    pour from pot i to pot j; after this operation either the pot j is full (and there may be some water left in the pot i), or the pot i is empty (and all its contents have been moved to the pot j).

Write a program to find the shortest possible sequence of these operations that will yield exactly C liters of water in one of the pots.

Input

On the first and only line are the numbers A, B, and C. These are all integers in the range from 1 to 100 and C≤max(A,B).

Output

The first line of the output must contain the length of the sequence of operations K. The following K lines must each describe one operation. If there are several sequences of minimal length, output any one of them. If the desired result can’t be achieved, the first and only line of the file must contain the word ‘impossible’.

Sample

Sample Input

3 5 4

Sample Output

6
FILL(2)
POUR(2,1)
DROP(1)
POUR(2,1)
FILL(2)
POUR(2,1)

Solved

```C++
#include<map>
#include<queue>
#include<stack>
#include<cstdio>
#include<string>
#include<iostream>
//#include<bits/stdc++.h>

using namespace std;
struct Node
{
    int a,b;
}node, now;

struct Path
{
    int x, y, action;
}path[110][110];

string Info[7] = {"","FILL(1)","FILL(2)","DROP(1)","DROP(2)","POUR(1,2)","POUR(2,1)"};

void PrintPath(Path p){
    stack <int> sta;
    sta.push(p.action);
    int sum = 1;
    while (!(p.x == 0 && p.y == 0)){
        p = path[p.x][p.y];
        sta.push(p.action);
        sum++;
    }
    cout << sum << endl;
    while (!sta.empty())
    {
        cout << Info[sta.top()] << endl;
        sta.pop();
    }
}

int main(){
    int a, b, c;
    cin >> a>> b>>c;
    queue <Node> que;
    que.push((Node){0,0});
    while (que.size()){
        node = que.front();
        que.pop();
        if(node.a == c || node.b ==c){
            PrintPath(path[node.a][node.b]);
            return 0;
        }
        for(int i = 1;i <= 6;i++){
            if(i == 1) now = (Node){a, node.b};
            if(i == 2) now = (Node){node.a, b};
            if(i == 3) now = (Node){0, node.b};
            if(i == 4) now = (Node){node.a, 0};
            if(i == 5) now = (Node){max(0, node.a - b +node.b), min(b, node.a + node.b)};
            if(i == 6) now = (Node){min(a, node.a + node.b), max(0, node.b + node.a - a)};

            if(path[now.a][now.b].action == 0){
                que.push(now);
                path[now.a][now.b] = (Path){node.a, node.b, i};
            }
        }
    }
    cout << "impossible";
    return 0;
}
```

Explanation

### 2387-Til the Cows Come Home

Bessie is out in the field and wants to get back to the barn to get as much sleep as possible before Farmer John wakes her for the morning milking. Bessie needs her beauty sleep, so she wants to get back as quickly as possible.

Farmer John's field has N (2 <= N <= 1000) landmarks in it, uniquely numbered 1..N. Landmark 1 is the barn; the apple tree grove in which Bessie stands all day is landmark N. Cows travel in the field using T (1 <= T <= 2000) bidirectional cow-trails of various lengths between the landmarks. Bessie is not confident of her navigation ability, so she always stays on a trail from its start to its end once she starts it.

Given the trails between the landmarks, determine the minimum distance Bessie must walk to get back to the barn. It is guaranteed that some such route exists.

Input

\* Line 1: Two integers: T and N

\* Lines 2..T+1: Each line describes a trail as three space-separated integers. The first two integers are the landmarks between which the trail travels. The third integer is the length of the trail, range 1..100.

Output

\* Line 1: A single integer, the minimum distance that Bessie must travel to get from landmark N to landmark 1.

Sample

Sample Input

5 5
1 2 20
2 3 30
3 4 20
4 5 20
1 5 100

Sample Output

90

Hint

INPUT DETAILS:

There are five landmarks.

OUTPUT DETAILS:

Bessie can get home by following trails 4, 3, 2, and 1.

Solved

```C++
#include<map>
#include<queue>
#include<stack>
#include<cstdio>
#include<string>
#include<cstring>
#include<cstdlib>
#include<iostream>
#include<algorithm>
//#include<bits/stdc++.h>

using namespace std;

const int N = 2010;
int g[N][N];
int dist[N];
int t, n;
bool st[N];

void dijkstra(){
	memset(dist, 0x3f, sizeof(dist));
	dist[1]= 0;

	for(int i = 0;i < n;i++){
		int m = -1;
		for(int j= 1;j <= n;j++){
			if(!st[j] && (m == -1 || dist[m]> dist[j])){
				m=j;
			}
		}
		st[m]= true;
		
		for(int j= 1;j <= n;j++){
			dist[j]= min(dist[j], dist[m]+ g[m][j]);
		}
	}
	cout << dist[n]<< endl;
}


int main(){
	cin >> t >> n;
	
	memset(g, 0x3f, sizeof(g));
	for (int i = 0; i < t; i++){
		int a, b, c;
		cin >> a>> b>> c;
		g[a][b] = min(g[a][b], c);
		g[b][a] = g[a][b];
	}
	dijkstra();
	return 0;
}

```


## KamaCoder卡码网
### 55.右旋字符串
https://kamacoder.com/problempage.php?pid=1065
题目描述
字符串的右旋转操作是把字符串尾部的若干个字符转移到字符串的前面。给定一个字符串 s 和一个正整数 k，请编写一个函数，将字符串中的后面 k 个字符移到字符串的前面，实现字符串的右旋转操作。 
例如，对于输入字符串 "abcdefg" 和整数 2，函数应该将其转换为 "fgabcde"。
输入描述
输入共包含两行，第一行为一个正整数 k，代表右旋转的位数。第二行为字符串 s，代表需要旋转的字符串。
输出描述
输出共一行，为进行了右旋转操作后的字符串。
输入示例
```
2
abcdefg
```
输出示例
```
fgabcde
```
提示信息
数据范围：  
1 <= k < 10000,  
1 <= s.length < 10000;
题解
```C++
#include<iostream>
#include<algorithm>
using namespace std;
int main() {
    int n;
    string s;
    cin >> n >> s;
    int len = s.size(); //获取长度
    reverse(s.begin(), s.end()); // 整体反转
    reverse(s.begin(), s.begin() + n); // 先反转前一段，长度n
    reverse(s.begin() + n, s.end()); // 再反转后一段
    cout << s << endl;
} 
```
## HDU
### 1228.A + B
Problem Description
读入两个小于100的正整数A和B,计算A+B.
需要注意的是:A和B的每一位数字由对应的英文单词给出.

Input
测试输入包含若干测试用例,每个测试用例占一行,格式为"A + B =",相邻两字符串有一个空格间隔.当A和B同时为0时输入结束,相应的结果不要输出.

Output
对每个测试用例输出1行,即A+B的值.

Sample Input
one + two =
three four + five six =
zero seven + eight nine =
zero + zero =
 
Sample Output
3
90
96

```C++
#include<cstdio>
#include<iostream>
#include<string>
#include<map>
//#include<bits/stdc++.h>

using namespace std;

int main(){
	string tmp;
	string numstr[10] = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
	map<string, int>nummp;
	nummp.clear();
	for(int i = 0; i < 10; i++) nummp[numstr[i]] = i;
	while(1){
		int ans1 = 0;
		int ans2 = 0;
		while(cin >> tmp){
			//cout << tmp << endl;
			if(tmp == "+") break;
			else{
				ans1 = ans1 * 10;
				ans1 += nummp[tmp];
			}
			//printf("%d\n", ans1);
		}
		while(cin >> tmp){
			if(tmp == "=") break;
			else{
				ans2 = ans2 * 10;
				ans2 += nummp[tmp];
			}
		}
		if(ans1 + ans2) printf("%d\n", ans1+ans2);
		else break;
	}
	return 0;
}
```
使用map<string, int>来存英文与数字的对应，，如果一个英文数字后面不是”+“或者”=“，说明这个数字是十位，要乘十

### [1232.畅通工程](http://acm.hdu.edu.cn/showproblem.php?pid=1232)

```c++
#include<bits/stdc++.h>

using namespace std;
const int maxn = 1e6 + 5;
int fa[maxn];	//记录节点 `i` 的父节点
int Rank[maxn]; //记录以 `i` 为根的树的高度

int find(int x){	//查找节点 `x` 的根节点（即该集合的代表），并进行路径压缩,路径压缩是在查找的过程中，将经过的所有节点直接连接到根节点上，从而降低树的高度，加快后续查找操作。
	return fa[x] == x ? x : fa[x] = find(fa[x]); //fa[x] = find(fa[x])实现了路径压缩
}

void Union(int x, int y){		
//用于合并两个节点所在的集合
//首先查找 `x` 和 `y` 的根节点 `fx` 和 `fy`，如果它们的根节点不同，则将其中一个根节点连接到另一个根节点上
//为了使树尽可能矮，这里使用了**按秩合并**：将树高较小的根节点连接到树高较大的根节点上，并适当更新树的高度。
	int fx = find(x),fy = find(y);
	if(fx != fy){
		if(Rank[fx] >= Rank[fy]){		//选树高小的连
			fa[fx] = fy;	//直接连到树根上，也是路径压缩了
			Rank[fy]++;		//连完树的高度增加了
		}
		else{
			fa[fy] = fx;
			Rank[fy]++;
		}
	}
}

int main(){
	int n, m;
	while(scanf("%d", &n),n){
		scanf("%d", &m);
		for(int i = 1;i <= n;i++){
			fa[i] = i;	//初始化父亲节点，不初始化上次链接的节点会影响下次查询的结果
			Rank[i] = 0;	//初始化所有的树高
		}
		int u,v;
		for(int i = 1;i <= m;i++){	//连结给的点
			scanf("%d%d", &u, &v);
			Union(u,v);
		}
		int ans = 0;
		for(int i = 2;i <= n;i++){
			if(find(i) != find(1)){		//检查两节点是否有相同父节点
				Union(1, i);
				ans++;
			}
		}
		printf("%d\n",ans);
	}
	return 0;
}

```
很典型的一道并查集题目，题意是给出n个城镇与m条道路，问还需修多少条路才能使任意两个城镇连通（但不一定有直接的道路相连，只要互相间接通过道路可达即可），找出
### 2000.ASCII码排序
Problem Description
输入三个字符后，按各字符的ASCII码从小到大的顺序输出这三个字符。

Input
输入数据有多组，每组占一行，有三个字符组成，之间无空格。
 
Output
对于每组输入数据，输出一行，字符中间用一个空格分开。

Sample Input
qwe
asd
zxc

Sample Output
e q w
a d s
c x z
```C++
#include<cstdio>

int main(){
	char a, b, c, tmp;
	while(~scanf(" %c%c%c", &a, &b, &c)){
		if(b < a){
			tmp = a;
			a = b;
			b = tmp;
		}
		if(c < a){
			tmp = a;
			a = c;
			c = tmp;
		}
		if(c < b){
			tmp = b;
			b = c;
			c = tmp;
		}
		printf("%c %c %c\n", a, b, c);
	}
	return 0;
}
```

### [2199.Can you solve this equation?](https://acm.hdu.edu.cn/showproblem.php?pid=2199)
Problem Description
Now,given the equation 8*x^4 + 7*x^3 + 2*x^2 + 3*x + 6 == Y,can you find its solution between 0 and 100;
Now please try your lucky.

Input
The first line of the input contains an integer T(1<=T<=100) which means the number of test cases. Then T lines follow, each line has a real number Y (fabs(Y) <= 1e10);

Output
For each test case, you should just output one real number(accurate up to 4 decimal places),which is the solution of the equation,or “No solution!”,if there is no solution for the equation between 0 and 100.

Sample Input
2
100
-4

Sample Output
1.6152
No solution!

```C++
#include<cstdio>
#include<cmath>
#include<algorithm>
#include<cstdlib>
using namespace std;
const double eps = 1e-8;

int n, m;
int a[1000005];
double cal(double x){
	double ans = 8*x*x*x*x + 7*x*x*x + 2*x*x + 3*x + 6;
	return ans;
}

int main(){
	int t; scanf("%d", &t);
	while(t--){
		double y; 
		scanf("%lf", &y);
		if(cal(0) > y || cal(100) < y) printf("No solution!\n");
		else{
			double l = 0.0,r = 100.0, ans;
			while(r-l>= eps){
				double mid = (l + r) / 2.0;
				double res = cal(mid) - y;
				if(res >= 0){
					ans = mid;
					r = mid;
				}
				else l = mid;
			}
			printf("%.4f\n", ans);
		}
	}
	return 0;
}
```
使用二分法，从0-100间搜索这个解


## CSP
### 20240922-2. 字符串变换

样例：
```
#Hello World#
6
#HH#
#e #
# r#
#re#
#oa#
#ao#
3
1 2 3
```
代码（Chatgpt所写，只能保证跑通样例）：
```c++
#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;

// 函数：执行字符串变换操作
string transform(const string& s, unordered_map<char, char>& transformations, int k) {
    string transformed = s;
    while (k--) {
        for (char& ch : transformed) {
            if (transformations.find(ch) != transformations.end()) {
                ch = transformations[ch];
            }
        }
    }
    return transformed;
}

int main() {
    string s_line;
    getline(cin, s_line);  // 使用getline读取初始字符串行
    string s = s_line.substr(1, s_line.size() - 2);  // 去掉包裹的#

    int n;
    cin >> n;  // 读取字符对数
    cin.ignore();  // 忽略换行符，准备读取后续行

    unordered_map<char, char> transformations;
    for (int i = 0; i < n; ++i) {
        string pair;
        getline(cin, pair);  // 使用getline读取每个字符对
        transformations[pair[1]] = pair[2];  // 例如 f(x) = y
    }

    int m;
    cin >> m;  // 读取查询的个数
    for (int i = 0; i < m; ++i) {
        int k;
        cin >> k;  // 读取每个查询中的 k 值
        cout << "#" << transform(s, transformations, k) << "#" << endl;
    }

    return 0;
}
```

题解：
https://blog.csdn.net/weixin_46655675/article/details/142441929
### 20240922-3. 补丁应用
样例1：
```cpp

```

代码：
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

// 判断补丁是否损坏
bool is_patch_damaged(const vector<string>& original, const vector<string>& patch) {
    vector<string> modified = original;
    int n = original.size();
    int current_line = 0;  // 当前块的行号
    
    for (size_t i = 0; i < patch.size(); ++i) {
        string line = patch[i];
        
        // 如果是注释行，跳过
        if (line[0] == '#') {
            continue;
        }
        
        // 如果是以 @@ 开头的行，表示块的开始
        if (line.substr(0, 2) == "@@") {
            int old_line_start, old_lines, new_line_start, new_lines;
            // 解析补丁块头部
            sscanf(line.c_str(), "@@ -%d,%d +%d,%d @@", &old_line_start, &old_lines, &new_line_start, &new_lines);
            
            // 索引修正为 0 基准
            old_line_start--;
            
            vector<string> original_block, new_block;
            int original_count = 0, new_count = 0;
            
            // 开始读取块内容
            for (size_t j = i + 1; j < patch.size(); ++j) {
                if (patch[j][0] == '@') {
                    break;  // 遇到下一个块，停止读取
                }
                
                // - 开头的行是原文件要删除的行
                if (patch[j][0] == '-') {
                    original_block.push_back(patch[j].substr(1));
                    original_count++;
                }
                // + 开头的行是新文件要添加的行
                else if (patch[j][0] == '+') {
                    new_block.push_back(patch[j].substr(1));
                    new_count++;
                }
                // 空格开头的行是未变动的行
                else if (patch[j][0] == ' ') {
                    original_block.push_back(patch[j].substr(1));
                    new_block.push_back(patch[j].substr(1));
                    original_count++;
                    new_count++;
                }
            }
            
            // 检查是否匹配原文件中的内容
            if (original_count != old_lines || new_count != new_lines) {
                return true;  // 如果行数不匹配，补丁损坏
            }
            
            for (int j = 0; j < old_lines; ++j) {
                if (old_line_start + j >= n || modified[old_line_start + j] != original_block[j]) {
                    return true;  // 如果原文件中的内容不匹配，补丁损坏
                }
            }
            
            // 替换为新文件的内容
            modified.erase(modified.begin() + old_line_start, modified.begin() + old_line_start + old_lines);
            modified.insert(modified.begin() + old_line_start, new_block.begin(), new_block.end());
            
            i += original_count + new_count;  // 跳过该块内容
        }
    }
    
    return false;
}

int main() {
    int n;
    cin >> n;  // 读取原文件的行数
    cin.ignore();  // 忽略换行符
    vector<string> original(n);
    
    // 读取原文件的内容
    for (int i = 0; i < n; ++i) {
        getline(cin, original[i]);
    }

    vector<string> patch;
    string line;
    
    // 读取补丁内容
    while (getline(cin, line)) {
        patch.push_back(line);
    }

    // 检查并应用补丁
    if (is_patch_damaged(original, patch)) {
        cout << "Patch is damaged." << endl;
    } else {
        for (const string& line : original) {
            cout << line << endl;
        }
    }

    return 0;
}
```
### 20240922-4. 通讯延迟
样例：
```
5 5
0 0
2 4
4 0
5 3
5 5
1 2 2 5
3 5 2 6
2 0 2 1
4 2 2 3
5 4 1 2

```
代码（Chatgpt所写，只能保证跑通样例）：
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
#include <limits>

using namespace std;

struct Edge {
    int to;
    int delay;
};

int n, m;
vector<pair<int, int>> nodes;  // 节点的坐标
vector<vector<Edge>> graph;    // 邻接表表示的图

// 检查节点是否在基站的覆盖范围内
bool in_range(int x1, int y1, int x2, int y2, int r) {
    return abs(x1 - x2) <= r && abs(y1 - y2) <= r;
}

// 使用Dijkstra算法找到从节点1到节点n的最短通讯延迟
int dijkstra(int start, int end) {
    vector<int> dist(n, numeric_limits<int>::max());
    dist[start] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [current_delay, u] = pq.top();
        pq.pop();
        
        if (current_delay > dist[u]) continue;
        
        for (const auto& edge : graph[u]) {
            int v = edge.to;
            int delay = edge.delay;
            
            if (dist[u] + delay < dist[v]) {
                dist[v] = dist[u] + delay;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist[end] == numeric_limits<int>::max() ? -1 : dist[end];
}

int main() {
    cin >> n >> m;
    nodes.resize(n);
    graph.resize(n);
    
    // 读取节点的坐标
    for (int i = 0; i < n; ++i) {
        cin >> nodes[i].first >> nodes[i].second;
    }
    
    // 读取基站的信息
    for (int i = 0; i < m; ++i) {
        int xj, yj, rj, tj;
        cin >> xj >> yj >> rj >> tj;
        
        // 遍历所有节点，检查哪些节点在基站的覆盖范围内
        vector<int> covered_nodes;
        for (int k = 0; k < n; ++k) {
            if (in_range(nodes[k].first, nodes[k].second, xj, yj, rj)) {
                covered_nodes.push_back(k);
            }
        }
        
        // 将被该基站覆盖的所有节点相互连接，延迟为基站的通讯延迟
        for (size_t u = 0; u < covered_nodes.size(); ++u) {
            for (size_t v = u + 1; v < covered_nodes.size(); ++v) {
                graph[covered_nodes[u]].push_back({covered_nodes[v], tj});
                graph[covered_nodes[v]].push_back({covered_nodes[u], tj});
            }
        }
    }
    
    // 使用Dijkstra算法计算从节点1到节点n的最短延迟
    int result = dijkstra(0, n - 1);
    
    if (result == -1) {
        cout << "Nan" << endl;
    } else {
        cout << result << endl;
    }
    
    return 0;
}

```
### 20240922-5. 木板切割

样例：
```
6 3 5
1 2 2 3 1 2
1 3 4
1 5 5
1 4 5
1 1 6
2 4 4

```


代码（Chatgpt所写，只能保证跑通样例）：
```c++
#include <iostream>
#include <vector>
#include <set>

using namespace std;

// 函数：计算颜色种类和颜色段数
pair<int, int> calculate_segments(const vector<int>& board, int l, int r) {
    if (l > r) {
        return {0, 0};  // 空区间
    }

    set<int> colors;  // 用于存储不同的颜色
    int segments = 1; // 颜色段数至少为1，如果区间不为空
    
    colors.insert(board[l]);
    
    // 遍历切下的木板部分
    for (int i = l + 1; i <= r; ++i) {
        colors.insert(board[i]);  // 记录不同颜色
        if (board[i] != board[i - 1]) {
            segments++;  // 如果当前颜色和前一个颜色不同，颜色段数+1
        }
    }
    
    return {colors.size(), segments};  // 返回不同颜色种类和颜色段数
}

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    
    vector<int> board(n + 1);  // 木板，使用1-based索引方便处理
    for (int i = 1; i <= n; ++i) {
        cin >> board[i];  // 读取每段木板的颜色
    }

    // 处理每次切割操作
    for (int i = 0; i < k; ++i) {
        int xi, li, ri;
        cin >> xi >> li >> ri;  // 读取第xi号木板的切割区间[li, ri]

        // 计算不同颜色数和颜色段数
        auto result = calculate_segments(board, li, ri);
        cout << result.first << " " << result.second << endl;
    }
    
    return 0;
}

```

## CodeForces
### 1272B-Snow Walking Robot

Recently you have bought a snow walking robot and brought it home. Suppose your home is a cell (0, 0)(0,0) on an infinite grid.

You also have the sequence of instructions of this robot. It is written as the string ss consisting of characters 'L', 'R', 'U' and 'D'. If the robot is in the cell (x, y)(x,y) right now, he can move to one of the adjacent cells (depending on the current instruction).

* If the current instruction is 'L', then the robot can move to the left to (x - 1, y)(x−1,y);
* if the current instruction is 'R', then the robot can move to the right to (x + 1, y)(x+1,y);
* if the current instruction is 'U', then the robot can move to the top to (x, y + 1)(x,y+1);
* if the current instruction is 'D', then the robot can move to the bottom to (x, y - 1)(x,y−1).

You've noticed the warning on the last page of the manual: if the robot visits some cell (except (0, 0)(0,0)) twice then it breaks.

So the sequence of instructions is valid if the robot starts in the cell (0, 0)(0,0), performs the given instructions, visits no cell other than (0, 0)(0,0) two or more times and ends the path in the cell (0, 0)(0,0). Also cell (0, 0)(0,0) should be visited at most two times: at the beginning and at the end (if the path is empty then it is visited only once). For example, the following sequences of instructions are considered valid: "UD", "RL", "UUURULLDDDDLDDRRUU", and the following are considered invalid: "U" (the endpoint is not (0, 0)(0,0)) and "UUDD" (the cell (0, 1)(0,1) is visited twice).

The initial sequence of instructions, however, might be not valid. You don't want your robot to break so you decided to reprogram it in the following way: you will remove some (possibly, all or none) instructions from the initial sequence of instructions, then rearrange the remaining instructions as you wish and turn on your robot to move.

Your task is to remove as few instructions from the initial sequence as possible and rearrange the remaining ones so that the sequence is valid. Report the valid sequence of the maximum length you can obtain.

Note that you can choose any order of remaining instructions (you don't need to minimize the number of swaps or any other similar metric).

You have to answer qq independent test cases.

Input

The first line of the input contains one integer q(1 <= q <= 2*10^4) — the number of test cases.

The next qq lines contain test cases. The ii-th test case is given as the string ss consisting of at least 11 and no more than 10^5 characters 'L', 'R', 'U' and 'D' — the initial sequence of instructions.

It is guaranteed that the sum of |s|(where |s| is the length of s) does not exceed 10^5 over all test cases (∑|s| <= 10^5).

Output

For each test case print the answer on it. In the first line print the maximum number of remaining instructions. In the second line print the valid sequence of remaining instructions tt the robot has to perform. The moves are performed from left to right in the order of the printed sequence. If there are several answers, you can print any. If the answer is 00, you are allowed to print an empty line (but you can don't print it).

Sample

Sample Input

6
LRU
DURLDRUDRULRDURDDL
LRUDDLRUDRUL
LLLLRRRR
URDUR
LLL

Sample Output

2
LR
14
RUURDDDDLLLUUR
12
ULDDDRRRUULL
2
LR
2
UD
0

Note

There are only two possible answers in the first test case: "LR" and "RL".

The picture corresponding to the second test case:

![[CF-1272B.png]]
Note that the direction of traverse does not matter

Another correct answer to the third test case: "URDDLLLUURDR".

Solved

```C++
#include<map>
#include<queue>
#include<stack>
#include<cstdio>
#include<string>
#include<cstring>
#include<cstdlib>
#include<iostream>
#include<algorithm>
//#include<bits/stdc++.h>

using namespace std;


int main(){
	int q;
	cin >> q;
	while(q--){
		string s;
		cin >> s;
		int l = 0,r = 0,u = 0, d = 0;
		for(int i = 0;i < s.size();i++){
			if(s[i]=='L') l++;
			if(s[i]=='R') r++;
			if(s[i]=='U') u++;
			if(s[i]=='D') d++;
		}
		r = l = min(l, r);
		d = u = min(u, d);
		int sum=l+r+u+d;
		if(l && !u){
			cout << 2 << endl;
			cout << "LR" << endl;
			continue;
		}
		if(!l && u){
			cout << 2 << endl;
			cout << "UD" << endl;
			continue;
		}
		int vis = 0;
		if(sum == 0) vis = 1;
		cout << sum << endl;
		while(l--) cout << "L";
		while(u--) cout << "U";
		while(r--) cout << "R";
		while(d--) cout << "D";
		if(vis) cout << endl;
		cout << endl;
	}
}
```


### 1304A.Two Rabbits
Being tired of participating in too many Codeforces rounds, Gildong decided to take some rest in a park. He sat down on a bench, and soon he found two rabbits hopping around. One of the rabbits was taller than the other.
He noticed that the two rabbits were hopping towards each other. The positions of the two rabbits can be represented as integer coordinates on a horizontal line. The taller rabbit is currently on position xx, and the shorter rabbit is currently on position yy (x<yx<y). Every second, each rabbit hops to another position. The taller rabbit hops to the positive direction by aa, and the shorter rabbit hops to the negative direction by bb.

![](https://vj.csgrandeur.cn/6654bad54f26418cc0a959ee297cf6a4?v=1723841477)

For example, let's say x=0x=0, y=10y=10, a=2a=2, and b=3b=3. At the 11-st second, each rabbit will be at position 22 and 77. At the 22-nd second, both rabbits will be at position 44.

Gildong is now wondering: Will the two rabbits be at the same position at the same moment? If so, how long will it take? Let's find a moment in time (in seconds) after which the rabbits will be at the same point.

**Input**
Each test contains one or more test cases. The first line contains the number of test cases tt (1≤t≤10001≤t≤1000).
Each test case contains exactly one line. The line consists of four integers xx, yy, aa, bb (0≤x<y≤1090≤x<y≤109, 1≤a,b≤1091≤a,b≤109) — the current position of the taller rabbit, the current position of the shorter rabbit, the hopping distance of the taller rabbit, and the hopping distance of the shorter rabbit, respectively.

Output
For each test case, print the single integer: number of seconds the two rabbits will take to be at the same position.
If the two rabbits will never be at the same position simultaneously, print −1−1.
Examples

|Input|Output|
|---|---|
|5<br>0 10 2 3<br>0 10 3 3<br>900000000 1000000000 1 9999999<br>1 2 1 1<br>1 3 1 1|2<br>-1<br>10<br>-1<br>1|
Note
The first case is explained in the description.
In the second case, each rabbit will be at position 33 and 77 respectively at the 11-st second. But in the 22-nd second they will be at 66 and 44 respectively, and we can see that they will never be at the same position since the distance between the two rabbits will only increase afterward.

```C++
#include<cstdio>
#include<iostream>

using namespace std;

int main(){
	int t;
	cin >> t;
	while(t--){
		int x, y, a, b;
		cin >> x >> y >> a >>b;
		if((y-x)%(a+b) == 0) cout << (y-x)/(a+b) << endl;
		else cout << -1<<endl;
	}
	return 0;
}
```

### 1304B. Longest Palindrome

Returning back to problem solving, Gildong is now studying about palindromes. He learned that a palindrome is a string that is the same as its reverse. For example, strings "pop", "noon", "x", and "kkkkkk" are palindromes, while strings "moon", "tv", and "abab" are not. An empty string is also a palindrome.

Gildong loves this concept so much, so he wants to play with it. He has nn distinct strings of equal length mm. He wants to discard some of the strings (possibly none or all) and reorder the remaining strings so that the concatenation becomes a palindrome. He also wants the palindrome to be as long as possible. Please help him find one.

Input
The first line contains two integers nn and mm (1≤n≤1001≤n≤100, 1≤m≤501≤m≤50) — the number of strings and the length of each string.

Next nn lines contain a string of length mm each, consisting of lowercase Latin letters only. All strings are distinct.

Output

In the first line, print the length of the longest palindrome string you made.

In the second line, print that palindrome. If there are multiple answers, print any one of them. If the palindrome is empty, print an empty line or don't print this line at all.

Examples

Input
3 3
tab
one
bat

Output
6
tabbat

Input
4 2
oo
ox
xo
xx

Output
6
oxxxxo

Input
3 5
hello
codef
orces

Output
0

Input
9 4
abab
baba
abcd
bcde
cdef
defg
wxyz
zyxw
ijji

Output
20
ababwxyzijjizyxwbaba

Note
In the first example, "battab" is also a valid answer.
In the second example, there can be 4 different valid answers including the sample output. We are not going to provide any hints for what the others are.
In the third example, the empty string is the only valid palindrome string.

```C++
#include<cstdio>
#include<iostream>

char z[51000]; // 用于存储最终结果的字符数组
using namespace std;
struct abc{
	char s[55];
}a[105]; 

int main(){
	int n, m; // 符串的数量和每个字符串的长度
	cin >> n >> m;
	for(int i = 1;i <= n;i++){
		a[i].s[0] = 0;
		for(int j = 1;j <= m;j++){
			cin >> a[i].s[j];
		}
	}
	int ans = 0; // 用于存储结果字符串的长度
	// 两层循环遍历了所有可能的字符串对(i, j),通过比较两个字符串a[i]和a[j]检查它们是否可以组成回文串。如果可以，就将它们标记为已使用，并将它们存储在结果数组z中
	for(int i = 1;i < n;i++){
		for(int j = i+1;j <= n;j++){
			int sum = 0;
			for(int k = 1;k <= m;k++){
				if(a[i].s[k] == a[j].s[m-k+1]) sum++;
				else break;
			}
			if(sum == m){
				if(a[j].s[0] == 1 || a[i].s[0] == 1) continue;
				else a[j].s[0] = 1;
				a[i].s[0] = 1;
				for(int k = 1;k <= m;k++){
					z[ans/2 + k] = a[i].s[k];
				}
				ans += 2*m;
			}
		}
	}
	// 再次遍历所有字符串，检查每个字符串是否本身是回文串，并且没有被标记为已使用
	for(int i = 1;i <= n;i++){
		int sum = 0;
		for(int j = 1;j <= m/2;j++){
			if(a[i].s[j] == a[i].s[m-j+1]) sum++;
		}
		if(a[i].s[0] == 0 && sum == m/2){
			for(int k = 1;k <= (m+1)/2;k++){
				z[ans/2 + k] = a[i].s[k];
			}
			ans += m;
			break;
		}
	}
	// 通过复制结果数组的前半部分来构造完整的回文串
	for(int i = 1;i <= ans/2;i++){
		z[ans-i+1] = z[i];
	}
	z[ans+1] = '\0';
	cout << ans << endl;
	printf("%s\n", z+1);
	return 0;
}
```


### 1313A.Fast Food Restaurant
Tired of boring office work, Denis decided to open a fast food restaurant.
On the first day he made aa portions of dumplings, bb portions of cranberry juice and cc pancakes with condensed milk.
The peculiarity of Denis's restaurant is the procedure of ordering food. For each visitor Denis himself chooses a set of dishes that this visitor will receive. When doing so, Denis is guided by the following rules:
- every visitor should receive at least one dish (dumplings, cranberry juice, pancakes with condensed milk are all considered to be dishes);
- each visitor should receive no more than one portion of dumplings, no more than one portion of cranberry juice and no more than one pancake with condensed milk;
- all visitors should receive different sets of dishes.
What is the maximum number of visitors Denis can feed?
**Input
The first line contains an integer tt (1≤t≤5001≤t≤500) — the number of test cases to solve.
Each of the remaining tt lines contains integers aa, bb and cc (0≤a,b,c≤100≤a,b,c≤10) — the number of portions of dumplings, the number of portions of cranberry juice and the number of condensed milk pancakes Denis made.
**Output
For each test case print a single integer — the maximum number of visitors Denis can feed.
**Examples

|Inputcopy|Outputcopy|
|---|---|
|7<br>1 2 1<br>0 0 0<br>9 1 7<br>2 2 3<br>2 3 2<br>3 2 2<br>4 4 4|3<br>0<br>4<br>5<br>5<br>5<br>7|
**Note
In the first test case of the example, Denis can feed the first visitor with dumplings, give the second a portion of cranberry juice, and give the third visitor a portion of cranberry juice and a pancake with a condensed milk.
In the second test case of the example, the restaurant Denis is not very promising: he can serve no customers.
In the third test case of the example, Denise can serve four visitors. The first guest will receive a full lunch of dumplings, a portion of cranberry juice and a pancake with condensed milk. The second visitor will get only dumplings. The third guest will receive a pancake with condensed milk, and the fourth guest will receive a pancake and a portion of dumplings. Please note that Denis hasn't used all of the prepared products, but is unable to serve more visitors.

```C++
#include<iostream>
#include<cstdio>

using namespace std;

int main(){
	int t;
	cin >> t;
	while(t--){
		int tmp,ans = 0;
		int a, b, c;
		cin >> a >> b >> c;
		if(a < b){
			tmp = a;
			a = b;
			b = tmp;
		}
		if(a < c){
			tmp = a;
			a = c;
			c = tmp;
		}
		if(b < c){
			tmp = b;
			b = c;
			c = tmp;
		}
		if(a>=1) ans++,a--;
		if(b>=1) ans++,b--;
		if(c>=1) ans++,c--;
		if(a>=1 && b>=1) ans++,a--,b--;
		if(a>=1 && c>=1) ans++,a--,c--;
		if(b>=1 && c>=1) ans++,b--,c--;
		if(a>=1 && b>=1 && c >= 1) ans++,a--,b--,c--;
		cout << ans << endl;
	}
	return 0;
}
```
将三个堆按照从大到小排序，使得 `a` 为最大的堆，`b` 为次大的堆，`c` 为最小的堆。这确保了每次尽可能先从大的堆中取物品,先从每个非空堆中各取一个物品,然后检查是否可以从两个不同的堆中再各取一个物品，尽量减少较大的堆的大小,最后，如果所有三个堆都至少有一个物品，则从每个堆中各取一个物品。最终输出可以进行操作的最大次数 `ans`。
### 1313B.Different Rules
Nikolay has only recently started in competitive programming, but already qualified to the finals of one prestigious olympiad. There going to be nn participants, one of whom is Nikolay. Like any good olympiad, it consists of two rounds. Tired of the traditional rules, in which the participant who solved the largest number of problems wins, the organizers came up with different rules.
Suppose in the first round participant A took xx-th place and in the second round — yy-th place. Then the total score of the participant A is sum x+yx+y. The overall place of the participant A is the number of participants (including A) having their total score less than or equal to the total score of A. Note, that some participants may end up having a common overall place. It is also important to note, that in both the first and the second round there were no two participants tying at a common place. In other words, for every ii from 11 to nn exactly one participant took ii-th place in first round and exactly one participant took ii-th place in second round.
Right after the end of the Olympiad, Nikolay was informed that he got xx-th place in first round and yy-th place in the second round. Nikolay doesn't know the results of other participants, yet he wonders what is the minimum and maximum place he can take, if we consider the most favorable and unfavorable outcome for him. Please help Nikolay to find the answer to this question.
**Input

The first line contains an integer tt (1≤t≤1001≤t≤100) — the number of test cases to solve.

Each of the following tt lines contains integers nn, xx, yy (1≤n≤1091≤n≤109, 1≤x,y≤n1≤x,y≤n) — the number of participants in the olympiad, the place that Nikolay took in the first round and the place that Nikolay took in the second round.
**Output
Print two integers — the minimum and maximum possible overall place Nikolay could take.
**Examples

|Inputcopy|Outputcopy|
|---|---|
|1<br>5 1 3|1 3|

|Inputcopy|Outputcopy|
|---|---|
|1<br>6 3 4|2 6|
**Note
Explanation for the first example:
Suppose there were 5 participants A-E. Let's denote Nikolay as A. The the most favorable results for Nikolay could look as follows:
![](https://vj.csgrandeur.cn/ae62d8806cacd0bc46b78472cc34ac6a?v=1723819335)
However, the results of the Olympiad could also look like this:
![](https://vj.csgrandeur.cn/b1922cc48799fd4d193b4eec3aefbadd?v=1723819335)
In the first case Nikolay would have taken first place, and in the second — third place.
```C++
#include<iostream>

using namespace std;

int main(){
	int t;
	cin >> t;
	while(t--){
		int n, x, y;
		cin >> n >> x >> y;
		cout<<max(1,min(n,x+y-n+1))<<" "<<min(n,x+y-1)<<endl;
	}
	return 0;
}
```
min(n,x+y-1)为最差名次，
max(1,min(n,x+y-n+1))为最好名次，
讲解资料：
https://www.bilibili.com/video/av91242850
https://blog.csdn.net/Doneoll/article/details/104481023
https://blog.csdn.net/mrcrack/article/details/104486588/
https://blog.csdn.net/weixin_45767800/article/details/106061608

## LeetCode力扣
### LeetCode使用

#### 越界溢出问题

对于第54题螺旋矩阵，在这道题的for循环中，如果不在判断部分添加“ && k < total”部分，会出现堆缓冲溢出错误，并且这个错误是随机出现的，就是这四个for循环中有的加上“ && k < total”这部分或者不加，都可能会出现这个错误或者没有这个错误，Chatgpt说这个错误通常是由于数组或向量的索引超出了其分配的范围，但我这个程序即使不加这个检查条件，他也不会越界溢出，我觉得应该是LeetCode的问题，因为在写这道题的过程中，也出现了类似的错误，我觉得这些问题出现的主要原因是，LeetCode会多管闲事，即使实际不会溢出，但是其有潜在越界溢出的风险，就会报错，并且这个检查不是很智能，即使我故意写会越界溢出的代码，这个问题也还是会随机出现，并且最大的问题是，他报错了会只给报错，不会显示输出，没发调试，所以最好自己在本地调试，反正现在有Chatgpt，直接让Chatgpt给补齐主体代码也很方便，调好后粘贴到LeetCode上，再消除越界问题，也当作对自己的锻炼了，最后附上出现的越界溢出报错之一

```
Line 16: Char 63: ================================================================= ==21==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x504000000140 at pc 0x55cd24bc4658 bp 0x7fffc87b4d30 sp 0x7fffc87b4d28 WRITE of size 4 at 0x504000000140 thread T0 #0 0x55cd24bc4657 in Solution::spiralOrder(std::vector<std::vector<int, std::allocator<int>>, std::allocator<std::vector<int, std::allocator<int>>>>&) solution.cpp:16:63 #1 0x55cd24bc3229 in __helper__ solution.cpp:16:36 #2 0x55cd24bc3229 in main solution.cpp:16:48 #3 0x7f958336dd8f (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f) (BuildId: 490fef8403240c91833978d494d39e537409b92e) #4 0x7f958336de3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f) (BuildId: 490fef8403240c91833978d494d39e537409b92e) #5 0x55cd24af2324 in _start (solution+0x9d324) 0x504000000140 is located 0 bytes after 48-byte region [0x504000000110,0x504000000140) allocated by thread T0 here: #0 0x55cd24bc0bbd in operator new(unsigned long) /root/llvm-project/compiler-rt/lib/asan/asan_new_delete.cpp:95:3 #1 0x55cd24bc4727 in allocate /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/ext/new_allocator.h:127:27 #2 0x55cd24bc4727 in allocate /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/bits/allocator.h:185:32 #3 0x55cd24bc4727 in allocate /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/bits/alloc_traits.h:464:20 #4 0x55cd24bc4727 in _M_allocate /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/bits/stl_vector.h:346:20 #5 0x55cd24bc4727 in std::_Vector_base<int, std::allocator<int>>::_M_create_storage(unsigned long) /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/bits/stl_vector.h:361:33 #6 0x55cd24bc3a5b in _Vector_base /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/bits/stl_vector.h:305:9 #7 0x55cd24bc3a5b in vector /usr/bin/../lib/gcc/x86_64-linux-gnu/11/../../../../include/c++/11/bits/stl_vector.h:511:9 #8 0x55cd24bc3a5b in Solution::spiralOrder(std::vector<std::vector<int, std::allocator<int>>, std::allocator<std::vector<int, std::allocator<int>>>>&) solution.cpp:16:21 #9 0x55cd24bc3229 in __helper__ solution.cpp:16:36 #10 0x55cd24bc3229 in main solution.cpp:16:48 #11 0x7f958336dd8f (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f) (BuildId: 490fef8403240c91833978d494d39e537409b92e) SUMMARY: AddressSanitizer: heap-buffer-overflow solution.cpp:16:63 in Solution::spiralOrder(std::vector<std::vector<int, std::allocator<int>>, std::allocator<std::vector<int, std::allocator<int>>>>&) Shadow bytes around the buggy address: 0x503ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0x503fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0x503fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0x504000000000: fa fa 00 00 00 00 00 05 fa fa fd fd fd fd fd fd 0x504000000080: fa fa fd fd fd fd fd fa fa fa fd fd fd fd fd fd =>0x504000000100: fa fa 00 00 00 00 00 00[fa]fa fa fa fa fa fa fa 0x504000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa 0x504000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa 0x504000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa 0x504000000300: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa 0x504000000380: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa Shadow byte legend (one shadow byte represents 8 application bytes): Addressable: 00 Partially addressable: 01 02 03 04 05 06 07 Heap left redzone: fa Freed heap region: fd Stack left redzone: f1 Stack mid redzone: f2 Stack right redzone: f3 Stack after return: f5 Stack use after scope: f8 Global redzone: f9 Global init order: f6 Poisoned by user: f7 Container overflow: fc Array cookie: ac Intra object redzone: bb ASan internal: fe Left alloca redzone: ca Right alloca redzone: cb ==21==ABORTING
```

#### Definition for a binary tree node
C++：
```C++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
```
Java：
```Java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
```

### [1. 两数之和](https://leetcode.cn/problems/two-sum/)

暴力：
```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for(int i = 0;i < nums.size();i++)
		    for(int j = i+1;j < nums.size();j++)
				if(nums[i] + nums[j] == target)
                    return {i, j};
        return {};
    }
};
```
哈希表，遍历数据，将数据nums\[i\]存入哈希表，在遍历的过程中查找”target - nums\[i\]“有没有已经存入哈希表：
```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashtable;
        for (int i = 0; i < nums.size(); ++i) {
            auto it = hashtable.find(target - nums[i]);
            if (it != hashtable.end()) return {it->second, i};
            hashtable[nums[i]] = i;
        }
        return {};
    }
};
```


### [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
```C++
class Solution {
public:
    bool isValid(string s) {
        unordered_map<char, char> pairs = {
            {')', '('},
            {']', '['},
            {'}', '{'}
        };
        stack<char> stk;
        for (char ch: s) {
            if (pairs.count(ch)) {
                if (stk.empty() || stk.top() != pairs[ch]) return false;
                stk.pop();
            }
            else stk.push(ch);
        }
        return stk.empty();
    }
};
```

### [27. 移除元素](https://leetcode.cn/problems/remove-element/)

题目描述：略

解题思路：
把元素挨个往后换就好

解答代码：
```C++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int i = 0, j;
        int ans = 0;
        for(int j = 0;j < nums.size();j++){
            if(nums[j] != val){
                nums[i] = nums[j];
                i++;
                ans++;
            }
        }
        return ans;
    }
};
```

### [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)


题目描述：略

解题思路：


解答代码：
```C++
class Solution { 
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1, ansl = nums.size(), ansr = nums.size();
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] >= target) {
                right = mid - 1;
                ansl = mid;
            } else {
                left = mid + 1;
            }
        }
        left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] > target) {
                right = mid - 1;
                ansr = mid;
            } else {
                left = mid + 1;
            }
        }
        if (ansl <= ansr-1 && ansr-1 < nums.size() && nums[ansl] == target && nums[ansr-1] == target) return vector<int>{ansl, ansr - 1};
        return vector<int>{-1, -1};
    }
};
```


### [35.搜索插入位置](https://leetcode.cn/problems/search-insert-position/description/)
#分治法

题目描述：略

思路：
要求时间复杂度为$O(log n)$，所以还是用分治法
如何处理目标值target不存在数组中要返回插入位置的情况：使用二分法不断搜索，最后没搜到，插入位置当然在最后搜索的值附进，但问题是插左边还是插右边？所以需要设置一个flag，最后一次搜索是向右搜，flag设1，最后一次向左搜，flag设0，当最后一次搜索是向右搜索的话，代表最后搜索的那个值比target要大，所以要插右边。
注意：最后向左搜的话，右边界为最后搜索值，向左搜的话，右边界为最后搜索值。
注意：插右边要在最后搜索的位置上+1，但是如何插左边的话直接返回原位置，这个问题你可以想加如这个值要比所有数组中所有数字都大的情况和比数组中所有数字都小的情况，数组起始为0，最后一位为nums.size()-1，比所有数字都小，插入位置为0，比所有数字都大，插入位置为(nums.size()-1)+1，这个问题是由于，如果target小于最后搜索值，它可以插在最后搜索值位置那里，把最后搜索值往后“挤”，假如目标值大于最后搜索值，它则要插到最后搜索值后边的位置。


题解：
```C++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size()-1;
        int mid = (l+r)/2,flag = 1;
        int ans = -1;
        while(l <= r){
            if(nums[mid] == target){
                ans = mid;
                break;
            }
            else if(nums[mid] < target){
                l = mid + 1;
                mid = (l+r)/2;
                flag = 1;
            }
            else if(nums[mid] > target){
                r = mid - 1;
                mid = (l+r)/2;
                flag = 0;
            }
        }
        if(ans != -1) return ans;
        else if(flag == 0) return r+1;
        else return l;
    }
};
```

###   [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)


```java
// 对于置换方法：
            // 遍历一遍数组，把遍历的数字换到正确的位置上
            // 用while循环而不是if是因为换过来的数也可能有对应位置
            // 注意while的最后一个判断条件，防止死循环
```





### 53. 
题解没太说到点子上，主要是，0到i-1要么提供负面作用，要么正面作用，所以可以直接加i比大小，
如果前面的累计值小于 0 了，那么就没有意义了，你就需要从当前下标开始了

### [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)
java（不同于leetcode的方法）：
```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        if(matrix == null || matrix.length == 0) return ans;
        int x,y;
        int x_min = 0,y_min = 0;
        int x_max = matrix[0].length-1,y_max = matrix.length-1;
        while(x_min <= x_max && y_min <= y_max){
            // System.out.println(x);
            // System.out.println(y);
            x = x_min;
            y = y_min;

            for(int i = x_min;i<=x_max;i++){
                ans.add(matrix[y][i]);
            }
            x = x_max;
            y_min++;
            if(y_min>y_max) break;
            
            for(int i = y_min;i<=y_max;i++){
                ans.add(matrix[i][x]);
            }
            y = y_max;
            x_max--;
            if(x_max<x_min) break;

            for(int i = x_max;i>=x_min;i--){
                ans.add(matrix[y][i]);
            }
            x = x_min;
            y_max--;
            
            if(y_max<y_min) break;

            for(int i = y_max;i>= y_min;i--){
                ans.add(matrix[i][x]);
            }
            y = y_min;
            x_min++;
            if(x_min>x_max) break;
        }
        return ans;
    }
}
```


C++：
```C++
#include<queue>
#include<iostream>

using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        
        int rowleft = 0, columnbottom = 0;
        int rowright = matrix[0].size()-1, columntop = matrix.size()-1;
        int total = matrix[0].size() * matrix.size();
        vector<int> order(total);
        int k = 0;
        
        while(k < total){
            for(int i = rowleft;i <= rowright && k < total;i++) order[k++] = matrix[columnbottom][i];
            columnbottom++;
            for(int i = columnbottom;i <= columntop && k < total;i++) order[k++] = matrix[i][rowright];
            rowright--;
            for(int i = rowright;i >= rowleft && k < total;i--) order[k++] = matrix[columntop][i];
            columntop--;
            for(int i = columntop;i >= columnbottom && k < total;i--) order[k++] = matrix[i][rowleft];
            rowleft++;
        }
        return order;
    }
};
int main() {
    Solution solution;
    vector<vector<int>> matrix = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    vector<int> result = solution.spiralOrder(matrix);
    for (int item : result) cout << item << " " ;
    cout << endl;
    return 0;
}
```


### 56. 合并区间
`if(ans.isEmpty() || ans.get(ans.size()-1)[1] < interval[0]){`中，如果更改`ans.get(ans.size()-1)[1] < interval[0]`为`interval[0] > ans.get(ans.size()-1)[1]`，就会快2ms，神奇



### [59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/)

Solution1：
```C++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n));
        int num = 1, left = 0, top = 0, right = n - 1, bottom = n - 1;
        while (left <= right && top <= bottom) {
            for (int column = left; column <= right; column++, num++) matrix[top][column] = num;
            for (int row = top + 1; row <= bottom; row++, num++) matrix[row][right] = num;
            if (left < right && top < bottom) {
                for (int column = right - 1; column > left; column--, num++) matrix[bottom][column] = num;
                for (int row = bottom; row > top; row--, num++) matrix[row][left] = num;
            }
            left++;
            right--;
            top++;
            bottom--;
        }
        return matrix;
    }
};
```
Solution2：
每次while循环后更新起点和终点。
```C++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n));
        int num = 1, left = 0, top = 0, right = n - 1, bottom = n - 1;
        while(num <= n*n){
            for (int column = left; column <= right; column++, num++) matrix[top][column] = num;
            for (int row = top + 1; row <= bottom; row++, num++) matrix[row][right] = num;      
            for (int column = right - 1; column > left; column--, num++) matrix[bottom][column] = num;   
            for (int row = bottom; row > top; row--, num++) matrix[row][left] = num;   
            left++;
            right--;
            top++;
            bottom--;
        }
        return matrix;
    }
};
```
Solution3：
每次for循环后更新起点终点，这个解法比上边那个更好些
```C++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n));
        int num = 1, left = 0, top = 0, right = n - 1, bottom = n - 1;
        while(num <= n*n){
            for (int column = left; column <= right; column++, num++) matrix[top][column] = num;
            top++;
            for (int row = top; row <= bottom; row++, num++) matrix[row][right] = num;
            right--;      
            for (int column = right; column >= left; column--, num++) matrix[bottom][column] = num; 
            bottom--;  
            for (int row = bottom; row >= top; row--, num++) matrix[row][left] = num;   
            left++;
        }
        return matrix;
    }
};
```
### [69.x的平方根](https://leetcode.cn/problems/sqrtx/description/)
#分治法 

题目描述：略

解题思路：
假如“(mid\*mid)<=x && ((mid+1)\*(mid+1))>x”，则mid就是答案

解答代码：
```C++
class Solution {
public:
    int mySqrt(int x) {
        long long l=0,r = x;
        // 不用longlong，有的样例会造成int的溢出
        long long mid = (l+r)/2;
        while(l < r){
            if((mid*mid)<=x && ((mid+1)*(mid+1))>x){
                break;
            }
            else if(mid*mid<x){
                l = mid+1;
                mid = (l+r)/2;
            }
            else{
                r = mid-1;
                mid = (l+r)/2;
            }
        }
        return mid;
    }
};
```
### [77. 组合](https://leetcode.cn/problems/combinations/)

递归解法：
```Java
class Solution {
    List<Integer> temp = new ArrayList<Integer>();
    List<List<Integer>> ans = new ArrayList<List<Integer>>();

    public List<List<Integer>> combine(int n, int k) {
        dfs(1, n, k);
        return ans;
    }

    public void dfs(int cur, int n, int k) {
        // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
        if (temp.size() + (n - cur + 1) < k)  return;

        // 记录合法的答案
        if (temp.size() == k) {
            ans.add(new ArrayList<Integer>(temp));
            return;
        }
        // 考虑选择当前位置
        temp.add(cur);
        dfs(cur + 1, n, k);
        temp.remove(temp.size() - 1);
        // 考虑不选择当前位置
        dfs(cur + 1, n, k);
    }
}
```

非递归解法：
假设 `n=4`，`k=2`，我们可以按以下步骤生成组合：
- 初始组合 `[1, 2]`
- 增加 `2` 得到 `[1, 3]`
- 增加 `3` 得到 `[1, 4]`
- 无法再增加 `4`，因此回到 `1` 并增加它，然后得到 `[2, 3]`
- 继续增加 `3` 得到 `[2, 4]`
- 继续增加 `2` 并增加它得到 `[3, 4]`
- 最后无法再增大组合，结束。
```Java
public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        if (k == 0 || n < k) return result;
        int[] combination = new int[k]; // combination数组用于存储当前的组合
        for (int i = 0; i < k; i++) combination[i] = i + 1;

        while (combination[k - 1] <= n) {
            // 将当前组合添加到结果集中
            List<Integer> currentCombination = new ArrayList<>();
            for (int i = 0; i < k; i++) currentCombination.add(combination[i]);
            result.add(currentCombination);

            // 生成下一个组合
            int t = k - 1;
            while (t >= 0 && combination[t] == n - k + t + 1) t--;

            if (t >= 0) {
                combination[t]++;
                for (int i = t + 1; i < k; i++) 
                    combination[i] = combination[i - 1] + 1;
            } else break; // 如果无法再生成组合，退出循环
        }
        return result;
    }
}
```
### [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
```
解法1，一般递归：
```Java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        preorder(root, res);
        return res;
    }

    public void preorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        preorder(root.left, res);
        res.add(root.val);
        preorder(root.right, res);
    }
}
```
解法2，设置一个栈进行迭代：
```Java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        Deque<TreeNode> stk = new LinkedList<TreeNode>();
        while (root != null || !stk.isEmpty()) {
            while (root != null) {
                stk.push(root);
                root = root.left;
            }
            root = stk.pop();
            res.add(root.val);
            root = root.right;
        }
        return res;
    }
}
```
### [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

```Java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    public boolean isValidBST(TreeNode node, long lower, long upper) {
        if (node == null) return true;
        if (node.val <= lower || node.val >= upper) return false;
        return isValidBST(node.left, lower, node.val) && isValidBST(node.right, node.val, upper);
    }
}
```



### [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

递归：
```Java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root, root);
    }
    public boolean check(TreeNode p, TreeNode q) {
        if (p == null && q == null) 
	        return true;
        if (p == null || q == null) 
	        return false;
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
    }
}
```
迭代：
```Java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root, root);
    }

    public boolean check(TreeNode u, TreeNode v) {
        Queue<TreeNode> q = new LinkedList<TreeNode>();
        q.offer(u);
        q.offer(v);
        while (!q.isEmpty()) {
            u = q.poll();
            v = q.poll();
            if (u == null && v == null) {
                continue;
            }
            if ((u == null || v == null) || (u.val != v.val)) {
                return false;
            }

            q.offer(u.left);
            q.offer(v.right);

            q.offer(u.right);
            q.offer(v.left);
        }
        return true;
    }
}
```
### [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
```

解法1，广度优先搜索，把节点不断加入队列，：
```Java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ret = new ArrayList<List<Integer>>();
        if (root == null) return ret;
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<Integer>();
            int currentLevelSize = queue.size();
            for (int i = 1; i <= currentLevelSize; ++i) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            ret.add(level);
        }
        return ret;
    }
}
```
### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

深度优先搜索，递归搜索：
```Java
class Solution {
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        int leftHeight = maxDepth(root.left);
        int rightHeight = maxDepth(root.right);
        return Math.max(leftHeight, rightHeight)+1;
    }
}
```
广度优先搜索，一层一层地把节点放入队列中，然后把上一层的节点出列，每放入一层则答案加一：
```Java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        int ans = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size > 0) {
                TreeNode node = queue.poll();
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
                size--;
            }
            ans++;
        }
        return ans;
    }
}
```

### [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)


递归判断，用一个函数来获取左右子树的高度，如果两树高度差不超过1且左右子树平衡则为平衡二叉树：
```Java
class Solution {
    public boolean isBalanced(TreeNode root) {
       if (root == null) return true;
       else return Math.abs(height(root.left) - height(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
    }
    public int height(TreeNode root) {
        if (root == null) return 0;
        else return Math.max(height(root.left), height(root.right)) + 1;
    }
}
```


### [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

广度优先搜索：
```Java
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null && root.right == null) return 1;
        int min_depth = Integer.MAX_VALUE;
        if (root.left != null) min_depth = Math.min(minDepth(root.left), min_depth);
        if (root.right != null) min_depth = Math.min(minDepth(root.right), min_depth);
        return min_depth + 1;
    }
}
```

### [138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/)

```java
class Solution {
    // 弄一个map,做节点映射
    Map<Node, Node> cacheNode = new HashMap<Node, Node>();

    public Node copyRandomList(Node head) {
        // 如果头节点是空的，则返回空
        if(head == null){
            return null;
        }
        // 如果头节点不是空的
        // 如果map中不包含头节点（第一次肯定不包含啊
        if(!cacheNode.containsKey(head)){
            // 新建一个节点，这个节点其实就是新建链表中的节点
            Node headNew = new Node(head.val);
            // 将这个新节点与原节点成对放入map中
            cacheNode.put(head, headNew);
            // 接着处理下一个，相当于递归
            headNew.next = copyRandomList(head.next);
            // 接着处理随机指向的那个节点，没有创建就新建，如果以及创建了就不进行操作
            headNew.random = copyRandomList(head.random);

            // 这部分因为是递归进行的，不断处理链表中的下一个以及随机指针指向的那个，所以会一直处理，直至遍历完成
            // 你可能回想一种情况，某个节点的下一个节点因为随机指针的缘故已经被创建了，这个节点随机指针指向的节点也已经被创建了，那么这个遍历不就在这里停止了么？
            // 确实在这里就停止了，但是，在“某个节点的下一个节点因为随机指针的缘故已经被创建了”的时候，对于“某个节点的下一个节点”又产生了新的遍历链条
        }
        return cacheNode.get(head);
    }
}
```
### [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

```C++
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        unordered_set<ListNode *> visited;
        while (head != nullptr) {
            if (visited.count(head)) return head;
            visited.insert(head);
            head = head->next;
        }
        return nullptr;
    }
};
```
### [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
```

解法1，一般递归：
```Java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        preorder(root, res);
        return res;
    }

    public void preorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        res.add(root.val);
        preorder(root.left, res);
        preorder(root.right, res);
    }
}
```
解法2，设置一个栈进行迭代：
```Java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) {
            return res;
        }

        Deque<TreeNode> stack = new LinkedList<TreeNode>();
        TreeNode node = root;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
	            // node不为空就是遍历到了一个新节点，将这个节点入栈，因为是前序遍历，开始先尝试遍历左节点
                res.add(node.val);
                stack.push(node);
                node = node.left;
            }
            // 此时node == null，为什么node == null？因为node向左遍历到头了，一条路走到头了，要返回去遍历右边的节点，node遍历到头了就把这个node出栈，“返回去”就是遍历右节点
            node = stack.pop();
            node = node.right;
        }
        return res;
    }
}
```

### [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
```
一般递归的解法：
```Java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        postorder(root, res);
        return res;
    }

    public void postorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        postorder(root.left, res);
        postorder(root.right, res);
        res.add(root.val);
    }
}
```

迭代法：
```Java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) return res;
        Deque<TreeNode> stack = new LinkedList<TreeNode>();
        TreeNode prev = null;
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            if (root.right == null || root.right == prev) {
                res.add(root.val);
                prev = root;
                root = null;
            } else {
                stack.push(root);
                root = root.right;
            }
        }
        return res;
    }
}

```
### [150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)

```C++
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> stk;
        for (int i = 0; i < tokens.size(); i++) {
            string& token = tokens[i];
            if (!(token == "+" || token == "-" || token == "*" || token == "/"))
                stk.push(atoi(token.c_str()));
            else {
                int num2 = stk.top();
                stk.pop();
                int num1 = stk.top();
                stk.pop();
                switch (token[0]) {
                    case '+':
                        stk.push(num1 + num2);
                        break;
                    case '-':
                        stk.push(num1 - num2);
                        break;
                    case '*':
                        stk.push(num1 * num2);
                        break;
                    case '/':
                        stk.push(num1 / num2);
                        break;
                }
            }
        }
        return stk.top();
    }
};
```

### [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)
可以直接使用现成的字符串分割split库函数，通过空白字符分割单词然后倒序相加。
将整个字符串反转，然后挨个翻转每个单词，空间复杂度位O（1）
```C++
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());// 反转整个字符串
        int idx = 0;
        for (int start = 0; start < s.size(); ++start) {
            if (s[start] != ' ') {
                if (idx != 0) s[idx++] = ' ';// 填一个空白字符然后将idx移动到下一个单词的开头位置
                int end = start;// 循环遍历至单词的末尾
                while (end < s.size() && s[end] != ' ') s[idx++] = s[end++];
                reverse(s.begin() + idx - (end - start), s.begin() + idx);// 反转整个单词
                start = end;// 更新start，去找下一个单词
            }
        }
        s.erase(s.begin() + idx, s.end());
        return s;
    }
};
```

### [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)
深度优先搜索，从二维网格的左上角开始扫描，扫描到1则视为扫描到一个岛屿，将和这个1相连的所有1置为0，然后接着扫描：
```java
class Solution {
    void dfs(char[][] grid, int r, int c) {
        int nr = grid.length;
        int nc = grid[0].length;
        if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == '0') return;

        grid[r][c] = '0';
        dfs(grid, r - 1, c);
        dfs(grid, r + 1, c);
        dfs(grid, r, c - 1);
        dfs(grid, r, c + 1);
    }

    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int nr = grid.length;
        int nc = grid[0].length;
        int num_islands = 0;
        for (int r = 0; r < nr; ++r) {
            for (int c = 0; c < nc; ++c) {
                if (grid[r][c] == '1') {
                    ++num_islands;
                    dfs(grid, r, c);
                }
            }
        }
        return num_islands;
    }
}
```
广度优先搜索，如果一个位置为 1，则视为搜索到一个岛屿，则将其加入队列，开始进行广度优先搜索，每个搜索到的 1 都会被重新标记为 0：
```java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int nr = grid.length;
        int nc = grid[0].length;
        int num_islands = 0;

        for (int r = 0; r < nr; ++r) {
            for (int c = 0; c < nc; ++c) {
                if (grid[r][c] == '1') {
                    ++num_islands;
                    grid[r][c] = '0';
                    Queue<Integer> neighbors = new LinkedList<>();
                    neighbors.add(r * nc + c);
                    while (!neighbors.isEmpty()) {
                        int id = neighbors.remove();
                        int row = id / nc;
                        int col = id % nc;
                        if (row - 1 >= 0 && grid[row-1][col] == '1') {
                            neighbors.add((row-1) * nc + col);
                            grid[row-1][col] = '0';
                        }
                        if (row + 1 < nr && grid[row+1][col] == '1') {
                            neighbors.add((row+1) * nc + col);
                            grid[row+1][col] = '0';
                        }
                        if (col - 1 >= 0 && grid[row][col-1] == '1') {
                            neighbors.add(row * nc + col-1);
                            grid[row][col-1] = '0';
                        }
                        if (col + 1 < nc && grid[row][col+1] == '1') {
                            neighbors.add(row * nc + col+1);
                            grid[row][col+1] = '0';
                        }
                    }
                }
            }
        }
        return num_islands;
    }
}
```

并查集，count是1的数量，遍历二维数组，把相邻的1进行合并成为一个岛屿，每合并一次count就减一，图遍历过后，count就是岛屿数量：
```java
class Solution {
    class UnionFind {
        int count;
        int[] parent;
        int[] rank;

        public UnionFind(char[][] grid) {
        // 初始化图的函数
            count = 0;
            int m = grid.length;
            int n = grid[0].length;
            parent = new int[m * n];
            rank = new int[m * n];
            for (int i = 0; i < m; ++i) {
                for (int j = 0; j < n; ++j) {
                    if (grid[i][j] == '1') {
                        parent[i * n + j] = i * n + j;
                        ++count;
                    }
                    rank[i * n + j] = 0;
                }
            }
        }

        public int find(int i) {
        // 查他们是不是连在一起的岛屿（寻找i的根节点，实现路径压缩）
            if (parent[i] != i) parent[i] = find(parent[i]);
            return parent[i];
        }

        public void union(int x, int y) {
        // 将两个元素所属的集合合并
            int rootx = find(x);
            int rooty = find(y);
            if (rootx != rooty) {
                if (rank[rootx] > rank[rooty]) parent[rooty] = rootx;
                } else if (rank[rootx] < rank[rooty]) parent[rootx] = rooty;
                } else {
                    parent[rooty] = rootx;
                    rank[rootx] += 1;
                }
                --count;
            }
        }

        public int getCount() {
            return count;
        }
    }

    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int nr = grid.length;
        int nc = grid[0].length;
        int num_islands = 0;
        UnionFind uf = new UnionFind(grid);
        for (int r = 0; r < nr; ++r) {
            for (int c = 0; c < nc; ++c) {
                if (grid[r][c] == '1') {
                    grid[r][c] = '0';
                    if (r - 1 >= 0 && grid[r-1][c] == '1')
                        uf.union(r * nc + c, (r-1) * nc + c);
                    if (r + 1 < nr && grid[r+1][c] == '1')
                        uf.union(r * nc + c, (r+1) * nc + c);
                    if (c - 1 >= 0 && grid[r][c-1] == '1')
                        uf.union(r * nc + c, r * nc + c - 1);
                    if (c + 1 < nc && grid[r][c+1] == '1')
                        uf.union(r * nc + c, r * nc + c + 1);
                }
            }
        }
        return uf.getCount();
    }
}
```


### [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* ans = nullptr;
        while(head){
            ListNode* temp = head->next;
            head->next = ans;
            ans = head;
            head = temp;
        }
        return ans;
    }
};
```

### [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

递归解法：
```Java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}
```

### [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

solution1：
使用优先队列（堆），要注意的是，堆顶的最大值可能已不在滑动窗口中，已被滑过，所以要为每个放入堆的值加一个下标来判断其是否在滑动窗口中
时间复杂度：O(nlogn)；空间复杂度：O(n)
```C++
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        priority_queue<pair<int, int>> q; // 创建一个优先队列，存储元素值和索引的对
        for (int i = 0; i < k; ++i) q.emplace(nums[i], i); // 初始化前 k 个元素到队列
        vector<int> ans = {q.top().first}; // 记录第一个窗口的最大值
        for (int i = k; i < nums.size(); ++i) { // 遍历剩余的元素
            q.emplace(nums[i], i); // 将当前元素加入队列
            while (q.top().second <= i - k) q.pop(); // 移除队列中不在当前窗口的元素
            ans.push_back(q.top().first); // 记录当前窗口的最大值
        }
        return ans; // 返回结果
    }
};

```


solution2：
创建一个双端队列deque，遍历数组，如果如果队列头部的元素不在当前滑动窗口内则将其移除，从队尾开始移除所有比当前元素`nums[i]` 小的元素的索引，将当前元素的索引 `i` 加入队列，当滑动窗口覆盖足够的元素（即 `i >= k - 1`），队列头部元素对应的值即当前窗口的最大值，注意队列维护的是滑动窗口中元素的索引。
时间复杂度：O(n)；空间复杂度：O(k)
```C++
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> deq;  // 双端队列，用来存储元素的索引
        vector<int> result;  // 结果数组
        for (int i = 0; i < nums.size(); ++i){
            if (!deq.empty() && deq.front() == i - k) deq.pop_front();
            while (!deq.empty() && nums[deq.back()] < nums[i]) deq.pop_back();
            deq.push_back(i);
            if (i >= k - 1) result.push_back(nums[deq.front()]);
        }
        return result;
    }
};
```

solution3：
按照 k 个一组进行分组，最后一组中元素的数量可能会不足 k 个，如果 i 是 k 的倍数，那么 nums[i] 到 nums[i+k−1] 恰好是一个分组。我们只要预处理出每个分组中的最大值，即可得到答案，如果 i 不是 k 的倍数，那么 nums[i] 到 nums[i+k−1] 会跨越两个分组，占有第一个分组的后缀以及第二个分组的前缀。假设 j 是 k 的倍数，并且满足 i<j≤i+k−1，那么 nums[i] 到 nums[j−1] 就是第一个分组的后缀，nums[j] 到 nums[i+k−1] 就是第二个分组的前缀。如果我们能够预处理出每个分组中的前缀最大值以及后缀最大值，同样可以在 O(1) 的时间得到答案。
时间复杂度：O(n)；空间复杂度：O(n)
```C++
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> prefixMax(n), suffixMax(n);
        for (int i = 0; i < n; ++i) {
            if (i % k == 0) prefixMax[i] = nums[i];
            else prefixMax[i] = max(prefixMax[i - 1], nums[i]);
        }
        for (int i = n - 1; i >= 0; --i) {
            if (i == n - 1 || (i + 1) % k == 0) suffixMax[i] = nums[i];
            else suffixMax[i] = max(suffixMax[i + 1], nums[i]);
        }
        vector<int> ans;
        for (int i = 0; i <= n - k; ++i)
            ans.push_back(max(suffixMax[i], prefixMax[i + k - 1]));
        return ans;
    }
};
```




### [242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)
给定两个字符串 `s` 和 `t` ，编写一个函数来判断 `t` 是否是 `s` 的 字母异位词——字母异位词是通过重新排列不同单词或短语的字母而形成的单词或短语，并使用所有原字母一次。

排序法：
```C++
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};
```
哈希表：
```C++
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) 
	        return false;
        vector<int> table(26, 0);
        for (auto& ch: s) 
	        table[ch - 'a']++;
        for (auto& ch: t) {
            table[ch - 'a']--;
            if (table[ch - 'a'] < 0) 
	            return false;
        }
        return true;
    }
};
```
### [257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)

用深度优先搜索来搜素树，如果碰到一个叶子节点，则获得一条以这个叶子节点为末尾的路径，通过没有左右子节点来判断叶子节点：
```Java
class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<String>();
        constructPaths(root, "", paths);
        return paths;
    }

    public void constructPaths(TreeNode root, String path, List<String> paths) {
        if (root != null) {
            StringBuffer pathSB = new StringBuffer(path);
            pathSB.append(Integer.toString(root.val));
            if (root.left == null && root.right == null) paths.add(pathSB.toString());
            else {
                pathSB.append("->");  // 当前节点不是叶子节点，继续递归遍历
                constructPaths(root.left, pathSB.toString(), paths);
                constructPaths(root.right, pathSB.toString(), paths);
            }
        }
    }
}
```
### 281. 寻找重复数
必须是do-while，而不是while-do，因为开始f、s都是nums[0]
### [283. 移动零](https://leetcode.cn/problems/move-zeroes/)

题目描述：略

解题思路：
用双指针，前边的指针前边的数是不为零的，后边的指针在后边探索零，探索到就交换，两个指针中间夹的都是零。

解答代码：
```C++
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int i = 0, j,flag;
        for(int j = 0;j < nums.size();j++){
            if(nums[j] != 0){
                flag = nums[i];
                nums[i] = nums[j];
                nums[j] = flag;
                //注意，这里要交换不要直接赋零，这样当数组只有一个元素的的时候，不会被覆盖掉。
                i++;
            }
        }
    }
};

```
### [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)
方法一：
遍历整个数组，并使用哈希表记录每个数字出现的次数，并形成一个「出现次数数组」，如果直接为这个「出现次数数组」排序寻找前k个高频元素，算法复杂度为O(NlogN)。
为了降低算法复杂度，形成「出现次数数组」后，建一个小顶堆，如果堆的元素个数小于 k，就可以直接插入堆中，如果堆的元素个数等于 k，则检查堆顶与当前出现次数的大小。如果堆顶更大，说明至少有 k 个数字的出现次数比当前值大，故舍弃当前值；否则，就弹出堆顶，并将当前值插入堆中。
时间复杂度：O(Nlogk)；空间复杂度：O(N)
```C++
class Solution {
public:
    static bool cmp(pair<int, int>& m, pair<int, int>& n) {
        return m.second > n.second; // 定义比较函数，用于优先队列排序
    }
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> occurrences; // 使用哈希表统计每个元素出现的次数
        for (auto& v : nums) occurrences[v]++;
        // 使用自定义比较函数创建优先队列，最小堆，pair 的第一个元素代表数组的值，第二个元素代表了该值出现的次数
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(&cmp)> q(cmp);
        for (auto& [num, count] : occurrences) {// 遍历哈希表，将元素及其频率插入优先队列中
            if (q.size() == k) {
                if (q.top().second < count) {// 如果堆已满且当前元素的频率大于堆顶元素的频率
                    q.pop();// 移除堆顶元素
                    q.emplace(num, count);// 插入当前元素
                }
            } else q.emplace(num, count);// 堆不满，直接插入元素
        }
        vector<int> ret;
        while (!q.empty()) {// 取出优先队列中的元素，形成结果
            ret.emplace_back(q.top().first);
            q.pop();
        }
        return ret;
    }
};
```


### [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)


查找一个数组中每个元素是否在另一个数组中，这样时间复杂度位O（mn），可以先将两个数组存到set中降低时间复杂度，变为O（m+n）：
```C++
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> set1, set2;
        for (auto& num : nums1) set1.insert(num);
        for (auto& num : nums2) set2.insert(num);
        return getIntersection(set1, set2);
    }
    vector<int> getIntersection(unordered_set<int>& set1, unordered_set<int>& set2) {
        if (set1.size() > set2.size()) return getIntersection(set2, set1);
        vector<int> intersection;
        for (auto& num : set1) 
            if (set2.count(num)) 
                intersection.push_back(num);
        return intersection;
    }
};
```


### [367. 有效的完全平方数](https://leetcode.cn/problems/valid-perfect-square/)


题目描述：略

解题思路：
能找到符合“(mid\*mid) == num”条件的数即可，找不到则返回0。

解答代码：
```C++
class Solution {
public:
    bool isPerfectSquare(int num) {
        long long l=0,r = num;
        long long mid = (l+r)/2;
        while(l <= r){
            if((mid*mid) == num) return 1;
            else if(mid*mid < num){
                l = mid+1;
                mid = (l+r)/2;
            }
            else{
                r = mid-1;
                mid = (l+r)/2;
            }
        }
        return false;
    }
};

```
### [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)

- root 为空，代表未搜索到值为 key 的节点，返回空。
- root.val>key，表示值为 key 的节点可能存在于 root 的左子树中，需要递归地在 root.left 调用 deleteNode，并返回 root。
- root.val<key，表示值为 key 的节点可能存在于 root 的右子树中，需要递归地在 root.right 调用 deleteNode，并返回 root。
- root.val=key，root 即为要删除的节点。此时要做的是删除 root，并将它的子树合并成一棵子树，保持有序性，并返回根节点。根据 root 的子树情况分成以下情况讨论：
	- root 为叶子节点，没有子树。此时可以直接将它删除，即返回空。
	- root 只有左子树，没有右子树。此时可以将它的左子树作为新的子树，返回它的左子节点。
	- root 只有右子树，没有左子树。此时可以将它的右子树作为新的子树，返回它的右子节点。
	 - root 有左右子树，root的所有左子树节点都小于root，所有右子树节点都大于root，所以将root右孩子（root右子树的根节点）顶替原来root的位置，而root左子树作为root右子树中值最小节点的子树（root右子树中值最小的节点根据二叉搜索树的性质，就是最左边的节点）。

```Java
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (root.val > key) {
            root.left = deleteNode(root.left, key);
            return root;
        }
        if (root.val < key) {
            root.right = deleteNode(root.right, key);
            return root;
        }
        if (root.val == key) {
            if (root.left == null && root.right == null) return null;
            if (root.right == null) return root.left;
            if (root.left == null) return root.right;
            TreeNode successor = root.right;
            while (successor.left != null) successor = successor.left;
            root.right = deleteNode(root.right, successor.val);
            successor.right = root.right;
            successor.left = root.left;
            return successor;
            }
        return root;
    }
}
```

### [459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)

暴力枚举法，取字符串中前1...n-1个长度的一个个判断是不是重复子字符串：
```C++
class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        for (int i = 1; i * 2 <= s.size(); ++i) {
            if (s.size() % i == 0) {
                bool match = true;
                for (int j = i; j < s.size(); ++j) {
                    if (s[j] != s[j - i]) {
                        match = false;
                        break;
                    }
                }
                if (match) return true;
            }
        }
        return false;
    }
};
```
使用kmp，在字符串后拼接其自身，如果能在这个拼接的新字符串中找到原字符串，则该字符串为重复的子字符串，且重复部分为：在这个拼接的新字符串中找到原字符串的前面部分
例子1：s = "abcabc"，则s + s = "abcabcabcabc"，可以在s+s中找到从位置3开始的原s，s+s中位置3之前的部分为重复的子字符串
例子2：s = "abcd"，则s + s = "abcdabcd"，在s+s中找不到原s，则s不是由重复的子字符串构成
```C++
// 利用find：find可以找出要被寻找的字符串的开头位置，如果最后找不到，则返回 被搜索字符串-原字符串长度，在本题中，在s+s字符串中搜索s，如果都搜索到s长度的位置都搜索不到就肯定搜索不到了，因为字符串长度都不够，则返回s的长度；find的第二个参数为搜索位置，注意要跳过第一个字符，所以所以从1开始搜索（计算机世界中位置从0开始）
class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        return (s + s).find(s, 1) != s.size();
    }
};
//自己实现kmp算法来搜索s+s中的s
class Solution {
public:
    bool kmp(const string& query, const string& pattern) {
        int n = query.size();
        int m = pattern.size();
        vector<int> fail(m, -1);
        for (int i = 1; i < m; ++i) {
            int j = fail[i - 1];
            while (j != -1 && pattern[j + 1] != pattern[i]) {
                j = fail[j];
            }
            if (pattern[j + 1] == pattern[i]) {
                fail[i] = j + 1;
            }
        }
        int match = -1;
        for (int i = 1; i < n - 1; ++i) {
            while (match != -1 && pattern[match + 1] != query[i]) {
                match = fail[match];
            }
            if (pattern[match + 1] == query[i]) {
                ++match;
                if (match == m - 1) {
                    return true;
                }
            }
        }
        return false;
    }

    bool repeatedSubstringPattern(string s) {
        return kmp(s + s, s);
    }
};
```

### 560. 和为 K 的子数组
这个子数组指连续的子数组


### [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)


```Java
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null) return null;
        if (val == root.val) return root;
        return searchBST(val < root.val ? root.left : root.right, val);
    }
}
```
### [704. 二分查找](https://leetcode.cn/problems/binary-search/)
#分治法 

题目描述：略

思路：
通过二分来在数组中查找目标值。
找注意区间问题，举例：当你的区间是左闭右开，当目标值traget比数组下标中间值mid值小，在条件语句中已经进行过比较，所以数组下标右边界值r要-1。


题解
```C++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size()-1;
        int mid = (l+r)/2, ans = -1;
        while(l <= r){
            if(target == nums[mid]){ 
                ans = mid;
                return ans;
            }
            else if(target > nums[mid]){
                l = mid+1;
                mid = (l+r)/2;
            }
            else if(target < nums[mid]){
                r = mid-1;
                mid = (l+r)/2;
            }
        }
        return ans;
    }
};

```
### [707. 设计链表](https://leetcode.cn/problems/design-linked-list/)

知识点：
1. ListNode：是用于表示链表节点的基本数据结构。在链表中，每个节点包含两个主要部分：存储数据的值（通常是一个整数或其他类型的数据，val）和指向下一个节点的指针（next）。通常，`ListNode` 类的定义如下：
```C++
class ListNode {
public:
    int val;        // 数据域，存储节点的值
    ListNode *next; // 指针域，指向下一个节点

    // 构造函数，初始化节点的值和指针
    ListNode(int x) : val(x), next(nullptr) {}
};
```
2. 虚拟头节点（dummy head node），也称为哑节点，是在链表数据结构中引入的一个辅助节点。这个节点通常不存储实际的数据，仅用于简化链表的操作。它的主要作用是简化链表的边界情况处理，在没有虚拟头节点的情况下，插入和删除操作需要特殊处理头节点（即链表的第一个节点），因为头节点的前驱节点是不存在的。这会使代码变得复杂。而引入虚拟头节点后，所有节点（包括原来的头节点）都有前驱节点，这样可以统一处理所有节点的插入和删除操作。并且使用虚拟头节点后，不需要在每次插入或删除时检查是否在处理头节点。这样可以减少代码中的条件判断，使逻辑更加清晰和简单。



```C++
class MyLinkedList {
private:
    int size;
    ListNode *head;
public:
    MyLinkedList() {
        this->size = 0;
        this->head = new ListNode(0);
    }
    
    int get(int index) {
        if (index < 0 || index >= size) return -1;
        ListNode *cur = head;
        for (int i = 0; i <= index; i++) cur = cur->next;
        return cur->val;
    }
    
    void addAtHead(int val) {
        addAtIndex(0, val);
    }
    
    void addAtTail(int val) {
        addAtIndex(size, val);
    }
    
    void addAtIndex(int index, int val) {
        if (index > size) return;
        index = max(0, index);
        size++;
        ListNode *pred = head;
        for (int i = 0; i < index; i++) pred = pred->next;
        ListNode *toAdd = new ListNode(val);
        toAdd->next = pred->next;
        pred->next = toAdd;
    }
    
    void deleteAtIndex(int index) {
        if (index < 0 || index >= size) return;
        size--;
        ListNode *pred = head;
        for (int i = 0; i < index; i++) pred = pred->next;
        ListNode *p = pred->next;
        pred->next = pred->next->next;
        delete p;
    }
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList* obj = new MyLinkedList();
 * int param_1 = obj->get(index);
 * obj->addAtHead(val);
 * obj->addAtTail(val);
 * obj->addAtIndex(index,val);
 * obj->deleteAtIndex(index);
 */
```

### 739. 每日温度
// 题目是对每一个温度，获得下一个更高温度在第几天之后，即获得一个长度和给定的温度数组相同的数字数组
// 题目要找下一个温度更高的日期，说明前面的都是连续下降的，并且对于所谓“温度更高的一天”的前一天的答案数组应该存1，前二天应该存2，是一个倒序，所以应该用到栈
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // 获得温度数组的长度
        // 获得一个温度数组长度的ans数组
        int length = temperatures.length;
        int[] ans = new int [length];

        // 获得一个存数字的stack栈，栈里边存的是第几天
        Deque<Integer> stack = new LinkedList<Integer>();
        // 遍历temperature
        for(int i = 0;i <  length;i++){
            // 获得第i个温度
            int temperature = temperatures[i];
            // 如果栈不是空的，且当前温度大于栈顶的第i天，即终于终止了温度下降，从开始下降的第i天开始，不断地写入答案
            while(!stack.isEmpty() && temperature > temperatures[stack.peek()]){
                // 弹出栈顶元素，捕获这个栈顶元素
                int preIndex = stack.pop();
                // 当前天数减去这个栈顶元素即为栈顶的日期对应的答案
                ans[preIndex] = i - preIndex;
            }
            // 开始存放一个新的温度下降的日期
            stack.push(i);
        }
    return ans;
    }
}

## 未归类问题

### m个苹果分给n个人，每个人可以分0-m个苹果，求出所以分配方案

这是一个典型的组合数学问题，可以通过 **"带约束的组合问题"** 来解决。

**问题**：有 ( m ) 个苹果，分给 ( n ) 个人，每个人可以得到从 0 到 ( m ) 个苹果，要求求出所有分配方案的数量。

解法
这是一个 **重复组合** 问题，也可以理解为 **求解方程的解法**。我们可以使用 **星与棒**（Stars and Bars）定理来解决。

星与棒定理
星与棒定理告诉我们，若我们有 ( m ) 个相同的物品（苹果）要分配给 ( n ) 个人（每个人可以得到 0 个到 ( m ) 个苹果），则分配方案的数量为：  
C(m + n - 1, n - 1)  
其中，( C(a, b) ) 表示从 ( a ) 个元素中选择 ( b ) 个元素的组合数（即组合公式：( C(a, b) = \frac{a!}{b!(a-b)!} )）。

解释：
- **星**：表示苹果。
- **棒**：表示分隔不同人的“分界线”。

例如，分配 3 个苹果给 2 个人的方案可以表示为：
```
***|  (表示第一个人得到 3 个苹果，第二个人得到 0 个苹果)
**|*   (表示第一个人得到 2 个苹果，第二个人得到 1 个苹果)
*|**   (表示第一个人得到 1 个苹果，第二个人得到 2 个苹果)
|***   (表示第一个人得到 0 个苹果，第二个人得到 3 个苹果)
```
有 4 种方案，因此，组合数 ( C(3+2-1, 2-1) = C(4, 1) = 4 )。

总结
所以，分配 ( m ) 个苹果给 ( n ) 个人的方案数是：  C(m + n - 1, n - 1)  

### N行日志，每行两个正整数，分别是登入时间和登出时间，单位是秒，求一天中的峰值人数和时间，并分析复杂度

通过**时间轴扫描法**解决，步骤如下：
- **拆分时间点**：把所有登录时间标记为 “+1”（人数增加），退出时间标记为 “-1”（人数减少）。
- **排序时间点**：将所有标记后的时间点按**时间先后排序**（若时间相同，先处理 “-1” 再处理 “+1”，避免退出和登录同时发生时统计错误）。
- **扫描统计**：按排序后的时间点依次遍历，累加人数变化值，同时记录**最大人数（峰值人数）**以及对应的**时间区间**。

**复杂度分析**：
- 假设日志有 N 行，拆分后得到 2N 个时间点。
- **排序阶段**：时间复杂度为O(NlogN)（排序 2N 个元素的复杂度等价于O(NlogN)）。
- **扫描阶段**：时间复杂度为O(N)。
- 整体时间复杂度为 **O(NlogN)**。
### 两个有序链表如何查找公共部分

因为两个链表是有序的，所以可以用**双指针法**遍历，步骤如下：
- 定义两个指针 `p1`、`p2`，分别指向两个链表的头节点。
- 比较 `p1` 和 `p2` 指向节点的值：
    - 若 `p1.val < p2.val`：`p1` 后移（因为链表有序，当前 `p1` 不可能是公共元素）。
    - 若 `p1.val > p2.val`：`p2` 后移。
    - 若 `p1.val == p2.val`：这是公共元素，记录下来；然后 `p1` 和 `p2` 同时后移（继续找下一个公共元素）。
- 当其中一个指针遍历完链表时，结束流程。

**时间复杂度**：假设两个链表的长度分别为 `m` 和 `n`，双指针最多遍历 `m + n` 个节点，所以时间复杂度是 **O(m+n)**，空间复杂度是O(1)（仅用了两个指针）。




## 其它
# END