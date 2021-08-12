package model

type User struct {
	tableName struct{} `pg:"user"`

	Id              string `json:"id"`
	Email           string `json:"email"`
	FullName        string `json:"full_name"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	Picture         string `pg:",use_zero" json:"picture"`
	IsVerified      bool   `pg:",use_zero" json:"is_verified"`
	IsGoogleAccount bool   `pg:",use_zero" json:"is_google_account"`
}
