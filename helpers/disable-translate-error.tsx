export default function disableTranslateError () {
  const consoleError = console.error.bind(console);

  console.error = (message, ...args) => {
    if (
      typeof message === 'string' &&
      message.includes('MISSING_MESSAGE: Could not resolve')
    ) {
      return;
    }
    consoleError(message, ...args);
  };
}