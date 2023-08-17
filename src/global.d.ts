declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    REACT_APP_PROJECT_KEY: string;
    REACT_APP_CLIENT_SECRET: string;
    REACT_APP_CLIENT_ID: string;
    REACT_APP_AUTH_URL: string;
    REACT_APP_API_URL: string;
    REACT_APP_SCOPES: string;
  }
}
