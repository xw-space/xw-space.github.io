---
icon: pen-to-square
date: 2025-10-01
category:
  - 计科基础
  - 计算机网络
tag:
  - default
---



学习Linux如何使用
<!-- more -->


# Linux



### 开发环境实战能力

* 资源瓶颈排查： 熟练使用 `top` 查看 CPU 和内存负载，`free -h` 检查可用物理内存，`df -h` 检查磁盘使用率。
* Java 进程深度定位： 遇到 CPU 飙升，通过 `top` 找到进程，再用 `top -Hp <pid>` 找到具体的消耗线程，将线程 ID 转为 16 进制后，配合 `jstack` 定位到具体的 Java 代码行。
* 网络状态诊断： `netstat -tunlp` 或 `ss -tunlp` 查看端口占用情况，`ping` 和 `telnet` 测试网络连通性，`curl` 模拟 HTTP 请求测试接口响应。
* 日志分析提取： `tail -f` 实时追踪日志，`grep` 配合正则表达式过滤异常栈（如 `grep -A 10 "Exception" error.log`）。进阶需掌握 `awk` 和 `sed` 对日志内容进行分列提取或统计。

## 用户相关
修改用户密码
- 输入命令`whoami`（一个整体，没有空格）
- 输入命令passwd
- 管理员可直接修改普通用户密码：passwd 用户名



## 关机与重启
- 按下 `Ctrl + Alt + Delete` 来尝试重启

**立即关机**：sudo shutdown now
**延时关机**（例如1分钟后关机）：sudo shutdown +1
**指定具体时间关机**（例如晚上11点关机）：sudo shutdown 23:00
**立刻关机并关闭电源，`-h` 表示 halt，命令立即关机并关闭电源。**：sudo shutdown -h now
立刻关闭系统：sudo poweroff
停止系统的所有进程并关闭计算机，但不一定会切断电源：sudo halt
立刻重启系统：sudo reboot
使用 `shutdown` 命令来重启系统，`-r` 选项表示重启，`now` 表示立即重启：sudo shutdown -r now

## 文件夹说明

- `/`：`/` 是文件系统的根目录，所有文件和目录都位于此目录下。它是整个文件系统的起点，包含其他系统目录，比如 `/bin`, `/home`, `/etc`, `/usr` 等。
- `~`：`~` 代表当前用户的主目录。对于普通用户来说，`~` 通常表示 `/home/username`。例如，如果你的用户名是 `ff`，`~` 就指代 `/home/ff`。而对于 root 用户，`~` 表示 `/root`。
- `/etc`
	- `/etc` 目录中的大部分文件都是用于控制系统和各种服务的运行的配置文件和脚本，比如启动过程、网络配置、安全设置、用户权限等。例如，Apache Web服务器的配置文件通常位于 `/etc/apache2/`，SSH服务器的配置文件位于 `/etc/ssh/`。
	- `/etc` 目录中的文件通常是系统管理员使用 `root` 权限才能修改的，一般用户只有读取这些文件的权限，而没有写入权限。
	- `/etc` 在Linux和Unix系统中并不是某个单词的缩写，最初在Unix早期，`/etc` 目录的确是用来存放系统中那些"其他"（etcetera）文件的，但随着系统的发展，`/etc` 逐渐演变为专门存放配置文件的目录。
	- 重要的子目录和文件：
		- `/etc/passwd`：存储系统的用户信息，包括用户名、用户ID等。
		- `/etc/shadow`：存储加密的用户密码信息，配合 `/etc/passwd` 使用。
		- `/etc/fstab`：定义系统启动时自动挂载的文件系统（如硬盘分区、网络文件系统等）。
		- `/etc/hosts`：定义主机名和IP地址的映射，用于域名解析。
		- `/etc/network/interfaces`（在某些发行版中）：存储网络接口配置。
		- `/etc/apt/`：存储APT包管理器的配置文件（如软件源列表 `/etc/apt/sources.list`）。
		- `/etc/ssh/`：存储SSH服务的配置文件（如 `/etc/ssh/sshd_config`，配置SSH服务器行为）。
		- `/etc/fstab` 是一个配置文件，它定义了系统启动时需要自动挂载的文件系统
		- `/etc/passwd` 文件包含所有用户的账户信息

