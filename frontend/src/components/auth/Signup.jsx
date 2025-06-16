import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { RadioGroup } from "../ui/radio-group"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const navigate = useNavigate();



    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput
            ({ ...input, file: e.target.files?.[0] })
    }
    const dispath = useDispatch();

    const { loading } = useSelector((store) => store.auth);

    // apii thats why asyncc
    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input)
        const formData = new FormData()
        formData.append("fullname", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispath(setLoading(true))

            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login ")
                toast.succes(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
        finally {
            dispath(setLoading(false))

        }

    }


    return (

        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'> Sign up</h1>
                    <div className='my-2'>
                        <Label>
                            Full name
                        </Label>
                        <input
                            type='text'
                            placeholder='mr someone who idk'
                            value={input.fullName}
                            name='fullName'
                            onChange={changeEventHandler}
                        />
                    </div>
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
                            Phone no.
                        </Label>
                        <input
                            type='text'
                            placeholder='+91 xxxxx xxxxx'
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                        />

                    </div>
                    <div className='my-2'>
                        <Label>
                            Password
                        </Label>
                        <input
                            type='password'
                            placeholder='0000000000'
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
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer"
                                onChange={changeFileHandler}

                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'>wait bro:)</Loader2></Button>
                            : <Button type="submit" className="w-full my-4">
                                Signup
                            </Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600' >Login</Link></span>
                </form>

            </div>
        </div>
    )
}

export default Signup
