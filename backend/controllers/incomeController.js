import User from "../models/User.js"
import Income from "../models/Income.js"
import mongoose from "mongoose"
import * as xlsx from 'xlsx';

//add income source
export const addIncome= async (req, res)=>{
  const userId=req.user.id
  try{
    const {icon,source,amount,date}=req.body

    if(!source ||!amount ||!date){
        return res.status(400).json({message:"all fields are required"})
    }

    const newIncome= await Income.create({
        userId,icon,source,amount,date:new Date(date)
    }) 
    res.status(200).json(newIncome)
  } catch(err){
    res.status(500).json({message:"server error"})
  }
}


export const getAllIncome= async (req, res)=>{
const userId=req.user.id

 try{
    const income=await Income.find({userId}).sort({date:-1})
    res.status(200).json(income)
  } catch(err){
    res.status(500).json({message:"server error"})
  }

}

// Delete Income Source
export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new(); // create new workbook
    const ws = xlsx.utils.json_to_sheet(data); // convert JSON to sheet
    xlsx.utils.book_append_sheet(wb, ws, "Income"); // add sheet to workbook

    xlsx.writeFile(wb, "income_details.xlsx"); // write file to disk
    res.download("income_details.xlsx"); // send file to client
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