## 查看系统资源
- **查看资源使用情况**
```bash
top
将看到系统实时的资源使用情况，包括：
- **CPU 使用**：显示每个处理器的使用情况。
- **内存使用**：显示物理内存和交换空间的使用情况。
- **进程列表**：显示系统中运行的进程，按资源使用排序。

htop
`htop` 是 `top` 的增强版本，界面更加友好，并且支持更多操作，`htop` 的界面比 `top` 更加直观，支持使用箭头键选择进程并执行操作（如结束进程）。。
安装 `htop`：
sudo apt install htop
运行：
htop


`df` 命令用来查看磁盘空间的使用情况。
df -h
- `-h` 参数表示以人类可读的格式显示（GB、MB）。
- 输出会显示每个挂载的磁盘分区的总空间、已用空间和可用空间。：


`du` 命令可以显示指定目录或文件的磁盘空间使用情况
查看某个目录的大小（例如 `/home` 目录）：
du -h /home
`-h` 参数同样表示以人类可读的格式显示

`ifconfig` 是一个查看和配置网络接口的命令，可以显示网络接口的 IP 地址、子网掩码、流量统计等。
运行以下命令查看网络接口的详细信息：
ifconfig

`nload` 是一个终端工具，可以实时显示网络上传和下载速度,实时监控网络流量。
安装 `nload`：`sudo apt install nload`
运行 `nload`：`nload`
将看到实时的网络上传和下载流量信息。

`lm-sensors` 是一个监控硬件传感器（如 CPU 温度、风扇速度等）的工具。

安装 `lm-sensors`：`sudo apt install lm-sensors`
运行以下命令检测系统中的传感器：`sudo sensors-detect`
然后运行 `sensors` 命令查看实时的传感器数据：`sensors`

```




- **系统修复**

恢复菜单（文件系统状态：读/写）
- **`resume`**: 恢复正常启动。恢复正常的系统启动。这将尝试从当前的恢复模式退出，并继续启动系统。
- **`clean`**: 尝试释放空间。尝试释放磁盘空间。通常用来清理缓存或临时文件，以确保系统有足够的磁盘空间。
- **`dpkg`**: 修复损坏的软件包。修复损坏的软件包。这个选项会运行 `dpkg` 来修复未完全安装或损坏的软件包，通常用在系统因为软件包问题无法正常启动时。
- **`fsck`**: 检查所有文件系统。检查文件系统。`fsck`（文件系统检查工具）会检查并修复文件系统中的错误，以确保文件系统的一致性和稳定性。
- **`grub`**: 更新GRUB引导程序。更新GRUB引导程序。如果GRUB引导程序有问题（如无法正确引导操作系统），可以选择这个选项来重新安装或更新GRUB。
- **`Enable networking`**:启用网络连接 。启用网络连接。在恢复模式中，网络通常是禁用的，选择此选项可以启用网络，以便进行网络修复或下载软件包。
- **`Drop to root shell prompt`**: 进入根shell提示符。进入根用户的命令行提示符。这允许你作为超级用户（root）直接输入命令来修复系统问题。
- **`System summary`**: 系统摘要。显示系统摘要，提供有关系统硬件和软件的基本信息。

## 网络管理
使用 `hostname -I` 命令会返回所有分配给该主机的IP地址。
使用 `ip addr` 命令会显示所有网络接口的信息，包括IP地址。通常你会看到类似 `inet` 开头的行，后面跟着的就是IP地址。
## 设备管理
```shell
设备管理：
显示器
输入以下命令查看当前检测到的显示器，将显示已连接的显示器及其分辨率
xrander
手动检测
xrandr --auto
手动启用显示器：
xrandr --output 显示器名 --auto

`arandr` 工具，这是 `xrandr` 的图形前端，允许你更直观地管理显示器
安装 `arandr`：
sudo apt install arandr
```




## 终端使用


### 命令相关
**使用`history`查看历史命令**：
```bash
history

## 显示最近的10条命令
history 10  

## 搜索包含特定关键词的命令
history | grep 关键词 

## 查看整个历史文件
cat ~/.bash_history 
```

**通过快捷键搜索历史命令**：
按下 `Ctrl + R` 后，可以输入关键词来搜索之前执行过的命令，连续按 `Ctrl + R` 可以循环显示匹配的命令。
```bash
(reverse-i-search)`关键词': 关键词相关命令
```
`$(pwd)`：当前路径





### 路径相关
**返回上一个文件夹**：`cd -`，这个命令相当于执行了`cd "$OLDPWD"`，其中`$OLDPWD`是一个环境变量，存储了上一个工作目录的路径。

### grep
https://juejin.cn/post/7524216834619408430

grep （缩写来自Globally search a Regular Expression and Print,全面搜索正则表达式并打印出来）


查日志（Java）：

```

tail -f a.log | grep "java.lang.NullPointerException"
// 输出：
// 2025-07-03 11:38:48.339 [http-nio-8960-exec-1] [47gK4n32jEYvTYX8AYti48] [INFO] [GlobalExceptionHandler] java.lang.NullPointerException, ex: java.lang.NullPointerException
// java.lang.NullPointerException: null

# 查找 NullPointerException，并显示后面 50 行
grep -A 50 "java.lang.NullPointerException" a.log

# 异常太多，屏幕一闪而过，也可以用less加上分页查看
grep -A 50 "java.lang.NullPointerException" a.log | less

```

在 `less` 视图中，你可以：

- 使用 **箭头↑↓** 或 **Page Up/Down** 键来上下滚动
- 输入 `G` 直接翻到末尾，方便快速查看最新的日志
- 输入 `/Exception` 继续搜索
- 按 `q` 键退出


如果你的应用正在运行，并且你怀疑它会随时抛出异常，你可以实时监控日志文件的增长。
使用 `tail -f` 结合 `grep`：

```shell
# 实时监控 a.log 文件的新增内容，并只显示包含 "java.lang.NullPointerException" 的行及其后50行
tail -f a.log | grep -A 50 "java.lang.NullPointerException"

