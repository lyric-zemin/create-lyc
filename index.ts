import { cwd } from 'node:process'
import { Command, type CommandOptions } from 'commander'
import degit from 'degit'
import { consola } from 'consola'
import { version } from './package.json'

interface Template {
  /**
   * 命令
   */
  command: string
  /**
   * 描述
   */
  description: string
  /**
   * git 地址
   */
  git: string
  /**
   * degit options
   */
  options?: CommandOptions
}

const TEMPLATES: Template[] = [
  {
    command: 'v3',
    description: 'vue3 初始模板',
    git: 'https://github.com/lyric-zemin/vue3-vite-template.git',
    options: { isDefault: true },
  },
  {
    command: 'v2',
    description: 'vue2 初始模板',
    git: 'https://github.com/lyric-zemin/vue2-vite-template.git',
  },
  {
    command: 'vitesse',
    description: 'vitesse',
    git: 'https://github.com/antfu/vitesse.git',
  },
  {
    command: 'vitesse-lite',
    description: '轻量版的 vitesse ',
    git: 'https://github.com/antfu/vitesse-lite.git',
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
    .option('--cache', '使用缓存版本')
    .action((dir, { force, cache }) => {
      consola.start(`Command [${command}] start...`)

      const d = degit(git, { force, cache })

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
