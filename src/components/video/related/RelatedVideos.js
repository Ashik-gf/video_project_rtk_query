import { useGetRelatedVideoQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({id, title}) {
    const {data:videos, isLoading, isError, error}= useGetRelatedVideoQuery({id, title});
  
    //  what i have to done
    let content
    if(isLoading){
        content = <RelatedVideoLoader />
    }
    if(!isLoading && isError){
        content = <Error />
    }
    if(!isLoading && !isError && videos?.length === 0){
       content= <p> No video Found</p>
    }
    if(!isLoading && !isError && videos?.length > 0){
       content = videos.map(video=>  <RelatedVideo video={video} key={video.id}/>)
    }
    
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
          {content}
        </div>
    );
}
