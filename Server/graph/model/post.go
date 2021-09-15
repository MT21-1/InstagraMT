package model

type Post struct {
	ID           string         `json:"id"`
	UserID       string         `json:"user_id"`
	Caption      string         `json:"caption"`
	CreatedAt    string         `json:"created_at"`
	PostContents []*PostContent `pg:"rel:has-many"`
	PostComments []*PostComment `pg:"rel:has-many"`
	tableName    struct{}       `pg:"Post"`
}
