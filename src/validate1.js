export const checkValidData1=(email,password,secpwd)=>{
    const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPwdValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid)
    return "Email ID is not valid";

    if(!isPwdValid)
    return "Password is not valid";

    if(secpwd!==password)
    return "Password does not match";

    return null;
}