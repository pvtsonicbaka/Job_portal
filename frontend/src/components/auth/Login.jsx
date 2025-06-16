import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { RadioGroup } from "../ui/radio-group"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'
const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispath(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            console.log(res.data.success)
            if (res.data.success) {
                dispath(setUser(res.data.user))
                navigate("/")
                toast.succes(res.data.message);
            }

        } catch (error) {
            console.log(error)
            // console.log(toast.error(error.message.data.response))

        } finally {
            dispath(setLoading(false))
        }

    }



    return (
        <div>
            <Navbar />
            <div onSubmit={submitHandler} className='flex items-center justify-center max-w-7xl mx-auto'>
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
                                    checked={input.role === 'student'}
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
                                    checked={input.role === 'Recuriter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recuriter</Label>
                            </div>

                        </RadioGroup>

                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2></Button>
                        :<Button type="submit" className="w-full my-4">
                        Login
                        </Button>
                    }
                    
                    <span className='text-sm'>Don't have an account? <Link to="/login" className='text-blue-600' >Signup</Link></span>
                </form>

            </div>
        </div>
    )
}

export default Login
