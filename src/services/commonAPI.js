import axios from "axios"

export const commonAPI = async (httpRequest,url,reqBody,reqHeader)=>{
    console.log(httpRequest);

    
    const reqConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader
    }
    console.log(reqConfig);
    
    return await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        
        return err
        
    })

}