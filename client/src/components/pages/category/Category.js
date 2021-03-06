import React, {useState, useEffect} from 'react'
import SearchBox from '../../layout/search_box/SearchBox'
import axios from 'axios';
import ArticleCardForSearchAndCategory  from '../../layout/ArticleCard/ArticleCardForSearchAndCategory';
import { BackButton } from '../../layout/styledComponents/styledComponents'
import { styled } from '@mui/material/styles';
import {Button, Box} from '@mui/material'
import Config from '../../../config/index'
import Pagination from '@mui/material/Pagination';
import _ from 'lodash';


const Category = (props) => {

    let category = props.location.search.replace('?q=', '')
    const [articleData, setArticleData] = useState({
        articles: null,
        sortby: 'date',
        start: 1,
        pages: 1
    });
    const [userData, setUserData] = useState();
    const [isLoadding, setLoadding] = useState(true)

    useEffect(() => {
        catagory(1)
    }, []);

    
    const catagory = (page) => {
        axios.post(`${Config.URL}api/getCategories`, {
            category : category,
            sort: articleData.sortby,
            start: page,
            }).then((response) => {
                setArticleData({...articleData, start: page, pages: response.data.pages, articles : response.data.articles.reverse()})
                if(!response.data.articles) {
                    setLoadding("no articles found")
                }
            })

            setLoadding(false)
    }

    const StyledDiv = styled('div') ({
        color: "#033F63",
        fontSize: '2.0em',
    })
    
    const Sort = styled(Box) ({
        alignSelf: 'flex-end',
        display: 'flex',
    })

    const handleChange = (event, value) => {
        setLoadding(true)
        if(articleData.pages < value) {
            console.log('no articles found')
        } else {
            catagory(value)
        }
        
    }

    const PaginationArticles = styled(Pagination) ({
        alignSelf: 'center',
        marginTop: '10px',
        button: {
            color: '#033F63',
            fontSize: '1.8em',
            fontWeight: 'bold',
            border: 'none',
            background: 'none',
            
        },
    })

    //console.log(articleData)
    
    return (
        
        <>
            <BackButton/>
            <h2 className="category_title">{_.capitalize(category)}</h2>
            <SearchBox />
            <Sort>
                Newest to Oldest
            </Sort>
            {articleData.articles && !isLoadding ? (
                articleData.articles.map(data => (
                    <ArticleCardForSearchAndCategory  
                    width={'100%'}
                    key={data._id}
                    id={data._id}
                    title={data.title} 
                    likes={data.likes} 
                    date={data.published_date}
                    user_id={data.user_id}
                    />
                ))
                
                ) : 
                (<>Data is loading</>)
            }
            <PaginationArticles count={articleData.pages} defaultPage={articleData.start} onChange={handleChange} siblingCount={0} />

        </>
    )
}

export default Category
