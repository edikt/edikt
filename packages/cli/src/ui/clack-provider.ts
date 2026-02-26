import type { SelectOptions, Spinner, UIProvider } from "./provider";

// Stub — implementation pending
export class ClackUIProvider implements UIProvider {
  async select<T>(_options: SelectOptions<T>): Promise<T> {
    throw new Error("Not implemented");
  }

  async confirm(_message: string): Promise<boolean> {
    throw new Error("Not implemented");
  }

  async text(_message: string, _placeholder?: string): Promise<string> {
    throw new Error("Not implemented");
  }

  spinner(_message: string): Spinner {
    throw new Error("Not implemented");
  }
}
