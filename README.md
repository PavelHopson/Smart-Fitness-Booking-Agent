<p align="center">
  <h1 align="center">Smart Fitness Booking Agent</h1>
  <p align="center">AI-агент для записи в зал — бронирование тренировок голосом</p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Gemini_AI-Function_Calling-4285F4?logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

---

## About

AI-агент для фитнес-клуба, который обрабатывает запросы клиентов в стиле:

> «Хочу записаться на тренировку завтра вечером»

и автоматически выполняет:
- Извлечение даты и времени из естественной речи
- Получение расписания через внешнее API
- Поиск свободных слотов
- Бронирование
- Подтверждение записи

Проект демонстрирует:
- **Function Calling** — превращение текста в вызовы функций через Gemini AI.
- **Robust API Integration** — `retry` стратегии, `backoff`, таймауты.
- **State Management** — имитация базы данных (Redis/Postgres) для трекинга слотов.

---

## Features

### 1. Natural-language understanding
Агент понимает контекст, сленг и нечёткие даты («послезавтра после обеда», «в эту пятницу на йогу»).

### 2. Function Calling (Tools)
Агент имеет доступ к строго типизированным инструментам:
- `getSchedule(date)` — получение слотов на дату.
- `bookSlot(id, name)` — атомарное бронирование.
- `checkAvailability(ids)` — проверка статуса перед записью.

### 3. Reliability Architecture
Встроенный модуль обеспечивает:
- Повторные попытки при 5xx ошибках.
- Обработку Rate Limits (429).
- Таймауты для медленных соединений.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, TailwindCSS, Lucide Icons |
| AI Core | Google Gemini 2.5 Flash / Pro (`@google/genai`) |
| Function Calling | Gemini native tool use |
| API Client | Custom Retry/Backoff pattern |
| Build | Vite 6, TypeScript 5.8 |
| Simulation | In-memory MockDB (PostgreSQL & Redis behavior) |

---

## Project Structure

```
Smart-Fitness-Booking-Agent/
├── App.tsx                    # Главный компонент приложения
├── index.tsx                  # Entry point
├── index.html                 # HTML-шаблон
├── types.ts                   # TypeScript типы
├── vite.config.ts             # Конфигурация Vite
├── tsconfig.json              # Конфигурация TypeScript
│
├── components/
│   ├── ApiKeyModal.tsx        # Модалка ввода API-ключа
│   └── SlotCard.tsx           # Карточка слота расписания
│
├── services/
│   ├── gemini.ts              # Gemini AI — function calling логика
│   └── mockDb.ts              # In-memory БД (расписание, бронирования)
│
├── api/
│   └── fitnessApiClient.ts   # API-клиент с retry/backoff
│
├── utils/
│   └── retryFetch.ts          # Retry-обёртка над fetch
│
└── server/                    # Node.js reference implementation
    ├── demo.js                # Демо-скрипт
    ├── api/fitnessApiClient.js
    └── utils/retryFetch.js
```

---

## Quick Start

```bash
# Клонировать репозиторий
git clone https://github.com/PavelHopson/Smart-Fitness-Booking-Agent.git
cd Smart-Fitness-Booking-Agent

# Установить зависимости
npm install

# (Опционально) Создать .env с API-ключом
cp .env.example .env
# Отредактировать .env и вставить ваш Gemini API Key

# Запустить dev-сервер
npm run dev
```

Откройте http://localhost:3000 — при первом запуске введите ваш **Gemini API Key** (хранится только локально в браузере).

---

## Node.js API Integration

Репозиторий также содержит эталонную реализацию клиента для Backend-окружения (Node.js 18+).

- `server/api/fitnessApiClient.js` — работа с внешним API
- `server/utils/retryFetch.js` — обработка ошибок, таймаутов, rate limits
- `server/demo.js` — демо-скрипт

```bash
node server/demo.js
```

---

## License

[MIT](LICENSE) &copy; 2025 PavelHopson
