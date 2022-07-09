import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Card,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../actions/posts";

import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recomendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (id) => history.push(`/posts/${id}`);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recomendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like: #{post.tags.join(", #")}
          </Typography>
          <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={3}
          >
            {recomendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <Grid key={post._id} item xs={12} sm={12} md={4} lg={3}>
                  <Card
                    className={classes.recommendCard}
                    raised
                    elevation={6}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <img
                      className={classes.recommendImage}
                      src={selectedFile}
                    />
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message.length >= 50 ? (
                        <>{message.slice(0, 50)}...</>
                      ) : (
                        post.message
                      )}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
