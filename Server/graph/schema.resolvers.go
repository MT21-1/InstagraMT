package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"Server/authentication"
	"Server/graph/generated"
	"Server/graph/model"
	"context"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strings"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input model.InputUser) (string, error) {
	usernameExist, usererr := r.UsernameExist(ctx, input.Username)

	if usernameExist {
		return "", usererr
	}

	emailExist, emailerr := r.EmailExist(ctx, input.Email)
	if emailExist {
		return "", emailerr
	}

	u := model.User{
		IsVerified: false,
		Username:   input.Username,
		FullName:   input.FullName,
		Email:      input.Email,
		Password:   authentication.HashPassword(input.Password),
		Picture:    "https://www.pngitem.com/pimgs/m/517-5177724_vector-transparent-stock-icon-svg-profile-user-profile.png",
	}

	_, err := r.Db.Model(&u).Insert()

	if err != nil {
		return "", errors.New("register failed")
	}

	token, _ := authentication.GenerateToken(input.Email)
	authentication.SendGmail(input.Email, token)

	return "Verification Code Sent", nil
}

func (r *mutationResolver) LoginUser(ctx context.Context, input model.LoginUser) (string, error) {
	var u model.User
	emailRegistered, _ := r.EmailExist(ctx, input.Email)

	if !emailRegistered {
		// artinya emailnya ga ada.
		return "", errors.New("invalid email")
	}
	err := r.Db.Model(&u).Where("email = ?", input.Email).First()

	if err != nil {
		return "", errors.New("invalid Email")
	}

	checkPassword := authentication.CheckPasswordHash(input.Password, u.Password)

	if !checkPassword {
		//kalo passwordnya ga cocok
		return "", errors.New("invalid password")
	}

	token, _ := authentication.GenerateToken(input.Email)
	return token, nil
}

func (r *mutationResolver) UsernameExist(ctx context.Context, input string) (bool, error) {
	var user model.User
	err := r.Db.Model(&user).Where("username = ?", input).First()

	if err == nil {
		// Username sudah ada
		return true, errors.New("username is used")
	}

	// Username kosong
	return false, nil
}

func (r *mutationResolver) EmailExist(ctx context.Context, input string) (bool, error) {
	var user model.User
	err := r.Db.Model(&user).Where("email = ?", input).First()

	if err == nil {
		// Email sudah ada
		return true, errors.New("email is used")
	}

	// Email kosong
	return false, errors.New("")
}

func (r *mutationResolver) GmailLogin(ctx context.Context, accessToken string) (string, error) {
	client := http.Client{}
	req, err := http.NewRequest("GET", "https://www.googleapis.com/oauth2/v2/userinfo", nil)
	if err != nil {
		return "", nil
	}

	req.Header.Set("Authorization", "Bearer "+accessToken)

	res, err := client.Do(req)
	if err != nil {
		return "", nil
	}

	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", nil
	}

	var googleInfo authentication.GoogleInfo
	json.Unmarshal(resBody, &googleInfo)

	var user model.User
	err = r.Db.Model(&user).Where("email = ?", googleInfo.Email).First()
	if err == nil {
		token, err := authentication.GenerateToken(user.Email)
		if err != nil {
			return "", err
		}

		return token, nil
	}

	user = model.User{
		FullName:        googleInfo.Name,
		Email:           googleInfo.Email,
		Password:        "user",
		Username:        strings.ReplaceAll(googleInfo.Email, "@", ""),
		Picture:         googleInfo.Picture,
		IsVerified:      true,
		IsGoogleAccount: true,
	}

	_, err = r.Db.Model(&user).Insert()
	if err != nil {
		return "", err
	}

	token, err := authentication.GenerateToken(user.Email)
	if err != nil {
		return "", err
	}

	return token, nil
}

func (r *mutationResolver) IsVerified(ctx context.Context, input string) (bool, error) {
	var u model.User
	err := r.Db.Model(&u).Where("email = ?", input).First()

	if err != nil {
		return false, err
	}

	if u.IsVerified {
		return true, nil
	} else {
		return false, nil
	}
}

func (r *mutationResolver) ResendVerificationCode(ctx context.Context, input string) (string, error) {
	var u model.User
	err := r.Db.Model(&u).Where("email = ?", input).First()
	if err != nil {
		return "", errors.New("email not registered")
	}

	token, err := authentication.GenerateToken(input)
	if err != nil {
		return "", err
	}

	authentication.SendGmail(input, token)

	return "Verification Code Sent", nil
}

