import React, {useState, useEffect, useContext, createContext} from 'react';
import { UserContext } from '../../../App';
import Responses from './responses/Responses'
import { BackButton } from '../../layout/styledComponents/styledComponents'
import {Button, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import axios from 'axios';
import Config from '../../../config/index'
import Likes from './likes/Likes'

export const UserIdContext = React.createContext();


const Title = styled(Box) ({
    fontSize: "2.8em",
    textAlign: "center",
    width: '100%',
    color: '#033F63',
    borderBottom: '1px solid #033F63',
    paddingBottom: '20px',
    marginBottom: '20px',

})

const ContentBox1 = styled(Box) ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    marginBottom: '30px',
    borderBottom: '1px solid #033F63',
})
const Video = styled("iframe") ({
    alignSelf: 'center',
    width: "70%",
    borderRadius: "5px",
    height: '400px',
    backgroundColor: 'gray',
    ['@media (max-width:1024px)']: {
        width: "100%",
    }
})

const ItemLists = styled(Box) ({
    display: 'flex',
    paddingTop: "10px",
    h3: {
        paddingRight: "10px",
    },
    ul: {
        listStyle: 'none',
        display: 'flex',
        li: {
            padding: "3px",
            border: "1px solid black",
            marginRight: "10px"
        }
    }
})

const ButtonBox = styled(Box) ({
    display: 'flex',
    paddingTop: "10px",
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottom: "1px solid black",
    paddingBottom: "20px",
})

const HR = styled('div') ({
    padding: 0,
    borderTop: '1px solid #033F63'
})
        
const FormattedBotton = styled(Button) ({
    background: '#033F63',
    color: '#FFFFFF',
    maxWidth: '150px',
    padding: '10px',
    marginLeft: '10px',
    minWidth: '100px',
    img: {
        height: '30px'
    },
    span: {
        paddingLeft: '10px',
        fontSize: '1.2em',
        fontWeight: 'bold'
    },
    '&:hover': {
        backgroundColor: '#213946'
    }
})

const onClicked = () => {
    console.log("licked article")
}

const ViewArticle = (props) => {
    const _id = props.match.params.id
    console.log(props.match)
    const initialEditorState = EditorState.createEmpty();
    const [editorState,setEditorState] = useState(initialEditorState);
    const [article, setArticle] = useState([]);
    const [user_id, setUser_id] = useState([])

    const [user, setUser] = useContext(UserContext);
     useEffect(() => {
        axios.post(`${Config.URL}api/getArticle`, {
            _id: _id
        }).then((response) => {
            setArticle(response.data)
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.post_content))));
        })

        if(localStorage.getItem('userSecret')){
            axios.post(`${Config.URL}api/createViewedArticles`, {userId:localStorage.getItem('userSecret'), articleId:_id}).catch(e=> console.log(e));
        }
        
    }, []);

    const date = new Date(article.published_date)
  
    
    let video = article.video
    
    return (
        <UserIdContext.Provider value={[user_id, setUser_id]}>  
            {article && user_id ? (
                <>
                        <Title>{article.title}</Title> 
                        <ContentBox1>
                        <BackButton/>
                        <p>Date published: {date.toDateString()}</p>
                        </ContentBox1>
                        {video && video.startsWith('https://www.youtube.com') ? (<Video  allow="encrypted-media" allowfullscreen src={video.replace('com/watch?v=', 'com/embed/')} >
                        </Video>) : (null)}
                        
                        <Editor
                        wrapperClassName={"formatedPost"}
                        editorState={editorState}
                        readOnly={true}
                        />
                        <HR/>
                        <ItemLists><h3>Categories: </h3><p>javascript</p></ItemLists>
                        <ItemLists>
                        <h3>Keywords: </h3>
                        <ul>
                            {article.key_terms ? (<>
                                {article.key_terms.map((term, key) =>(
                                <li key={key}>{term}</li>
                            ))}
                            </>) : (null) }
                        </ul>
                    </ItemLists>

                </>
            ) : (<h2>Loaindg article...</h2>) }
           <ButtonBox>
               {article.user_id ? (<>
                {localStorage.getItem('isLoggedIn') && article.user_id.uid == user.uid ? ( 
                    <>
                        <FormattedBotton>Delete</FormattedBotton>
                        <FormattedBotton>Edit Article</FormattedBotton>
                    </>) : 
                    (null)
               }
               </>) : (null) }
               
               <Likes likes={article.likes} article_id={article._id} user_id={user_id} />
           </ButtonBox>
           <Responses article_id ={article._id} user_id={user_id}/>
        </UserIdContext.Provider>
    )
}

export default ViewArticle
