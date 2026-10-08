# -*- coding: utf-8 -*-
"""CI 步驟：下載最新網站 HTML，去除 PWA/manifest/SW（原生 App 不需要），輸出 www/index.html"""
import os
import sys
import urllib.request

if len(sys.argv) < 2:
    print("用法：python3 prepare_web.py <HTML_URL>")
    sys.exit(1)

url = sys.argv[1]
print("下載：", url)
with urllib.request.urlopen(url, timeout=60) as r:
    html = r.read().decode("utf-8")
print("下載大小：", len(html))

# 移除原生 App 不需要的 PWA 引用
for line in (
    '\n<link rel="manifest" href="manifest.webmanifest">',
    '\n<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">',
):
    html = html.replace(line, '')

sw_block = '''
/* PWA：在 http/https 下註冊 Service Worker（file:// 下自動跳過） */
if("serviceWorker" in navigator && location.protocol.indexOf("http")===0){
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("sw.js").catch(function(){});
  });
}
'''
if sw_block in html:
    html = html.replace(sw_block, '\n')
    print("已移除 Service Worker 註冊")

os.makedirs("www", exist_ok=True)
with open("www/index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("已輸出 www/index.html")
