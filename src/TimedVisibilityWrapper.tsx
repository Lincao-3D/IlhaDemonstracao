// TimedVisibilityWrapper.tsx
import React, { useState, useEffect } from 'react';

interface TimedVisibilityWrapperProps {
  /** The content to be rendered and then hidden. */
  children: React.ReactNode;
  /** The duration in milliseconds after which the content will be hidden. Defaults to 1000ms (1 second). */
  duration?: number;
}

/**
 * A wrapper component that controls the visibility of its children,
 * hiding them after a specified duration.
 */
const TimedVisibilityWrapper: React.FC<TimedVisibilityWrapperProps> = ({ children, duration = 1000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the content after the specified duration
    const timer = setTimeout(() => setVisible(false), duration);

    // Cleanup function: Clear the timer if the component unmounts
    // or if the 'duration' prop changes, ensuring no memory leaks.
    return () => clearTimeout(timer);
  }, [duration]); // Re-run effect if 'duration' prop changes

  // If not visible, render nothing. Otherwise, render the children.
  if (!visible) {
    return null;
  }

  return <>{children}</>;
};

export default TimedVisibilityWrapper;