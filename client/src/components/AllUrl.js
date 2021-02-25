import { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../actions/userAction";
import { deleteUrl } from "../actions/urlAction";
import UrlModal from "./UrlModal";
import { Link } from 'react-router-dom'

const AllUrl = () => {
    let { userData, loading } = useSelector(state => state.userData)

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    const deleteHandler = (id) => {
        dispatch(deleteUrl(id))
    }
    return (
        <div className="container align-items-center justify-content-between">


            {userData?.urls?.length > 0 ? <div>
                <div className="m-5">
                    <UrlModal />
                </div>
                <div className="">
                    <div className="table" >
                        <table className="table table-responsive table-striped">

                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Url</th>
                                    <th>Date Added</th>
                                    <th>Response Time</th>
                                    <th>Details</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData?.urls?.length > 0 && userData?.urls.map((url, inx) => (
                                    <tr key={url._id}>
                                        <td> {inx + 1}</td>
                                        <td> {url.url}</td>
                                        <td> {moment(url.createdAt).format("DD MMM YYYY")}</td>
                                        <td> {url.expectedResponseTime}</td>
                                        <td> <Link className="btn btn-primary btn-sm" to={`/url/${url._id}`}>View Details</Link></td>
                                        <td> <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(url._id)}>Delete</button></td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div> : <div className="d-flex flex-column align-items-center">
                    <h3>No urls found</h3>
                    <div>
                        {/* <button className="btn btn-primary" onClick={setUrlHandler}>Add Url</button> */}
                        <UrlModal />
                    </div>
                    {loading && <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                </div>}
        </div>
    );
}

export default AllUrl;