
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
  /* const API_URL = `http://localhost:3500/blogs?_start=${start}&_end=${end}`
  const location_API_URL = 'http://localhost:3500/blogs' */
  
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
/*   const [isPending, setIsPending] = useState(true) */
  const [search, setSearch] = useState('')




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

 /*  useEffect(() => {
    (async () => await fetchBlogs())()
  }, []) */

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  
  //------------------------------------------------End of fetch block


//------------------------------------------fetch block

//     const fetchBlogs = async () => {
//     try {
//       const response = await fetch(API_URL)
//       if (!response.ok) throw Error('Oh no the data isnt showing...')
//       const blogItems = await response.json()
//       /* console.log(blogItems) */
//       setBlogs(blogItems)
// /*       setCurrentPage(currentPage + increase) */
//       setError(null)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setIsPending(false)
//     }
//   }

//   useEffect(() => {
//     (async () => await fetchBlogs())()
//   }, [])
  //------------------------------------------------End of fetch block

    /* const test = async () => {
      const response = await fetch(`http://localhost:3500/blogs`) ============may need this
      const data = await response.json()
      setData(data.length)
    } */
  


  //------------------------------------------API requests ---------------THIS IS USED TO HELP CREATE BLOGS,  delete, react, edit
  const APIRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
      const response = await fetch(url, optionsObj)
      if (!response.ok) throw Error('pleas reload the app')
    } catch (err) {
      error = err.message     /* -----------------------------------------------------The variable names need to be changed later */
    } finally {
      return errMsg
    }
  }
  //------------------------------------------------End of API requests




  /* HOme------------------------------------------------------------------------------------- */

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


    return (
      <div className="blog-list">

        <h2>Blog List</h2>

        <Link to="/create">Create a blog</Link>

        <SearchBlog search={search} setSearch={setSearch} />

        <button value={nameValue} onClick={sortName}>Name</button>

          <button value={categoryValue} onClick={sortCategory}>Category</button>

          <button value={dateValue} onClick={sortDate}>Date</button>

          <button value={titleValue} onClick={sortTitle}>Title</button>



{/*         {isPending && <p>loading...</p>} */}
        {!error && <div>{blogs.length  ? (
          <div>

{paginatedData.length > 0 ? (
          paginatedData.map((blog) => (
              <div key={blog.id} className="blog-itemsssss">

                <p>{blog.name}</p>
                <p>{blog.category}</p>
                <h3>{blog.title}</h3>
                <p>{(blog.body).length <= 35 ? blog.body : `${(blog.body).slice(0,35)}...`}</p>
                <p>{blog.date}</p>

                <Link to={`/blogs/${blog.id}`}>View Blog</Link>

              </div>
            ))
          ):(
            <div>Loading...</div>
          )}
          <div>
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              style={{ fontWeight: pageNum === currentPage ? 'bold' : 'normal' }}
            >
              {pageNum}
            </button>
          ))}
          </div>
          </div>
        ) : (<p>There are no more blogs....</p>)}</div>}

      {/* <div>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
        <div>Page {currentPage} of {totalPages}</div>
      </div> */}

      

      {/* <div>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
        <div>Page {currentPage} of {totalPages}</div>
      </div> */}

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


//   function SearchBlog({search, setSearch}) {
//     const [datas, setDatas] = useState()

//     const test = async (e) => {
//       e.preventDefault()
//       const response = await fetch(`http://localhost:3500/blogs`)
//       const data = await response.json()
//       setDatas(data.filter(blog => ((blog.body).toLowerCase()).includes(search.toLowerCase())))
//     }

//     console.log(datas)

    
//     return (
//       <div>
//         <form className="search-blog" onSubmit={(e) => test(e)}>
//           <label >Search</label>
//           <input type="text" autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Blogs" ></input>
//           <button>Submit</button>
//         </form>

//         {search && <div>
//           {datas.map((data) => (
//               <div key={data.id} className="blog-itemsssss">

//                 <p>{data.name}</p>
//                 <p>{data.category}</p>
//                 <h3>{data.title}</h3>
//                 <p>{(data.body).length <= 35 ? data.body : `${(data.body).slice(0,35)}...`}</p>
//                 <p>{data.date}</p>
// {/* 
//                 <Link to={`/blogs/${data.id}`}>View Blog</Link> */}

//               </div>
//             ))}
//           </div>}

//       </div>

//     )
//   }




































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
/*       const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1
      const blog = {name, title, category, body, date, checked: false, id} */
      const blog = {name, title, category, body, date, checked: false}
      /* const blogItems = [...blogs, blog] */

      /* setAndSaveBlogs(blogItems) */
      /* setBlogs(blogItems) */

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(blog)
      }
      const result = await APIRequest(API_URL, postOptions).then(() => {navigate('/')}).then(() => {window.location.reload(true)})
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

      const blog = {name, title, category, body, date, checked: false}

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
    
    {/* <Route path="/search" element={<SearchBlog search={search} setSearch={setSearch}/>} /> */}
    
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
        {/* <div>{renderPagination()}</div> */}

        {/* <button onClick={test}>YAYYYYYYYY</button> */}

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





// sorts name, category, date inside a form/select input

{/* <select onChange={handleSort} value={sortValue}>
          <option>Please Select Value</option>

          {sortOptions.map((blog, id) => (<option value={blog} key={id}>{blog}</option>))}
          </select> */}



          

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


    /*     const sortOptions = ["name", "category", "date"] */
























    /* console.log(data) */

  // const renderPagination = () => {
  //   if (currentPage === 0) {
  //     return (
  //       <div>
  //         <div>1</div>
  //         <button onClick={() => fetchBlogs(4, 8, 1)}>Next</button>
  //       </div>
  //     )
  //   } else if (currentPage < pageLimit - 2 && blogs.length === pageLimit ) {
  //     return (
  //       <div>
  //         <button onClick={() => fetchBlogs((currentPage - 1) * 4, currentPage * 4, -1)}>Previous</button>{/* 0,4,-1 */}
  //         <div>{currentPage + 1}</div>
  //         <button onClick={() => fetchBlogs((currentPage + 1) * 4, (currentPage + 2) * 4, 1)}>Next</button> {/* 8, 12, 1 */}
  //       </div>
  //     )
  //   } 
  //   else if (currentPage < pageLimit - 1 && blogs.length === pageLimit ) {
  //     return (
  //       <div>
  //         <button onClick={() => fetchBlogs((currentPage - 1) * 4, currentPage * 4, -1)}>Previous</button>{/* 4,8,-1 */}
  //         <div>{currentPage + 1}</div>
  //         <button onClick={() => fetchBlogs((currentPage + 1) * 4, (currentPage + 2) * 4, 1)}>Next</button> {/* 12, 16, 1 */}
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div>
  //         <button onClick={() => fetchBlogs(8, 12, -1)}>Previous</button>
  //         <div>{currentPage + 1}</div>
  //       </div>
  //     )
  //   }
  // }