# [Quizzes](https://t.me/QuzzesUGC_bot) - телеграм бот с викторинами для детей и взрослых ( Telegraf + TS)

## Описание

1. Бот задает вопросы. Для каждого вопроса доступно несколько вариантов ответа,
   один из которых является верным. После выбора ответа бот предоставит
   объяснение к вопросу и сообщит, правильно ли был выбран ответ.

2. Бот поддерживает общение с пользователем через Yandex GPT.

## Создание проекта

- mkdir tg-bot-quizzes-telegraf-ts
- cd tg-bot-quizzes-telegraf-ts
- code .
- yarn init -y
- tsc --init
- yarn add -D @types/node
- yarn add dotenv
- yarn add telegraf
- yarn add -D @telegraf/types
- yarn add -D tsc-watch
- yarn add -D typescript
- yarn add -D sharp
- yarn add -D fs-extra
- git init

## Ветки

- main - главная ветка (ветка деплоя)
- develop - ветка разработки
- feature/... - ветки фич

## Архитектура

- src/
- │
- ├── ai/ - ИИ Yandex GPT
- │ ├── constants.ts - константы для Yandex API
- │ ├── dataGpt.interface.ts
- │ ├── fetchAIResponseGptAsync.ts - асинхронный запрос к Yandex GPT
- │ ├── getSystemText.ts - стиль ответа GPT
- │ ├── operation.interface.ts
- │ ├── responseGptAsync.interface.ts
- │ ├── sendGetRequest.ts
- │ ├── sendPostRequest.ts
- │ └── ...
- │
- ├── commands/ - команды бота
- │ ├── commands.ts
- │ └── ...
- │
- ├── data/ - данные для викторин
- │ ├── interface.data.ts
- │ ├── interface.quiz.ts
- │ ├── data.ts
- │ ├── data....ts
- │ ├── data....ts
- │ └── ...
- │
- ├── game/ - игра
- │ ├── game.ts
- │ └── ...
- │
- ├── handlers/ - обработчики
- │ ├── helpCommandHandler.ts
- │ ├── startCommandHandler.ts
- │ ├── resetCommandHandler.ts
- │ ├── categorySelectionHandler.ts
- │ ├── messageHandler.ts
- │ ├── questionAnswerHandler.ts
- │ ├── quizCompletionHandler.ts
- │ ├── quizProgressHandler.ts
- │ └── ...
- │
- ├── loggers/ - логирование
- │ ├── loggers.ts
- │ ├── fileHelpers.ts
- │ ├── appendError.ts
- │ ├── appendLog.ts
- │ ├── appendQuizResult.ts
- │ ├── interface.quizRezult.ts
- │ └── ...
- │
- ├── senders/ - отправщки
- │ ├── questionSender.ts
- │ ├── imageSender.ts
- │ ├── factSender.ts
- │ ├── completionSender.ts
- │ └── ...
- │
- ├── states/ - состояния
- │ ├── botState.ts
- │ ├── interface.userState.ts
- │ ├── userStates.ts
- │ └── ...
- │
- ├── utils/ - утилиты
- │ ├── changeListAnswersAndSelectFact.ts
- │ ├── delay.ts
- │ ├── gracefulShutdown.ts
- │ └── ...
- │
- ├── convertImagesToWebp/ - конвертер изображений в Webp 900*900
- │ └── convertImages.js
- │
- ├── originalImages/ - оригинальные изображения
- │ ├── animals/
- │ ├── insects/
- │ └── ...
- │
- ├── quizzes.ts
- ├── constants.ts
- └── ...

## Log

- appendLog.ts - логи запуска, остановки бота ... INFO
- appendError.ts - логи ошибок отправки сообщений ... ERROR
  - appendToFile.ts в файл /logFiles/botLog.ts

- appendQuizResult.ts - сохранение результатов пройденных викторин
  - appendToFile.ts в файл /logFiles/quizResults.ts

## Что можно изменить, добавить:

- Поменять время задержки после появления картинки

- Поменять время задержки после ответа на вопрос

- Выводить информацию правильно или неправильно ответил пользователь

- По окончанию игры вывести картинку

- Если ответил правильно на все вопросы сообщить об этом

- Показывать прогресс игры ( добрался до середины, сколько осталось вопросов)

- При отправке пользователем сообщения, сообщать что такого функционала нет и
  удалять сообщение

- Разнообразие. Большее количество вариантов ответов и случайный выбор поднабора
  вариантов для каждого прохождения викторины создают уникальный опыт каждый
  раз.

- Повторение. Повторное прохождение викторины с разными вариантами ответов и
  фактами помогает укрепить знания и лучше запомнить информацию.

- Избегание запоминания. Использование случайных вариантов ответов препятствует
  простому запоминанию правильных ответов и стимулирует детей думать и делать
  осознанный выбор.

- Удержание интереса. Случайный выбор интересных фактов после каждого вопроса
  поддерживает интерес детей и делает обучение веселым и захватывающим.

## Список тем, которые могут заинтересовать детей для викторины:

- Динозавры и доисторические существа
- Космос и планеты
- Насекомые и маленькие обитатели природы
- Морские животные и рыбы
- Дикие животные и их среда обитания
- Птицы и их особенности
- Растения и цветы
- Транспорт и средства передвижения
- Погода и природные явления
- Сказочные персонажи и мифические существа
