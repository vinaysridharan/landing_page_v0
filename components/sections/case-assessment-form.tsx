import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Formik, Form, FormikProps } from 'formik';
import AIThinkingBalloon from '../ui/aIThinkingBalloon';
import { ContactFormStep } from './form/ContactFormStep';
import { PaidOvertimeStep } from './form/PaidOvertimeStep';
import { WeeklyWageStep } from './form/WeeklyWageStep';
import { EmployerInfoStep } from './form/EmployerInfoStep';
import { EmployerConfirmationStep } from './form/EmployerConfirmationStep';
import { WorkHoursStep } from './form/WorkHoursStep';
import { FinalStep } from './form/FinalStep';
import { stepConfigurations } from './form/utils';

// Define form data interface
interface FormData {
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


const initialValues: FormData = {
  name: '',
  email: '',
  phone: '',
  hoursWorked: 40,
  overtimePaid: '',
  otherOvertimeDetails: '',
  weeklyWage: 500,
  employerName: '',
  jobTitle: '',
  role: '',
  otherRoleDetails: '',
};

export function CaseAssessmentForm() {
  const [step, setStep] = useState(0);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [stableAIContent, setStableAIContent] = useState('');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [pendingAIGeneration, setPendingAIGeneration] = useState(false);
  const lastMessageRef = useRef('');
  const formikRef = useRef(null);
  const previousStepValuesRef = useRef<FormData | null>(null);

  const { messages, isLoading, append } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      console.log('Chat response received:', response);
    },
    onFinish: (message) => {
      if (message.role === 'assistant') {
        setStableAIContent(message.content);
        setIsFormSubmitting(false);
        setPendingAIGeneration(false);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setIsFormSubmitting(false);
      setPendingAIGeneration(false);
    }
  });

  const sendEmail = async (formData: FormData) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Calculate annual wage
          annualWage: formData.weeklyWage * 52,
          // Format overtime status
          overtimeStatus: formData.overtimePaid === 'other'
            ? formData.otherOvertimeDetails
            : formData.overtimePaid,
          // Format role description
          roleDescription: formData.role === 'other'
            ? formData.otherRoleDetails
            : formData.role
        }),
      });

      const result = await response.json();
      // setEmailStatus({
      //   success: result.success,
      //   message: result.message
      // });

      return result.success;
    } catch (error) {
      console.error('Error sending email:', error);
      // setEmailStatus({
      //   success: false,
      //   message: 'Failed to send email. Please try again.'
      // });
      return false;
    }
  };

  const sendChatMessage = async (message: string) => {
    try {
      await append({
        role: 'user',
        content: message,
      });
      setShowAIResponse(true);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsFormSubmitting(false);
      setPendingAIGeneration(false);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      setShowAIResponse(true);
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.content !== lastMessageRef.current) {
        lastMessageRef.current = lastMessage.content;
        setStableAIContent(lastMessage.content);
      }
    }
  }, [messages]);

  // Effect to handle pending AI generation after step change
  useEffect(() => {
    const handlePendingAIGeneration = async () => {
      if (pendingAIGeneration && previousStepValuesRef.current) {
        const previousStep = step - 1;
        if (previousStep >= 0 && stepConfigurations[previousStep].enableAI) {
          setIsFormSubmitting(true);
          const prompt = stepConfigurations[previousStep].generatePrompt(previousStepValuesRef.current);
          if (prompt) {
            await sendChatMessage(prompt);
          }
        }
        setPendingAIGeneration(false);
      }
    };

    handlePendingAIGeneration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAIGeneration, step]);

  const handleSubmit = async (values: FormData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    previousStepValuesRef.current = values;
    setSubmitting(false);


    if (step === 5) {
      setIsFormSubmitting(true);
      const emailSent = await sendEmail(values);
      setIsFormSubmitting(false);

      if (emailSent) {
        setStep(prev => prev + 1);
      }
    } else if (step < 6) {
      setStep(prev => prev + 1);

      if (stepConfigurations[step].enableAI) {
        setPendingAIGeneration(true);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      setStableAIContent('');
      setShowAIResponse(false);
      setPendingAIGeneration(false);
    }
  };




  const renderStepContent = (formik: FormikProps<FormData>) => {
    const commonProps = {
      formik,
    };

    switch (step) {
      case 0:
        return <ContactFormStep {...commonProps} />;
      case 1:
        return <PaidOvertimeStep {...commonProps} />;
      case 2:
        return <WeeklyWageStep {...commonProps} />;
      case 3:
        return <EmployerInfoStep {...commonProps} />;
      case 4:
        return <EmployerConfirmationStep {...commonProps} setStep={setStep} />;
      case 5:
        return <WorkHoursStep {...commonProps} />;
      case 6:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-10 h-[600px] flex flex-col items-center bg-blue-200 rounded-[40px] relative">
      <main className="flex-grow container mx-auto px-8 py-8">
        <div className="mx-auto">
          <Card className="flex flex-col justify-between rounded-[30px] backdrop-blur-sm bg-white/90 border-blue-200 shadow-xl h-[540px]">
            <div>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">
                  <span className="text-slate-500">AI-Powered</span> Instant Case Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Formik
                  innerRef={formikRef}
                  initialValues={initialValues}
                  validationSchema={stepConfigurations[step].validationSchema}
                  onSubmit={handleSubmit}
                  validateOnMount={true}
                >
                  {(formik) => (
                    <Form className="flex flex-col justify-between h-full gap-5">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderStepContent(formik)}
                      </motion.div>

                      <div>
                        <AIThinkingBalloon
                          showAIResponse={showAIResponse}
                          setShowAIResponse={setShowAIResponse}
                          isLoading={isLoading}
                          stableAIContent={stableAIContent}
                        />
                      </div>

                      <CardFooter className="flex justify-between w-full">
                        <Button
                          type="button"
                          onClick={handlePrevious}
                          disabled={step === 0 || isLoading || isFormSubmitting}
                          variant="outline"
                          className="flex items-center"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        {step < 6 && (
                          <Button
                            type="submit"
                            disabled={
                              isLoading ||
                              isFormSubmitting ||
                              !formik.isValid ||
                              formik.isValidating
                            }
                            className="flex items-center"
                          >
                            {(isLoading || isFormSubmitting) ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}