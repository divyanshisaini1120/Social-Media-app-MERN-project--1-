

//regex for validation-check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.]+$/; // Letters, numbers, underscores, and dots only
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateUser = function(username, name_, email,  password){

    //check all fields exists
    if(!username || !name_ || !email ||!password){
        return ({
            isValid: false,
            message: "All fields are required"
        })
    }
    //length check
    if(username.length <3 || username.length >20){
        return ({
            isValid: false,
            message: "username length must be between 3 to 20"
        })
    }
    //structure check
    if(!EMAIL_REGEX.test(email.trim().toLowerCase())){
       return ({
            isValid: false,
            message: "Please provide a valid email"
        }) 
    }
    if(!USERNAME_REGEX.test(username.trim())){
        return({isValid: false, message: "Username can only contains alphanumeric, dot and underscore"}) 
    }
    // if(!PASSWORD_REGEX.test(password).trim()){
    //     return ({isValid: false, message: "Password is not strong enough (len>=8, A-Z>=1, a-z>=1, 0-9>=1, special_char>=1)"}) 
    // }
    
    return ({isValid: true})
}

export default validateUser