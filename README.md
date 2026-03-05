# FinanceAI — Profit Financial Group

## פריסה ל-Vercel (5 דקות)

### שלב 1 — GitHub
1. צור חשבון GitHub בחינם: https://github.com
2. צור Repository חדש בשם `financeai`
3. העלה את כל הקבצים מהתיקיה הזו

### שלב 2 — Vercel
1. היכנס ל: https://vercel.com
2. לחץ "Add New Project"
3. בחר את ה-Repository שיצרת
4. לחץ Deploy

### שלב 3 — API Key
1. בפרויקט ב-Vercel → Settings → Environment Variables
2. הוסף:
   - Name: `ANTHROPIC_API_KEY`
   - Value: המפתח שלך מ-https://console.anthropic.com
3. לחץ Save ואז Redeploy

### עדכון נתונים כל חודש
1. החלף את הקובץ `lib/data.json` בגרסה החדשה
2. Push ל-GitHub → Vercel מתעדכן אוטומטית

## מבנה הפרויקט
```
financeai/
├── pages/
│   ├── index.js        ← האפליקציה הראשית
│   └── api/
│       └── claude.js   ← API route (מסתיר את ה-key)
├── lib/
│   └── data.json       ← נתוני החשיפות (מעודכן כל חודש)
├── package.json
└── next.config.js
```
