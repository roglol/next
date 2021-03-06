import axios from 'axios';
import Error from 'next/error';
import Layout from '../components/Layout';

export default function Story({story}) {
    return (
        story ? 
            <Layout title={story.title}>
            <main>
                <h1 className='story-title'><a href={story.url}>{story.title}</a></h1>
                <div className="story-details">
                    <strong>{story.points} points</strong>
                    <strong>{story.comments_count} comments</strong>
                    <strong>{story.time_ago}</strong>
                </div>
            </main>
            <style jsx>{`
            main{
                padding:1em;
            }
            .story-title{
                font-size:1.2rem;
                margin:0;
                font-weight: 300;
                padding-bottom: 0.5em;
            }
            .story-title a{
                color: #333;
                text-decoration: none;
            }
            .story-title a:hover{
                text-decoration:underline;
            }
            .story-details{
                font-size: 0.8rem;
                padding-bottom: 1em;
                border-bottom: 1px solid rgba(0,0,0,0.1)
            }
            .story-details strong{
                margin-right: 1em;
            }
            .story-details a{
                color: #f60;
            }
            `}</style>
            </Layout> 
            :
            <Error statusCode={503}/>
    )
    
}

Story.getInitialProps = async function({req,res,query}){
    let story
    try{
        let storyId = query.id
         story = await axios({
            method:'get',
            url:`https://node-hnapi.herokuapp.com/item/${storyId}`
        })
    } catch(err) {
        console.log(err)
        story=null;
    }
    
    return {story:story.data}
}