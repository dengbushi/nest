import { CommonEntity } from '@/common/entity/common.entity'
import {
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Hole } from '@/entity/hole/hole.entity'
import { User } from '@/entity/user/user.entity'
import { Reply } from '@/entity/hole/reply.entity'

@Entity()
export class Comment extends CommonEntity {
  @Column('text', { comment: '留言内容' })
  body: string

  @ManyToOne(() => Hole, (hole) => hole.comments, { cascade: true })
  hole: Hole

  @ManyToOne(() => User, (user) => user.comments, { cascade: true })
  user: User

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[]

  @Column({
    comment: '点赞数',
    default: 0,
  })
  @Index()
  favoriteCounts: number

  @Column({
    comment: '图片',
    type: 'simple-array',
  })
  imgs: string[]

  @ManyToMany(() => User, (user) => user.favoriteComment)
  favoriteUsers: User[]

  @AfterUpdate()
  async afterLoad() {
    this.favoriteCounts = this.favoriteUsers?.length
  }

  // TODO use @VirtualMapColumn() WIP...
  repliesCount?: number
}
