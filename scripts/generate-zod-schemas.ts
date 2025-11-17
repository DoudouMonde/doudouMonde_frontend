import { generate } from 'openapi-typescript-zod';
import { readFileSync } from 'fs';
import { join } from 'path';

async function generateZodSchemas() {
  const swaggerPath = join(__dirname, '../swagger.json');
  const outputPath = join(__dirname, '../packages/shared/src/generated/schemas.ts');
  
  try {
    const swaggerJson = JSON.parse(readFileSync(swaggerPath, 'utf-8'));
    
    // openapi-typescript-zod로 zod 스키마 생성
    await generate({
      openApi: swaggerJson,
      outputPath,
    });
    
    console.log(`✅ Zod schemas generated at: ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to generate Zod schemas:', error);
    process.exit(1);
  }
}

generateZodSchemas();