```

只要异常一出现，它就会自动打出来，堆栈信息也一并送到你面前！

- 想停下？`Ctrl + C`
- 想更准确？加 `-i` 忽略大小写，防止大小写拼错找不到

翻历史日志 or 查压缩日志

服务器上的日志一般都会按天或按大小分割并压缩，变成 `.log.2025-07-02.gz` 这种格式，查找这些文件的异常信息怎么办？

### tail
https://cloud.tencent.com/developer/article/2451486



## 终端配置

- 确定你的 Shell 类型
你需要确认你正在使用的 Shell 是 `bash` 还是 `zsh`（Linux 默认通常是 bash，MacOS 或某些发行版可能是 zsh）。
在终端输入：
```bash
echo $SHELL
```
* 如果是 `/bin/bash`，你的配置文件通常是 `~/.bashrc`。
* 如果是 `/bin/zsh`，你的配置文件通常是 `~/.zshrc`。

`bashrc`中的`rc`的含义是 Run Commands，但今天很多人也会把它理解为 "Runtime Configuration"（运行时配置）或 "Resource Configuration"（资源配置），**BASH** **R**un **C**ommands可以理解为 当 Bash 启动时，请运行这里的命令。


✨以下命令都是以**bash**为例，修改的是`~/.bashrc`文件
先编辑命令，最后别忘了：`source ~/.bashrc`



**编辑 `~/.bashrc` 文件**：
可以使用任何文本编辑器（如 `nano`、`vim`、`gedit` 等）来编辑 `.bashrc` 文件。例如，使用 `nano` 编辑器：
```
nano ~/.bashrc
```
在编辑完成后，保存并退出编辑器（在 `nano` 中按 `Ctrl + O` 保存，`Ctrl + X` 退出）。



**环境变量设置**：设置一些环境变量，例如 `PATH`，它告诉系统在哪些目录中查找可执行文件。例如，通过以下命令添加一个目录到 `PATH` 中，允许你直接执行该目录下的程序，而无需输入完整路径：
```
export PATH=$PATH:/your/directory/
```

`export`：**导出变量**。它的作用是让这个变量不仅在当前的终端窗口生效，还能被该窗口下运行的所有子进程（比如你运行的其他脚本或程序）看到。
`PATH`：**变量名称**。`PATH` 是系统中最核心的环境变量之一，它告诉系统：当你输入一个命令（如 `ls` 或 `python`）时，应该去哪些文件夹里寻找对应的可执行文件。
`$PATH`：**引用当前值**。`$` 符号代表“取值”。因为 `PATH` 变量里已经有很多系统默认的路径了（如 `/bin`, `/usr/bin`），这一步是为了**保留原有的路径**，而不是把旧的覆盖掉。
**`:/directory/...`**：**追加新路径**。在 Linux 中，路径之间用**冒号 (`:`)** 分隔。这一部分就是把你 D 盘的工具目录“拼接”到现有的清单末尾。


**别名（Alias）设置**：你可以在 `.bashrc` 文件中定义命令别名，使得长命令变得更短或更易记。通过这种方式也可以添加应用，比如：
```
alias ll='ls -la'
alias diamond='/mnt/d/Program1/diamond.exe'
```
**定制命令提示符**：你可以定制命令行提示符（PS1），例如修改命令提示符的颜色或显示其他信息：
```
export PS1="\u@\h:\w$ "

```

**启动脚本**：你可以在 `.bashrc` 中设置一些启动脚本或命令，每次打开终端时自动执行这些命令。例如：
```
echo "Welcome to my terminal!"
```



**添加环境变量**：
```bash
echo 'export PATH="/你的真实绝对路径/foldseek/bin:$PATH"' >> ~/.bashrc
```


**使更改立即生效**：
当你对 `.bashrc` 文件进行更改时，需要重新加载它才能使更改生效。可以通过以下命令重新加载：
```
source ~/.bashrc
```
或者，简单地关闭并重新打开一个终端窗口。


**zsh，fzf**：【10分钟带你从0配置最强命令行】 https://www.bilibili.com/video/BV1fdTfzeE8X/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef


## 文件操作

### 文件权限

在 Linux 中，文件权限分为读（r）、写（w）、执行（x），对应的数值分别为：
读（r）：4
写（w）：2
执行（x）：1

文件所有者：拥有全部权限（读、写、执行），权限数值为 4+2+1=7
组内成员：拥有读写权限（读、写），权限数值为 4+2=6
组外成员：拥有只读权限（读），权限数值为 4
Linux 文件权限用三位数字表示，依次对应文件所有者、组内成员、组外成员的权限数值





### 常用命令

```bash
## 察看当前目录下的文件
ls
## 查看包括隐藏文件在内的所有文件
ls -a
## 察看指定目录下的文件
ls ~
ls /home/ff

## 复制文件
cp 源文件 目标路径

## 复制目录，加上 `-r` 参数来递归复制目录内容
cp -r 源文件 目标路径

