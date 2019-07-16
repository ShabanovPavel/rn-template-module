/**
 * @module App/Actions
 * @description Типы событий этого модуля. Каждое событие с *SEND* имеет два типа событий состояния оканчивающихся на SUCCESS и FAILD
 * @private
 */

/** Приложение инициализируется */
export const APP_INIT = 'App/Init';
/** Отрывает модуль основного приложения */
export const APP_OPEN_MAIN = 'App/OpenMain';
/** Открывает модуль рекламы приложения */
export const APP_OPEN_ONBOARDING = 'App/OpenOnboarding';
/** Открывает модуль ээксперементов! */
export const APP_OPEN_PLAYGROUND = 'App/OpenPlayground';
/** Открыть модуль индикаторов */
export const APP_OPEN_INDICATORS = 'App/OpenIndicators';
/** Обновляет состояние сети */
export const APP_UPDATE_NET_CONNECT = 'App/UpdateNetConnect';
