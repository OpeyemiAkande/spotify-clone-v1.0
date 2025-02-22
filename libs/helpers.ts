import {Price} from "@/types";

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.PUBLIC_VERCEL_URL ??
    "http:/localhost: 3000/";
  // Make sure to include `https://` when localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include trailing slashes `/`
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
};

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: {price: Price};
}) => {
  console.log("posting,", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in postData", {url, data, res});

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);
  return t;
};
