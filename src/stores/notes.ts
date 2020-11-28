import { createStore, createEvent } from 'effector';

interface INotes {
  content: string;
  id: number;
}

export const $notes = createStore<INotes[]>([]);
