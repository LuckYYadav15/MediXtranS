import React from 'react'
import HashLoader from "react-spinners/HashLoader";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };


export default function Loading() {
  return (
        <HashLoader
            color="#23323f"
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
  )
}
