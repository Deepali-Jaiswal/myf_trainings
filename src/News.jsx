import axios from 'axios'
import { useEffect, useState} from 'react'
import { Grid,Card,CardContent,Typography,Button,CardMedia,CardActions} from '@mui/material';
import Searchbar from './Searchbar';


// const BASE_URL="https://newsdata.io/api/1/news?apikey=";
// const api_key=process.env.REACT_APP_TOKEN_APP;


const News = () => {

  const [articles,setArticles]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);

  const fetchData=async(query)=>{
    const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_425434642cd622f3dfc17a4e5a076bc5f9be7&q=${query}&language=en`;
    console.log("API URL:", apiUrl);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response:", response.data);
        setArticles(response.data.results);
        console.log(articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });

  }


  useEffect(()=>{
    fetchData("international");
  },[]);


  const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    

  return (

    <>
    <Searchbar/>
    <Grid container spacing={3} justifyContent="center" sx={{my:3,p:2}}>
    
    {currentArticles?.map((data,index)=>{
      return(
        <Card sx={{ width: 345, mx:2,my:2}} key={index}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={(data?.image_url) || ("https://apicms.thestar.com.my/uploads/images/2024/04/28/2666303.jpg")}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.title?.slice(0,50)}...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.description?.slice(0,200)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={data?.source_url}>Learn More</Button>
      </CardActions>
    </Card> 
      )
    })}  
   </Grid>

   <div justifyContent="center">
        {Array.from(
          { length: Math.ceil(articles.length / articlesPerPage) },
          (_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          )
        )}
   </div>
    </>

  )
}

export default News;