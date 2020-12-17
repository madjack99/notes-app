import { createStore, createEvent } from 'effector';

export const startLoading = createEvent();

export const stopLoading = createEvent();

export const $loading = createStore<boolean>(true);

$loading.on(startLoading, () => true).on(stopLoading, () => false);
