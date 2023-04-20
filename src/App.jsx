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



















/* -------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
THIS SECTION IS USING JSON SERVER */





import { useState, useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, useParams, Link, useNavigate} from 'react-router-dom'



/* functions for the main APP mount----------------------------------------------------------------------- */

function App() {
  const API_URL = 'http://localhost:3500/blogs'

  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [search, setSearch] = useState('')



//------------------------------------------fetch block
  useEffect(() => {
    const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw Error('Oh no the data isnt showing...')
      const blogItems = await response.json()
      /* console.log(blogItems) */
      setBlogs(blogItems)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }
    (async () => await fetchBlogs())()
  }, [])
  //------------------------------------------------End of fetch block





  //------------------------------------------API requests
  const APIRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
      const response = await fetch(url, optionsObj)
      if (!response.ok) throw Error('pleas reload the app')
    } catch (err) {
      error = err.message     /* -----------------------------------------------------THe variable names need to be changed later */
    } finally {
      return errMsg
    }
  }
  //------------------------------------------------End of API requests




  /* HOme------------------------------------------------------------------------------------- */

  function Home({blogs, search, setSearch}) {
    /* console.log(JSON.parse(localStorage.getItem('bloglist'))) */
/*     const [sortValue, setSortValue] = useState('') */
    const [nameValue, setNameValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [titleValue, setTitleValue] = useState('')

/*     const sortOptions = ["name", "category", "date"] */

    const sortNameString = ["name"]
    const sortCategoryString = ["category"]
    const sortDateString = ["date"]
    const sortTitleString = ["title"]


    // const handleSort = async (e) => {
    //   let value = e.target.value
    //   setSortValue(value)
    //   const reqUrl = `${API_URL}/?_sort=${value}&_order=desc`
    //   const response = await fetch(reqUrl)
    //       if (!response.ok) throw Error('Oh no the data isnt showing...')
    //       const blogItems = await response.json()
    //       /* console.log(blogItems) */
    //       setBlogs(blogItems)
    //   }

      const sortName = async () => {
        let value = sortNameString 
        setNameValue(value)
        const reqUrl = `${API_URL}/?_sort=${value}&_order=asc`
        const response = await fetch(reqUrl)
            if (!response.ok) throw Error('Oh no the data isnt showing...')
            const blogItems = await response.json()
            /* console.log(blogItems) */
            setBlogs(blogItems)
      }


      const sortCategory = async () => {
        let value = sortCategoryString
        setCategoryValue(value)
        const reqUrl = `${API_URL}/?_sort=${value}&_order=asc`
        const response = await fetch(reqUrl)
            if (!response.ok) throw Error('Oh no the data isnt showing...')
            const blogItems = await response.json()
            /* console.log(blogItems) */
            setBlogs(blogItems)
      }


      const sortDate = async () => {
        let value = sortDateString
        setDateValue(value)
        const reqUrl = `${API_URL}/?_sort=${value}&_order=desc`
        const response = await fetch(reqUrl)
            if (!response.ok) throw Error('Oh no the data isnt showing...')
            const blogItems = await response.json()
            /* console.log(blogItems) */
            setBlogs(blogItems)
      }


      const sortTitle = async () => {
        let value = sortTitleString
        setTitleValue(value)
        const reqUrl = `${API_URL}/?_sort=${value}&_order=asc`
        const response = await fetch(reqUrl)
            if (!response.ok) throw Error('Oh no the data isnt showing...')
            const blogItems = await response.json()
            /* console.log(blogItems) */
            setBlogs(blogItems)
      }


    return (
      <div className="blog-list">

        <h2>Blog List</h2>

        <Link to="/create">Create a blog</Link>

        <SearchBlog search={search} setSearch={setSearch}/>

        {/* <select onChange={handleSort} value={sortValue}>
          <option>Please Select Value</option>

          {sortOptions.map((blog, id) => (<option value={blog} key={id}>{blog}</option>))}
          </select> */}

          <button value={nameValue} onClick={sortName}>Name</button>

          <button value={categoryValue} onClick={sortCategory}>Category</button>

          <button value={dateValue} onClick={sortDate}>Date</button>

          <button value={titleValue} onClick={sortTitle}>Title</button>

        {isPending && <p>loading...</p>}
        {!error && <div>{blogs.length  ? (
          <div>

            {blogs.map((blog) => (
              <div key={blog.id} className="blog-itemsssss">

                <p>{blog.name}</p>
                <p>{blog.category}</p>
                <h3>{blog.title}</h3>
                <p>{(blog.body).length <= 35 ? blog.body : `${(blog.body).slice(0,35)}...`}</p>
                <p>{blog.date}</p>

                <Link to={`/blogs/${blog.id}`}>View Blog</Link>

              </div>
            ))}

          </div>
        ) : (<p>There are no more blogs....</p>)}</div>}


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
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
      e.preventDefault()
      const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1
      const blog = {name, title, category, body, date, checked: false, id}
      const blogItems = [...blogs, blog]

      /* setAndSaveBlogs(blogItems) */
      setBlogs(blogItems)

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(blog)
      }
      const result = await APIRequest(API_URL, postOptions).then(() => {navigate('/')})
      if (result) setError(result)
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


   /* blog details module-------------------------------------------------------------------------------------------------------------- */

   function BlogDetails({blogs}) {
    const {id} = useParams()
    const blog = blogs.find(blog => (blog.id).toString() === id)
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')


      /* ----------------------------------------------------------------Changes checkbox to true */
    const handleReaction = async (id) => {
      const blogItems = blogs.map((blog) => blog.id === id ? {...blog,
      checked: !blog.checked} : blog)

      /* setAndSaveBlogs(blogItems) */
      setBlogs(blogItems)

      const blogChange = blogItems.filter((blog) => blog.id === id)
      /* console.log(blogChange) */
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked: blogChange[0].checked})
      }
      const reqUrl = `${API_URL}/${id}`
      /* console.log(reqUrl) */
      const result = await APIRequest(reqUrl, updateOptions)
      if (result) setError(result)
    }



    /* ----------------------------------------------------------------DELETES BLOG */

    const deleteBlog = async (id) => {
      const blogItems = blogs.filter((blog) => blog.id !== id)
  
      /* setAndSaveBlogs(blogItems) */
      setBlogs(blogItems)
  
      const deleteOptions = {method: 'DELETE'}
      const reqUrl = `${API_URL}/${id}`
      /* console.log(reqUrl) */
      const result = await APIRequest(reqUrl, deleteOptions).then(navigate('/'))
      if (result) setError(result)
    }


    /* -------------------------------------------------------edits BLOG */

      const editBlog = () => {
      setEditMode(true)
      console.log(blog)
    }

    const cancelBlog = () => {
      setEditMode(false)
    }



    const submitEdit = async (id, e) => {
      e.preventDefault()

      const blog = {name, title, category, body, date, checked: false}

      const postOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(blog)
      }
      const reqUrl = `${API_URL}/${id}`
      const result = await APIRequest(reqUrl, postOptions).then(() => {navigate('/')}).then(() => {window.location.reload(true)})

      if (result) setError(result)

      setEditMode(false)
    }



    return (
      <div className="blog-details">

        {!editMode && <div>
        <input type="checkbox" checked={blog.checked} onChange={() => handleReaction(blog.id)}/>
        <p>{blog.name}</p>
        <p>{blog.category}</p>
        <h3>{blog.title}</h3>
        <p>{blog.body}</p>
        <p>{blog.date}</p>
        <i className="fa-solid fa-trash-can" onClick={() => deleteBlog(blog.id)}></i>
        <button onClick={editBlog}>Edit</button>
        </div>}

        {editMode && 
        <form onSubmit={(e) => submitEdit(blog.id, e)}>
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

        <button>Submit Edit</button>
        </form>
        }

        {editMode && <button onClick={cancelBlog}>Cancel</button>}

        <Link to="/">Back to Home</Link>
      </div>
    )
  }


  /* JSX for main APP----------------------------------------------------------------------------------------- */
return (
  <Router>
  <div className="App">
    <h1>Andrew's Blog!</h1>
    <Routes>

    <Route path="/create" element={<CreateBlog blogs={blogs} />} />
   {/*  <CreateBlog name={name} setName={setName} title={title} setTitle={setTitle} category={category} setCategory={setCategory} body={body} setBody={setBody} date={date} setDate={setDate} handleSubmit={handleSubmit}/> */}
    

    
    <Route path="/" element={
      <div>
        {error && <p>{`Error: ${error}`}</p>}

        <Home blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase()))} 
        search={search}
        setSearch={setSearch}
        useEffect={useEffect}/>

      </div>} 
    />



    {/* blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase))}  */}

    <Route path="/blogs/:id" element={<BlogDetails blogs={blogs}/>} />

    </Routes>
  </div>
  </Router>
)
}

export default App


/* name, setName, title, setTitle, category, setCategory, body, setBody, date, setDate */
/* name={name} setName={setName} title={title} setTitle={setTitle} category={category} setCategory={setCategory} body={body} setBody={setBody} date={date} setDate={setDate} */