func (r *mutationResolver) VerifyUser(ctx context.Context, input model.VerifyEmail) (string, error) {
	email, err := authentication.ParseToken(input.Token)
	print(email)
	if err != nil {
		return "", errors.New("invalid email")
	}

	if email != input.Email {
		return "", errors.New("invalid verification code")
	}

	_, err = r.Db.Model(&model.User{}).Set("is_verified = true").Where("email = ?", email).Update()

	if err != nil {
		//klo error
		return "", errors.New("connection to database failed")
	}

	token, err := authentication.GenerateToken(input.Email)
	if err != nil {
		return "", errors.New("failed to generate token")
	}

	return token, nil
}

func (r *mutationResolver) SendResetPassword(ctx context.Context, input string) (string, error) {
	token, _ := authentication.GenerateToken(input)
	authentication.SendResetGmail(input, token)

	return "Success", nil
}

func (r *mutationResolver) VerifyResetPassword(ctx context.Context, input model.UpdatePassword) (string, error) {
	token := input.Token

	email, _ := authentication.ParseToken(token)

	var u model.User
	err := r.Db.Model(&u).Where("email = ?", email).First()

	if err != nil {
		return "", errors.New("invalid token")
	}
	password := authentication.HashPassword(input.Password)
	_, errs := r.Db.Model(&model.User{}).Set("password = '"+password+"'").Where("email = ?", email).Update()

	if errs != nil {
		return "", errs
	}

	return "Success", nil
}

func (r *mutationResolver) GetUserBasedOnUsername(ctx context.Context, input string) (*model.User, error) {
	var user model.User
	err := r.Db.Model(&user).Where("username = ?", input).First()

	if err != nil {
		return nil, errors.New("invalid username")
	}
	return &user, nil
}

func (r *mutationResolver) GetUserBasedOnEmail(ctx context.Context, input string) (*model.User, error) {
	var user model.User
	err := r.Db.Model(&user).Where("email = ?", input).First()

	if err != nil {
		return nil, errors.New("invalid email")
	}
	return &user, nil
}

func (r *mutationResolver) GetUserBasedOnID(ctx context.Context, input string) (*model.User, error) {
	var user model.User
	err := r.Db.Model(&user).Where("id = ?", input).First()

	if err != nil {
		return nil, errors.New("invalid user_id")
	}
	return &user, nil
}

func (r *mutationResolver) GetPostBasedOnUserID(ctx context.Context, input string) ([]*model.Post, error) {
	var post []*model.Post
	err := r.Db.Model(&post).Where("user_id = ?", input).Select()

	if err != nil {
		return nil, err
	}

	for i := range post {
		var postContent []*model.PostContent
		errs := r.Db.Model(&postContent).Where("post_id = ?", post[i].ID).Select()
		if errs != nil {
			post[i].PostContents = nil
		} else {
			post[i].PostContents = postContent
		}
	}
	for i := range post {
		var postComment []*model.PostComment
		errs := r.Db.Model(&postComment).Where("post_id = ?", post[i].ID).Select()
		if errs != nil {
			post[i].PostComments = nil
		} else {
			post[i].PostComments = postComment
		}
	}

	return post, nil
}

func (r *mutationResolver) GetPostBasedOnPostID(ctx context.Context, input string) (*model.Post, error) {
	var post model.Post
	err := r.Db.Model(&post).Where("id = ?", input).Select()

	if err != nil {
		return nil, err
	}

	var postContent []*model.PostContent
	errs := r.Db.Model(&postContent).Where("post_id = ?", input).Select()

	if errs != nil {
		post.PostContents = nil
	} else {
		post.PostContents = postContent
	}

	var postComment []*model.PostComment
	errss := r.Db.Model(&postComment).Where("post_id = ?", input).Select()
	if errss != nil {
		post.PostComments = nil
	} else {
		post.PostComments = postComment
	}

	for i, content := range postComment {
		var postReply []*model.PostReply
		errsss := r.Db.Model(&postReply).Where("comment_id = ?", content.ID).Select()
		if errsss != nil {
			post.PostComments[i].Replies = nil
		} else {
			post.PostComments[i].Replies = postReply
		}
	}

	return &post, nil
}

func (r *mutationResolver) InsertNewPost(ctx context.Context, input model.NewPost) (*model.Post, error) {
	post := model.Post{
		UserID:  input.UserID,
		Caption: input.Caption,
	}

	_, err := r.Db.Model(&post).Insert()
	if err != nil {
		return nil, err
	}

	contentCount := len(input.Content)
	postContents := make([]*model.PostContent, contentCount)
	for i, content := range input.Content {
		postContents[i] = &model.PostContent{
			Type:   content.Type,
			Path:   content.Path,
			PostID: post.ID,
		}
		print(content.Path)
	}
	_, err2 := r.Db.Model(&postContents).Insert()

	if err2 != nil {
		return nil, err2
	}
	return &post, nil
}

