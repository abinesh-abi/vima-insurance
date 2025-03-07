import { NextFunction, Request, Response } from "express";
import { Yup } from "../utils/Yup";
import insuranceServices from "../services/insuranceServices";

const premiumFilterSchema = Yup.object().shape({
  search: Yup.string(),
  type: Yup.string(),
  sort: Yup.string(),
  "sort-dir": Yup.string(),
  "min-cov": Yup.number().typeError('"min-cov" must be a number'),
  "min-pre": Yup.number().typeError('"min-pre" must be a number'),
  "max-pre": Yup.number().typeError('"max-pre" must be a number'),
});

export const getInsurances = async (
  req: Request<
    {},
    {},
    {},
    { search: string; "min-cov": string; "min-pre": string; "max-pre": string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;

    // validate query
    const validatedData = await premiumFilterSchema.validate(query, {
      abortEarly: false,
    });

    const {
      search,
      type,
      sort,
      "sort-dir": sortDir,
      "min-pre": minPre,
      "max-pre": maxPre,
      "min-cov": minCov,
    } = validatedData;

    const typeArr = type?.split(",");

    const results = insuranceServices.getPolicies({
      search,
      sort,
      sortDir,
      type: typeArr,
      maxPre,
      minCov,
      minPre,
    });
    res.json({ results });
  } catch (error) {
    // handle yup validation error
    if (error instanceof Yup.ValidationError) {
      res.status(400).json({ message: error.errors });
      return;
    }

    res.status(500).json("Internal Server Error");
  }
};
