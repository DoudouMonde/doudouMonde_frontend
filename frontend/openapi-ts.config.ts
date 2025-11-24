import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input:'http://localhost:8000/api/docs-json',
    output: {
        path: 'generated/openapi-client',
    },
    plugins: [
        {
            name: '@hey-api/client-next',
            runtimeConfigPath: './src/shared/config/openapi-runtime.ts',
        }
    ],
});