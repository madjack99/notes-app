import { createEvent, createStore } from 'effector';

export const $content = createStore<string>('');
export const setContent = createEvent<string>();

$content.on(setContent, (_, value) => value);

export const $tags = createStore<string>('');
export const setTags = createEvent<string>('');

$tags.on(setTags, (_, value) => value);
