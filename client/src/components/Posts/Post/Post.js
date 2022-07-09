import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import { useState } from 'react';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [likes, setLikes] = useState(post?.likes)

    const handleLike = async () => {
        dispatch(likePost(post._id))

        if(post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))) {
            setLikes(post.likes.filter((id) => id !== (user?.result.googleId || user?.result?._id)))
        } else {
            setLikes([ ...post.likes, (user?.result.googleId || user?.result?._id)])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      const openPost = () => history.push(`/posts/${post._id}`)

    return (
            <Card className={classes.card} raised elevation={6}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button 
                            style={{color: 'white'}} 
                            size="small" 
                            onClick={() => {setCurrentId(post._id)}}
                        >
                            <MoreHorizIcon fontSize='medium'/>
                        </Button>
                    </div>
                )}
                <ButtonBase className={classes.cardAction} onClick={openPost}>
                    <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => ` #${tag}`)}</Typography>
                    </div>
                        <Typography className={classes.title} variant="h5" gutterBottom>
                            {post.title.length >= 20 ? 
                                (
                                    <>
                                        {post.title.slice(0,20)}...
                                    </>
                                ) : (post.title)
                            }
                        </Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.message.length >= 80 ?
                                (
                                    <>
                                        {post.message.slice(0, 80)}...
                                    </>
                                ) : (post.message)
                            }
                        </Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                        <Likes/>
                    </Button>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize='small'/>
                            Delete
                        </Button>
                    )}
                </CardActions>

            </Card>
    );
}

export default Post;