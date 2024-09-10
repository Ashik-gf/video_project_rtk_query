import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    // if u want ot send any parameters into useGEtVideosQuery({}) use {} for..
    const {data:videos, isLoading, isError, error} = useGetVideosQuery();
    // what we want to do in UI/UX
    let content = null;
    if(isLoading){content = <VideoLoader />}
    if(!isLoading && isError){content = <Error />}
    if(!isLoading && !isError && videos?.length === 0){content = <p> No video Found</p>}
    if(!isLoading && !isError && videos?.length > 0){content =
         videos.map(video=><Video video={video} key={video.id} /> )}
    return (
        <>
            {content}
        </>
    );
}
