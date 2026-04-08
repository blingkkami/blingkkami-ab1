# 🛠️ 트러블슈팅 일지 — 2026년 4월 4일

> 프로젝트: `my-business-site` (Next.js)
> 목표: GitHub → Vercel 배포

---

## 오류 1. `git` 명령어를 찾을 수 없음

### ❌ 오류 내용
`
'git' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램이
아닙니다. (CommandNotFoundException)
`

### 🔍 원인
- PowerShell 터미널에서 `git status`를 실행했으나, Git이 PATH에 등록되지 않은 상태

### ✅ 해결 방법
- `npx vercel` 을 직접 실행하여 Git 없이 Vercel CLI로 배포 (로컬 파일 직접 업로드)

---

## 오류 2. 환경변수(.env.local) 누락으로 빌드 실패

### ❌ 오류 내용
Gmail 이메일 기능 관련 환경변수를 찾지 못해 런타임 오류 발생

### 🔍 원인
- .gitignore 에 .env* 패턴이 등록되어 .env.local 이 GitHub에 올라가지 않음
- Vercel이 환경변수 없이 빌드하므로 오류 발생

### ✅ 해결 방법
Vercel 대시보드 > Settings > Environment Variables 에서 수동 등록:

| Key               | Value                    |
|-------------------|--------------------------|
| GMAIL_USER        | blingkkami@gmail.com     |
| GMAIL_APP_PASSWORD| zisa zawi hncd whxx      |

저장 후 Redeploy 실행

---

## 오류 3. Root Directory 설정 오류 (핵심!)

### ❌ 오류 내용
Framework Preset이 `Next.js` 가 아닌 `Other` 로 감지되고 빌드 실패

### 🔍 원인
저장소 구조:
`
test/                    ← 저장소 루트 (Vercel 시작점)
└── my-business-site/    ← 실제 Next.js 프로젝트
    ├── package.json
    └── app/
`
Vercel Root Directory 기본값이 ./ 이라 package.json을 찾지 못함

### ✅ 해결 방법
배포 설정 > Root Directory > Edit > `my-business-site` 입력 > Deploy
`
변경 전: ./
변경 후: my-business-site
`

---

## 📌 향후 배포 체크리스트

- [ ] Root Directory = my-business-site
- [ ] 환경변수를 Vercel 대시보드에 등록
- [ ] Framework Preset = Next.js 확인

*작성일: 2026-04-04*
