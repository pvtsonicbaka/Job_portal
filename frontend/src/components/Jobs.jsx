import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useGetAllJobs } from "@/hooks/useGetAllJobs";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery !== "") {
      // Default values
      let location = "NA";
      let industry = "NA";
      let salary = "NA";

      // Parse the searchedQuery string
      const parts = searchedQuery.split(" | ");
      parts.forEach((part) => {
        if (part.startsWith("Location:"))
          location = part.split("Location:")[1].trim();
        if (part.startsWith("Industry:"))
          industry = part.split("Industry:")[1].trim();
        if (part.startsWith("Salary:"))
          salary = part.split("Salary:")[1].trim();
      });

      const filteredJobs = allJobs.filter((job) => {
        const matchesLocation =
          location === "NA" ||
          job.location.toLowerCase() === location.toLowerCase();
        const matchesIndustry =
          industry === "NA" ||
          job.title.toLowerCase().includes(industry.toLowerCase());
        const matchesSalary = (() => {
          if (salary === "NA") return true;
          const [min, max] = salary.includes("to")
            ? salary
                .replace(/[^0-9 to]/g, "")
                .split("to")
                .map((s) => parseInt(s.trim()))
            : salary.split("-").map((s) => parseInt(s.replace(/\D/g, "")));

          return job.salary >= min * 12 && job.salary <= max * 12;
        })();

        return matchesLocation && matchesIndustry && matchesSalary;
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
