const table = 'ContentMetadata'
const fillable = [
    'id',
    'user_id',
    'category_id',
    'video_title',
    'video_description',
    'video_genre',
    'video_viewers',
    'video_share',
    'video_saves',
    'video_downloads',
    'thumbnail',
    'privacy',
    'metavideos',
    'subtitle',
    'comments',
    'likes',
    'dislikes'
]

module.exports = {
    table,
    fillable
}