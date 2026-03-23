---
icon: pen-to-square
date: 2025-10-01
category:
  - 其它
  - 摘抄
tag:
  - default
---


Mac的快速入门指南，帮助之前没用接触过Mac的人快速上手使用Mac系统的操作设备
<!-- more -->

# Mac入门


## 基本知识

Mac 的用户名千万 一定不要更改！！！ 改了会破坏账户 需要重装系统

可以 新建一个管理员 (点左边的链接按住 control 键 可以打开)




用以下命令查看当前 Python3 的路径：
```bash
which python3
```
输出可能是：
```
/usr/local/bin/python3
```
编辑 shell 的启动文件，将python的安装路径添加到系统PATH中：

- 如果你用的是 `zsh`（默认的 macOS shell）：
```bash
nano ~/.zshrc
```
- 如果你用的是 `bash`：
```bash
nano ~/.bash_profile
```
- 然后在文件末尾加上这一行：
```bash
export PATH="/usr/local/bin:$PATH"
```
保存后关闭编辑器，然后运行下面命令，刷新配置：
```bash
source ~/.zshrc     # zsh 用户
# 或
source ~/.bash_profile  # bash 用户
```
在终端输入下面命令测试是否生效，如果显示版本号，说明已经生效。：
```bash
python3 --version
```
如果你希望用 `python` 直接指代 `python3`，可以在 `~/.zshrc` 或 `~/.bash_profile` 添加：
```bash
alias python=python3
```
然后执行：
```bash
source ~/.zshrc    # 或 ~/.bash_profile
```
这样以后只需要敲即可：
```bash
python my_script.py
```

运行程序可能还得这样：
```
python -m pip install xxx
python -m pip --version
python -m uvicorn myapi:app --reload
```



触摸板 手势

Mac 卸载不要的软件

Mac 系统降级教程 觉得版本太高 需要降级看这个教程 有风险不一定成功

Mac 重装系统教程 如果觉得系统卡顿慢 想重装 看这个教程

Mac 退出退掉之前登录的苹果 id

Mac 创建 id 教程


Mac 虚拟机安装 win10 教程

Mac 隔空投送教程 和 iPhone IPad 隔空投送

Mac 日期不对解决方法 时区不对 日期也不对的解决方法

Mac 停用自动登录 让电脑开机就需要输入密码的教程

Mac 重置网络教程 Mac 商店打不开 网络有问题 按这个教程试试

Mac 删除多余分区 电脑分区多比较乱 看这个教程可以全部删除只留一个 Mac 盘

密码忘记 或者变成普通成员


Mac 网页安装软件教程 商店没有的软件 可以网页安装

Mac 清理垃圾软件安装教程

Mac 安装解压软件教程 Mac 安装解压软件教程

Mac 安装 NTFS 插件教程 让 Mac 可以访问读写 NTFS 移动硬盘 u 盘

Mac 开启未知来源 安装破解软件 都需要开启未知来源

Mac 关闭 sip 功能 安装破解软件

Mac 一键安装 Windows10 教程 一键安装 Windows10 需要关闭 sip 和开启未知来源 剩余空间 50%以上

Mac 安装双系统 win10 教程 MAC 官方安装 win10 双系统教程 适用于 2015 以上机型

Mac 使用 U 盘重装系统教程 降级系统 或者网络重装失败

Mac 重置 nvram 教程 电脑有一些异常情况 可以按此方法操作一下看看

Mac 重置 SMC 教程 电脑电源电池风扇温度出现异常

Mac 系统打开 dmg 出现资源忙 有时候打开 dmg 出现资源忙看这个方法解决













## END
