import React from 'react'
import { useState, useEffect } from 'react'
import http from '../../services/httpServices';
import config from '../../config.json';
import toast, { Toaster } from 'react-hot-toast';
import logService from '../../services/logService';


export default function Demo() {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const {data} = await http.get(config.apiEndPoint)
            setAllPosts(data)
            }
        getData();
    }, []);

    const handleAdd = async () => {
        const obj = {title:'a', body:'b'};
        
        try {
            const {data} = await http.post(config.apiEndPoint, obj);
            setAllPosts([data, ...allPosts]);
            toast.success('Post is been Added successfully');
        } catch (e) {
            logService.log(e);
            toast.error('Failed to Add post');
        }
    }

    const handleUpdate = async (post) => {
        post.title = 'Updated Title'
        post.body = 'Updated Body'
        try {
            await http.put(`${config.apiEndPoint}/${post.id}`, post);
            const posts = [...allPosts];
            const index = posts.indexOf(post);
            posts[index] = {...post}
            setAllPosts(posts);
            toast.success('Post is been Updated Successfully');
        } catch (e) {
            logService.log(e);
            toast.error('Failed to Update Post');
        }
    }

    const handleDelete = async (post) => {
        const originalPosts = [...allPosts];
        setAllPosts(allPosts.filter(p => p.id != post.id))
        try {
            await http.delete(`${config.apiEndPoint}/${post.id}`);
            toast.success('Post is been deleted successfully');
        } catch (e) {
            logService.log(e);
            toast.error('Failed to delete post');
            setAllPosts(originalPosts);
        }
    }
    
  return (
    <React.Fragment>
        <Toaster
            position="top-right"
            reverseOrder={true}
        />
        <div className="container">
            <button onClick={handleAdd} className='btn btn-primary mt-3'>Add</button>
            <table className='table mt-3'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allPosts.map(post => <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td><button onClick={() => handleUpdate(post)} className='btn btn-secondary btn-sm'>Edit</button></td>
                        <td><button onClick={() => handleDelete(post)} className='btn btn-danger btn-sm'>Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </React.Fragment>
  )
}
