import { createStore, createEvent } from 'effector';

export const updateTagFilterValue = createEvent<string>();

export const $tagFilterValue = createStore<string>('');

$tagFilterValue.on(updateTagFilterValue, (_, newValue) => newValue);
