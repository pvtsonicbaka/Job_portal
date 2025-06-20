import { Popover, PopoverContent } from '@radix-ui/react-popover'
import React from 'react'
import { PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux'
const Navbar = () => {
    // const {user}=useSelector(store=>store.auth)
    const user=true
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

                <div>

                    <h1 className='text-2xl font-bold'>

                        job <span className='text-[#F83002]'>portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5' >
                        <li> <Link to="/">Home </Link> </li>
                        <li> <Link to="/jobs">Jobs</Link> </li>
                        <li> <Link to="/browse">Browse</Link> </li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#4c386d]" variant="destructive">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 '>
                                    <div>

                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                            </Avatar>
                                            <div>

                                                <h4 className='font-medium '>idk</h4>
                                                <p className='text-sm text-muted-foreground'>idk this is some random text writing at 11 </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2  text-grey-600' >
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="ghost">
                                                    <Link to="/profile">
                                                    View Profile
                                                    </Link>
                                                </Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button variant="ghost">
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar
