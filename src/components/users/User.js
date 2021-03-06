import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';


const User = ({getUser, getRepos, user, loading, repos, match}) => {

    useEffect(() => {
        getUser(match.params.login)
        getRepos(match.params.login)
    }, [getUser, getRepos, match])

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        company,
        hireable
    } = user;

    return (
        loading ? 
            <Spinner/> :
            <Fragment>
                <Link to='/' className='btn btn-light'>Back To Search</Link>
                Hireable: {hireable ? 
                    <i className="fas fa-check-circle text-success"></i> :
                    <i className="fas fa-times-circle text-danger"></i>
                }
                <div className="card grid-2 p-3">
                    <div className="">
                        <img 
                            src={avatar_url} alt="" 
                            className='round-img text-center'
                            style={{width: '150px'}}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {
                            bio && 
                            <Fragment>
                                <h2>Bio</h2>
                                <p>{bio}</p>
                            </Fragment>
                        }
                        <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment><strong>Username:</strong> {login}</Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment><strong>Website:</strong> {blog}</Fragment>}
                            </li>
                            <li>
                                {company && <Fragment><strong>Company:</strong> {company}</Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-warning">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>

                <Repos repos={repos} />
            </Fragment>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired
}

export default User
