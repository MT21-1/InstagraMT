package model

type PostComment struct {
	tableName struct{} `pg:"PostComment"`

	ID        string       `json:"id"`
	UserID    string       `json:"user_id"`
	PostID    string       `json:"post_id`
	Comment   string       `json:"comment"`
	CreatedAt string       `json:"created_at"`
	Replies   []*PostReply `pg:"rel:has-many"`
}
