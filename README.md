# CLOUD SEVEN 公式サイト

岐阜県各務原市を拠点とするハンドボールクラブの公式サイト。現在はTOPページを制作中です。HTML / CSS / JavaScript の静的構成で、GitHub Pagesにそのまま配置できます。

## 構成

```text
index.html                 TOPページ
assets/css/style.css       共通スタイル
assets/js/main.js          モバイルメニューなど
assets/images/             画像・アイコン
.nojekyll                  GitHub Pages用
CONTENT_GUIDE.md           写真・情報・コピーの追加ガイド
```

今後、`junior-high/`、`elementary/`、`plus/`、`girls/`、`about/`、`results/`、`voice/`、`faq/`、`trial/`、`contact/` に各ページの `index.html` を追加する想定です。現時点のナビゲーションとカテゴリーカードはTOPページ内の該当セクションへ移動します。

## 公開前に必要な差し替え

1. `assets/images/hero-handball.png`、`team-huddle.png`、`kids-practice.png` は生成した仮画像です。使用許可を得た実際の活動写真に差し替え、`index.html` の「イメージ」表記とギャラリー注記を更新してください。同じファイル名で置き換えれば、ヒーロー、カテゴリーカード、ギャラリー、卒業後の進路などに反映されます。実写真に合わせて `assets/css/style.css` の `object-position` / `background-position` を調整できます。
2. 体験・見学ボタンは提供されたLINE公式アカウント `https://lin.ee/qdpR7K7` に接続済みです。公開前にリンク先を最終確認してください。
3. Instagramは確認済みの公式アカウント `@cloud7handball` に接続しています。
4. 大会回数・入賞歴、設立年、卒業後の進路、VOICEは提供された原稿を掲載しています。公開前に数字・学校名の最終確認と、選手・保護者・卒団生の声の掲載許可を確認してください。
5. GitHub Pagesの公開URL確定後、`og:url` と絶対URLの `og:image`、必要なら canonical URL を追加してください。

## ローカル確認

プロジェクトのフォルダで `python -m http.server 8000 --bind 127.0.0.1` を実行し、`http://127.0.0.1:8000/` を開きます。ビルドは不要です。

ヒーロー写真は約6秒ごとに切り替わり、活動風景のギャラリーは表示中のみ横に進みます。両方に一時停止・再生ボタンがあり、写真を手動で選ぶと自動送りを止めます。ギャラリーは指での横スワイプと前後ボタンにも対応しています。VOICEの長文はクリックで展開できます。OSで「視差効果を減らす」設定が有効な場合、自動再生を停止した状態で始まります。

## デザインの調整

`assets/css/style.css` 冒頭の変数で、提供されたユニフォームを参考にした黒・ゴールド・鮮やかな黄色、ビブスの赤・えんじ色、文字色を変更できます。「チャレンジ精神」をスローガンに、力強い配色と、選手・保護者が参加を判断しやすい文章を組み合わせています。スタイルはヘッダー、ヒーロー、各セクション、チーム配色、タブレット、スマートフォンの順に整理しています。ロゴとマスコットは提供素材を使用しています。配置と差し替え先は `CONTENT_GUIDE.md` を参照してください。

参考にした公式サイト：[アルバルク東京](https://www.alvark-tokyo.jp/)、[清水エスパルス](https://www.s-pulse.co.jp/)。初めての人への案内や、チーム・スクール・SNSへの入口を参考にしています。