func (r *mutationResolver) CreateRelation(ctx context.Context, input model.NewRelation) (*model.Relation, error) {
	rel := model.Relation{
		FollowID:   input.FollowID,
		FollowedID: input.FollowedID,
	}
	_, err := r.Db.Model(&rel).Insert()
	if err != nil {
		return nil, err
	}
	return &rel, nil
}

func (r *mutationResolver) DeleteRelation(ctx context.Context, input model.NewRelation) (bool, error) {
	var rel model.Relation
	r.Db.Model(&rel).Where("follow_id = ? AND followed_id = ?", input.FollowID, input.FollowedID).Delete()

	return true, nil
}

func (r *mutationResolver) GetFollowers(ctx context.Context, input string) ([]*model.Relation, error) {
	var rel []*model.Relation
	err := r.Db.Model(&rel).Where("followed_id = ?", input).Select()
	if err != nil {
		return nil, err
	}
	return rel, nil
}

func (r *mutationResolver) GetFollowing(ctx context.Context, input string) ([]*model.Relation, error) {
	var rel []*model.Relation
	err := r.Db.Model(&rel).Where("follow_id = ?", input).Select()
	if err != nil {
		return nil, err
	}
	return rel, nil
}

func (r *mutationResolver) IsFollowing(ctx context.Context, input model.NewRelation) (bool, error) {
	var rel model.Relation
	err := r.Db.Model(&rel).Where("follow_id = ? AND followed_id = ?", input.FollowID, input.FollowedID).First()
	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) SearchUser(ctx context.Context, input string) ([]*model.User, error) {
	var users []*model.User

	if input == "" {
		return nil, nil
	}

	err := r.Db.Model(&users).Where("username LIKE ? and is_verified = true", "%"+input+"%").Select()

	if err != nil {
		return nil, err
	}
	return users, nil
}

func (r *mutationResolver) SearchHashtag(ctx context.Context, input string) ([]*model.Hashtag, error) {
	var hashtags []*model.Hashtag

	if input == "" {
		return nil, nil
	}

	err := r.Db.Model(&hashtags).Where("hashtag LIKE ?", "%"+input+"%").Select()

	if err != nil {
		return nil, err
	}
	return hashtags, nil
}

func (r *mutationResolver) DeletePostByID(ctx context.Context, input string) (bool, error) {
	var post model.Post
	r.Db.Model(&post).Where("id = ?", input).Delete()
	return true, nil
}

func (r *mutationResolver) EditPostByID(ctx context.Context, input model.NewEditPost) (bool, error) {
	var post model.Post
	_, err := r.Db.Model(&post).Set("caption = '"+input.NewCaption+"'").Where("id = ?", input.PostID).Update()
	if err != nil {
		return false, err
	}
	return true, err
}

func (r *mutationResolver) GetSavedPostBasedOnUserID(ctx context.Context, input string) ([]*model.SavedPost, error) {
	var post []*model.SavedPost
	err := r.Db.Model(&post).Where("user_id = ?", input).Select()

	if err != nil {
		return nil, err
	}

	for i := range post {
		var postContent []*model.PostContent
		errs := r.Db.Model(&postContent).Where("post_id = ?", post[i].PostID).Select()
		if errs != nil {
			post[i].PostContents = nil
		} else {
			post[i].PostContents = postContent
		}
	}

	return post, nil
}

func (r *mutationResolver) GetTaggedPostBasedOnUserID(ctx context.Context, input string) ([]*model.TaggedPost, error) {
	var post []*model.TaggedPost
	err := r.Db.Model(&post).Where("user_id = ?", input).Select()

	if err != nil {
		return nil, err
	}

	for i := range post {
		var postContent []*model.PostContent
		errs := r.Db.Model(&postContent).Where("post_id = ?", post[i].PostID).Select()
		if errs != nil {
			post[i].PostContents = nil
		} else {
			post[i].PostContents = postContent
		}
	}

	return post, nil
}

func (r *mutationResolver) SavePostByID(ctx context.Context, input model.NewSavedPost) (bool, error) {
	post := model.SavedPost{
		UserID: input.UserID,
		PostID: input.PostID,
	}
	_, err := r.Db.Model(&post).Insert()
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) UnsavePostByID(ctx context.Context, input model.NewSavedPost) (bool, error) {
	var post model.SavedPost
	r.Db.Model(&post).Where("post_id = ? AND user_id = ?", input.PostID, input.UserID).Delete()
	return true, nil
}