## 查看当前路径
pwd
## 创建文件夹
mkdir -p 文件夹
**`-p`**：这是 `mkdir` 命令的一个选项，表示 **"父目录"**（parents）。如果上级目录不存在，`-p` 会自动创建所有必要的父目录，而不会报错。
## 察看文件内容
cat *.*
less *.*
```

**删除文件/文件夹**：
```bash
删除文件和空目录
rmdir 目录名
删除非空目录（即递归删除目录及其内容）
rm -r 目录名
如果你不确定要删除的文件，或者想要确认每一步删除操作，可以加上 `-i` 选项，删除前会提示确认
rm -ri /home/ff/非空目录
强制删除（包括只读文件）
rm -rf 目录名

谨慎使用 rm -rf 命令，因为它会强制删除目录及其所有内容，且无法恢复。

```

**查找文件**

查找文件：
locate libnvrtc.so

在 Docker 容器或任何 Linux 系统中，你可以使用 **`find`** 命令来查找某个文件夹的位置。具体的操作步骤如下：

find查找文件
```bash
find /  -name "myfile.txt"
```

1. 使用 `find` 命令查找文件夹


假设你想要查找名为 `myfolder` 的文件夹，以下是通用的查找命令：

```bash
find / -type d -name "myfolder"
```

- **`find /`**：在根目录 `/` 开始查找，也可以指定特定的路径，例如 `/home`。
- **`-type d`**：指定查找的类型为目录（directory），而不是文件。
- **`-name "myfolder"`**：指定要查找的文件夹名称。

示例：

假设你要查找名为 `myfolder` 的文件夹，可以运行以下命令：

```bash
find / -type d -name "myfolder"
```

系统会搜索整个文件系统并列出所有匹配的目录路径。

2. 限制搜索范围

如果你想加快搜索速度，可以限制搜索范围。例如，如果你只想在 `/home` 目录下查找：

```bash
find /home -type d -name "myfolder"
```

3. 使用 `find` 命令并忽略权限错误

在某些情况下，搜索过程可能会遇到权限不足的目录，你可以通过添加 `2>/dev/null` 来忽略这些错误：

```bash
find / -type d -name "myfolder" 2>/dev/null
```
**总结**：
- 使用 `find` 命令是查找文件夹位置的最佳方法。
- `-type d` 参数指定查找的是目录。
- 可以通过限定搜索路径来加快查找速度。


- chmod -R 777 testfile  ##给要复制的文件夹testfile以及里面的文件读写权限


## 带GUI的发行版

### Ubuntu
- 打开终端（`Ctrl + Alt + T`）
- 按 `Ctrl + Alt + F1` 到 `Ctrl + Alt + F6` 之间的任意组合，尝试切换到另一个TTY控制台


- 桌面版的“文件”软件下的 主文件夹/主目录 是当前用户的文件夹

- 系统监视器（GUI 工具）：Ubuntu 自带了图形化的系统监视工具，称为 "系统监视器"（System Monitor），可以实时查看 CPU、内存、存储、网络等资源的使用情况，点击 Ubuntu 左上角的应用菜单（或者按下 `Super` 键，通常是键盘上的 Windows 键），搜索 “**系统监视器**” 或 "System Monitor"，并点击打开。

- **Ubuntu apt upgrade后黑屏问题**
进不去系统，桌面只有左上角一个下划线，但是可以用向日葵远程连接，不过连进去也是一片漆黑，好像也可以用SSH连接
解决办法：
进入：Advanced options for Ubuntu，双系统在选系统的时候就会出现，一般就在ubuntu选项的紧挨着的下面，不是双系统则在电脑启动后有读条时按住左shift键
选择一个后面有（recovery mode）的ubuntu进入，然后会出现Recovery Menu

先选中“network”选项就会使能网络并改为读写模式
接着再选择“root”选项就可以root登陆
再输入这两个命令：apt-get update、apt-get upgrade -f

然后使用命令关机，在打开电脑就可以了

Ubuntu apt upgrade后黑屏问题 https://blog.csdn.net/amuro_ray027/article/details/119786712
ubuntu启动失败黑屏解决方案 https://blog.csdn.net/u013810296/article/details/86683559

### Centos

Index of /： https://vault.centos.org/
The CentOS Project： https://centos.org/
centos安装包下载_开源镜像站-阿里云： https://mirrors.aliyun.com/centos/
CentOS的下载和安装_centos下载-CSDN博客： https://blog.csdn.net/hsuehgw/article/details/129469635
CentOS 7教程（四）-使用SSH工具远程连接CentOS - 佛祖下的灯芯 - 博客园： https://www.cnblogs.com/dhanchor/p/11442790.html
(12条消息) 远程访问centos系统_xiezhi_1130的博客-CSDN博客_远程连接centos： https://blog.csdn.net/xiezhi_1130/article/details/84784335
(12条消息) centos命令行常用快捷键_u013405116的博客-CSDN博客： https://blog.csdn.net/u013405116/article/details/90137007
CentOS 7教程（一)-初步入门及安装 - 佛祖下的灯芯 - 博客园： https://www.cnblogs.com/dhanchor/p/11374717.html

### 显示器
```shell
//查看显示屏设置信息
xrandr
//将外接显示器设置为自动达到最优分辨率
xrandr --output HDMI-0 --auto --primary
//转换左右关系
xrandr --output eDp-1-1 --right-of HDMI-0 -auto
```

AMD Radeon 和 Radeon PRO 显卡 Linux® 驱动程序 https://www.amd.com/zh-cn/support/download/linux-drivers.html
Radeon™ Software for Linux® Installation文档 https://amdgpu-install.readthedocs.io/en/latest/
### 复制粘贴
在 Linux 中，当你用鼠标选中文字时，这段文字会自动进入选择剪切板：
- **复制**：选中文字（无需额外操作）。
- **粘贴**：点击鼠标中键（或 `Shift + Insert`）可以粘贴内容。

**`xclip` 命令行工具**
`xclip` 是一个非常强大的剪切板管理工具，可以通过命令行查看和操作剪切板
- 安装 `xclip`：
  ```bash
  sudo apt install xclip
  ```
- 查看主剪切板的内容：
  ```bash
  xclip -selection clipboard -o
  ```
- 查看选择剪切板的内容：
  ```bash
  xclip -selection primary -o
  ```

**`xsel` 命令行工具**
`xsel` 是另一个命令行工具，功能类似于 `xclip`，也可以用于操作剪切板。
- 安装 `xsel`：
  ```bash
  sudo apt install xsel
  ```
- 查看主剪切板的内容：
```bash
  xsel --clipboard --output
  ```
- 查看选择剪切板的内容：
```bash
  xsel --primary --output
