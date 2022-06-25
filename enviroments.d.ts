declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        NEXT_PUBLIC_GITHUB_TOKEN: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}