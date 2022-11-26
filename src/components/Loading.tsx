import React, { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({
  easing: 'ease',
  speed: 800,
  showSpinner: false
})
const Loading:React.FC = () => {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  },[])
  return null
}

export default Loading