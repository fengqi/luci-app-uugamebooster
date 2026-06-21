# ImmortalWrt Packages

NetEase UU Game Booster OpenWrt 插件。

## 分支说明

| 分支 | 适用版本 |
|---|---|
| `master` | OpenWrt 25.12+ |
| `openwrt-24.10` | OpenWrt 24.10 及更早版本 |

## 使用方式

在 `feeds.conf` 中添加：

```
# OpenWrt 25.12+（master 分支）
src-git fengqipackages https://github.com/fengqi/immortalwrt-packages.git

# OpenWrt 24.10 及更早版本
src-git fengqipackages https://github.com/fengqi/immortalwrt-packages.git;openwrt-24.10
```

然后更新 feeds 并安装：

```sh
./scripts/feeds update fengqipackages
./scripts/feeds install luci-app-uugamebooster
```

编译时在 `make menuconfig` 中勾选：

```
Network  --->
  <*> luci-app-uugamebooster
```
