'use client';

import React from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { AnimatePresence, motion } from 'framer-motion';
// Import the Button component from wherever it's located
import { Button } from "@/components/ui/button";
import { Bot, X } from 'lucide-react';

// You might need to define this interface if it's not imported
interface InteractionSchema {
  interactions: Array<{
    message: string;
    continueBoolean: boolean;
  }>;
}

// ... (rest of the component remains the same)
