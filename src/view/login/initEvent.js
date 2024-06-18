let isInitEvent = false;

export function getIsInitEvent() {
  return isInitEvent;
}

export function initEvent() {
  isInitEvent = true;
}
