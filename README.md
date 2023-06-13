# MUI-template-dashbord-test1

[MUIのテンプレート](https://mui.com/material-ui/getting-started/templates/)
の1つ [dashboard](https://mui.com/material-ui/getting-started/templates/dashboard/)
を Vite(React+TypeScript+SWC)でやってみるテスト。

## 手順

Windows の
PowerShell で pnpm を使った例。

```powershell
# 参考: <https://github.com/vitejs/vite/tree/main/packages/create-vite>
pnpm create vite@latest test1 --use-pnpm --template react-swc-ts
cd test1
pnpm i

# https://mui.com/material-ui/getting-started/templates/

pnpm install @mui/material @emotion/react @emotion/styled

# dashboradだと以下が必要。たぶんほかのテンプレートでも同様
pnpm install @mui/icons-material recharts

mkdir src/dashboard
cd src/dashboard
curl -OL https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/Chart.tsx
curl -OL https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/Dashboard.tsx
curl -OL https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/Deposits.tsx
curl -OL https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/Orders.tsx
curl -OL https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/Title.tsx
curl -OL https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/listItems.tsx

cd ..

@'
import DashboardContent from './dashboard/Dashboard';

const App = () => {
  return <DashboardContent />;
};

export default App;
'@ | Set-Content -Path "App.tsx"

cd ..
code .
```

あとは

- 不要なCSSとSVGを消す
- index.htmlでフォントを読む
- themeを追加

## 参考

- [TypescriptとMUIでダッシュボード作るときのテンプレ - write ahead log](https://twinbird-htn.hatenablog.com/entry/2022/09/24/111839) - curlのとこは全部コピペさせていただきました
- [material-ui/docs/data/material/getting-started/templates/dashboard at v5.5.2 · mui/material-ui · GitHub](https://github.com/mui/material-ui/tree/v5.5.2/docs/data/material/getting-started/templates/dashboard)
- [material-ui/docs/data/material/getting-started/templates at master · mui/material-ui · GitHub](https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates)
