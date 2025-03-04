import {
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { CommonEntity } from '@/common/entity/common.entity'
import { Hole } from '@/entity/hole/hole.entity'
import { VoteItem } from '@/entity/hole/VoteItem.entity'
import { User } from '@/entity/user/user.entity'

export enum VoteType {
  single = 'single',

  multiple = 'multiple',
}

@Entity()
export class Vote extends CommonEntity {
  @Column({
    comment: '类型',
    type: 'enum',
    enum: VoteType,
    default: VoteType.single,
  })
  type: VoteType

  @CreateDateColumn({
    type: 'timestamp',
    comment: '投票结束时间',
  })
  endTime: Date

  @OneToOne(() => Hole, (hole) => hole.vote)
  hole: Hole

  @ManyToMany(() => User, (user) => user.votes)
  user: User[]

  @OneToMany(() => VoteItem, (voteItem) => voteItem.vote, { cascade: true, eager: true })
  @JoinColumn()
  items: VoteItem[]

  totalCount: number
}
