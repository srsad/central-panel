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
    _id: 'export_exceptions',
    label: 'Экспорт неисправностей'
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
      },
      {
        _id: 'crm-type_device',
        label: 'Типы устройств',
        children: [
          {
            _id: 'crm-type_device-read',
            label: 'Чтение'
          },
          {
            _id: 'crm-type_device-create',
            label: 'Создание'
          },
          {
            _id: 'crm-type_device-update',
            label: 'Редактирование'
          },
          {
            _id: 'crm-type_device-remove',
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
        label: 'Неисправности Rservice',
        children: [
          {
            _id: 'malf-rservice_panel-read',
            label: 'Просмотр коллекции неисправностей'
          },
          {
            _id: 'malf-rservice_panel-create',
            label: 'Создание коллекции неисправностей'
          },
          {
            _id: 'malf-rservice_panel-update',
            label: 'Редактиорвание коллекции неисправностей'
          },
          {
            _id: 'malf-rservice_panel-remove',
            label: 'Удаление коллекции неисправностей'
          },
          {
            _id: 'malf-rservice_panel-hide',
            label: 'Скрытые коллекции неисправностей'
          }
        ]
      }
      // {
      //   _id: 'malf-impuls_panel',
      //   label: 'Неисправности Impuls'
      // },
      // {
      //   _id: 'malf-apple_panel',
      //   label: 'Неисправности Apple'
      // }
    ]
  },
  {
    _id: 'device',
    label: 'Устройства',
    children: [
      {
        _id: 'device-read',
        label: 'Чтение'
      },
      {
        _id: 'device-create',
        label: 'Создание'
      },
      {
        _id: 'device-update',
        label: 'Редактирование'
      },
      {
        _id: 'device-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'source',
    label: 'Бренды',
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
    _id: 'category',
    label: 'Категории (смартфоны/плашеты/...)',
    children: [
      {
        _id: 'category-read',
        label: 'Чтение'
      },
      {
        _id: 'category-create',
        label: 'Создание'
      },
      {
        _id: 'category-update',
        label: 'Редактирование'
      },
      {
        _id: 'category-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'sites',
    label: 'Настройки сайта',
    children: [
      {
        _id: 'sites-testimonial',
        label: 'Отзывы',
        children: [
          {
            _id: 'sites-testimonial-read',
            label: 'Чтение'
          },
          {
            _id: 'sites-testimonial-create',
            label: 'Создание'
          },
          {
            _id: 'sites-testimonial-update',
            label: 'Редактирование'
          },
          {
            _id: 'sites-testimonial-remove',
            label: 'Удаление'
          }
        ]
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
      },
      {
        _id: 'recording-devace_list',
        label: 'Устройства не для записи (выводится в общемсписке устройств)',
        children: [
          {
            _id: 'recording-devace_list-read',
            label: 'Чтение'
          },
          {
            _id: 'recording-devace_list-create',
            label: 'Создание'
          },
          {
            _id: 'recording-devace_list-update',
            label: 'Редактирование'
          },
          {
            _id: 'recording-devace_list-remove',
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
        _id: 'report-main_branch_panel',
        label: 'Основная',
        children: [
          {
            _id: 'report-main_branch_panel_summorysheat_panel',
            label: 'Сводные листы',
            children: [
              {
                _id: 'report-main_branch_panel_summorysheat_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-main_branch_panel_summorysheat_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-main_branch_panel_summorysheat_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-main_branch_panel_summorysheat_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'report-spb_26047_panel',
        label: 'СПБ 2-я Красноармейская',
        children: [
          {
            _id: 'report-spb_26047_panel_summorysheat_panel',
            label: 'Сводные листы',
            children: [
              {
                _id: 'report-spb_26047_panel_summorysheat_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_26047_panel_summorysheat_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_26047_panel_summorysheat_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_26047_panel_summorysheat_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-spb_26047_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'report-spb_26047_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_26047_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_26047_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_26047_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-spb_26047_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'report-spb_26047_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_26047_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_26047_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_26047_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'report-spb_33038_panel',
        label: 'СПБ Дмитровский',
        children: [
          {
            _id: 'report-spb_33038_panel_summorysheat_panel',
            label: 'Сводные листы',
            children: [
              {
                _id: 'report-spb_33038_panel_summorysheat_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_33038_panel_summorysheat_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_33038_panel_summorysheat_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_33038_panel_summorysheat_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-spb_33038_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'report-spb_33038_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_33038_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_33038_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_33038_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-spb_33038_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'report-spb_33038_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_33038_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_33038_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_33038_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'report-msk_63323_panel',
        label: 'МСК Новослободская',
        children: [
          {
            _id: 'report-msk_63323_panel_summorysheat_panel',
            label: 'Сводные листы',
            children: [
              {
                _id: 'report-msk_63323_panel_summorysheat_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_63323_panel_summorysheat_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_63323_panel_summorysheat_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_63323_panel_summorysheat_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-msk_63323_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'report-msk_63323_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_63323_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_63323_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_63323_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-msk_63323_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'report-msk_63323_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_63323_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_63323_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_63323_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'report-msk_72021_panel',
        label: 'МСК Сеславинская',
        children: [
          {
            _id: 'report-msk_72021_panel_summorysheat_panel',
            label: 'Сводные листы',
            children: [
              {
                _id: 'report-msk_72021_panel_summorysheat_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_72021_panel_summorysheat_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_72021_panel_summorysheat_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_72021_panel_summorysheat_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-msk_72021_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'report-msk_72021_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_72021_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_72021_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_72021_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-msk_72021_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'report-msk_72021_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_72021_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_72021_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_72021_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      }
    ]
  },
  // филиалы
  {
    _id: 'manager',
    label: 'Филиалы',
    children: [
      {
        _id: 'manager-spb_26047_panel',
        label: 'СПБ 2-я Красноармейская',
        children: [
          {
            _id: 'manager-spb_26047_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'manager-spb_26047_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'manager-spb_26047_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'manager-spb_26047_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'manager-spb_26047_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'manager-spb_26047_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'manager-spb_26047_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'manager-spb_26047_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'manager-spb_26047_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'manager-spb_26047_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'manager-spb_33038_panel',
        label: 'СПБ Дмитровский',
        children: [
          {
            _id: 'manager-spb_33038_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'manager-spb_33038_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'manager-spb_33038_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'manager-spb_33038_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'manager-spb_33038_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-spb_33038_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'report-spb_33038_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-spb_33038_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-spb_33038_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-spb_33038_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'manager-msk_63323_panel',
        label: 'МСК Новослободская',
        children: [
          {
            _id: 'manager-msk_63323_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'manager-msk_63323_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'manager-msk_63323_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'manager-msk_63323_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'manager-msk_63323_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'report-msk_63323_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'report-msk_63323_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'report-msk_63323_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'report-msk_63323_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'report-msk_63323_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      },
      {
        _id: 'manager-msk_72021_panel',
        label: 'МСК Сеславинская',
        children: [
          {
            _id: 'manager-msk_72021_panel_schedule_panel',
            label: 'График работ',
            children: [
              {
                _id: 'manager-msk_72021_panel_schedule_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'manager-msk_72021_panel_schedule_panel-create',
                label: 'Создание'
              },
              {
                _id: 'manager-msk_72021_panel_schedule_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'manager-msk_72021_panel_schedule_panel-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'manager-msk_72021_panel_plan_panel',
            label: 'План',
            children: [
              {
                _id: 'manager-msk_72021_panel_plan_panel-read',
                label: 'Чтение'
              },
              {
                _id: 'manager-msk_72021_panel_plan_panel-create',
                label: 'Создание'
              },
              {
                _id: 'manager-msk_72021_panel_plan_panel-update',
                label: 'Редактирование'
              },
              {
                _id: 'manager-msk_72021_panel_plan_panel-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
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
      },
      {
        _id: 'settings-yandex_profiles_panel',
        label: 'Яндекс аккаунты',
        children: [
          {
            _id: 'settings-yandex_profiles_panel-read',
            label: 'Чтение'
          },
          {
            _id: 'settings-yandex_profiles_panel-create',
            label: 'Создание'
          },
          {
            _id: 'settings-yandex_profiles_panel-update',
            label: 'Редактирование'
          },
          {
            _id: 'settings-yandex_profiles_panel-remove',
            label: 'Удаление'
          }
        ]
      },
      {
        _id: 'settings-remonline_panel',
        label: 'Панель от ремонлайн',
        children: [
          {
            _id: 'settings-remonline_panel_branches',
            label: 'Филиалы',
            children: [
              {
                _id: 'settings-remonline_panel_branches-read',
                label: 'Чтение'
              },
              {
                _id: 'settings-remonline_panel_branches-create',
                label: 'Создание'
              },
              {
                _id: 'settings-remonline_panel_branches-update',
                label: 'Редактирование'
              },
              {
                _id: 'settings-remonline_panel_branches-remove',
                label: 'Удаление'
              }
            ]
          },
          {
            _id: 'settings-remonline_panel_brands',
            label: 'Бренды',
            children: [
              {
                _id: 'settings-remonline_panel_brands-read',
                label: 'Чтение'
              },
              {
                _id: 'settings-remonline_panel_brands-create',
                label: 'Создание'
              },
              {
                _id: 'settings-remonline_panel_brands-update',
                label: 'Редактирование'
              },
              {
                _id: 'settings-remonline_panel_brands-remove',
                label: 'Удаление'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: 'constructor',
    label: 'Конструктор сайтов',
    children: [
      {
        _id: 'constructor-read',
        label: 'Чтение'
      },
      {
        _id: 'constructor-create',
        label: 'Создание'
      },
      {
        _id: 'constructor-update',
        label: 'Редактирование'
      },
      {
        _id: 'constructor-remove',
        label: 'Удаление'
      }
    ]
  },
  {
    _id: 'code',
    label: 'Консоль'
  }
]
