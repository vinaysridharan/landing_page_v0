import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ReactNode } from "react";
import { Button } from "./button";
import { Info } from "lucide-react";

interface InfoButtonProps {
    content: ReactNode; // Change from string to ReactNode
  }
const InfoButton: React.FC<InfoButtonProps> = ({ content }: { content: string }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Info className="h-4 w-4" />
          <span className="sr-only">Why is this important?</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-gray-900">Why is this important?</SheetTitle>
          <SheetDescription className="mt-2 text-sm text-gray-700">
            {content}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )


  export default InfoButton