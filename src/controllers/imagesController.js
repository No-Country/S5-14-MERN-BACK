import Image from "../models/Image";

export const imageGet = async (req, res) => {
  console.log(req);
  res.status(200).json({ message: "Images Get" });
};

export const imageGetById = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  res.status(200).json({ message: "Images GetById" });
};

export const imageAdd = async (req, res) => {
  console.log(req);
  res.status(200).json({ message: "Images Add" });
};

export const imageModify = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  res.status(200).json({ message: "Images Modify" });
};

export const imageDelete = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  res.status(200).json({ message: "Images Delete" });
};
