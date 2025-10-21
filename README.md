# blog-template

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<a href="https://www.buymeacoffee.com/debuloper" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

<a href='https://ko-fi.com/E1E41LY2C9' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

簡単にセットアップできるブログのテンプレートです。

## Features

- [x] SSL対応
- [x] 記事の一覧表示 (/)
- [x] 並び替え (昇順/降順)
- [x] 記事の表示順 (公開日順/更新日順/名前順)
- [x] 記事のピン止め
- [x] 記事検索
- [x] 閲覧ページ (/b/:id)
- [x] 管理者ページ (/a)
- [x] Web上での記事の編集 (/a/:id)
- [x] 404
- [x] マークダウン
- [x] LaTeX
- [x] Graph (Mermaid)
- [x] Syntax Highlight
- [x] 画像表示
- [x] 動画表示
- [x] 音声表示
- [x] PDF Viewer
- [x] 編集中のプレビュー表示
- [x] ファイルアップローダー
- [x] SPA(Single Page Application)対応
- [x] XSS(Cross Site Scripting)対策
- [ ] 完全なdevコマンド

## Required

このテンプレートを作成した環境を目安にしています。

```bash
node -v # v22.17.1
npm -v # v10.9.2
```

## Setup (For Ubuntu)

### 0. Clone & Install

```bash
git clone https://github.com/otoneko1102/blog.git
cd blog
npm install
```

### 1. Edit files

### Images (./routes/assets/img)

```bash
mkdir ./routes/assets/img
```

| File name | Recommended size |
| :-- | :-- |
| header.png | 1300x280 |
| icon.png | 48x48 |
| thumbnail.png | 1024x560 |

### .env

Example: [example.env](./example.env)

```bash
sudo nano .env
```

### 2. Exec command

Before building, select the security level.

`./routes/src/scripts/config.js`

```js
const isStrictSecurity = false; // Default: false
```

- **true**: Use `sessionStorage` .
- **false**: Use `localStorage` .

```bash
npm run build
```

### 3. Always on

#### PM2をインストールしていない場合
```bash
sudo npm install -g pm2
```

#### Exec command

```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 4. Edit /etc/nginx/sites-available/example

```bash
sudo nano /etc/nginx/sites-available/example
```

```conf
# www --> non-www
server {
  listen 80;
  server_name www.example.com; # 実際のドメインに変更

  return 301 http://example.com$request_uri;
}

server {
  listen 80;
  server_name example.com; # 実際のドメインに変更

  location / {
    # ファイルサイズ
    client_max_body_size 50M;

    proxy_pass http://localhost:3000; # 実際のポート番号に変更
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

#### Certbotをインストールしていない場合

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

#### Nginx

```bash
sudo ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d example.com -d www.example.com
```
