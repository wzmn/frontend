import { InferType, object, string } from "yup";

export const createApptSchema = object({
  assessment_scheduled_on: string().required("required"),
  assessment_assigned_to_id: string().when("self_assessment", {
    is: "False",
    then: (schema) => schema.required("required"),
  }),
  self_assessment: string().required("required"),
});

export type CreateApptSchemaT = InferType<typeof createApptSchema>;
