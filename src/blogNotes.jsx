// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Blogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 4;

//   useEffect(() => {
//     fetch('http://localhost:3500/blogs')
//       .then(response => response.json())
//       .then(data => setBlogs(data));
//   }, []);

//   const totalBlogs = blogs.length;
//   const totalPages = Math.ceil(totalBlogs / blogsPerPage);

//   const startIndex = (currentPage - 1) * blogsPerPage;
//   const endIndex = startIndex + blogsPerPage;
//   const currentBlogs = blogs.slice(startIndex, endIndex);

//   function handlePreviousPage() {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   function handleNextPage() {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   }

//   return (
//     <div>
//       {currentBlogs.map(blog => (
//         // display the blog content here
//       ))}
//       <div>
//         <button onClick={handlePreviousPage}>Previous</button>
//         <button onClick={handleNextPage}>Next</button>
//         <div>Page {currentPage} of {totalPages}</div>
//       </div>
//     </div>
//   );
// }

// export default Blogs;



//Note that you'll need to replace the code inside the map function with the actual code to display the blog content. Also, make sure to handle the sorting and filtering functionality separately from the pagination. 








// import { useState, useEffect } from 'react'
// import './App.css'
// import {BrowserRouter as Router, Route, Routes, useParams, Link, useNavigate} from 'react-router-dom'



// /* functions for the main APP mount----------------------------------------------------------------------- */

// function App() {

//   const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('bloglist')) || [])
//   const [search, setSearch] = useState('')
  
//   const setAndSaveBlogs = (blogItems) => {
//         setBlogs(blogItems)
//         localStorage.setItem('bloglist', JSON.stringify(blogItems))
//     }



// /* HOme------------------------------------------------------------------------------------- */

//   function Home({blogs, search, setSearch}) {
  
//     return (
//       <div className="blog-list">

//         <h2>Blog List</h2>

//         <Link to="/create">Create a blog</Link>

//         <SearchBlog search={search} setSearch={setSearch}/>

//         {blogs.length  ? (
//           <div>

//             {blogs.map((blog) => (
//               <div key={blog.id} className="blog-itemsssss">

//                 {/* <input type="checkbox" checked={blog.checked} onChange={() => handleReaction(blog.id)}/> */}
//                 <p>{blog.name}</p>
//                 <p>{blog.category}</p>
//                 <h3>{blog.title}</h3>
//                 <p>{(blog.body).length <= 35 ? blog.body : `${(blog.body).slice(0,35)}...`}</p>
//                 <p>{blog.date}</p>

//                 <Link to={`/blogs/${blog.id}`}>View Blog</Link>

//               </div>
//             ))}

//           </div>
//         ) : (<p>There are no more blogs....</p>)}


//       </div>
//     )
//   }

  

//   /* search module------------------------------------------------------------------------------------- */

//   function SearchBlog({search, setSearch}) {
//     return (
//       <form className="search-blog" onSubmit={(e) => e.preventDefault()}>
//         <label >Search</label>
//         <input type="text" autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Blogs" ></input>
//       </form>
//     )
//   }


//   /* Add blog------------------------------------------------------------------------------------- */

//   function CreateBlog({blogs}) {
//   /* function CreateBlog({name, setName, title, setTitle, category, setCategory, body, setBody, date, setDate, handleSubmit}) { */


//     const [name, setName] = useState('')
//     const [title, setTitle] = useState('')
//     const [category, setCategory] = useState('')
//     const [body, setBody] = useState('')
//     const [date, setDate] = useState('')


//     const handleSubmit = (e) => {
//       e.preventDefault()
//       const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1
//       const blog = {name, title, category, body, date, checked: false, id}
//       const blogItems = [...blogs, blog]

//       setAndSaveBlogs(blogItems)
//       setBlogs(blogItems)
//     }
    
//     return (
//       <div className="new-blog">

//       <h2>Create a new blog</h2>

//       <Link to="/">Back to Home</Link>

//       <form onSubmit={handleSubmit}>
//         <label>Name/Author</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>

//         <label>Category</label>
//         <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}></input>

//         <label>Title</label>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>

//         <label>Date</label>
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>

//         <label>Body</label>
//         <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>

//         <button>Add Blog</button>
//       </form>
        
