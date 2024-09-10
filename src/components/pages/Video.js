import { useParams } from "react-router-dom";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import Error from "../ui/Error";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import { useEffect } from "react";

export default function Video() {
    const {videoId} = useParams();
    const {data:video, isLoading, isError, error} = useGetVideoQuery(videoId)
 
     let content = null
    if(isLoading){content = <div><PlayerLoader /> <DescriptionLoader /></div> }

    if( !isLoading && isError) {content = <Error />}

    if( !isLoading && !isError && video?.length === 0) {content = <p>No video Found</p>}

    if( !isLoading && !isError && video?.id > 0) {content = <div className="col-span-full w-full space-y-8 lg:col-span-2">
    <Player link={video.link} title={video.title} />
    <Description id={video.id} date={video.date} title={video.title} desricption={video.description}  />
</div>}
    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                   {content}

                   { video?.id ? <RelatedVideos id={video.id} title={video.title} /> : isLoading ? <>
                   <RelatedVideoLoader />
                   <RelatedVideoLoader />
                   <RelatedVideoLoader />
                   </> : <Error />} 
                </div>
            </div>
        </section>
    );
}