func (r *mutationResolver) LikePostByID(ctx context.Context, input model.NewLikedPost) (bool, error) {
	newLike := model.LikedPost{
		UserID: input.UserID,
		PostID: input.PostID,
	}
	_, err := r.Db.Model(&newLike).Insert()
	if err != nil {
		return false, nil
	}
	return true, nil
}

func (r *mutationResolver) UnLikePostByID(ctx context.Context, input model.NewLikedPost) (bool, error) {
	var likePost model.LikedPost
	r.Db.Model(&likePost).Where("post_id = ? AND user_id = ?", input.PostID, input.UserID).Delete()
	return true, nil
}

func (r *mutationResolver) CommentPost(ctx context.Context, input model.NewComment) (bool, error) {
	comment := model.PostComment{
		UserID:  input.UserID,
		PostID:  input.PostID,
		Comment: input.Comment,
	}
	_, err := r.Db.Model(&comment).Insert()
	if err != nil {
		return false, err
	}
	return true, err
}

func (r *mutationResolver) DeleteCommentByID(ctx context.Context, input string) (bool, error) {
	var comment model.PostComment
	r.Db.Model(&comment).Where("id = ?", input).Delete()
	return true, nil
}

func (r *mutationResolver) LikeCommentByID(ctx context.Context, input model.NewLikeComment) (bool, error) {
	likeComment := model.LikedComment{
		UserID:    input.UserID,
		CommentID: input.CommentID,
	}
	_, err := r.Db.Model(&likeComment).Insert()
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) UnlikeCommentByID(ctx context.Context, input model.NewLikeComment) (bool, error) {
	var likeComment model.LikedComment

	r.Db.Model(&likeComment).Where("comment_id = ? AND user_id = ?", input.CommentID, input.UserID).Delete()
	return true, nil
}

func (r *mutationResolver) PostIsLiked(ctx context.Context, input model.NewLikedPost) (bool, error) {
	var likedpost model.LikedPost

	err := r.Db.Model(&likedpost).Where("user_id = ? AND post_id = ?", input.UserID, input.PostID).Select()

	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) PostIsSaved(ctx context.Context, input model.NewSavedPost) (bool, error) {
	var saved model.SavedPost
	err := r.Db.Model(&saved).Where("user_id = ? AND post_id = ?", input.UserID, input.PostID).Select()
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) CommentIsLiked(ctx context.Context, input model.NewLikeComment) (bool, error) {
	var likedpost model.LikedComment

	err := r.Db.Model(&likedpost).Where("user_id = ? AND comment_id = ?", input.UserID, input.CommentID).Select()

	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) CommentLikeCount(ctx context.Context, input *string) (int, error) {
	var LikedComment []*model.LikedComment
	err := r.Db.Model(&LikedComment).Where("comment_id = ?", input).Select()
	if err != nil {
		return 0, err
	}
	len := 0
	for range LikedComment {
		len++
	}
	return len, nil
}

func (r *mutationResolver) PostLikeCount(ctx context.Context, input string) (int, error) {
	var postLike []*model.LikedPost
	err := r.Db.Model(&postLike).Where("post_id = ?", input).Select()
	if err != nil {
		return 0, err
	}
	len := 0
	for range postLike {
		len++
	}
	return len, nil
}

func (r *mutationResolver) PostCommentCount(ctx context.Context, input string) (int, error) {
	var PostComment []*model.PostComment
	err := r.Db.Model(&PostComment).Where("post_id = ?", input).Select()
	if err != nil {
		return 0, err
	}
	len := 0
	for range PostComment {
		len++
	}
	return len, nil
}

func (r *mutationResolver) LikeReplyByID(ctx context.Context, input model.NewLikedReply) (bool, error) {
	newLike := model.LikedReply{
		UserID:  input.UserID,
		ReplyID: input.ReplyID,
	}
	_, err := r.Db.Model(&newLike).Insert()
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) UnlikeReplyByID(ctx context.Context, input model.NewLikedReply) (bool, error) {
	var newLike model.LikedReply
	r.Db.Model(&newLike).Where("reply_id = ? AND user_id = ?", input.ReplyID, input.UserID).Delete()
	return true, nil
}

func (r *mutationResolver) PostReply(ctx context.Context, input model.NewReply) (bool, error) {
	newReply := model.PostReply{
		UserID:    input.UserID,
		CommentID: input.CommentID,
		Reply:     input.Reply,
	}

	_, err := r.Db.Model(&newReply).Insert()
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) DeleteReplyByID(ctx context.Context, input string) (bool, error) {
	var reply model.PostReply
	r.Db.Model(&reply).Where("id = ?", input).Delete()
	return true, nil
}

