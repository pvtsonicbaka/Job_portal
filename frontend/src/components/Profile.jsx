import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from '@radix-ui/react-label'
import AppliedJobTable from './AppliedJobTable'

const skills = ["html", "css", "js", "react"]
// const skills=[] 

const Profile = () => {
    const isHaveResume = true
    return (
        <div>
            <Navbar></Navbar>

            <div className='max-w-4xl shadow-xl  mx-auto bg-white border-gray-200 my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4 '>

                        <Avatar className={"h-24 w-24"}>
                            <AvatarImage alt="profile pic " src="https://www.hasoptimization.com/wp-content/uploads/2017/01/linkedin-logo-3.png">

                            </AvatarImage>
                        </Avatar>

                        <div>
                            <h1 className='font-bold text-xl '>Full Name</h1>
                            <p>Add Your Bio here Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, eligendi!</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5' >
                    <div className='flex items-center gap-3 my-2'>

                        <Mail />
                        <span>patel@gmail.com</span>

                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>9991112220?</span>

                    </div>
                </div>
                <div className='my-5' >
                    <h1>
                        Skills
                    </h1>
                    <div className="flex items-center gap-1">
                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) :
                                <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isHaveResume ? <a target='blank' href='https://instagram.com' className='text-blue-500 w-full hover:underline cursor-pointer'>idk what is this code </a> :
                            <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl '>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Application componenxt */}
                <AppliedJobTable />

            </div>
        </div>
    )
}

export default Profile
