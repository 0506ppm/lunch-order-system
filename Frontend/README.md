├── app.vue                     # 全域 App 組件（包含 Header 等 Layout）
├── assets/css/tailwind.css     # 自定義 Tailwind CSS 設定
├── components/                 # 可重用元件
│   └── TheHeader/              # Header 元件資料夾
│       ├── components/
│       │   └── ColorModeButton.vue   # 切換亮暗色模式按鈕
│       └── index.vue                # Header 主組件
├── pages/
│   └── index.vue              # 首頁路由
├── public/                    # 靜態資源（favicon、robots.txt）
├── nuxt.config.ts             # Nuxt 設定檔（包含 module、plugin 設定）
├── eslint.config.mjs          # ESLint 設定
├── tsconfig.json              # TypeScript 設定
└── server/tsconfig.json       # Nuxt server 模組的 TypeScript 設定
