import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate'
import { Hole } from '@/entity/hole/hole.entity'
import { getAvatarUrl } from '@/utils/user'
import { AppConfig } from '@/app.config'
import { QueryBuilder, SelectQueryBuilder } from 'typeorm'
import { IUser } from '@/app'
import { Comment } from '@/entity/hole/comment.entity'

export const resolvePaginationHoleData = (
  data: Pagination<Hole, IPaginationMeta>,
  config: AppConfig,
) => {
  ;(data.items as any) = data.items.map((item) => {
    if (!item.user.avatar) {
      item.user.avatar = getAvatarUrl(config, item.user)
    }

    return {
      ...item,
      comments: item.comments.slice(0, 2),
      body: `${item.body.slice(0, 300)}${item.body.length > 300 ? '...' : ''}`,
      commentCounts: item.comments.length,
    }
  })
}

export const addCommentIsLiked = (query: SelectQueryBuilder<Comment>, reqUser: IUser) => {
  query.loadRelationCountAndMap(
    'comment.isLiked',
    'comment.favoriteUsers',
    'isLiked',
    (qb) =>
      qb.andWhere('isLiked.studentId = :studentId', {
        studentId: reqUser.studentId,
      }),
  )
}
