import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPage } from "../state/user/user";



export function Pages({length, pageSize}) {
  const page = useSelector((state: RootState) => state.user.page)
  // const [pages, setPages] = useState(0)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log(page)
  }, [page])

  return (
    <>
      <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', justifyItems: 'center', alignItems: 'center'}}>
        {/* 1, 2, 3, 4, 5 */}
        {/* {page}   */}
        {/* {page < 6 && 
          
        } */}
        <div>
          {page < 6 && [...Array(10)].map((x, i) => {
             if (i+1 > Math.ceil(length / pageSize)) {
              return
             }
             return  <span style={{}}>
              {i+1 == page ?
                <span style={{textDecoration: "none", color: "black"}}  onClick={() => {
                  dispatch(setPage(i+1))
                }}>{i+1}</span> :
                <Link to={""}  onClick={() => {
                  dispatch(setPage(i+1))
                }}>{i+1}</Link>
              }
              <> ‏‏‎ ‎ ‏‏‎ ‎ </>
             </span>
          }
          )}
          {page >= 6 &&
            <>
              <Link to={""}  onClick={() => {
                dispatch(setPage(1))
              }}>1</Link>
              <span> ‏‏‎ ‎ ‏‏‎ ‎...‏‏‎ ‎ ‏‏‎ ‎ </span>
            </> 
          }
          {page >= 6 && [...Array(10)].map((x, i) => {
             if (Number(page)+Number(i) - 4 > Math.ceil(length / pageSize)) {
              return <></>
             }
             return <span style={{}}>
              {(Number(page)+Number(i) - 4) == page ?
                <span style={{textDecoration: "none", color: "black"}}  onClick={() => {
                  dispatch(setPage(Number(page)+Number(i) - 4))
                }}>{(Number(page)+Number(i) - 4)}</span> :
                <Link to={""}  onClick={() => {
                  dispatch(setPage(Number(page)+Number(i) - 4))
                }}>{(Number(page)+Number(i) - 4)}</Link>
              }
              <> ‏‏‎ ‎ ‏‏‎ ‎ </>
             </span>
          }
          )}
          {page <= Math.ceil(length / pageSize) - 5 &&
            <>
            <span> ‏‏‎ ‎ ‏‏‎ ‎...‏‏‎ ‎ ‏‏‎ ‎ </span>
              <Link to={""}  onClick={() => {
                dispatch(setPage(Math.ceil(length / pageSize)))
              }}>{Math.ceil(length / pageSize)}</Link>
            </> 
          }
        </div>
        <br />
        {/* <div>Len is {length}</div> */}
      </div>
      <br />
    </>
  );
}