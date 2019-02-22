/**
 * @module App
 * @description  Главный модуль приложения. Выполняет закулисную логику, хранит глобальные состояния приложения
 * */
import AppScreen from './main';
import appReducer from './reducer';

export * from './action';
export {appReducer, AppScreen};
