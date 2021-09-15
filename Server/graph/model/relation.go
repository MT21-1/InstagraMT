package model

type Relation struct {
	ID         string   `json:"id"`
	FollowID   string   `json:"follow_id"`
	FollowedID string   `json:"followed_id"`
	tableName  struct{} `pg:"Relation"`
}
