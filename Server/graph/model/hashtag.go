package model

type Hashtag struct {
	tableName struct{} `pg:"Hashtag"`
	ID        string   `json:"id"`
	Hashtag   string   `json:"hashtag"`
}
