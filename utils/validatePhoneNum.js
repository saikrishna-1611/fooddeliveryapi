const ValidatePhoneNumber=(phoneNumber)=>{
  if(phoneNumber.length!==10)
  {
    return false;
  }
  else{
    return true;
  }
}

export default ValidatePhoneNumber
