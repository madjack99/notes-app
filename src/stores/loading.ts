import { createStore, createEvent } from 'effector';

const startLoading = createEvent();

const stopLoading = createEvent();

export const $loading = createStore<boolean>(true);

$loading.on(startLoading, () => true).on(stopLoading, () => false);
