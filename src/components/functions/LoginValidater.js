import React, {useEffect} from 'react';

const LoginValidater = ({username, password}) => {
    // Input requirements
    if(username.length === 0 && password.length === 0)
        return <div className='font-bold text-red-500'>Username and password required</div>
    if(username.length === 0)
        return <div className='font-bold text-red-500'>Username required</div>
    if(password.length === 0)
        return <div className='font-bold text-red-500'>Password required</div>
}

export default LoginValidater;