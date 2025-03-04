import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator'
import { IsVoteExist, IsVoteItemExist } from '@/modules/hole/dto/utils.dto'
import { Limit } from '@/constants/limit'

export class PostVoteDto {
  @IsVoteExist()
  @IsString()
  id: string

  @IsVoteItemExist({
    each: true,
    message: '投票选项不存在哦',
  })
  @ArrayMaxSize(Limit.holeVoteMaxLength, {
    message: `最多只能选${Limit.holeVoteMaxLength}个选项哦`,
  })
  @ArrayMinSize(1, { message: '至少要有一个投票哦' })
  @IsArray()
  ids: string[] = []
}
