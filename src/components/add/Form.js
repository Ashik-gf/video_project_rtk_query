// import Success from "../ui/Success";
import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form() {
    // addVideo comes from the name we give in EndPoints
    // in this AddVideo is A functon for submit button. data:video can get data when add video completed and ApI give response
    const [addVideo, { data:video, isLoading, isError, error, isSuccess}]= useAddVideoMutation();
    // all State
    const [title, setTitle]= useState('')
    const [author, setAuthor]= useState('')
    const [description, setDescription]= useState('')
    const [date, setDate]= useState('')
    const [link, setLink]= useState('')
    const [views, setViews]= useState('')
    const [thumbnail, setThumbnail]= useState('')
    const [duration, setDuration]= useState('')
    // resetFrom
    const resetFrom =()=>{
        setTitle('');
        setAuthor('');
        setDescription('');
        setDate('');
        setLink('');
        setViews('');
        setThumbnail('');
        setDuration('');

    }
// handelSubmiot
const handelSubmit =(e)=>{
    e.preventDefault();
    addVideo({
        title,author,description,date,link, views, thumbnail, duration
    })
    resetFrom()
}
    return (
        <form onSubmit={handelSubmit} action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput
                             title="Video Title"
                              value={title} 
                              onChange={(e)=>setTitle(e.target.value)} 
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput 
                            title="Author"
                            value={author} 
                            onChange={(e)=>setAuthor(e.target.value)} />
                        </div>

                        <div className="col-span-6">
                            <TextArea 
                            title="Description"
                            value={description} 
                            onChange={(e)=>setDescription(e.target.value)} />
                        </div>

                        <div className="col-span-6">
                            <TextInput 
                            title="YouTube Video link"
                            value={link} 
                            onChange={(e)=>setLink(e.target.value)} />
                        </div>

                        <div className="col-span-6">
                            <TextInput
                             title="Thumbnail link"
                             value={thumbnail} 
                             onChange={(e)=>setThumbnail(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput title="Upload Date"
                               value={date} 
                               onChange={(e)=>setDate(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video Duration"
                               value={duration} 
                               onChange={(e)=>setDuration(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video no of views"
                               value={views} 
                               onChange={(e)=>setViews(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
{ isSuccess ?  <Success message="Video was added successfully" /> : <Error />}
            </div>
        </form>
    );
}
