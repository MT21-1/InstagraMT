package model

type PostReply struct {
	tableName struct{} `pg:"Reply"`

	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	CommentID string `json:"comment_id`
	Reply     string `json:"reply"`
	CreatedAt string `json:"created_at"`
}
