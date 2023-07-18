import * as process from 'node:process'
import { Command } from 'commander'
import degit from 'degit'
import { version } from './package.json'

const program = new Command()

program
  .name('create-lyc')
  .description('一个vue3初始代码命令')
  .version(version)
  .argument('[dir]', '安装目录', process.cwd())
  .action((dir) => {
    const d = degit('https://github.com/lyric-zemin/vue3-vite-template.git', {
      cache: true,
      force: true,
    })

    d.on('info', (info) => {
      console.log(info.message)
    })

    d.clone(dir).then(() => {
      console.log('done')
    })
  })

program.showHelpAfterError('(添加 --help 展示更多信息)')

program.parse()
