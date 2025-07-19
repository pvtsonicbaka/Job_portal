import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    console.log("postJob called");
    console.log("Request body:", req.body);
    console.log("Request user ID:", req.id);

    const {
      title,
      description,
      salary,
      location,
      jobType,
      requirements,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      console.warn("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Creating job with data:", {
      title,
      description,
      salary,
      location,
      jobType,
      experience,
      requirements,
      position,
      companyId,
      createdBy: userId,
    });

    const job = await Job.create({
      title,
      description,
      salary,
      location,
      jobType,
      experienceLevel: experience,
      requirements: requirements.split(",") || [],
      position,
      company: companyId,
      createdBy: userId,
    });

    console.log("Job created successfully:", job);

    return res.status(201).json({
      message: "new Job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Internal server error from postJob" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    console.log("getAllJobs called");
    const keyword = req.query.keyword || "";
    console.log("Keyword:", keyword);

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    console.log("Query for fetching jobs:", query);

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      console.warn("No jobs found");
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    console.log(`Found ${jobs.length} jobs`);

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: `Internal Server Error from getAllJobs: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log("getJobById called with ID:", jobId);

    const job = await Job.findById(jobId);

    if (!job) {
      console.warn("Job not found for ID:", jobId);
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    console.log("Job found:", job);

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({
      message: `Internal Server Error from getJobById: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    console.log("getAdminJobs called by admin ID:", adminId);

    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs || jobs.length === 0) {
      console.warn("No jobs found for admin:", adminId);
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    console.log(`Admin has posted ${jobs.length} jobs`);

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAdminJobs:", error);
    return res.status(500).json({
      message: `Internal Server Error from getAdminJobs: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};