```

**Diodon**
`Diodon` 是一款非常流行的剪切板管理器，专为 Ubuntu 桌面环境设计，支持文本和图像的剪切板历史管理，且具有非常简洁的界面
安装：sudo apt install diodon
安装后，`Diodon` 会在系统托盘中运行，右键单击托盘图标即可访问剪切板历史。你还可以通过全局快捷键快速粘贴历史记录

## 软件安装
### 如何安装软件

- 通过本地deb安装包安装软件：`sudo dpkg -i filename.deb`
- 查找已安装的软件包名称：`dpkg -l | grep 部分包名`
- 卸载软件包：`sudo dpkg -r 包名`


- **`apt-get update`**：用于更新系统中已知软件包的列表。系统会从配置文件中定义的软件源（通常位于 `/etc/apt/sources.list`）中获取最新的软件包信息。这不会真正安装或升级任何软件包，只是刷新本地的包列表，使系统知道有哪些软件包可以更新，以及最新版本是什么。在安装新软件或更新现有软件之前，通常需要先运行 `apt-get update` 来确保你拥有最新的包列表。
- **`apt-get upgrade -f`**：这个命令用于将系统中已安装的软件包升级到最新版本，`-f` 代表 `--fix-broken`，表示修复可能存在的损坏依赖。这个命令会根据 `apt-get update` 下载的最新包列表，将系统中已经安装的软件包升级到它们的最新版本。`-f` 参数的作用是解决因包的依赖性问题导致的升级或安装中断。如果系统检测到某些软件包安装或升级失败，它会尝试自动修复这些损坏的包依赖问题。


Linux下RPM软件包的安装及卸载 - 51CTO.COM： https://os.51cto.com/art/201001/177866.htm


rpm安装缺少一堆依赖包怎么办？
- 一个一个去找依赖包然后安装好
- yum install \*.rpm



### QQ
- **QQ** https://im.qq.com/linuxqq/index.shtml

### nano
**安装**：
```
sudo apt update
sudo apt install nano
nano --version
nano filename.txt

