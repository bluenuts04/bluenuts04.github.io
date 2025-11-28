■ディクトリ構成

index.html
style.css
script.js
images（フォルダ）
moviess（フォルダ）

HP_勉強 
├ images 
│ └ （画像ファイル）
├ movies 
│ └ （動画ファイル） 
├ danger.html 
├ index.html 
├ style.css 
└ script.js

VSCodeでプロジェクトを開く

Live Serverでローカルプレビュー（自動リロード）を使いこなす

VSCode内にプレビューを置く（同じ画面でコードと確認）

変更の反映・よくあるトラブル対処法

（最後に）できたサイトを GitHub Pages に公開する手順

ではステップごとに実演的に行くよ — ボタンの場所とコマンド両方書くから、そのままコピペ＆クリックOK。

1) プロジェクトを開く（VSCode）
File → Open Folder... で、ローカルフォルダを開く
エクスプローラー（左ペイン）に index.html, style.css, script.js が表示

2) Live Server でローカルプレビュー（自動リロード）手順（GUI）
index.html をクリックして開く（タブで表示）
右下に青いボタン Go Live が見える → クリック
ブラウザが自動で開いて http://127.0.0.1:5500/（または http://localhost:5500/）が表示される
VSCode で style.css や index.html を編集して保存（Ctrl+S）すると、ブラウザが自動でリロードされる

手順（右クリック）
index.html の編集領域で右クリック → Open with Live Server
ポートやルートを変えたいとき（オプション）
コマンドパレット（Ctrl+Shift+P）→ Preferences: Open Settings (JSON) に下を追加してポート変更できます：
"liveServer.settings.port": 5501,
"liveServer.settings.root": "/"

3) VSCode の中でプレビューを並べる（コードと同じ窓で見る）

ブラウザを使わず VSCode 内で同じ画面にプレビューを配置する方法。

A. Simple Browser を使う（拡張機能が必要）
拡張機能から Simple Browser をインストール

Ctrl+Shift+P → Simple Browser: Show を選ぶ

URL に http://127.0.0.1:5500/ を入れる

タブをドラッグしてエディタの横に配置すれば「コード | プレビュー」の完成！

B. Webview を使う（同様の効果）

同じくコマンドパレットから View: Toggle Panel でパネル表示して埋め込む方法もあるけど、Simple Browser が簡単。

4) 編集のコツ・Live Server の挙動

CSS を保存するだけで即リロード。JS の変更も同様。

画像を追加したらパス（例：images/logo.png）が正しいか確認。大文字小文字は本番で厳格。

ブラウザでキャッシュが残る場合：F12 → Network → 「Disable cache」にチェック（DevTools 開いている間のみ有効）。

サーバ停止は VSCode 右下の Port: 5500 の横にある Port 表示をクリック → Stop Live Server。

5) よくあるトラブルと対処

Go Live が表示されない

index.html をアクティブなタブにしているか確認。

「ワークスペースが信頼されていない」と表示されたら、上部の Trust ワーニングで「Workspace を信頼する」を選ぶ必要あり。

ブラウザがファイルを読み込まない（404）

Live Server のルート設定とファイルの位置が合っているか確認。/ ルートに index.html があること。

ポートが使われている

他のアプリが 5500 を使っているときは liveServer.settings.port を別ポートに変更。

変更しても反映されない

ファイルを保存しているか？（自動保存を有効にするなら File → Auto Save）

6) ちょっと便利な設定（VSCode側）

settings.json に入れると便利な自動保存・フォーマット設定：

"files.autoSave": "onFocusChange",
"editor.formatOnSave": true,
"liveServer.settings.CustomBrowser": "chrome" 


（CustomBrowser は任意。デフォルトの既定ブラウザが開きます）

7) 作業フローの例（短い）

VSCode で index.html 編集

Ctrl+S（保存）

ブラウザが自動で更新 → 変更を確認

問題なければ Git commit → push → GitHub Pages へデプロイ（下に手順あり）

8) 完成したら GitHub Pages に公開する（端折らない手順）

ここでは「yourname.github.io」というリポジトリ名でルート公開する最短コマンド版を紹介。既に Git がインストールされている前提。

ターミナルで実行（VSCode のターミナルでOK）
# 1. 初期化（まだ未初期化なら）
git init

