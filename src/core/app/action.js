/**
 * @module App/Actions
 * @description Типы событий этого модуля. Каждое событие с *SEND* имеет два типа событий состояния оканчивающихся на SUCCESS и ERROR
 * @private
 */

/** Приложение инициализируется */
export const APP_INIT = 'App/Init';
/** Отрывает модуль регистрации */
export const APP_OPEN_LOGIN = 'App/OpenLogin';
/** Открывает модуль рекламы приложения */
export const APP_OPEN_ONBOARDING = 'App/OpenOnboarding';
/** Открывает модуль ээксперементов! */
export const APP_OPEN_PLAYGROUND = 'App/OpenPlayground';
/** Обновляет состояние сети */
export const APP_UPDATE_NET_CONNECT = 'App/UpdateNetConnect';
