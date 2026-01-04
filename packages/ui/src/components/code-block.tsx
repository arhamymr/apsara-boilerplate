"use client";

import { Button } from "@workspace/ui/components/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = false,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2 bg-background/80 backdrop-blur-sm"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre
        className={`rounded-lg bg-slate-950 p-4 overflow-x-auto border border-slate-800 ${showLineNumbers ? "pl-8" : ""}`}
      >
        <code
          className={`text-sm font-mono text-slate-100 leading-relaxed block ${language ? `language-${language}` : ""}`}
        >
          {showLineNumbers
            ? code.split("\n").map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 text-slate-500 select-none">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
