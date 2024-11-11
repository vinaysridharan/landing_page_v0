
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Button } from './button'
import { Bot, X } from 'lucide-react'

const AIThinkingBalloon = ({ showAIResponse, setShowAIResponse, isLoading, stableAIContent }) => {
    return (
        <AnimatePresence>
            {showAIResponse && (
                <div
                    // initial={{ opacity: 0, y: -50 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0, y: -50 }}
                    // transition={{ duration: 0.3 }}
                    className=" bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-lg z-50 max-h-[150px] overflow-y-scroll"
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
                        <Bot className="h-6 w-6 text-blue-500 mt-1" />
                        <div>
                            <p className="font-semibold text-blue-700">AI Assistant</p>
                            <p className="text-sm text-blue-800">
                                {stableAIContent}
                            </p>
                        </div>
                    </div>
                    {isLoading && (
                        <div className="flex items-center text-sm text-blue-600 mt-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Analyzing your case...
                        </div>
                    )}
                </div>
            )}
        </AnimatePresence>
    )
}


export default AIThinkingBalloon