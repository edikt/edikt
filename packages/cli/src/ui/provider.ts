export interface Spinner {
  start(message?: string): void;
  stop(message?: string): void;
  succeed(message?: string): void;
  fail(message?: string): void;
}

export interface SelectOptions<T> {
  message: string;
  options: Array<{ value: T; label: string; hint?: string }>;
}

export interface UIProvider {
  select<T>(options: SelectOptions<T>): Promise<T>;
  confirm(message: string): Promise<boolean>;
  text(message: string, placeholder?: string): Promise<string>;
  spinner(message: string): Spinner;
}
