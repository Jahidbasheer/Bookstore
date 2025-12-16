import { commonAPI } from "../services/commonAPI";
import { serverURL } from "../services/serverURL";

// register user :post reqBody
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

// login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

// googlelogin
export const googleLoginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/google-login`,reqBody)
}

// get home books 
export const getHomeBooksAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/home-books`)
}

// .............................USER.............................

// add book
export const addBookAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-book`,reqBody,reqHeader)
}

// get all Books
export const getAllBooksAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-books?search=${searchKey}`,"",reqHeader)
}

// get a Books
export const viewABookAPI = async(id)=>{
    return await commonAPI("GET",`${serverURL}/view-books/${id}`)
}

// get all User Added Books
export const getAllUserBooksAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-added-books`,"",reqHeader)
}

// get all user brought Books
export const getAllUserBroughtBooksAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-brought-books`,"",reqHeader)
}

// delete a user Book  --  delete-user-books/:id
export const deleteAUserBookAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-user-books/${id}`)
}

// make payment
export const makePaymentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/make-payment`,reqBody,reqHeader)
}

// .................Admin...............

// get all Admin Books
export const getAllBooksAdminAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/admin-all-books`,"",reqHeader)
}

// Approve Books
export const approveBooksAPI = async(reqHeader,reqBody)=>{
    return await commonAPI("PUT",`${serverURL}/approve-books`,reqBody,reqHeader)
}

// get all users
export const getAllUsersAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-users`,"",reqHeader)
}

// Update admin profile
export const adminProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/admin-profile-update`,reqBody,reqHeader)
}

// Update user profile
export const userProfileUpdateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user-profile-update`,reqBody,reqHeader)
}