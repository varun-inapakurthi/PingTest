import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../actions/userAction";
import AllUrl from "./AllUrl";

const Home = ({ history }) => {


    let { userInfo, loading } = useSelector(state => state.user)

    let dispatch = useDispatch()


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history, dispatch])

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    // let { userData } = useSelector(state => state.userData)
    return (
        <>

            {/* <div className="home d-flex flex-row justify-content-between" style={{ height: "100%" }}> */}
            <div className="urls m-5">
                <AllUrl />
            </div>
            {/* </div> */}
        </>

    );
}

export default Home;