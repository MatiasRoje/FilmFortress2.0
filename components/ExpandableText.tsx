"use client";

import { useEffect, useState } from "react";

type ExpandableTextProps = {
  text: string;
};

function ExpandableText({ text }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const toggleText = () => {
    setExpanded(expanded => !expanded);
  };

  // Function to truncate the text and add "..." when not expanded
  const truncateText = (text: string) => {
    const maxWords = 50; // You can adjust this to your desired maximum words
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };

  useEffect(() => {
    // Calculate the portion of the text to display based on the 'expanded' state
    const newDisplayedText = expanded ? text : truncateText(text);
    setDisplayedText(newDisplayedText);
  }, [expanded, text]);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: expanded ? text : displayedText }}
      />
      <div className="flex justify-end">
        <button onClick={toggleText} className="hover:underline">
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

export default ExpandableText;