//       </div>
//     )
//   }




















//    /* blog details module------------------------------------------------------------------------------------- */

//   function BlogDetails({blogs}) {
//     const {id} = useParams()
//     const blog = blogs.find(blog => (blog.id).toString() === id)
//     const navigate = useNavigate()
//     const [editMode, setEditMode] = useState(false)
//     const [editName, setEditName] = useState('')
//     const [editTitle, setEditTitle] = useState('')
//     const [editCategory, setEditCategory] = useState('')
//     const [editBody, setEditBody] = useState('')
//     const [editDate, setEditDate] = useState('')



//       /* -----------------------------------------Changes checkbox to true */
//     const handleReaction = (id) => {
//     const blogItems = blogs.map((blog) => blog.id === id ? {...blog,
//     checked: !blog.checked} : blog)

//     setAndSaveBlogs(blogItems)
//     setBlogs(blogItems)
//     }


//     /* -------------------------------------------------------DELETES BLOG */

//     const deleteBlog = (id) => {
//       const blogItems = blogs.filter((blog) => blog.id !== id)/* .then(() => {navigate('/')}) */
  
//       setAndSaveBlogs(blogItems)
//       setBlogs(blogItems)/* .then(() => {navigate('/')}) */

//       navigate('/')
//     }



//        /* -------------------------------------------------------edist BLOG */

//        const editBlog = () => {
//         setEditMode(true)
//         console.log(blog)
//       }

//       const cancelBlog = () => {
//         setEditMode(false)
//       }

//       /* const handleEdit = async (id) => {
//         const updatedBlog = {name, title, category, body, date, checked: false, id}
//         try {
//           const response = await api.put(`/blogs/${id}`, updatedBlog)
//           setBlogs(blogs.map(blog => blog.id === id ? {...response.data } : blog))
//           editName('')-------include all the new edit states
//           navigate('/')
//         } catch (err) {
//           console.log(`error: ${err.message}`)
//         }
//       } */


//       const submitEdit = (id, e) => {
//         e.preventDefault()
//         console.log(id)
//         const newBlog = {editName, checked: false, id}
//         setBlogs(blogs.map(blog => blog.id === id ? {newBlog} : blog))

       
//         /* setAndSaveBlogs(blogItems)
//         setBlogs(blogItems) */

//         setEditMode(false)
//       }



//     return (
//       <div className="blog-details">

//         {!editMode && <div>
//         <input type="checkbox" checked={blog.checked} onChange={(e) => handleReaction(blog.id, e)}/>
//         <p>{blog.name}</p>
//         <p>{blog.category}</p>
//         <h3>{blog.title}</h3>
//         <p>{blog.body}</p>
//         <p>{blog.date}</p>
//         <i className="fa-solid fa-trash-can" onClick={() => deleteBlog(blog.id)}></i>
//         <button onClick={editBlog}>Edit</button>
//         </div>}

//         {editMode && 
//         <form onSubmit={(e) => submitEdit(blog.id, e)}>
//         <label>Name/Author</label>
//         <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}></input>
// {/* 
//         <label>Category</label>
//         <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}></input>

//         <label>Title</label>
//         <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>

//         <label>Date</label>
//         <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)}></input>

//         <label>Body</label>
//         <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)}></textarea> */}

//         <button>Submit Edit</button>
//         </form>
//         }

//         {editMode && <button onClick={cancelBlog}>Cancel</button>}

//         <Link to="/">Back to Home</Link>
//       </div>
//     )
//   }

























// /* HTML for main APP----------------------------------------------------------------------------------------- */
// return (
//   <Router>
//   <div className="App">
//     <h1>Andrew's Blog!</h1>
//     <Routes>

//     <Route path="/create" element={<CreateBlog blogs={blogs} />} />
//    {/*  <CreateBlog name={name} setName={setName} title={title} setTitle={setTitle} category={category} setCategory={setCategory} body={body} setBody={setBody} date={date} setDate={setDate} handleSubmit={handleSubmit}/> */}
    

    
//     <Route path="/" element={
//       <div>

//         <Home blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase()))} 
//         search={search}
//         setSearch={setSearch}/>

//       </div>} 
//     />



//     {/* blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase))}  */}

//     <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />

