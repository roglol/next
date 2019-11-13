import axios from 'axios';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Index({res,page}) {
    return (
        <>
        {res.length > 0 ? 
        <Layout title="Hacker Next" description="magari tesloba to">
            <StoryList storyList={res}/>
        <footer><Link href={`/?page=${page+1}`}><a>Next Page ({page+1})</a></Link></footer>
        <style jsx>{`
        footer{
            padding: 1em;
        }
        footer a{
            font-weight:bold;
            color:black;
            text-decoration:none;
        }
        `}</style>
            </Layout> 
            : 
            <Error statusCode={505}/> }      
        </>
    )
}

Index.getInitialProps = async function({req,res,query}){
    let page = query.page ? Number(query.page) : 1
    const response = await axios({
        method:'get',
        url:`https://node-hnapi.herokuapp.com/news?page=${page}`
    })
    return {res: response.data,page:page}
}