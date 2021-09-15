package model

type LikedReply struct {
	tableName struct{} `pg:"LikedReply"`

	ID      string `json:"id"`
	UserID  string `json:"user_id"`
	ReplyID string `json:"reply_id`
}