func (r *mutationResolver) ReplyIsLiked(ctx context.Context, input model.NewLikedReply) (bool, error) {
	var likereply model.LikedReply
	err := r.Db.Model(&likereply).Where("reply_id = ? AND user_id = ?", input.ReplyID, input.UserID).Select()
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) ReplyLikeCount(ctx context.Context, input string) (int, error) {
	var likereply []*model.LikedReply
	err := r.Db.Model(&likereply).Where("reply_id = ?", input).Select()
	if err != nil {
		return 0, err
	}
	len := 0
	for range likereply {
		len++
	}
	return len, nil
}

func (r *mutationResolver) SelectPostExplorePage(ctx context.Context, nextpost *string) (*model.PostPagged, error) {
	var posts []*model.Post
	query := r.Db.Model(&posts)

	if nextpost != nil {
		query = query.Where("id <= ? and DATE_PART('day',current_date::timestamp - created_at::timestamp) <= 7", nextpost)
	} else {
		query = query.Where("DATE_PART('day',current_date::timestamp - created_at::timestamp) <= 7")
	}

	err := query.Relation("PostContents").Order("id desc").Limit(4).Select()
	if err != nil {
		return nil, err
	}

	var postPagged model.PostPagged
	postLength := len(posts)
	if postLength == 4 {
		postPagged.Posts = posts[:postLength-1]
		postPagged.Nextpost = posts[postLength-1].ID
		postPagged.Hasnext = true
	} else {
		postPagged.Posts = posts
		postPagged.Hasnext = false
	}
	return &postPagged, nil
}

func (r *mutationResolver) SelectPostHomePage(ctx context.Context, nextpost *string, userID string) (*model.PostPagged, error) {
	var relations []*model.Relation
	// ambil dia follo siapa
	err := r.Db.Model(&relations).Where("follow_id = ?", userID).Select()

	if err != nil {
		return nil, err
	}

	var user model.User
	// buat arrey untuk nyimpan followed pny id
	lenUser := len(relations)
	followed_id := make([]string, lenUser)

	for i, u := range relations {
		err = r.Db.Model(&user).Where("id = ?", u.FollowedID).Select()
		followed_id[i] = user.Id
	}
	// tambahin sm puny sendiri spy bisa liat post sendiri
	followed_id = append(followed_id, userID)

	if len(followed_id) == 0 {
		return nil, err
	}

	var posts []*model.Post
	query := r.Db.Model(&posts)

	if nextpost != nil {
		query = query.Where("id <=?", nextpost).WhereIn("user_id in(?)", followed_id)
	} else {
		query = query.WhereIn("user_id in (?)", followed_id)
	}

	err = query.Relation("PostContents").Order("id desc").Limit(4).Select()
	if err != nil {
		return nil, err
	}

	var postPagged model.PostPagged
	postLength := len(posts)

	if postLength == 4 {
		postPagged.Posts = posts[:postLength-1]
		postPagged.Nextpost = posts[postLength-1].ID
		postPagged.Hasnext = true
	} else {
		postPagged.Posts = posts
		postPagged.Hasnext = false
	}
	return &postPagged, nil
}

func (r *mutationResolver) GetMutualFriend(ctx context.Context, input string) ([]*model.User, error) {
	var rels []*model.Relation
	err := r.Db.Model(&rels).Where("follow_id = ?", input).Select()
	if err != nil {
		return nil, err
	}

	followedCount := len(rels)
	followed_users_id := make([]string, followedCount)
	for i, u := range rels {
		followed_users_id[i] = u.FollowedID
	}

	var FollowingFollows []*model.Relation
	err2 := r.Db.Model(&FollowingFollows).WhereIn("follow_id in (?)", followed_users_id).Where("followed_id != ?", input).WhereIn("followed_id not in (?)", followed_users_id).Select()

	if err2 != nil {
		return nil, err2
	}

	mutualCount := len(FollowingFollows)
	mutualUser := make([]string, mutualCount)

	for i, mutual := range FollowingFollows {
		mutualUser[i] = mutual.FollowedID
	}

	var mutuals []*model.User

	err3 := r.Db.Model(&mutuals).WhereIn("id in (?) ", mutualUser).Select()

	if err3 != nil {
		return nil, err3
	}

	return mutuals, nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	err := r.Db.Model(&users).Select()

	if err != nil {
		return nil, errors.New("fail to retrieve data")
	}

	return users, errors.New("")
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
