import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function XSSHelper() {
  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");
  useEffect(() => {
    console.log(code);
  });

  return (
    <>
      <h2>XSS Helper Active</h2>
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </>
  );
}

export default XSSHelper;
