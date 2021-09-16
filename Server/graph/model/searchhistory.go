package model

type SearchHistory struct {
	tableName struct{} `pg:"SearchHistory"`

	ID            string `json:"id"`
	UserID        string `json:"user_id"`
	SearchHistory string `json:"search_history"`
}
