import { GripVertical } from "lucide-react";
import * from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}) => (
  
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => (
  div])}
    {...props}
  >
    {withHandle && (
      
        
      
    )}
  
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
