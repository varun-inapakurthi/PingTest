import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { addUrl } from "../actions/urlAction";
import { getProfile } from "../actions/userAction";

const UrlModal = () => {

    let [url, setUrl] = useState("https://")
    let [ms, setMs] = useState(50)

    let dispatch = useDispatch()
    const addUrlHandler = () => {
        dispatch(addUrl(url, ms))
        dispatch(getProfile())
    }
    return (
        <><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Add Url
      </button>
            {/* 
            <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Url</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => {
                                setUrl("https://")
                                setMs(50)

                            }} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label >Url</label>
                                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" placeholder="https://  Enter url" />
                            </div>
                            <div className="form-group">
                                <label >Response Time (ms) </label>
                                <input type="Number" value={ms} onChange={(e) => setMs(e.target.value)} className="form-control" placeholder="Enter response time" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {

                                setUrl("https://")
                                setMs(50)

                            }} data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={addUrlHandler} data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default UrlModal;