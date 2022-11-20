import React  from 'react';
import axios from 'axios';

const Test = (props)=>{
    const handleGetCourses = (event)=>{
        axios.get("http://localhost:3001/courses",
                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleGetUserCourses = (event)=>{
        axios.get("http://localhost:3001/course_registrations",
                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleRegistrateCourse = (event)=>{
        axios.post("http://localhost:3001/course_registrations",
                {
                    course:{
                        name:"IIS"
                    }
                },

                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleCreateCourse = (event)=>{
        axios.post("http://localhost:3001/courses",
                {
                    course:{
                        name:"IIS",
                        full_name:"Iis",
                        description:"Iis",
                        course_type:"typ",
                        price:200
                    }
                },
                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleCreateTerm = (event)=>{
        axios.post("http://localhost:3001/terms",
                {
                    term:{
                        name:"IIS",
                        term_type:"Prednaska",
                        date:"11/07/200",
                        time_start:"11:09:11",
                        time_end:"12:00:00"
                    },
                    room:{
                        name:"D105"
                    }
                },
                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleRegistrateTerm = (event)=>{
        axios.post("http://localhost:3001/term_registrations",
                {
                    term:{
                        name:"ITU",
                        term_type:"Cviceni"
                    }
                },

                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleGetUserTerms = (event)=>{
        axios.get("http://localhost:3001/term_registrations",
                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }

    const handleCreateRoom = (event)=>{
        axios.post("http://localhost:3001/rooms",
                {
                    room:{
                        name:"D105",
                        limit:"100"
                    }
                },
                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }
    const handleRegistrateRoom = (event)=>{
        axios.post("http://localhost:3001/room_registrations",
                {
                    term:{
                        name:"IIS",
                        term_type:"Prednaska",
                        date:"11/07/200",
                        time_start:"11:11:11",
                        time_end:"12:11:11"
                    }
                },

                {
                    headers:{'authorization': localStorage.getItem("token")},
                    withCredentials:true
                }
                )
                .then(response=>{
                    console.log("response", response);
                })
                .catch(error=>{
                    console.log("error", error);
                })
            event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleGetCourses}>
                <button 
                    type="submit"
                    >get courses</button>
            </form>

            <form onSubmit={handleCreateCourse}>
                <button 
                    type="submit"
                    >create courses</button>
            </form>

            <form onSubmit={handleRegistrateCourse}>
                <button 
                    type="submit"
                    >registrate courses</button>
            </form>

            <form onSubmit={handleGetUserCourses}>
                <button 
                    type="submit"
                    >get courses for user</button>
            </form>

            <form onSubmit={handleCreateTerm}>
                <button 
                    type="submit"
                    >create term</button>
            </form>

            <form onSubmit={handleRegistrateTerm}>
                <button 
                    type="submit"
                    >registrate term</button>
            </form>

            <form onSubmit={handleGetUserTerms}>
                <button 
                    type="submit"
                    >get terms for user</button>
            </form>

            <form onSubmit={handleCreateRoom}>
                <button 
                    type="submit"
                    >create room</button>
            </form>

            <form onSubmit={handleRegistrateRoom}>
                <button 
                    type="submit"
                    >registrate room</button>
            </form>
        </div>
    );
}
export default Test