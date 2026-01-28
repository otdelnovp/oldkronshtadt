# Suggested Commands - Старый Кронштадт Website

## Development
Нет сборки проекта - статический HTML/CSS/JS

## Testing
Открыть index.html в браузере:
```bash
open index.html
```

Или создать локальный сервер:
```bash
python3 -m http.server 8000
```
Затем открыть: http://localhost:8000

## Git Commands
```bash
git status              # Проверить изменения
git add .              # Добавить все изменения
git commit -m "message" # Сделать коммит
git push               # Отправить на удаленный репозиторий
```

## File Operations
```bash
ls -la                 # Список файлов
cat css/style.css      # Просмотр CSS
cat js/main.js         # Просмотр JS
```

## Browser Testing
- Chrome/Brave/Safari для проверки совместимости
- F12 для Developer Tools
- Mobile view: Ctrl+Shift+M (Chrome) или Cmd+Shift+M (Safari)

## Linting
Не настроено. Можно добавить ESLint для JS или Stylelint для CSS.

## Deployment
Скопировать файлы на хостинг или использовать Netlify/Vercel для статического хостинга.
