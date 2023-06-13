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
## dashboradだと以下が必要。たぶんほかのテンプレートでも同様
pnpm install @mui/icons-material recharts

mkdir src/dashboard
cd src/dashboard
$baseUrl = "https://raw.githubusercontent.com/mui/material-ui/v5.5.2/docs/data/material/getting-started/templates/dashboard/"
$fileUrls = @(
    "Chart.tsx",
    "Dashboard.tsx",
    "Deposits.tsx",
    "Orders.tsx",
    "Title.tsx",
    "listItems.tsx"
)
foreach ($url in $fileUrls) {
    $fileUrl = $baseUrl + $url
    $destinationFile = Join-Path $destinationPath $url
    Invoke-WebRequest -Uri $fileUrl -OutFile $destinationFile
}

cd ..
@'
import DashboardContent from "./dashboard/Dashboard";

function App() {
  return <DashboardContent />;
}

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

- [TypescriptとMUIでダッシュボード作るときのテンプレ - write ahead log](https://twinbird-htn.hatenablog.com/entry/2022/09/24/111839) - すごい参考にさせていただきました
- [material-ui/docs/data/material/getting-started/templates/dashboard at v5.5.2 · mui/material-ui · GitHub](https://github.com/mui/material-ui/tree/v5.5.2/docs/data/material/getting-started/templates/dashboard)
- [material-ui/docs/data/material/getting-started/templates at master · mui/material-ui · GitHub](https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates)

## TODO

- `pnpm lint` で **エラー**になるとこを直す。buildは通るけど、さすがにエラーはダメでしょう。
- 適当なタイミングで[テンプレートレポジトリ](https://docs.github.com/ja/repositories/creating-and-managing-repositories/creating-a-template-repository)にする
- "@mui/icons-material" まわりでbuildが遅い理由がよくわからんのだが直したい。
