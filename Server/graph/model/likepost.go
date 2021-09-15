package model

type LikedPost struct {
	tableName struct{} `pg:"LikedPost"`

	ID     string `json:"id"`
	UserID string `json:"user_id"`
	PostID string `json:"post_id`
}