```

nano的M-U中的M在Windows上指的是Alt键

常用 `nano` 快捷键
- `Ctrl + X`：退出编辑器。如果你有未保存的更改，它会提示你保存。
- `Ctrl + O`：保存文件（会要求确认文件名）。
- `Ctrl + W`：查找文本。
- `Ctrl + K`：剪切文本。
- `Ctrl + U`：粘贴文本。



### docker
- Ubuntu安装docker并运行测试 https://www.bilibili.com/video/BV1EA4m1A7J5

### rsync-同步软件
- **rsync**：`rsync` 是一个强大且灵活的文件同步工具，广泛用于本地和远程的文件或目录的同步、备份和传输。它通过增量传输的方式，只复制发生更改的部分，极大地提高了效率，尤其在处理大量文件或进行远程备份时。
**1. `rsync` 的主要功能
- **文件和目录的同步**：`rsync` 可以同步文件或目录，确保源和目标之间的内容一致。
- **本地和远程传输**：支持在本地机器或通过 SSH/rsync 协议在远程机器之间传输文件。
- **增量传输**：只传输文件中发生变化的部分（增量），减少网络带宽的占用和传输时间。
- **保持文件属性**：支持复制文件的权限、时间戳、符号链接和其它元数据。
- **支持压缩**：在传输文件时可以使用压缩，从而减少数据量，进一步加快传输速度。
- **删除目标多余文件**：可以删除目标目录中源目录中不存在的文件，保持两个目录完全同步。
**2. `rsync` 的基本语法
`rsync` 的基本使用语法如下：
```bash
rsync [options] source destination
```
- `source`：源文件或目录。
- `destination`：目标文件或目录。
示例：
1. **本地文件复制**
   ```bash
   rsync -av /path/to/source/ /path/to/destination/
   ```
   这会把 `/path/to/source/` 目录中的内容同步到 `/path/to/destination/` 目录。`-a` 选项表示“归档模式”（会递归复制，并保持文件属性）。`-v` 表示详细模式（显示传输过程）。
2. **远程文件复制**
   ```bash
   rsync -avz /path/to/source/ user@remote:/path/to/destination/
   ```
   这会把本地的 `/path/to/source/` 同步到远程服务器 `remote` 的 `/path/to/destination/`，其中 `-z` 表示传输时压缩数据。
   反向传输（从远程服务器到本地）：
   ```bash
   rsync -avz user@remote:/path/to/source/ /path/to/destination/
   ```
**3. 常用选项
`rsync` 提供了大量选项，用于控制其行为。常用选项包括：
- `-a, --archive`：归档模式，表示递归传输文件并保持文件的各种属性（如时间戳、权限、符号链接等）。这个选项通常是最常用的，它相当于 `-rlptgoD`。
- `-v, --verbose`：显示详细信息，通常与其他选项结合使用，以便了解进度。
- `-z, --compress`：在传输文件时对文件进行压缩，适用于网络传输以减少带宽使用。
- `-r, --recursive`：递归传输目录中的所有文件和子目录。
- `-P`：显示传输进度，并在传输中断时可以断点续传。相当于 `--partial --progress` 的组合。
- `--delete`：删除目标目录中源目录中不存在的文件，保持两个目录完全同步。
- `-u, --update`：只更新目标目录中比源目录旧的文件，不会覆盖目标中新文件。
- `-e`：指定使用的远程 shell 程序，通常用于指定 `ssh` 作为远程登录工具。例如：
  ```bash
  rsync -avz -e ssh /path/to/source/ user@remote:/path/to/destination/
  ```
- `--dry-run`：模拟执行 `rsync`，但不实际传输文件，主要用于测试。
示例：使用 `--delete` 保持目录完全同步
```bash
rsync -av --delete /path/to/source/ /path/to/destination/
```
这会将源目录同步到目标目录，并删除目标目录中不存在于源目录中的文件。
**4. 增量传输机制
`rsync` 的一个核心功能是增量传输。它不会重新传输整个文件，而是通过对比文件的差异（基于文件的内容和元数据）来只传输那些发生了变化的部分，从而极大地提高了效率，特别是对于大文件。
增量传输适用于：
- 大量小文件。
- 大文件的局部更新。
- 网络不稳定的环境。
**5. `rsync` 使用场景
5.1 本地备份
你可以使用 `rsync` 将重要的文件从一个目录备份到另一个目录，同时保持文件属性和目录结构。它支持增量备份，速度快且占用资源少。
```bash
rsync -av /home/user/documents/ /mnt/backup/documents/
```
5.2 远程备份
你可以将本地数据同步到远程服务器进行备份，或者将远程服务器的数据同步到本地。
```bash
rsync -avz /var/www/ user@remote:/backup/www/
```
5.3 文件同步
在两台计算机之间保持文件和目录同步，使用 `--delete` 选项确保两边保持完全一致。
```bash
rsync -avz --delete /home/user/projects/ user@remote:/home/user/projects/
```
5.4 网站部署
你可以通过 `rsync` 来部署网站文件，自动同步本地代码到远程服务器。
```bash
rsync -avz --exclude 'node_modules/' /path/to/website/ user@server:/var/www/html/
```
使用 `--exclude` 可以排除某些文件或目录（如 `node_modules`）。
**6. 断点续传
`rsync` 具备断点续传功能。你可以使用 `-P` 或 `--partial` 和 `--progress` 来显示进度并支持在中断后重新开始传输。
```bash
rsync -avP /path/to/largefile user@remote:/path/to/destination/
```
**7. `rsync` 的局限性
尽管 `rsync` 非常强大，但在以下情况下可能不适用：
- 文件或目录数量极大时（数百万级别以上），由于 `rsync` 需要生成文件列表，可能会导致内存占用过高。
- 远程同步时，如果网络条件非常差，虽然 `rsync` 能进行增量传输，但可能仍会因为连接中断频繁而导致失败。
**8. 安装 `rsync`
大多数 Linux 系统默认已经安装了 `rsync`，但如果没有，可以通过以下命令安装：
- **Debian/Ubuntu**：
  ```bash
  sudo apt-get install rsync
  ```
- **CentOS/Fedora**：
  ```bash
  sudo yum install rsync
  ```
- **macOS**：
  macOS 通常预装了 `rsync`，如果需要，可以通过 Homebrew 更新或重新安装：
  ```bash
  brew install rsync
  ```
- **Windows**：
  可以通过使用 **Cygwin** 或 **WSL (Windows Subsystem for Linux)** 来安装 `rsync`。
---
**总结
`rsync` 是一个功能强大的文件同步和备份工具，能够有效地在本地或远程传输文件和目录。其增量传输、压缩和断点续传等特性，使其在处理大量数据、网络不稳定的情况下尤其有用。无论是用于定期备份、网站部署，还是文件同步，`rsync` 都是一个极具效率和灵活性的选择。






### GUI文件管理工具
【Yazi: 比任何GUI文件管理器更快的终端文件管理神器】 https://www.bilibili.com/video/BV1DzANeaEX4/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
【🗂️ superfile、Yazi、Ranger、Broot、nnn、lf - 六款文件管理器全景指南，覆盖从新手到极客，找到最适合你的那一款】 https://www.bilibili.com/video/BV1DGG4zGEir/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef


## 脚本
**注释**：
bash的注释符号为“##”
多行注释使用多个“##”实现，在脚本中，也可以通过以下方式实现：
```bash
: << 'EOF'
这是一个多行注释
你可以在这里写多行内容
EOF
```
- **`:` 命令**：这是一个 Bash 内置命令，作用是“**什么都不做**”。它是一个无操作命令，因此不会执行任何操作。
- **`<< 'EOF'`**：`<<`是一种用于将多行文本输入传递给命令的机制，`<< 'EOF'` 告诉 Bash 解释器开始读取多行输入，直到遇到结束符 `EOF`。在这里，`'EOF'` 可以替换为任何你选择的标记符号。

## 远程SSH
- 【老高·闲扯淡】8常见SSH客户端和文件管理工具的选择 SSH SFTP SCP连接 虚拟机PVE软路由工具推荐Xshell Xftp Putty WinSCP UP主：爱折腾的老高 投稿日期：3-16 www.bilibili.com/video/BV1TF4m1w7zr/

【再见 Xshell！一款万能通用的终端工具，用完爱不释手！】 https://www.bilibili.com/video/BV1nZPpeTEDS/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef
【Tmux彻底改变我的编程方式】 https://www.bilibili.com/video/BV12wS8YoEQq/?share_source=copy_web&vd_source=4da25d719af47084d6e5f1aad46e01ef

安装SSH服务器：
sudo apt-get update
sudo apt-get install openssh-server

检查SSH服务是否已启动：sudo systemctl status ssh
此时可能会弹出SSH 服务的状态，按任意键或者`q`就可以退出

如果服务未启动，可以启动SSH服务：sudo systemctl start ssh

**你需要知道以下信息**：
- **目标主机的IP地址或域名**：使用 `hostname -I` 命令，会返回所有分配给该主机的IP地址
- **在目标主机上的用户名**：使用 `whoami` 命令，会输出你当前的用户名
- **目标主机的SSH端口**（默认是端口22，除非修改过）



打开终端，输入以下命令格式来连接到目标主机：ssh username@host_ip
例如，如果用户名是`ff`，目标主机的IP地址是`192.168.1.10`，你可以运行：
ssh ff@192.168.1.10
如果你使用的是非默认的SSH端口（比如2222，ssh默认端口是22），则需要加上`-p`参数指定端口：ssh ff@192.168.1.10 -p 2222
如果是第一次连接到该主机，你会看到一条消息类似如下，询问是否接受主机的指纹（key fingerprint），输入 `yes` 并按下回车，接着你会被要求输入密码，输入你在目标主机上的用户名对应的密码后按回车，成功登录后，你就可以在终端中操作该Linux主机了：
```shell
The authenticity of host '192.168.1.10 (192.168.1.10)' can't be established.
RSA key fingerprint is SHA256:xxxxxx.
Are you sure you want to continue connecting (yes/no)?
```





## 如何魔法上网

WSL Ubuntu翻墙
https://pankkk.com/?p=2135
在没有 GUI 界面的 Linux 系统上使用梯子
https://ry.huaji.store/2020/08/Linux-magic-network/

[clash_singbox-tools](https://github.com/DustinWin/clash_singbox-tools)
https://github.com/DustinWin/clash_singbox-tools

Clash Linux 使用教程： https://ikuuu.pw/user/tutorial?os=linux&client=clash
![[Pasted image 20240910161105.png]]




## 如何后台运行程序
(3 封私信) 耗时很长的程序忘加nohup就运行了怎么办？ - 知乎 https://www.zhihu.com/question/586298694/answer/2991647868



## 修改Linux终端颜色
默认情况下，Linux 终端提示符是黑白色，容易视觉疲劳
在 Linux 中，当前的 Bash 提示设置保存在一个名为 PS1 的 shell 变量中，它表示【提示语句】（Prompt Statement），PS1 被称为【主要提示变量】，还有三个额外的变量：PS2、PS3 和 PS4。但是，由于它们与更改 Linux 终端中提示符的颜色无关

修改”~/.bashrc “文件中的"`PS1`"变量：`[root@localhost ~]## vim ~/.bashrc 
在docekr中，在`~/.lbashrc`文件中添加`PSI=''`也可以实现效果，不过下次进的话效果会消失，`~/.lbashrc`文件中的内容也会消失

