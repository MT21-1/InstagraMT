package model

type SavedPost struct {
	tableName struct{} `pg:"SavedPost"`

	ID           string         `json:"id"`
	UserID       string         `json:"user_id"`
	PostID       string         `json:"post_id`
	PostContents []*PostContent `pg:"rel:has-many"`
}
