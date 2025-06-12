import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
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
    const userId = req.id; // Assuming req.id contains the ID of the user creating the job
    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const job = await Job.create({
      title,
      description,
      salary,
      location,
      jobType,
      experienceLevel: experience, // Assuming experience is passed as a number
      // If experience is a string like "1-3 years", you might need to parse it accordingly
      requirements: requirements.split(",") || [],
      position,
      company: companyId, // Assuming companyId is passed in the request body
      createdBy: userId, // The user creating the job
    });
    return res.status(201).json({
      message: "Jnew ob posted successfully",
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
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({ path: "company" }).sort({
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
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
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
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
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error from getAdminJobs: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};
