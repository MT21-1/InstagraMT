package authentication

import (
	"fmt"
	"net/smtp"
)

func SendGmail(targetEmail, code string) error {
	from := "instagraMTServices@gmail.com"
	fromPassword := "testestes"

	to := []string{targetEmail}
	message := fmt.Sprintf(
		"To: %s\r\n"+
			"Subject: Verification Code For InstagraMT\r\n"+
			"\r\n"+
			"Verification URL: http://localhost:1234/verify/%s\r\n"+
			"Code: %s\r\n",
		targetEmail,
		targetEmail,
		code,
	)

	auth := smtp.PlainAuth("", from, fromPassword, "smtp.gmail.com")
	err := smtp.SendMail("smtp.gmail.com:587", auth, from, to, []byte(message))
	if err != nil {
		return err
	}

	return nil
}

func SendResetGmail(targetEmail, code string) error {
	from := "instagraMTServices@gmail.com"
	fromPassword := "testestes"

	to := []string{targetEmail}
	message := fmt.Sprintf(
		"To: %s\r\n"+
			"Subject: Reset Password Link For InstagraMT\r\n"+
			"\r\n"+
			"Verification URL: http://localhost:1234/reset/%s\r\n",
		targetEmail,
		code,
	)

	auth := smtp.PlainAuth("", from, fromPassword, "smtp.gmail.com")
	err := smtp.SendMail("smtp.gmail.com:587", auth, from, to, []byte(message))
	if err != nil {
		return err
	}

	return nil
}
