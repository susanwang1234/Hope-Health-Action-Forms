const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.log(`[${getTimeStamp}] [INFO] [${namespace}]`, object);
  } else {
    console.log(`[${getTimeStamp}] [INFO] [${namespace}]`);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${getTimeStamp}] [WARN] [${namespace}]`, object);
  } else {
    console.warn(`[${getTimeStamp}] [WARN] [${namespace}]`);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${getTimeStamp}] [ERROR] [${namespace}]`, object);
  } else {
    console.error(`[${getTimeStamp}] [ERROR] [${namespace}]`);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(`[${getTimeStamp}] [DEBUG] [${namespace}]`, object);
  } else {
    console.debug(`[${getTimeStamp}] [DEBUG] [${namespace}]`);
  }
};

export default {
  info,
  warn,
  error,
  debug
};
