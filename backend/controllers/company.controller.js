import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    var company_obj = await Company.create({
      name: companyName,
      description: req.body.description || "",
      website: req.body.website || "",
      location: req.body.location || "",
      logo: req.body.logo || "",
      userId: req.id, // Assuming user ID is available in req.user
    });
    return res.status(201).json({
      message: "Company registered successfully",
      company_obj,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error from registerCompany: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId: userId });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companies retrieved successfully",
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error from getCompany: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company retrieved successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error from getCompanyById: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { companyName, description, website, location } = req.body;
    const file = req.file;

    // have to handle logo upload separately
    let logo = "";
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const company = await Company.findByIdAndUpdate(
      companyId,
      {
        companyName: companyName,
        userId: req.id,
        description: description || "",
        website: website || "",
        location: location || "",
        logo: logo || "",
      },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error from updateCompany: ${error.message}`,
      success: false,
      error: error.message,
    });
  }
};
