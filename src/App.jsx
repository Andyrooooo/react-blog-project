import { useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes, useParams, Link, useNavigate} from 'react-router-dom'



/* functions for the main APP mount----------------------------------------------------------------------- */

function App() {
  const API_URL = 'https://trusting-storm-lobster.glitch.me/blogs'
  /* const API_URL = `http://localhost:3500/blogs?_start=${start}&_end=${end}`
  const location_API_URL = 'http://localhost:3500/blogs' */
  
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [comments, setComments] = useState([])









  //------------------------------------------fetch block

  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw Error('Oh no the data isnt showing...')
      const blogItems = await response.json()
      /* console.log(blogItems) */
      setBlogs(blogItems)
/*       setCurrentPage(currentPage + increase) */
      setError(null)
    } catch (err) {
      setError(err.message)
    } /* finally {
      setIsPending(false)
    } */
  }

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  
  //------------------------------------------------End of fetch block

  








  //------------------------------------------API requests ---------------THIS IS USED TO HELP CREATE blogs,  delete, react, edit
  const APIRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
      const response = await fetch(url, optionsObj)
      if (!response.ok) throw Error('Error. Please reload the app')
    } catch (err) {
      console.log(err.message) 
    } finally {
      return errMsg
    }
  }
  //------------------------------------------------End of API requests









  /* Home Module------------------------------------------------------------------------------------- */

  function Home({blogs, search, setSearch, itemsPerPage}) {
  /* function Home({blogs, search, setSearch, currentPage, setCurrentPage}) { */

    const [nameValue, setNameValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const sortNameString = ["name"]
    const sortCategoryString = ["category"]
    const sortDateString = ["date"]
    const sortTitleString = ["title"]

    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(1);




    //------------------------------------------------Sorts by Name

    const sortName = async () => {
      let value = sortNameString 
      setNameValue(value)
      /* const reqUrl = `${API_URL}&_sort=${value}&_order=asc` */
      const reqUrl = `${API_URL}/?_sort=${value}&_order=asc`
      const response = await fetch(reqUrl)
          if (!response.ok) throw Error('Oh no the data isnt showing...')
          const blogItems = await response.json()
          /* console.log(blogItems) */
          setBlogs(blogItems)
      }

    //------------------------------------------------Sorts by Category

    const sortCategory = async () => {
      let value = sortCategoryString
      setCategoryValue(value)
      /* const reqUrl = `${API_URL}&_sort=${value}&_order=asc` */
      const reqUrl = `${API_URL}/?_sort=${value}&_order=asc`
      const response = await fetch(reqUrl)
          if (!response.ok) throw Error('Oh no the data isnt showing...')
          const blogItems = await response.json()
          /* console.log(blogItems) */
          setBlogs(blogItems)
    }


        //------------------------------------------------Sorts by Date
    const sortDate = async () => {
      let value = sortDateString
      setDateValue(value)
      /* const reqUrl = `${API_URL}&_sort=${value}&_order=desc` */
      const reqUrl = `${API_URL}/?_sort=${value}&_order=desc`
      const response = await fetch(reqUrl)
          if (!response.ok) throw Error('Oh no the data isnt showing...')
          const blogItems = await response.json()
          /* console.log(blogItems) */
          setBlogs(blogItems)
    }

    //------------------------------------------------Sorts by Title
    const sortTitle = async () => {
      let value = sortTitleString
      setTitleValue(value)
      /* const reqUrl = `${API_URL}&_sort=${value}&_order=asc` */
      const reqUrl = `${API_URL}/?_sort=${value}&_order=asc`
      const response = await fetch(reqUrl)
          if (!response.ok) throw Error('Oh no the data isnt showing...')
          const blogItems = await response.json()
          /* console.log(blogItems) */
          setBlogs(blogItems)
    }

      
    useEffect(() => {
      setNumPages(Math.ceil(blogs.length / itemsPerPage));
    }, [blogs, itemsPerPage]);
  
    const handlePageChange = (pageNum) => {
      setCurrentPage(pageNum);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const paginatedData = blogs.slice(startIndex, endIndex);

  // ------------------------------------------------------------------------Displays the Home page
    return (
      <div className="blog-list">


        <Link className="link-to-create" to="/create">Create a blog</Link>

        <SearchBlog className="is-primary" search={search} setSearch={setSearch} />

        <div className="filter-buttons">
          <button className="filter-name" value={nameValue} onClick={sortName}>Name</button>
          <button className="filter-category" value={categoryValue} onClick={sortCategory}>Category</button>
          <button className="filter-date" value={dateValue} onClick={sortDate}>Date</button>
          <button className="filter-title" value={titleValue} onClick={sortTitle}>Title</button>
        </div>

        <h2 className="blog-list-title">Blog List</h2>


        {!error && <div>{blogs.length  ? (
          <div>

            {paginatedData.length > 0 ? (
              paginatedData.map((blog) => (
                <div key={blog.id} className="each-blog">

                  <p className="blog-category">Category: <strong>{blog.category}</strong></p>
                  <p className="blog-name">{blog.name}</p>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-body">{(blog.body).length <= 50 ? blog.body : `${(blog.body).slice(0,50)}...`}</p>
                  <Link className="view-blog-link" to={`/blogs/${blog.id}`}><i className="fa-solid fa-arrow-right arrow"></i></Link>
                  <p className="blog-date">{blog.date}</p>

                </div>
              ))
              ):(
                <div>Loading...</div>
              )}
                <div className="pagination-buttons">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                  <button className="pagination-button" key={pageNum} onClick={() => handlePageChange(pageNum)}> {pageNum} </button>
                ))}
                </div>
          </div>
        ) : (<p>There are no more blogs....</p>)}</div>}
        </div> // End of JSX return
        )}








  /* search module------------------------------------------------------------------------------------- */

  function SearchBlog({search, setSearch}) {
    return (
      <form className="search-blog" onSubmit={(e) => e.preventDefault()}>
        <input className="search-input" type="text" autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Blogs" ></input>
      </form>
    )
  }









  /* Create blog Module------------------------------------------------------------------------------------- */

  function CreateBlog({blogs, comments, setComments}) {
  /* function CreateBlog({name, setName, title, setTitle, category, setCategory, body, setBody, date, setDate, handleSubmit}) { */


    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
      e.preventDefault()

      const blogResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name, title, category, body, date, checked: false, comments})
      })

      const blogData = await blogResponse.json()

      const id = blogData.id

      const commentId = comments.length ? comments[comments.length - 1].id + 1 : 1

      const blog = {name, title, category, body, date, checked: false, comments: [], id}
      
      const blogItems = [...blogs, blog]

      setBlogs(blogItems)



      const commentResponse = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(blog)
      })

      const commentData = await commentResponse.json().then(navigate('/'))
    }


    // ----------------------------------------------------------------- Displays our form to be submitted
    return (
      <div className="new-blog">

      <Link className="back-to-home-from-create" to="/">Back to Home</Link>

      <h2 className="create-new-title">Create a new blog</h2>

      <form onSubmit={handleSubmit}>
        <label className="new-blog-name">Name/Author</label>
        <input className="new-blog-name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>

        <label className="new-blog-category">Category</label>
        <input  className="new-blog-category-input" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required></input>

        <label className="new-blog-title">Title</label>
        <input  className="new-blog-title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required></input>

        <label className="new-blog-date">Date</label>
        <input  className="new-blog-date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required></input>

        <label className="new-blog-body">Body</label>
        <textarea  className="new-blog-body-input" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>

        <button className="new-blog-button">Add Blog</button>
      </form>
        
      </div>
    )
  }







   /* blog details module-------------------------------------------------------------------------------------------------------------- */

   function BlogDetails({blogs, comments, setComments}) {
    const {id} = useParams()
    const blog = blogs.find(blog => (blog.id).toString() === id)
/*     console.log(blog) */
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [date, setDate] = useState('')
    const [text, setText] = useState('')



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
      // http://localhost:3500/blogs?_start=0&_end=4
      /* const reqUrl = `http://localhost:3500/blogs/${id}` */
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
      /* const reqUrl = `http://localhost:3500/blogs/${id}` */
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

      const blog = {name, title, category, body, date, checked: false, comments: []}

      const postOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(blog)
      }
      /* const reqUrl = `http://localhost:3500/blogs/${id}` */
      const reqUrl = `${API_URL}/${id}`
      const result = await APIRequest(reqUrl, postOptions).then(() => {navigate('/')}).then(() => {window.location.reload(true)})

      if (result) setError(result)

      setEditMode(false)
    }



    //------------------------------------------------ adds comments
    const submitComment = async (id, e) => {
      e.preventDefault()

      const commentIds = blog.comments.length ? blog.comments[blog.comments.length - 1].id + 1 : 1
      console.log(commentIds)

      const comment = {text: text, id: commentIds}

      const commentItems = [...blog.comments, comment]

      /* setComments(commentItems) */
      blog.comments = commentItems

      console.log(blog.comments)

      fetch(`https://trusting-storm-lobster.glitch.me/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({name: blog.name, title: blog.title, category: blog.category, body: blog.body, date: blog.date, comments: blog.comments})
      })

      setText('')
    }

    //------------------------------------------------ Deletes comments
    const deleteComment = (id) => {

      const grabComment = blog.comments.filter((comment) => comment.id !== id)

      blog.comments = grabComment


      fetch(`https://trusting-storm-lobster.glitch.me/blogs/${blog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({name: blog.name, title: blog.title, category: blog.category, body: blog.body, date: blog.date, comments: blog.comments})
      }).then(() => {navigate('/')})
    }

