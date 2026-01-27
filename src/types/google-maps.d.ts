export {};

declare global {
  // Minimal typing to avoid adding heavy external types.
  // The Google Maps JS SDK attaches itself to `window.google`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const google: any;
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}

