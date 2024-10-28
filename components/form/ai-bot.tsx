'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { interactionSchema } from '@/app/api/use-object/route';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Bot, X } from 'lucide-react';

interface AIBotProps {
  context: string;
  setCanProceed: (decision: boolean) => void;
  shouldTriggerAI: boolean;
  setShouldTriggerAI: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AIBot({ context: ai_context, setCanProceed, shouldTriggerAI, setShouldTriggerAI }: AIBotProps) {
  const { object, submit, isLoading } = useObject({
    api: '/api/use-object',
    schema: interactionSchema,
  });
  const [showAIResponse, setShowAIResponse] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    console.log(`AIBot: shouldTriggerAI changed to ${shouldTriggerAI}`);
    console.log(`AIBot: AI context: ${ai_context}`);
    if (shouldTriggerAI && ai_context.trim() !== '' && !hasSubmitted) {
      console.log('AIBot: Submitting AI request');
      submit(ai_context);
      setHasSubmitted(true);
      setShowAIResponse(true);
      setShouldTriggerAI(false);
    }
  }, [shouldTriggerAI, ai_context, submit, setShouldTriggerAI, hasSubmitted]);

  useEffect(() => {
    console.log(`AIBot: isLoading changed to ${isLoading}`);
    if (!isLoading && object?.interactions) {
      console.log('AIBot: Processing AI response');
      const lastInteraction = object.interactions[object.interactions.length - 1];
      const aiDecision = lastInteraction?.continueBoolean ?? false;
      console.log(`AIBot: AI decision - ${aiDecision}`);
      setCanProceed(aiDecision);
      setHasSubmitted(false);
    }
  }, [isLoading, object, setCanProceed]);

  return (
    <div className="w-full mb-4">
      <AnimatePresence>
        {showAIResponse && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-100 border border-blue-300 rounded-lg p-5 shadow-lg relative w-full"
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
              <Bot className="h-10 w-10 text-blue-500 flex-shrink-0" />
              <div className="flex-grow">
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
