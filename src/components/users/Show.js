import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class ShowUser extends React.Component {
    _isMounted = false

    constructor() {
        super()
        this.state = {
            user: {},
            posts: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this._isMounted = true
        const id = this.props.match.params.id
        const userURL = `/users/${id}`
        const postsURL = `posts?userId=${id}`
        Promise.all([ axios.get(userURL), axios.get(postsURL) ])
            .then((response) => {
                const [ user, posts ] = response
                if(this._isMounted) {
                    this.setState({ user: user.data, posts: posts.data, isLoading: false})
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        this._isMounted = false
        console.log('component is unmounting')
    }

    render() {
        const { user, posts, isLoading } = this.state
        return (
            isLoading ? ( <p>Loading...</p>) : (
                <div>
                <p><strong>Username : </strong>{user.name}</p>
                <p><strong>Posts written by {user.name} </strong></p>
                <ul>
                    {
                        posts.map(post => {
                            return <li key={post.id}><Link to={`/posts/${post.id}`} >{post.title}</Link></li>
                        })
                    }
                </ul>
                </div>
            )
        )
    }
}

export default ShowUser