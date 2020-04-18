// TODO временное решение. Общий стор для дерева доступов.
/**
 * TODO Логика такова:
 * раздел
 *  раздел-панель_один
 *    раздел-панель_один-действие_1
 *    раздел-панель_один-действие_3
 *  раздел-панель_два
 *    раздел-панель_два-действие_1
 *    раздел-панель_два-действие_2
 * потом мы будем разделять строку по "-" и получать полный путь с доступом выбранного разлеа
 * при этом все доступы будут храниться в обычном массиве: ['раздел-панель_один-действие_1', 'раздел-панель_один-действие_3', ...]
 */
export default [
  {
    _id: 'sidebar',
    label: 'Левый сайдбар'
  },
  {
    _id: 'rservice',
    label: 'Привязать Rservice'
  },
  {
    _id: 'impuls',
    label: 'Привязать Impuls'
  },
  {
    _id: 'part',
    label: 'Детали',
    children: [
      {
        _id: 'part-read',
        label: 'Чтение'
      },
      {
        _id: 'part-create',
        label: 'Создание'
      },
      {
        _id: 'part-update',
        label: 'Редактирование'
      },
      {
        _id: 'part-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'source',
    label: 'Источники',
    children: [
      {
        _id: 'source-read',
        label: 'Чтение'
      },
      {
        _id: 'source-create',
        label: 'Создание'
      },
      {
        _id: 'source-update',
        label: 'Редактирование'
      },
      {
        _id: 'source-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'report',
    label: 'Отчеты',
    children: [
      {
        _id: 'report-read',
        label: 'Чтение'
      },
      {
        _id: 'report-create',
        label: 'Создание'
      },
      {
        _id: 'report-update',
        label: 'Редактирование'
      },
      {
        _id: 'report-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'users',
    label: 'Пользователи и роли',
    children: [
      {
        _id: 'users-user_panel',
        label: 'Пользователи',
        children: [
          {
            _id: 'users-user_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'users-user_panel-create',
            label: 'Создание'
          },
          {
            _id: 'users-user_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'users-user_panel-remove',
            label: 'Удаление'
          }
        ]
      },
      {
        _id: 'users-role_panel',
        label: 'Роли',
        children: [
          {
            _id: 'users-role_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'users-role_panel-create',
            label: 'Создание'
          },
          {
            _id: 'users-role_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'users-role_panel-remove',
            label: 'Удаление'
          }
        ]
      },
      {
        _id: 'users-session_panel',
        label: 'Сессии',
        children: [
          {
            _id: 'users-session_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'users-session_panel-remove',
            label: 'Удаление'
          }
        ]
      }
    ]
  },
  {
    _id: 'domains',
    label: 'Домены / Сайты',
    children: [
      {
        _id: 'domains-read',
        label: 'Чтение'
      },
      {
        _id: 'domains-create',
        label: 'Создание'
      },
      {
        _id: 'domains-update',
        label: 'Редактирование'
      },
      {
        _id: 'domains-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'settings',
    label: 'Настройки',
    children: [
      {
        _id: 'settings-options_panel',
        label: 'Общие настройки'
      },
      {
        _id: 'settings-api_key_panel',
        label: 'API ключи',
        children: [
          {
            _id: 'settings-api_key_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'settings-api_key_panel-create',
            label: 'Создание'
          },
          {
            _id: 'settings-api_key_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'settings-api_key_panel-remove',
            label: 'Удаление'
          }
        ]
      },
      {
        _id: 'settings-city_panel',
        label: 'Города',
        children: [
          {
            _id: 'settings-city_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'settings-city_panel-create',
            label: 'Создание'
          },
          {
            _id: 'settings-city_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'settings-city_panel-remove',
            label: 'Удаление'
          }
        ]
      }
    ]
  },
  {
    _id: 'code',
    label: 'Консоль'
  }
]
