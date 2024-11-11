import * as Yup from 'yup';


interface StepConfig {
    enableAI: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationSchema: any;
    generatePrompt: (formData: FormData) => string;
}

export interface FormData {
    name: string;
    email: string;
    phone: string;
    hoursWorked: number;
    overtimePaid: string;
    otherOvertimeDetails: string;
    weeklyWage: number;
    employerName: string;
    jobTitle: string;
    role: string;
    otherRoleDetails: string;
}

export const stepConfigurations: Record<number, StepConfig> = {
    0: {
        enableAI: true,
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phone: Yup.string()
                .matches(/^\d{10}$/, 'Invalid phone number')
                .required('Phone is required'),
        }),
        generatePrompt: (formData: FormData) => `Initial Case Assessment:
  Name: ${formData.name}
  Email: ${formData.email}
  Phone: ${formData.phone}
  
  Please provide a friendly welcome and ask about their working conditions.`
    },
    1: {
        enableAI: true,
        validationSchema: Yup.object().shape({
            overtimePaid: Yup.string()
                .oneOf(['yes', 'no', 'other'], 'Please select a valid option'),
            otherOvertimeDetails: Yup.string().when('overtimePaid', {
                is: 'other',
                then: (schema) => schema.required('Please provide details'),
                otherwise: (schema) => schema.optional().nullable(),
            })
        }),
        generatePrompt: (formData: FormData) => `The client has provided information about overtime:
  Overtime Payment Status: ${formData.overtimePaid}
  ${formData.overtimePaid === 'other' ? `Additional Details: ${formData.otherOvertimeDetails}` : ''}
  
  Please analyze this overtime situation and ask about their weekly wage to better understand their compensation structure.`
    },
    2: {
        enableAI: true,
        validationSchema: Yup.object().shape({
            weeklyWage: Yup.number()
                .min(1, 'Weekly wage must be greater than 0')
                .required('Weekly wage is required'),
        }),
        generatePrompt: (formData: FormData) => `Weekly Wage Information:
  Weekly Wage: $${formData.weeklyWage}
  Overtime Status: ${formData.overtimePaid}
  
  Based on this wage information, please provide initial insights about potential wage violations and ask about their employer details.`
    },
    3: {
        enableAI: false,
        validationSchema: Yup.object().shape({
            employerName: Yup.string().required('Employer name is required'),
            jobTitle: Yup.string().required('Job title is required'),
        }),
        generatePrompt: (formData: FormData) => `Employer Information:
  Employer Name: ${formData.employerName}
  Job Title: ${formData.jobTitle}
  Weekly Wage: $${formData.weeklyWage}
  
  Please analyze this employer information and ask about their typical working hours.`
    },
    4: {
        enableAI: true,
        validationSchema: Yup.object().shape({}),
        generatePrompt: (formData: FormData) => `Work Hours Analysis:
  Hours Worked: ${formData.hoursWorked} hours per week
  Weekly Wage: $${formData.weeklyWage}
  Overtime Payment: ${formData.overtimePaid}
  
  Please calculate potential overtime violations and provide a preliminary case assessment.`
    },
    5: {
        enableAI: true,
        validationSchema: Yup.object().shape({
            hoursWorked: Yup.number()
                .min(1, 'Hours must be greater than 0'),
            role: Yup.string(),
            otherRoleDetails: Yup.string().when('role', {
                is: 'other',
                then: (schema) => schema.required('Please provide details'),
                otherwise: (schema) => schema.notRequired(),
            }),
        }),
        generatePrompt: (formData: FormData) => {
            const hourlyRate = formData.weeklyWage / 40;
            const overtimeHours = Math.max(0, formData.hoursWorked - 40);
            const potentialOvertimePay = overtimeHours * (hourlyRate * 1.5);

            return `Final Case Assessment Summary:
  Client: ${formData.name}
  Employer: ${formData.employerName}
  Position: ${formData.jobTitle}
  Weekly Hours: ${formData.hoursWorked}
  Weekly Wage: $${formData.weeklyWage}
  Overtime Status: ${formData.overtimePaid}
  Calculated Hourly Rate: $${hourlyRate.toFixed(2)}
  Potential Weekly Overtime Pay: $${potentialOvertimePay.toFixed(2)}
  
  Please provide a comprehensive case assessment and recommend next steps for the client.`;
        }
    },
    6: {
        enableAI: false,
        validationSchema: Yup.object().shape({
            hoursWorked: Yup.number()
                .min(1, 'Hours must be greater than 0')
                .required('Hours worked is required'),
            role: Yup.string().required('Please select a role'),
            otherRoleDetails: Yup.string().when('role', {
                is: 'other',
                then: (schema) => schema.required('Please provide details'),
                otherwise: (schema) => schema.notRequired(),
            }),
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        generatePrompt: (formData: FormData) => {

            return ``;
        }
    },
};