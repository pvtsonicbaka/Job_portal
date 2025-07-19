import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["Ahmedabad","Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [location, setLocation] = useState("NA");
  const [industry, setIndustry] = useState("NA");
  const [salary, setSalary] = useState("NA");
  const dispatch = useDispatch();

  useEffect(() => {
    const combinedQuery = `Location: ${location} | Industry: ${industry} | Salary: ${salary}`;
    dispatch(setSearchedQuery(combinedQuery));
  }, [location, industry, salary, dispatch]);

  const clearFilters = () => {
    setLocation("NA");
    setIndustry("NA");
    setSalary("NA");
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {/* Location */}
      <div className="mt-4">
        <h2 className="font-bold text-lg">Location</h2>
        <RadioGroup value={location} onValueChange={() => {}}>
          {filterData[0].array.map((item, idx) => {
            const id = `location-${idx}`;
            return (
              <div className="flex items-center space-x-2 my-2" key={id}>
                <RadioGroupItem
                  value={item}
                  id={id}
                  checked={location === item}
                  onClick={() => {
                    setLocation((prev) => (prev === item ? "NA" : item));
                  }}
                />
                <Label htmlFor={id}>{item}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* Industry */}
      <div className="mt-4">
        <h2 className="font-bold text-lg">Industry</h2>
        <RadioGroup value={industry} onValueChange={() => {}}>
          {filterData[1].array.map((item, idx) => {
            const id = `industry-${idx}`;
            return (
              <div className="flex items-center space-x-2 my-2" key={id}>
                <RadioGroupItem
                  value={item}
                  id={id}
                  checked={industry === item}
                  onClick={() => {
                    setIndustry((prev) => (prev === item ? "NA" : item));
                  }}
                />
                <Label htmlFor={id}>{item}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* Salary */}
      <div className="mt-4">
        <h2 className="font-bold text-lg">Salary</h2>
        <RadioGroup value={salary} onValueChange={() => {}}>
          {filterData[2].array.map((item, idx) => {
            const id = `salary-${idx}`;
            return (
              <div className="flex items-center space-x-2 my-2" key={id}>
                <RadioGroupItem
                  value={item}
                  id={id}
                  checked={salary === item}
                  onClick={() => {
                    setSalary((prev) => (prev === item ? "NA" : item));
                  }}
                />
                <Label htmlFor={id}>{item}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="flex justify-start mt-4">
        <Button onClick={clearFilters}>Clear</Button>
      </div>
    </div>
  );
};

export default FilterCard;
