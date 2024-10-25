'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { interactionSchema } from '@/app/api/use-object/route';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Bot, X } from 'lucide-react';

interface AIBotProps {
  context: string;
  canProceed: boolean;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
  shouldTriggerAI: boolean;
  setShouldTriggerAI: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AIBot({ context: ai_context, canProceed, setCanProceed, shouldTriggerAI, setShouldTriggerAI }: AIBotProps) {
  const { object, submit, isLoading } = useObject({
    api: '/api/use-object',
    schema: interactionSchema,
  });
  const [showAIResponse, setShowAIResponse] = useState(true);

  useEffect(() => {
    if (shouldTriggerAI && ai_context.trim() !== '') {
      submit(ai_context);
      console.log("AI triggered with context:", ai_context);
      setShowAIResponse(true);
      setShouldTriggerAI(false); // Reset the trigger
    }
  }, [shouldTriggerAI, ai_context, submit, setShouldTriggerAI]);

  useEffect(() => {
    if (object?.interactions) {
      const lastInteraction = object.interactions[object.interactions.length - 1];
      const aiDecision = lastInteraction?.continueBoolean || false;
      if (aiDecision !== canProceed) {
        setCanProceed(aiDecision);
      }
    }
  }, [object, setCanProceed, canProceed]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showAIResponse && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 mx-auto bg-blue-100 border border-blue-300 rounded-lg p-5 shadow-lg z-50 w-[100%]"
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setShowAIResponse(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-start space-x-2">
              <Bot className="h-10 w-10 text-blue-500" />
              <div>
                <p className="font-semibold text-blue-700">AI Assistant</p>
                <div className="text-sm text-blue-800">
                  {object?.interactions?.map((interaction, index) => (
                    <div key={index} className="mt-2">
                      <p>{interaction?.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isLoading && (
              <div className="flex items-center text-sm text-blue-600 mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Analyzing your case...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
