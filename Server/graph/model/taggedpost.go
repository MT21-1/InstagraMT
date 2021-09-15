package model

type TaggedPost struct {
	tableName struct{} `pg:"TaggedPost"`

	ID           string         `json:"id"`
	UserID       string         `json:"user_id"`
	PostID       string         `json:"post_id`
	PostContents []*PostContent `pg:"rel:has-many"`
}
