import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function BotMessage ({text, prog_lang}) {
  return (
    <div className='chat-message-bot'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        children={text}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={dracula} // theme
                language={(match[1]) ? match[1] : prog_lang}
                PreTag='section' // parent tag
                {...props}
              />
            ) : (
            <code className={'inline'} {...props}>
              {children}
            </code>
            );
          },
        }}
      />
    </div>
  );
}

export default BotMessage;