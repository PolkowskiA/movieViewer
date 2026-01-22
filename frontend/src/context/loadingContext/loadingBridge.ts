let start: (() => void) | null = null;
let stop: (() => void) | null = null;

export function registerLoadingHandlers(
  onStart: () => void,
  onStop: () => void,
) {
  start = onStart;
  stop = onStop;
}

export function startGlobalLoading() {
  start?.();
}

export function stopGlobalLoading() {
  stop?.();
}