//     </Routes>
//   </div>
//   </Router>
// )
// }

// export default App






























/* -----------------------------------------------------------extra code */


// import { useState, useEffect} from 'react'
// import './App.css'
// import {BrowserRouter as Router, Route, Routes, useParams, Link} from 'react-router-dom'

/* JSON.parse(localStorage.getItem('bloglist')) */

/* functions for the main APP mount----------------------------------------------------------------------- */

// function App() {
//   const API_URL = 'http://localhost:3500/blogs'


//       /* useFetch--------------------------------------------------- */
//       // const useFetch = (API_URL) => {
//       //   const [data, setData] = useState(null)
//       //   const [isPending, setIsPending] = useState(true)
    
//       //     useEffect(() => {
//       //       fetch(url)
//       //         .then(res => {
//       //           return res.json()
//       //         })
//       //         .then(data => {
//       //           /* console.log(data) */
//       //           setData(data) 
//       //           setIsPending(false) /* we set the pending state back to false once we have the data so there is no continuous loading sign */
//       //         })
//       //     }, [API_URL])
    
//       //     return {data, isPending}
//       //   }
//     /* End of useFetch--------------------------------------------------- */



//   const [blogs, setBlogs] = useState([])
//   const [error, setError] = useState(null)
//   const [isPending, setIsPending] = useState(true)
//   /* const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('bloglist')) || []) */
//   /* const [blogs, setBlogs] = useState([
//     { name: 'Andrew', title: 'My First Blog', category: 'General', body: 'Hey guys this is my first blog post! I was hoping to have a lot more to say but all I can think of is welcome to my app!', date: "4/16/2023", checked: false, id: 1},
//     { name: 'Andrew', title: 'Day at the skatepark', category: 'Skateboarding', body: 'I guess today I want to talk about skateboarding. So, today I went to the Greenwood skatepark with my dog Zeus and finally decided to try a boneless 180 down the 8 stair cause I havent done it in a while. Bad decision.  ', date: "4/17/2023", checked: false, id: 2},
//     { name: 'Emma', title: 'Whats it like to be a dog?', category: 'Animals', body: 'I wonder what its like to be a dog. You get to sleep all day, eat, and drink. Not to mention all the places you can pee and poop and not have to worry about other people looking at you weird haha', date: "4/18/2023", checked: false, id: 3}
//   ]) */

//   useEffect(() => {
//     const fetchBlogs = async () => {
//     try {
//       const response = await fetch(API_URL)
//       if (!response.ok) throw Error('Oh no the data isnt showing...')
//       const blogItems = await response.json()
//       /* console.log(blogItems) */
//       setBlogs(blogItems)
//       setError(null)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setIsPending(false)
//     }
//   }
//     (async () => await fetchBlogs())()
//   }, [])

//   const [search, setSearch] = useState('')


//   /* const setAndSaveBlogs = (blogItems) => {
//     setBlogs(blogItems)
//     localStorage.setItem('bloglist', JSON.stringify(blogItems))
//   } */

  
//   const handleReaction = (id) => {
//     const blogItems = blogs.map((blog) => blog.id === id ? {...blog,
//     checked: !blog.checked} : blog)

//     /* setAndSaveBlogs(blogItems) */
//     setBlogs(blogItems)
//   }

//   const deleteBlog = (id) => {
//     const blogItems = blogs.filter((blog) => blog.id !== id)

