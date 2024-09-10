import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000"
    }),
    // for case Invalidation
    tagTypes:["videos", "video", "RelatedVideos"],
    endpoints: (builder)=>({
        getVideos: builder.query({
            query: () => "/videos",
            // for refetch The API again 8.7 module duration 5.00minit
            keepUnusedDataFor: 600,
            // from line 9
            providesTags:["videos"]
            
        }),
        getVideo: builder.query({
          
            query: (videoId) => `/videos/${videoId}`,
            // eventhow when we cant get video id in the arguments. we can get form result
            providesTags: (result, error, arg)=> [
                {type:"video", id:arg},
            ]
        }),
        // ?title_like=css&title_like=react&_limit=2
        getRelatedVideo: builder.query({
            query: ({id, title}) => {
               
                const tags = title.split(" ")
                const limit = 3
                const likes = tags.map(tag=>`title_like=${tag}`) ;
                const stringQuery = `/videos?${likes.join('&')} &_limit=${limit}`
                return stringQuery;  
        },
        providesTags:(result, error, arg)=>[
            {type:"RelatedVideos", id: arg.id}
        ]
            
        }),
        // lets doing mutatio
        addVideo: builder.mutation({
            query: (data) => ({
                url:"/videos",
                method:"POST",
                body: data,  
            }),
            // from line 15
            invalidatesTags: ["videos"]
            
        }),
        editVideo: builder.mutation({
            query: ({id,data}) => ({
                url:`/videos/${id}`,
                method:"PATCH",
                body: data,
            }),
            // from line 15
            invalidatesTags: (result, error, arg)=> [
                "videos",
                {type:"video", id:arg.id},
                {type:"RelatedVideo", id:arg.id}
            ]
            
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url:`/videos/${id}`,
                method:"DELETE",
            }),
            // from line 15
            invalidatesTags:["videos"]
            
        }),
    })
})
export const {useGetVideosQuery,
     useGetVideoQuery,
      useGetRelatedVideoQuery,
    useAddVideoMutation,
useEditVideoMutation,
useDeleteVideoMutation} = apiSlice;