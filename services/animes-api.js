import axios from "axios";

const api = axios.create({
  baseURL: "https://jikan1.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "f2ba568585mshf8882dbb4f18054p12f7f7jsnbea2d7de74b8",
    "x-rapidapi-host": "jikan1.p.rapidapi.com",
    useQueryString: true,
  },
});

export default api;
