import React from 'react'
import { Container, Grid } from '@mui/material/'
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import {Button} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { keyframes } from '@mui/system';

const UserArticlesCard = (props) => {

    const bigger = keyframes`
    from {
        transform: scale(0.6);
      }
      to {
        transform: scale(1.2);
      }
    `
    const ArticleContainer = styled(Container) ({
        border: '2px solid #033F63',
        borderRadius: '5px',
        backgroundColor:'#8fc0a98f',
        color: '#033F63',
        margin: '10px',
        padding: '5px',
        marginBottom: '0px',
        textDecoration: 'none',
        width: '100%',
        '.icon1':{
            display:'inline-block',
            position:'relative',
            top:'2px',
            animation:`${bigger} 1.5s ease infinite`
        },
        '.icon2':{
            display:'inline-block',
            position:'relative',
            top:'2px',
        },
        'h2': {
            fontSize: '1.8em',
            paddingTop: '5px',
            paddingBottom: '5px',
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis',
            ['@media (max-width:1260px)']: { 
                width:'700px',
              },
            ['@media (max-width:1089px)']: { 
                width:'500px',
              },
            ['@media (max-width:660px)']: { 
                fontSize:'22px',
                width:'200px'
            },
            '&:hover':{
                wordBreak: 'break-word',
                width:'100%',
                whiteSpace:'normal',
                textShadow:'4px 4px 10px black'
            }     
        },
        'p': {
            fontSize: '1.3em',
            fontWeight: 'bold',
            paddingBottom: '5px',
            color:'#28666e',
        },
        '.pp':{
            fontSize: '1.2em',
            fontWeight: 'normal',
            ['@media (max-width:883px)']: { 
                marginLeft: '20px',
            }
        },
        '&:hover':{
            transform: 'scale(1.02)',
            transition: 'transform .2s ease-in-out',
            background:'#28666E',
            color:'white',
            'p':{
                color:'white'
            }
        },
        boxShadow:'1px 1px 5px black'

    })

    
    const FormattedButton = styled(Button) ({
        background: '#033F63',
        color: '#FFFFFF',
        display:'block',
        padding: '10px',
        width:'98%',
        textAlign:'center',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#213946'
        },
        fontFamily: 'Acme, sans-serif',
        fontSize:'1em',
        
    })

    /*-------------------------------------------------------*/
    let last_revised_date = 'none';
    if (props.last_revised_date){
        last_revised_date = new Date(props.last_revised_date).toLocaleString();
    }
    let published_date = new Date(props.published_date).toLocaleDateString();

    return (
        <ArticleContainer component={Link} to={`/EjKBA/view_article/${props.article_id}`}>
            <Grid container >
                <Grid item container xs={12} md={10}>
                    <Grid item xs={12}>
                        <h2>{props.title}</h2>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={6} md={3}>
                        <p><FavoriteIcon style={{color:'#ff00a5'}} className='icon1' fontSize="small"/>Likes:</p>
                            <p className='pp'>{props.likes}</p>
                        </Grid>
                        <Grid item xs={6} md={3}>
                        <p><ContactPageIcon style={{color:'black'}} className='icon2' fontSize="small"/>Author:</p>
                            <p className='pp'> Yourself</p>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <p>Date published:</p>
                            <p className='pp'>{published_date}</p>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <p>Date revised:</p>
                            <p className='pp'> {last_revised_date}</p> 
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container xs={12} md={2} justifyContent='space-between' alignItems='center'>

                    <Grid item xs={6} md={12} >
                        <FormattedButton component={Link} to={`/EjKBA/edit_article/${props.user_id}/${props.article_id}#editArticle`}>Edit</FormattedButton>
                    </Grid>
                
                    <Grid item xs={6} md={12}>
                        <FormattedButton component={Link} to={`/EjKBA/user_articles?author=${props.user_id}&delete=${props.article_id}`}>delete</FormattedButton>
                    </Grid>      
                </Grid>
            </Grid> 
        </ArticleContainer>
    )
}

export default UserArticlesCard;
