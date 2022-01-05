export interface MenuActionType<T> {
  actionName: ((item: T) => string) | string;
  onClick: (item: T) => void;
  permission?: string;
}

export interface IdObj {
  id?: string | undefined;
}
