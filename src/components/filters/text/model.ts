import { createEvent, createStore } from 'effector';

export const updateFilterValue = createEvent<string>();

export const $filterValue = createStore<string>('');

$filterValue.on(updateFilterValue, (_, newValue) => newValue);
