export type ShellResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export type Shell = {
  exec: (cmd: string, args: string[]) => Promise<ShellResult>;
  which: (bin: string) => string | null;
};
