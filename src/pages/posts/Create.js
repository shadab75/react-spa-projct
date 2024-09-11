import { useState } from "react"
import Swal from "sweetalert2";

const CreatePost = ()=>{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const handleSubmit = (e) => {
       
        e.preventDefault();
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title,
              body,
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setError(null)
                Swal.fire({
                    title: 'Tanks',
                    text: 'Post Created Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })

            }).catch(err=>{
                setLoading(false)
                setError(err.message)
        
            });
          

         
    }

return(
           <>
            <div className="col-md-6">
                <h2>Create Post</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                <label  className="form-label">Title</label>
                <input onChange={(e)=>setTitle(e.target.value)} type="text" className="form-control" />
                <div className="form-text text-danger">
                 {title?'':'title is required'}   
                </div>
                </div>
                <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea onChange={(e)=>setBody(e.target.value)} className="form-control" rows="3"></textarea>
                <div className="form-text text-danger">
                {body ?'':'body is required'} 
                </div>
                <button className="mt-3 btn btn-dark" type="submit" disabled={title===''||body===''}>
                    Create
                    {loading&&<div className="spinner-border spinner-border-sm me-2"></div>}
                    </button>
                    {error&&<div className="fw-bold mt-2 text-danger">{error}</div>}
                </div>
                </form>
              
            </div>
            </>
)
}

export default CreatePost