# 2. mainブランチにする（新しいリポジトリで推奨）
git checkout -b main

# 3. すべて追加してコミット
git add .
git commit -m "Initial commit"

# 4. GitHub にリポジトリを作成（ブラウザで https://github.com/new 、名前を yourname.github.io に）
# その後、リモートを追加（yourname を自分のGitHubユーザ名に）
git remote add origin https://github.com/yourname/yourname.github.io.git

# 5. push（初回は -u）
git push -u origin main

反映先URL
https://yourname.github.io/


数十秒〜1分ほどで公開されるよ。

9) 何をいまからやると学びが多いか（学習プラン）

HTML構造をいじって、見出しや段落を増やす → Live Server で即確認

CSSでレイアウト（Flexbox/Grid）を試す → ブラウザで挙動を確認

JavaScriptで簡単な挙動（クリックでモーダルを開く等）を作る → 保存で即リロード

最後に Git + GitHub で管理＆Pages に公開

おまけ：あなた用の「やることリスト」チェックボックス

 プロジェクトフォルダを VSCode で開いた

 index.html をアクティブにして Go Live を押した

 変更を保存してブラウザが更新されることを確認した

 （オプション）Simple Browser で VSCode 内プレビューを設定した

 Git で commit → GitHub に push して yourname.github.io を公開した

必要なものは全部書いたよ。今やるなら次のどれかをそのまま実行して：

「Go Live 押したらブラウザが開いた」なら、どのファイルをいじってみたい？（例：ヘッダーの色を変える、ボタンを動かす等）

そのまま GitHub Pages に公開したいなら、Gitの操作で詰まらないようにコマンドを一つずつ出すよ（今のフォルダで実行するコマンドを提示）。

やることを一つ選んで。どんどん手を動かしていこう！

あなたの目的は
✅ GitHub Pages（yourname.github.io）として公開すること
だから、そのための正しい手順だけをしっかり進める。

✅ ステップ0：GitHub アカウントはある？

すでにログインできる状態？

ある → OK、そのまま進む

ない → https://github.com/
 で作成（無料）

✅ ステップ1：GitHub に Pages 用の特別なリポジトリを作る

GitHub Pages の「プロフィールサイト」形式で公開するには
リポジトリ名は 必ず固定。

yourname.github.io


https://github.com/new
 を開く

Repository name に

あなたのGitHubユーザ名.github.io


Public のまま

「Create repository」をクリック

※ 何も中身を作らず空のままでOK。

✅ ステップ2：VSCode でターミナルを開く

VSCode に戻り

