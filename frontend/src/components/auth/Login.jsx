import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { RadioGroup } from "../ui/radio-group"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
const Login = () => {
    const [input,setInput]=useState({
        email:"",
        password:"",
        role:"",
    })
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            } )
            if(res.data.success){
                navigate("/ ")
                toast.succes(res.data.message);
            }

        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div>
            <Navbar />
            <div  onSubmit={submitHandler} className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'> Login? </h1>
                    
                    <div className='my-2'>
                        <Label>
                            Email
                        </Label>
                        <input
                            type='email'
                            placeholder='pakistan@gmail.com'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                        />
                    </div>
                   
                    <div className='my-2'>
                        <Label>
                            Password
                        </Label>
                        <input
                            type='password'
                            placeholder='idk'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between '>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center gap-3">
                                <Input
                                    type='radio'
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={input.role==='student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input
                                    type='radio'
                                    name="role"
                                    value="recuriter"
                                    className="cursor-pointer"
                                    checked={input.role==='Recuriter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recuriter</Label>
                            </div>

                        </RadioGroup>
                          
                    </div>
                    <Button type="submit" className="w-full my-4">
                        Login
                    </Button>
                    <span className='text-sm'>Don't have an account? <Link to="/login" className='text-blue-600' >Signup</Link></span>
                </form>

            </div>
        </div>
    )
}

export default Login