修改原理：
```bash
PS1的常用参数以及含义:
\d ：代表日期，格式为weekday month date，例如："Mon Aug 1"
\H ：完整的主机名称
\h ：仅取主机名中的第一个名字
\t ：显示时间为24小时格式，如：HH：MM：SS
\T ：显示时间为12小时格式
\A ：显示时间为24小时格式：HH：MM
\u ：当前用户的账号名称
\v ：BASH的版本信息
\w ：完整的工作目录名称
\W ：利用basename取得工作目录名称，只显示最后一个目录名
\## ：下达的第几个命令
\$ ：提示字符，如果是root用户，提示符为 ## ，普通用户则为 $


\[\e[37;40m\][  ##给[号设置 白字黑底
\[\e[33;40m\]\u  ##给用户名设置 黄字黑底
\[\e[34;40m\]@  ##给@符号设置 蓝字黑底
\[\e[35;40m\]\h  ##给主机名设置 紫字黑底
\[\e[31;40m\]\W  ##给目录设置 红字黑底
\[\e[37;40m\]]  ##给]符号设置 白字黑底
\[\e[32;40m\]##  ##给##号设置 绿字黑底（root用户##号，普通用户$符号）
\[\e[0;37;40m\]  ##给##后的光标处设置 白字黑底但OFF，不然命令后的结果会带颜色，比如ls，后面头几个文件无论是目录还是文件都会先是这里定义的颜色。
```