Ctrl + Shift + `


これでターミナルが下に出る。

（PowerShell でも cmd でも OK）

✅ ステップ3：今いるフォルダを Git 管理にする

index.html があるフォルダで次を実行：

git init
git add .
git commit -m "first commit"


ここで
✅ index.html
✅ style.css
✅ script.js
✅ images フォルダ
すべて Git 管理される。

✅ ステップ4：作った GitHub リポジトリと接続する

GitHub で作ったリポの URL を貼るだけ。

例（あなたのユーザ名が bluenuts なら）

git remote add origin https://github.com/bluenuts/bluenuts.github.io.git


※ ここはあなたのユーザ名に必ず置き換えてね

✅ ステップ5：main ブランチにしてプッシュ
git branch -M main
git push -u origin main


初回だけ GitHub のログイン（認証）が出ることがある。
指示通り進めればOK。

✅ ステップ6：自動で GitHub Pages 公開される

ここが重要。
プロフィールサイト形式（yourname.github.io）は、
main ブランチに push するだけで自動公開される。

つまり
何も設定しなくていい。

完成した URL：

https://あなたのGitHubユーザ名.github.io/


数秒〜1分待つと表示される。

✅ ステップ7：更新したいとき

更新の流れはたった2行。

git add .
git commit -m "update"
git push


これで即時にサイトが更新される。

✅ もしエラーが出たら（よくある3つ）

言ってくれたら一瞬で直してあげるけど、とりあえず対策一覧：

❗ 1. GitHub が拒否する → ほぼ 100％「ユーザ名が間違っている」

remote add origin の URL が違うと拒否される。

❗ 2. push 時に “authentication failed”

→ GitHub Desktop を入れて簡単にログインする手もある
→ または PAT（トークン）を作る方法も案内できる

❗ 3. サイトを開くと 404

→ まだ反映中（1分待てばOK）
→ または index.html がルートにない（フォルダ構造を教えてくれれば直す）

#---------------------
Github　pagesに公開済み
#---------------------
あとは更新の仕方。

✅ 流れは3ステップだけ
1. VSCodeで編集する
Live Server なら、手元のブラウザでリアルタイムに変化が見える。

2. Git に記録する
フォルダでターミナルを開いて、これだけ。

git add .
git commit -m "update"

メッセージは自由
「ちょっと修正」でも「色を変えたよ」でも。

3. GitHub に送る（push）
git push


これだけで、
https://bluenuts04.github.io/
 のサイトが数秒後に更新される。

✅ もっとスムーズにするコツ（便利ワザ）
✅ 1. VSCode の「ソース管理」タブを使う

左のアイコン（枝みたいなマーク）から

変更ファイル確認

メッセージ入力

コミット

そして push

全部ボタンでできる。
ターミナルを開かなくてもOK。

✅ 2. GitHub Pages の反映時間

GitHub Pages は反映が超速い時もあれば、数十秒かかる時もある。
もし反映が遅いときは 15 秒くらい待ってみるといい。

✅ ほんのり補足

あなたのリポジトリは
bluenuts04.github.io
という特別な名前になってるから、
main ブランチに push すれば自動公開。

追加設定はいらない。
魔法の水路が最初から繋がってる状態。

必要なら、
・画像の載せ方
・CSS 修正が反映されない時の対処
・公開したくないファイルの隠し方
・複数ページのサイト構成
どれでも続けて案内するよ。
#---------------------
スマホ対応の基本 3ステップ
#---------------------

1. HTML に「スマホサイズを意識してね」のおまじないを書く

これは必須。忘れるとスマホで拡大縮小地獄になる。

index.html の <head> の中に入れてね。

<meta name="viewport" content="width=device-width, initial-scale=1">

2. 幅を「固定」しないで「柔らかく」する

PCの幅に合わせて px 固定にするとスマホがつぶれる。
スマホ対応のコツは、% や auto を使うこと。

例：

img {
  max-width: 100%;
  height: auto;
}


これでどんな画像でもスマホで自然に縮む。

3. 画面幅によって CSS を切り替える（メディアクエリ）

スマホは幅が小さいから、
フォント、余白、レイアウトを変える必要がある。

CSS にこう書く。

@media (max-width: 600px) {
  /* スマホの画面幅の時だけ有効になる */
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .two-column {
    flex-direction: column;
  }
}


max-width: 600px は
「画面幅600px以下（スマホ）ならこの CSS を使う」
という意味。

✅ よくあるレイアウト例
2カラムの横並びをスマホでは縦並びにしたい時
.two-column {
  display: flex;
  gap: 20px;
}

@media (max-width: 600px) {
  .two-column {
    flex-direction: column;
  }
}


PCでは横並び
スマホでは縦並び
になる。

ナビゲーションメニューをスマホで縦にしたい時
nav ul {
  display: flex;
  gap: 20px;
}

@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
  }
#---------------------
JSをつける
#---------------------

  // 1. スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// 2. ヘッダーをスクロールしたら少し縮める
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});

// 3. スクロールで要素をふんわり表示
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.section, .hero, .card, .my-photo')
    .forEach(el => observer.observe(el));
✅ style.css に追加する “動きのスタイル”
※今の style.css にそのまま追加してOK。

css
コードをコピーする
/* ヘッダー縮小アニメ */
.header {
    transition: 0.3s ease;
}

.header.active {
    padding: 5px 20px;
    backdrop-filter: blur(6px);
    background: rgba(255, 255, 255, 0.6);
}

/* スクロールふわっと */
.section, .hero, .card, .my-photo {
    opacity: 0;
    transform: translateY(30px);
    transition: 0.6s ease;
}

.show {
    opacity: 1;
    transform: translateY(0);
}


1. 新しい履歴を作る（完全初期化）
rm -r .git
git init
git add .
git commit -m "clean history"
git branch -M main
git remote add origin https://github.com/bluenuts04/bluenuts04.github.io.git
git push -f origin main
