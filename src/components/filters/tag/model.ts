import { createStore, createEvent, combine } from 'effector';

import { $filterValue } from '../text';

export const updateTagFilterValue = createEvent<string>();

export const $tagFilterValue = createStore<string>('');

$tagFilterValue.on(updateTagFilterValue, (_, newValue) => newValue);

export const $isFilterOn = combine(
  $tagFilterValue,
  $filterValue,
  (tagFilterValue, filterValue) => {
    return !!tagFilterValue || !!filterValue;
  }
);
