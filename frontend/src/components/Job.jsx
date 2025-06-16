import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { color } from 'framer-motion'

const Job = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-200'>
      <div className='flex items-center justify-between'>
        <p>2 days ago</p>
        <Button>
          <Bookmark className='rounded-full' size='icon' variant="outline"></Bookmark>
        </Button>

      </div>
      <div className='flex items-center gap-2 my-2'>

        <Button className='p-6' variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src="https://www.hasoptimization.com/wp-content/uploads/2017/01/linkedin-logo-3.png">

            </AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg '>
            Company name
          </h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div >
        <h1 className="font-bold text-lg my-2 text-gray-800">
          Title
        </h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae reprehenderit harum laborum consequuntur animi, maiores numquam aspernatur exercitationem voluptas eaque.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="text-blue-700 bg-blue-100 font-bold px-3 py-1 rounded-full">
          12 Positions
        </Badge>
        <Badge className="text-green-700 bg-green-100 font-bold px-3 py-1 rounded-full">
          Part Time
        </Badge>
        <Badge className="text-purple-700 bg-purple-100 font-bold px-3 py-1 rounded-full">
          25 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#5e0791]">
          Save for Later
        </Button>
      </div>
    </div>
  )
}

export default Job
