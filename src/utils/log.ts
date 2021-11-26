/* eslint-disable no-console */

export enum LogLevel {
  none = -1,
  err = 0,
  warn = 1,
  info = 2,
  debug = 3,
  trace = 4,
}

let level: LogLevel = APP_ENV === 'dev' ? LogLevel.debug : LogLevel.none;

export const log = {
  err: (msg: string, meta?: Record<string, unknown>) => {
    if (level >= LogLevel.err) {
      meta ? console.log(`[x]: ${msg}`, JSON.stringify(meta)) : console.log(`[x]: ${msg}`);
    }
  },
  warn: (msg: string, meta?: Record<string, unknown>) => {
    if (level >= LogLevel.warn) {
      meta ? console.log(`[!]: ${msg}`, JSON.stringify(meta)) : console.log(`[!]: ${msg}`);
    }
  },
  info: (msg: string, meta?: Record<string, unknown>) => {
    if (level >= LogLevel.info) {
      meta ? console.log(`[+]: ${msg}`, JSON.stringify(meta)) : console.log(`[+]: ${msg}`);
    }
  },
  debug: (msg: string, meta?: Record<string, unknown>) => {
    if (level >= LogLevel.debug) {
      meta ? console.log(`[-]: ${msg}`, JSON.stringify(meta)) : console.log(`[-]: ${msg}`);
    }
  },
  trace: (msg: string, meta?: Record<string, unknown>) => {
    if (level >= LogLevel.trace) {
      meta ? console.log(`[*]: ${msg}`, JSON.stringify(meta)) : console.log(`[*]: ${msg}`);
    }
  },
  simple: (msg: string, meta?: Record<string, unknown>) => {
    console.log(JSON.stringify(meta));
  },
  setLevel: (val: LogLevel) => (level = val),
};
