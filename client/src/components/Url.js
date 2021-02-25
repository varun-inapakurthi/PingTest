import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrlData } from "../actions/urlAction";
import moment from 'moment'

const Url = ({ match, history }) => {


    let { userInfo } = useSelector(state => state.user)
    let id = match.params.id

    let dispatch = useDispatch()


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history, dispatch])

    useEffect(() => {
        dispatch(getUrlData(id))
    }, [dispatch, id])

    let { urlData, loading } = useSelector(state => state.urlData);
    console.log(loading)
    return (
        <>
            {urlData && <>

                <div class="container align-items-center justify-content-between" style={{ border: "1px solid black", width: "25rem" }}>
                    <h3 className={"text-center"}>Url Details</h3>
                    <hr />
                    <div className="card-body">
                        <h6 className="card-title">URL: {urlData.url}</h6>
                        <hr />
                        <h6 className="card-subtitle mb-2 ">Added Response Time: {urlData.expectedResponseTime} ms</h6>
                        <hr />
                        <h6 className="card-subtitle mb-2 ">Date added: {moment(urlData.createdAt).format("DD MMM YYYY")}</h6>
                        <hr />
                        <h6 className="card-subtitle mb-2 ">Frequency: 5 mins</h6>
                    </div>
                </div>

                {urlData.pingData && urlData.pingData.length > 0 && <div className="container align-items-center justify-content-between">
                    <table className="table table-responsiv table-striped" >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Request Time</th>
                                <th>Response Time (ms)</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urlData.pingData.reverse().map((url, inx) => (
                                <tr>
                                    <td>{inx + 1}</td>
                                    <td>{moment(url.timeOfRequest).format("DD MMM YYYY mm:hh")}</td>
                                    <td>{url.responseDuration}</td>
                                    <td>{Number(url.responseDuration) > Number(urlData.expectedResponseTime) ?
                                        <p className="text-danger"> URL has taken more than {urlData.expectedResponseTime}ms to respond</p> :
                                        <p className="text-success"> URL has taken less than {urlData.expectedResponseTime}ms to respond</p>
                                    }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                </div>}


            </>}
        </>
    );
}
export default Url;