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
    _id: 'search',
    label: 'Поиск'
  },
  {
    _id: 'crm',
    label: 'CRM',
    children: [
      {
        _id: 'crm-settings',
        label: 'Настройки CRM',
        children: [
          {
            _id: 'crm-settings-status',
            label: 'Статусы/этапы сделки',
            children: [
              {
                _id: 'crm-settings-status-read',
                label: 'Чтение'
              },
              {
                _id: 'crm-settings-status-create',
                label: 'Создание'
              },
              {
                _id: 'crm-settings-status-update',
                label: 'Редактирование'
              },
              {
                _id: 'crm-settings-status-remove',
                label: 'Удаление'
              },
              {
                _id: 'crm-settings-status-change',
                label: 'Смена статуса'
              }
            ]
          }
        ]
      },
      {
        _id: 'crm-orders',
        label: 'Заказы',
        children: [
          {
            _id: 'crm-orders-read',
            label: 'Чтение'
          },
          {
            _id: 'crm-orders-create',
            label: 'Создание'
          },
          {
            _id: 'crm-orders-update',
            label: 'Редактирование'
          },
          {
            _id: 'crm-orders-remove',
            label: 'Удаление'
          }
        ]
      },
      {
        _id: 'crm-type_request',
        label: 'Типы заявок',
        children: [
          {
            _id: 'crm-type_request-read',
            label: 'Чтение'
          },
          {
            _id: 'crm-type_request-create',
            label: 'Создание'
          },
          {
            _id: 'crm-type_request-update',
            label: 'Редактирование'
          },
          {
            _id: 'crm-type_request-remove',
            label: 'Удаление'
          }
        ]
      }
    ]
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
    _id: 'malf',
    label: 'Таблица неисправностей',
    children: [
      {
        _id: 'malf-rservice_panel',
        label: 'Неисправности Rservice'
      },
      {
        _id: 'malf-impuls_panel',
        label: 'Неисправности Impuls'
      },
      {
        _id: 'malf-apple_panel',
        label: 'Неисправности Apple'
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
    _id: 'recording',
    label: 'Записи',
    children: [
      {
        _id: 'recording-for_recording_panel',
        label: 'Tехника для записи',
        children: [
          {
            _id: 'recording-for_recording_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'recording-for_recording_panel-create',
            label: 'Создание'
          },
          {
            _id: 'recording-for_recording_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'recording-for_recording_panel-remove',
            label: 'Удаление'
          }
        ]
      },
      {
        _id: 'recording-not_recording_panel',
        label: 'Tехника не для записи',
        children: [
          {
            _id: 'recording-not_recording_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'recording-not_recording_panel-create',
            label: 'Создание'
          },
          {
            _id: 'recording-not_recording_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'recording-not_recording_panel-remove',
            label: 'Удаление'
          }
        ]
      }
    ]
  },
  {
    _id: 'map',
    label: 'Карты'
  },
  {
    _id: 'device-create',
    label: 'Добавление устройства'
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
      },
      {
        id: 'domains-copy',
        label: 'Копировать пароль'
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
