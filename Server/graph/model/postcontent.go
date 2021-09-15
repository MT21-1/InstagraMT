package model

type PostContent struct {
	tableName struct{} `pg:"PostContent"`

	ID     string `json:"id"`
	PostID string `json:"post_id"`
	Type   string `json:"type"`
	Path   string `json:"path"`
}
