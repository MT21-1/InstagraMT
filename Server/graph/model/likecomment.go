package model

type LikedComment struct {
	tableName struct{} `pg:"LikedComment"`

	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	CommentID string `json:"comment_id`
}
