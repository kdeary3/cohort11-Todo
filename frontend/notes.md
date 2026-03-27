Frontend:

```mkdir frontend```
```yarn create vite```
```cd frontend```

Testing setups ```(vitest.dev/guide)```:

1. ```yarn add -D @testing-library/react @testing-library/jest-dom jsdom @testing-library/dom @testing-library/user-event``` -D makes it a dev dependency (doesn't go to end user) rather than a regular dependency 

1. config ```vite.config.ts```
    ```
    /// <reference types="vitest"/>
   import { defineConfig } from 'vitest/config'
    
    ...
    
     test: {
        globals: true, // Allows using 'describe', 'it', 'expect' without imports
        environment: 'jsdom', // Simulates a browser environment
        setupFiles: './src/setupTests.ts', // File for test setup (see below)
        css: true // Optional: Include CSS in tests if needed
    }
    ```
1. config ```package.json```
    ``` 
        "test": "vitest",
        "test:watch": "vitest --watch",
        "test:coverage": "vitest --coverage"
    ```

1. create ```setupTests.ts```

    ```yarn add -D vitest```
    
    ```
    import { expect } from 'vitest';
    import * as matchers from '@testing-library/jest-dom/matchers';
    import '@testing-library/jest-dom'
   import '@testing-library/dom'
    
    expect.extend(matchers);
    ```

1. add compilerOptions to ```tsconfig.json```

    ```  
    "compilerOptions": {
        "types": ["vitest/globals", "@testing-library/jest-dom"],
        "paths": {
          "@/*": [
            "./src/*"
          ]
        }
      },
    ```

1. 
   1. create ```__tests__``` directory in src. 
   2. add ```App.test.tsx``` in ```__tests__```. 
   3. Write tests.
