import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'

export default defaultConfig({
  config: {
    rootClasses,
    classes: {
      submit:
        'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all',
    },
  },
})
