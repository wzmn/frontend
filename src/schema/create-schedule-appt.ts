import { InferType, boolean, number, object, string } from "yup";

export const createApptSchema = object({
  assessment_scheduled_on: string().required("required"),
  assessment_assigned_to_id: number().when("self_assessment", {
    is: "false",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.nullable(),
  }),
  self_assessment: string().required("required"),
});

export type CreateApptSchemaT = InferType<typeof createApptSchema>;