颜色对照表：

|前景代码|背景代码|颜色|
|---|---|---|
|30|40|黑色|
|31|41|红色|
|32|42|绿色|
|33|43|黄色|
|34|44|蓝色|
|35|45|紫红|
|36|46|青蓝|
|37|47|白色|
|1|1|透明|
文字的状态：

|状态值|状态|
|---|---|
|0|OFF|
|1|加粗高亮|
|4|下划线|
|5|闪烁|
|7|反色|
|8|不可见|
修改样例：
```bash
样例：
PS1='\[\033[1;32m\]\u\[\033[1;37m\]@\[\033[1;36m\]\h\[\033[00m\]:\[\033[1;34m\]\w\[\033[00m\]\$'
淡蓝色:
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;36m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
绿色:
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
用户名：绿色 主机名：淡蓝色
PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u\[\033[00m\]@\[\033[01;36m\]\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
```
![[Pasted image 20240913200005.png]]


通过此命令让修改的`~/.bashrc`文件生效：
`[root@localhost ~]## source ~/.bashrc  
通过此命令让修改的`~/.lbashrc`文件生效：
`[root@localhost ~]## source ~/.lbashrc  


参考资料：
Linux 中如何修改终端提示符颜色？
https://www.51cto.com/article/771571.html
How to Change the Colors of Your Bash Shell Prompt on Linux
https://linuxiac.com/how-to-change-the-colors-of-your-bash-shell-prompt-on-linux/
Linux 修改终端的用户名主机名目录等颜色
https://www.cnblogs.com/sinsenliu/p/17532548.html
docker中终端用户名显示为淡蓝色
https://blog.csdn.net/qq_43385138/article/details/134987290



## 其它

Ubuntu Releases： https://releases.ubuntu.com/
linux离线安装glibc.i686-CSDN博客： https://blog.csdn.net/weixin_37039303/article/details/133135057
Linux怎样到切换到超级用户_linux超级用户-CSDN博客： https://blog.csdn.net/qq_43611486/article/details/99609644?spm=1001.2014.3001.5506
鸟哥的Linux私房菜（第四版）-TLCL： https://billie66.github.io/TLCL/book/index.html
鳥哥私房菜 - 鳥站的所有歷史紀錄！： https://linux.vbird.org/history.php
鳥哥私房菜 - Linux 基礎學習篇訓練教材 - 目錄彙整： https://linux.vbird.org/linux_basic_train/rockylinux9/
xv6 源码调试环境搭建_linux安装xv6教程-CSDN博客： https://blog.csdn.net/OnlyLove_/article/details/128428047
掌握终端基础技巧：Linux下的文件和目录复制操作： https://baijiahao.baidu.com/s?id=1773083945916008510&wfr=spider&for=pc
在Linux环境下编写C语言_linux下的c语言编程-CSDN博客： https://blog.csdn.net/qq_52895722/article/details/131671238
软件大全【手机&amp;电脑】： https://www.dians.net/thread-1046.htm
如何查看Linux的内存使用状况 | 《Linux就该这么学》： https://www.linuxprobe.com/check-linux-memory.html
(26条消息) Linux查看GPU信息和使用情况_Blue__Bubble的博客-CSDN博客_linux查看gpu： https://blog.csdn.net/weiyumeizi/article/details/83035711
(12条消息) 如何查看yum安装的软件被安装到了哪个目录_HOOLOO的专栏-CSDN博客： https://blog.csdn.net/HOOLOO/article/details/55667666?utm_medium=distribute.wap_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.wap_baidujs
Linux命令之nohup详解 - 掘金： https://juejin.cn/post/6844903860272660494
ubuntu下安装 mod_wsgi – 禄路通： https://www.lulutong.net.cn/?p=61
linux中怎样查看已安装的软件_百度知道： https://zhidao.baidu.com/question/1546027226543525467.html
renserve/fileManage: Vue3，文件管理后台，📁： https://github.com/renserve/fileManage

## END