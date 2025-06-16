import { RadioGroup } from '@radix-ui/react-radio-group'
import React from 'react'
import { data } from 'react-router-dom'
import { RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

//its 2 a.m. and raining  :)

const FilterData = [
  {
    filterType: "Location",
    arraya: ["delhi", "banglore", "Pune", "mumbai", "hyderabad"]
  },
  {
    filterType: "industy",
    arraya: ["frontend dev", "backedn dev", 'Fullstack dev']

  },
  {
    filterType: "Salary",
    arraya: ["0-40k", "42k-1L", '1Lto5L']
  }


]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg '>
        Filter Jobs
      </h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          FilterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>

                {data.filterType}
              </h1>

                {
                  data.arraya.map((item, indxe) => {
                    return (
                      <div className='flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={item} />
                        <Label >{item}</Label>
                      </div>
                    );
                  })
                }
            </div>
          ))
        }
      </RadioGroup>

    </div>
  )
}

export default FilterCard
