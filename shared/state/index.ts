import { Event } from '@cobuildlab/react-simple-state';
import { CheckGeneric } from '@cobuildlab/react-simple-state/lib/types';

/**
 * @param event - Event.
 * @param callback - Callback.
 * @param sideEffect - Callback.
 * @returns Reducer fucntion.
 */
export function createSyncAction<T, V extends unknown[], U = unknown>(
  event: Event<T, U>,
  callback: (prevState: T, ...params: V) => CheckGeneric<T, U>,
  sideEffect?: (...params: V) => void,
) {
  return (...params: V): void => {
    if (sideEffect) {
      sideEffect(...params);
    }
    const result = callback(event.get() as T, ...params);

    event.dispatch(result);
  };
}
