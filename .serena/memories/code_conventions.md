# Code Conventions - Старый Кронштадт Website

## HTML
- Секции с id для якорной навигации
- Bootstrap классы для стилизации
- WOW.js атрибуты для анимаций (wow, data-wow-duration, data-wow-delay)

## CSS
- Имена классов: kebab-case (hero-section, history-card, etc.)
- Цвета: #4dabf7 (primary blue), #1c7ed6 (darker blue)
- Шрифты: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Flexbox для выравнивания
- CSS переходы (transition) для интерактивных элементов
- Медиа-запросы для адаптивности (max-width: 768px)

## JavaScript
- jQuery синтаксис
- Обработка событий через .on()
- CamelCase для переменных
- Функции: camelCase (openModal, closeModal)
- Структура: $(document).ready(function() { ... })
- Использование data-атрибутов

## File Organization
- Каждая секция содержит заголовок с separator
- Галереи: .gallery-item, .history-gallery-item, .attractions-gallery-item, .modern-gallery-item
- Карточки: .history-card, .attraction-card, .stat-card
- Модальные элементы с префиксом .gallery-modal, .modal-content

## Naming Patterns
- Секции: lowercase с дефисами (hero-section, gallery)
- Компоненты: descriptive names (history-card, attraction-card)
- Анимации: fadeInUp, fadeInDown (from Animate.css)
- Иконки: FontAwesome (fas fa-*)