/* ----------------------------------------------------------- allows us to change the star */
    const starVisibility =
    blog.checked === true ? { liked: "hidden", unliked: "unhide" }: { liked: "unhide", unliked: "hidden" }


{/* --------------------------------------------------------------------- Displays individual blogs*/}
    return (
      <div className="blog-details">

        <Link className="back-to-home-from-details" to="/">Back to Home</Link>

        {!editMode && <div>
        <div className="details-section">
          <p className="blog-details-name">{blog.name}</p>
          <p className="blog-details-category">Category: <strong>{blog.category}</strong></p>
          <div className="stars">
            <i className={`fa-solid fa-star liked ${starVisibility.unliked}`} checked={blog.checked} onClick={() => handleReaction(blog.id)}></i>
            <i className={`fa-solid fa-star disliked ${starVisibility.liked}`} checked={blog.checked} onClick={() => handleReaction(blog.id)}></i>
          </div>
        </div>
        <h3 className="blog-details-title">{blog.title}</h3>
        <p className="blog-details-body">{blog.body}</p>

        <div className="actions-section">
          <p className="blog-details-date">{blog.date}</p>
          <div className="edit-button-container">
            <button className="edit-button" onClick={editBlog}><i class="fa-solid fa-pen-to-square"></i> Edit</button>
          </div>
          <div className="delete-post-container">
            <i className="fa-solid fa-trash-can delete-post-button" onClick={() => deleteBlog(blog.id)}></i>
          </div>
        </div>
        
        <h2 className="comment-title">Comments</h2>
        <form className="comment-block" onSubmit={(e) => submitComment(blog.id, e)}>
          <input className="comment-input" placeholder="Comment..." type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
          <button className="comment-button">Submit</button>
        </form>

{/* --------------------------------------------------------------------- Displays comments*/}
        <div className="comment-section">
          {blog.comments.map((comment) => (
            <div className="comment-delete" key={comment.id}>
              <div>
                <p className="comments">{comment.text}</p>
              </div>
              <i className="fa-solid fa-circle-xmark comment-delete-button" onClick={() => deleteComment(comment.id)}></i>
            </div>
          ))}
        </div>
          
        </div>}

{/* --------------------------------------------------------------------- End of displaying individual blogs*/}



{/* --------------------------------------------------------------------- Displays individual blogs*/}
        {editMode && 
        <form onSubmit={(e) => submitEdit(blog.id, e)}>

        <label className="blog-edit-name-label">Name/Author</label>
        <input className="blog-edit-name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={blog.name} required></input>

        <label className="blog-edit-category-label">Category</label>
        <input className="blog-edit-category-input" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder={blog.category} required></input>

        <label className="blog-edit-title-label">Title</label>
        <input className="blog-edit-title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={blog.title} required></input>

        <label className="blog-edit-date-label">Date</label>
        <input className="blog-edit-date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder={blog.date} required></input>

        <label className="blog-edit-body-label">Body</label>
        <textarea className="blog-edit-body-input" value={body} onChange={(e) => setBody(e.target.value)} placeholder={blog.body} required></textarea>

        <div className="edit-cancel-buttons">
          <button className="blog-edit-submit-button">Submit Edit</button>
          <button className="blog-edit-cancel-button" onClick={cancelBlog}>Cancel</button>
        </div>

        </form>
        }
      </div>
    )
  }







  /* JSX for main APP----------------------------------------------------------------------------------------- */
return (
  <Router>
  <div className="App">
    <h1 className="app-title">The Nonesense Blog</h1>
    <Routes>

    <Route path="/create" element={<CreateBlog blogs={blogs} comments={comments} setComments={setComments}/>} />
    
    <Route path="/" element={
      <div>
        {error && <p>{`Error: ${error}`}</p>}

        <Home blogs={blogs.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase()))} 
        useEffect={useEffect}
        fetchBlogs={fetchBlogs}
        search={search}
        setSearch={setSearch}
        itemsPerPage={4}
        />


      </div>} 
    />

    <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} comments={comments} setComments={setComments}/>} />

    </Routes>
  </div>
  </Router>
)
}

export default App
