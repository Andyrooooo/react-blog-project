import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, useParams, Link} from 'react-router-dom'

/* JSON.parse(localStorage.getItem('bloglist')) */

/* functions for the main APP mount----------------------------------------------------------------------- */

function App() {
      /* useFetch--------------------------------------------------- */
      // const useFetch = (url) => {
      //   const [data, setData] = useState(null)
      //   const [isPending, setIsPending] = useState(true)
    
      //     useEffect(() => {
      //       fetch(url)
      //         .then(res => {
      //           return res.json()
      //         })
      //         .then(data => {
      //           /* console.log(data) */
      //           setData(data) /* Once the data is taken from the json server it is set in the state */
      //           setIsPending(false) /* we set the pending state back to false once we have the data so there is no continuous loading sign */
      //         })
      //     }, [url])
    
      //     return {data, isPending}
      //   }
    /* End of useFetch--------------------------------------------------- */







  const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('bloglist')))
  /* const [blogs, setBlogs] = useState([
    { name: 'Andrew', title: 'My First Blog', category: 'General', body: 'Hey guys this is my first blog post! I was hoping to have a lot more to say but all I can think of is welcome to my app!', date: "4/16/2023", checked: false, id: 1},
    { name: 'Andrew', title: 'Day at the skatepark', category: 'Skateboarding', body: 'I guess today I want to talk about skateboarding. So, today I went to the Greenwood skatepark with my dog Zeus and finally decided to try a boneless 180 down the 8 stair cause I havent done it in a while. Bad decision.  ', date: "4/17/2023", checked: false, id: 2},
    { name: 'Emma', title: 'Whats it like to be a dog?', category: 'Animals', body: 'I wonder what its like to be a dog. You get to sleep all day, eat, and drink. Not to mention all the places you can pee and poop and not have to worry about other people looking at you weird haha', date: "4/18/2023", checked: false, id: 3}
  ]) */
  const [search, setSearch] = useState('')


  const setAndSaveBlogs = (blogItems) => {
    setBlogs(blogItems)
    localStorage.setItem('bloglist', JSON.stringify(blogItems))
  }

  
  const handleReaction = (id) => {
    const blogItems = blogs.map((blog) => blog.id === id ? {...blog,
    checked: !blog.checked} : blog)

    setAndSaveBlogs(blogItems)
  }

  const deleteBlog = (id) => {
    const blogItems = blogs.filter((blog) => blog.id !== id)

    setAndSaveBlogs(blogItems)
  }



/* HOme------------------------------------------------------------------------------------- */

  function Home({blogs, handleReaction, deleteBlog, search, setSearch}) {
    console.log(JSON.parse(localStorage.getItem('bloglist')))
  
    return (
      <div className="blog-list">

        <h2>Blog List</h2>

        <Link to="/create">Create a blog</Link>

        <SearchBlog search={search} setSearch={setSearch}/>

        {blogs.length  ? (
          <div>
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-itemsssss">

              <input type="checkbox" checked={blog.checked} onChange={() => handleReaction(blog.id)}/>
  
              <p>{blog.name}</p>
              <p>{blog.category}</p>
              <h3>{blog.title}</h3>
              <p>{blog.body}</p>
              <p>{blog.date}</p>
              <i className="fa-solid fa-trash-can" onClick={() => deleteBlog(blog.id)}></i>

              <Link to={`/blogs/${blog.id}`}>View Blog</Link>
            </div>
          ))}
        </div>
        ) : (<p>There are no more blogs....</p>)}
        
      </div>
    )
  }

  

  /* search module------------------------------------------------------------------------------------- */

  function SearchBlog({search, setSearch}) {
    return (
      <form className="search-blog" onSubmit={(e) => e.preventDefault()}>
        <label >Search</label>
        <input type="text" autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Blogs" ></input>
      </form>
    )
  }


  /* Add blog------------------------------------------------------------------------------------- */

  function CreateBlog({blogs}) {
  /* function CreateBlog({name, setName, title, setTitle, category, setCategory, body, setBody, date, setDate, handleSubmit}) { */


    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')


    const handleSubmit = (e) => {
      e.preventDefault()
      const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1
      const blog = {name, title, category, body, date, checked: false, id}
      const blogItems = [...blogs, blog]

      setAndSaveBlogs(blogItems)
    }
    
    return (
      <div className="new-blog">

      <h2>Create a new blog</h2>

      <Link to="/">Back to Home</Link>

      <form onSubmit={handleSubmit}>
        <label>Name/Author</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>

        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}></input>

        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>

        <label>Body</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        <button>Add Blog</button>
      </form>
        
      </div>
    )
  }




   /* blog details module------------------------------------------------------------------------------------- */

   function BlogDetails() {
    

    return (
      <div className="blog-details">

        <h2>Hello</h2>

        <Link to="/">Back to Home</Link>
      </div>
    )
  }




/* HTML for main APP----------------------------------------------------------------------------------------- */
  return (
    <Router>
    <div className="App">
      <h1>Andrew's Blog!</h1>
      <Routes>

      <Route path="/create" element={<CreateBlog blogs={blogs} setAndSaveBlogs={setAndSaveBlogs}/>} />
     {/*  <CreateBlog name={name} setName={setName} title={title} setTitle={setTitle} category={category} setCategory={setCategory} body={body} setBody={setBody} date={date} setDate={setDate} handleSubmit={handleSubmit}/> */}
      
      
      <Route path="/" element={<Home blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase()))} 
      handleReaction={handleReaction} 
      deleteBlog={deleteBlog}
      search={search}
      setSearch={setSearch}/>} />

      {/* blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase))}  */}

      <Route path="/blogs/:id" element={<BlogDetails />} />

      </Routes>
    </div>
    </Router>
  )
}

export default App


/* name, setName, title, setTitle, category, setCategory, body, setBody, date, setDate */
/* name={name} setName={setName} title={title} setTitle={setTitle} category={category} setCategory={setCategory} body={body} setBody={setBody} date={date} setDate={setDate} */