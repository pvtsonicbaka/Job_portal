import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { formatJobDate } from "../utils/formatJobDate";

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 rounded-xl shadow-lg bg-white border border-gray-100 max-w-full break-words">
      {/* Top Row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-gray-500">{formatJobDate(job?.createdAt)}</p>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-shrink-0">
          <Avatar className="w-12 h-12">
            <AvatarImage src={job?.company?.logo} alt="logo" />
          </Avatar>
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">
            {job?.company?.name}
          </h2>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {job?.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <Badge className="bg-blue-100 text-blue-700 font-semibold">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-100 text-green-700 font-semibold">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 min-w-[120px] text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          Details
        </Button>
        <Button className="flex-1 min-w-[120px] bg-[#7209b7] text-white hover:bg-[#5e0791]">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