//     /* setAndSaveBlogs(blogItems) */
//     setBlogs(blogItems)
//   }













  /* {
  "blogs": [
    {
      "name": "Andrew",
      "title": "My First Blog",
      "category": "General",
      "body": "Hey guys this is my first blog post! I was hoping to have a lot more to say but all I can think of is welcome to my app!",
      "date": "2023-04-16",
      "checked": false,
      "comment": "",
      "id": 1
    },
    {
      "name": "Andrew",
      "title": "Day at the skatepark",
      "category": "Skateboarding",
      "body": "I guess today I want to talk about skateboarding. So, today I went to the Greenwood skatepark with my dog Zeus and finally decided to try a boneless 180 down the 8 stair cause I havent done it in a while. Bad decision.",
      "date": "2023-04-17",
      "checked": false,
      "comment": "",
      "id": 2
    },
    {
      "name": "Emma",
      "title": "Whats it like to be a dog?",
      "category": "Animals",
      "body": "I wonder what its like to be a dog. You get to sleep all day, eat, and drink. Not to mention all the places you can pee and poop and not have to worry about other people looking at you weird haha",
      "date": "2023-04-18",
      "checked": false,
      "comment": "",
      "id": 3
    },
    {
      "name": "Jake",
      "title": "How should I model my home",
      "category": "Home",
      "body": "alsdjfalsdjfl;askdjf;laskjdf;laksjdf;lkajdf;lkajs;lfkjaw;lejf;lsdkfj;alksdjf;laskjdf;laksjdf;lkajs;dlf",
      "date": "2023-04-11",
      "checked": false,
      "comment": "",
      "id": 4
    },
    {
      "name": "Greg",
      "title": "How should I do my decorations?",
      "category": "Christmas",
      "body": "Hey I had a thought, chrismas is coming up and I wanted to decorate my  apartment, but I'm not sure how I want to do it. Any suggestions?",
      "date": "2023-04-02",
      "checked": false,
      "comment": "",
      "id": 5
    },
    {
      "name": "Clark Griswald",
      "title": "I want to go on vacation",
      "category": "Vacation",
      "body": "I want to take my family on vacation because I think we all deserve it and I need to get away from my terrible neighbors.",
      "date": "2023-04-20",
      "checked": false,
      "comment": "",
      "id": 6
    },
    {
      "name": "Marty",
      "title": "Is time travel really possible?",
      "category": "Time Travel",
      "body": "I had a bizarre dream the other day that my friend had built a time matchine out of a delorian. It felt so real I couldn't decifer between reality and make believe.",
      "date": "2023-04-20",
      "checked": false,
      "comment": "",
      "id": 7
    },
    {
      "name": "Chewbacca",
      "title": "ahhraahhh",
      "category": "Rah",
      "body": "rrrraaaahh uhhhh raaahhh rahhhhh",
      "date": "2023-04-20",
      "checked": false,
      "comment": "",
      "id": 8
    },
    {
      "name": "Dan the laptop man",
      "title": "PC laptops needs new ideas",
      "category": "Computer ads",
      "body": "I was looking at our sales for this week and saw that we are in a spiral down. I want fresh ideas I love the people and want them to love us. I need new ideas!!!!",
      "date": "2023-04-20",
      "checked": false,
      "comment": "",
      "id": 9
    },
    {
      "name": "Rick Sanchez",
      "title": "PARTAAAYYYY",
      "category": "Events",
      "body": "YO BROOOOOO! Wanna party with the coolest and most intelligent being in the universe and multi-universes? That's right I'm throwing a party at my place this saturday and if you don't come ill tell them all about your secret. \nWub-a-lub-a-dub-dub!!!",
      "date": "2023-04-29",
      "checked": false,
      "comment": "",
      "id": 10
    },
    {
      "name": "Morty Smith",
      "title": "DONT COME TO MY HOUSE",
      "category": "emergency",
      "body": "Hey guys, I know you have recently seen a post about my grandpa inviting eveyone over. DON'T DO IT. I'm finally catching up with school and I dont want a bunch of people running around my house while I try to study. Summer told me about the party so if you get mad at anyone, blame her.",
      "date": "2023-04-29",
      "checked": false,
      "comment": "",
      "id": 11
    },
    {
      "name": "asdfasdfasdf",
      "title": "asdfasdfasdf",
      "category": "asdfasdfasdf",
      "body": "asdfasdfasdfasdfasdfasdfasdfasfdasdfasdfasdfasdfasdfasdf",
      "date": "2023-04-04",
      "checked": false,
      "comment": "",
      "id": 12
    },
    {
      "name": "fasdfasdfas",
      "title": "asdfasdfasd",
      "category": "dfasdfasdf",
      "body": "fasdfasdf",
      "date": "2023-03-28",
      "checked": false,
      "comment": "",
      "id": 13
    },
    {
      "name": "Sup dog",
      "title": "asdfasdfasdfasdf",
      "category": "asdfasdfasdfasdf",
      "body": "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf",
      "date": "2023-04-24",
      "checked": false,
      "comment": "",
      "id": 14
    }
  ]
} */