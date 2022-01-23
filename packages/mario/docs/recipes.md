# Recipes

## use with listr

```tsx
import Listr from 'listr'
import { toListr } from '@aiou/mario/helpers'
import { create } from '@aiou/mario'

const mario = await create(filepath)
const tasks = new Listr(toListr(mario.schema), { concurrent: false })
tasks.run()
await mario.start()
```
