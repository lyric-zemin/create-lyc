import { cwd } from 'node:process'
import { Command } from 'commander'
import degit from 'degit'
import { consola } from 'consola'
import { version } from './package.json'

const TEMPLATES = [
  {
    command: 'v3',
    description: 'vue3',
    git: 'https://github.com/lyric-zemin/vue3-vite-template.git',
    options: { isDefault: true },
  },
  {
    command: 'v2',
    description: 'vue2',
    git: 'https://github.com/lyric-zemin/vue2-vite-template.git',
  },
]

const program = new Command()

program
  .name('create-lyc')
  .description('一个生成初始代码的命令')
  .version(version)

for (const { command, description, git, options } of TEMPLATES) {
  program.command(command, options)
    .description(description)
    .argument('[dir]', '安装目录', cwd())
    .option('-f, --force', '覆盖目录文件')
    .action((dir, { force }) => {
      consola.start(`Command [${command}] start...`)

      const d = degit(git, {
        force,
        // cache: true,
      })

      d.on('info', (info) => {
        consola.info(info.message)
      })

      d.clone(dir).then(() => {
        consola.success('Project done!')
      }).catch((err) => {
        consola.error(err)
      })
    })
}

program.showHelpAfterError('(添加 --help 展示更多信息)')

program.parse()
