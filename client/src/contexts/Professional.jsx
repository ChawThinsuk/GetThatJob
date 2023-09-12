import axios from 'axios';
import React, { useState } from 'react';


const ProContext = React.createContext();
// const getPosts = async (input) => {
// const { status, keywords, page } = input;
// try {
// const params = new URLSearchParams();
// params.append("status", status);
// params.append("keywords", keywords);
// params.append("page", page);
// setIsError(false);
// setIsLoading(true);
// const results = await axios.get(
// `http://localhost:4000/posts?${params.toString()}`
// );
// setPosts(results.data.data);
// setTotalPages(results.data.total_pages);
// setIsLoading(false);
// } catch (error) {
// setIsError(true);
// setIsLoading(false);
// }
// };
function ProProvider(props) {
const [jobs, setJobs] = useState([]);
const [isLoading ,setIsLoading] = useState(false);
const getJobs = async ({category}) => {
try {
setIsLoading(true);
const result = await axios.get(`http://localhost:4000/big?test=${category}&id=1`);
setJobs(result.data.data.rows);
console.log(result.data);
setIsLoading(false);
}catch(error){
console.log("error", error)
}
}
return (
<ProContext.Provider
value={{jobs, setJobs, getJobs, isLoading}}
>
{props.children}
</ProContext.Provider>
);
}


const usePro = () => React.useContext(ProContext);


export { ProProvider, usePro };